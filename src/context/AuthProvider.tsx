import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { getAuth, onIdTokenChanged, User as FirebaseUser } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { loginWithGoogle, loginWithFacebook, loginWithEmail, getRedisUser } from "../services/authService";
import CONFIG from "../config";
import { AuthContextType, IRedisUser } from "../interfaces/auth";
import { Permission } from "../enums/common";
import { PATH_NAME } from "../constants/path";

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export default function AuthProvider({ children } : {children?: ReactNode}) {
  const [user, setUser] = useState<IRedisUser | FirebaseUser | null>(null);
  const [permissions, setPermissions] = useState<string[]>([]);
  const [isPermissionsLoaded, setIsPermissionsLoaded] = useState(false);
  const navigate = useNavigate();
  const auth = getAuth();

  useEffect(() => {
    // Hàm kiểm tra trạng thái xác thực ban đầu
    const initializeAuth = async () => {
      try {
        await auth.authStateReady(); // API mới trong Firebase v9 để chờ auth sẵn sàng
        
        const unsubscribe = onIdTokenChanged(auth, async (firebaseUser) => {
          if (firebaseUser?.uid) {
            setUser(firebaseUser);
            const token = await firebaseUser.getIdToken();
            localStorage.setItem(CONFIG.ACCESS_TOKEN_KEY, token);
            return;
          } else {
            const savedToken = localStorage.getItem(CONFIG.ACCESS_TOKEN_KEY);
            if (savedToken) {
              await syncUserData(savedToken);
            } else {
              setUser(null);
              setPermissions([]);
              localStorage.clear();
              navigate("/login");
            }
          }
        });

        return () => unsubscribe();
      } catch (error) {
        console.error("Auth initialization error:", error);
      }
    };

    // Hàm đồng bộ dữ liệu từ Redis
    const syncUserData = async (token: string) => {
      try {
        const response = await getRedisUser();
        setUser({...response.user, active_pharmacy_id: response?.active_pharmacy_id});
        setPermissions(response.permissions || []);
      } catch (error) {
        //console.error("Failed to sync user data:", error);
        setUser(null);
        setPermissions([]);
        localStorage.removeItem(CONFIG.ACCESS_TOKEN_KEY);
        navigate("/login", { replace: true });
      } finally {
        setIsPermissionsLoaded(true);
      }
    };

    initializeAuth();
  }, [auth, navigate]);

  const isNationalAccount = !!(user as IRedisUser)?.is_national_account;

  return (
    <AuthContext.Provider value={
      {
        user,
        setUser,
        permissions,
        isPermissionsLoaded,
        setIsPermissionsLoaded,
        setPermissions,
        loginWithGoogle,
        loginWithFacebook,
        loginWithEmail,
        isNationalAccount
      }
    }>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return {
    ...context,
    user: context.user as IRedisUser
  };
};

export const hasPermission = (user: IRedisUser | FirebaseUser | null, permissions: string[], required: string, path?: string) => {
  const _user = (user as IRedisUser);

  if (!_user?.company_id && path) {
    return false;
  }
  if (_user?.is_admin) {
    if (required === Permission.Owner) {
      return _user?.type === Permission.Owner
    }
    return true;
  }
  
  if (!Array.isArray(permissions)) {
    console.warn("Permissions is not an array or not initialized", permissions);
    return false;
  }
  return permissions.includes(required);
};
