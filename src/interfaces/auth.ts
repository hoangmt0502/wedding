import { User as FirebaseUser } from "firebase/auth";

export interface IRedisUser {
  email?: string;
  id?: number;
  user_id?: number;
  is_admin?: boolean;
  is_national_account?: boolean;
  name?: string;
  uuid?: string;
  company_id?: number | null;
  pharmacy_id?: number | null;
  type: string;
  phone?: string | null;
  address?: string | null;
  active_pharmacy_id?: number | null;
}

export interface IResponseRedisUser {
  user: IRedisUser;
  permissions: string[];
  active_pharmacy_id?: number | null
}

export type TPharmaciesSelection = {
  id: number;
  uuid: string | null;
  name: string | null;
}

export interface IResponseLoginEmail {
  user?: IRedisUser;
  permissions?: string[];
  token?: string;
  requires_pharmacy_selection?: boolean;
  status?: number;
  pharmacies?: TPharmaciesSelection[];
  active_pharmacy_id?: number | null;
}

export interface AuthContextType {
  user: IRedisUser | FirebaseUser | null;
  setUser: React.Dispatch<
    React.SetStateAction<IRedisUser | FirebaseUser | null>
  >;
  permissions: string[];
  setPermissions: React.Dispatch<React.SetStateAction<string[]>>;
  isPermissionsLoaded: boolean;
  setIsPermissionsLoaded: React.Dispatch<React.SetStateAction<boolean>>;
  loginWithGoogle: () => Promise<FirebaseUser>;
  loginWithFacebook: () => Promise<FirebaseUser>;
  loginWithEmail: (
    email: string,
    password: string
  ) => Promise<IResponseLoginEmail>;
  isNationalAccount: boolean;
}
