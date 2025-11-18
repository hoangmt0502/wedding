import React, { ReactNode, useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth, hasPermission } from "../context/AuthProvider";
import CONFIG from '../config';
import { IRedisUser } from '../interfaces/auth';

type TProps = {
    requiredPermission?: string;
    children?: ReactNode;
}

export default function ProtectedRoute({ requiredPermission, children }: TProps) {
    const { user, permissions, isPermissionsLoaded } = useAuth();
    const navigate = useNavigate();
    const accessToken = localStorage.getItem(CONFIG.ACCESS_TOKEN_KEY);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!accessToken) {
            navigate('/login', { replace: true });
            setIsLoading(false);
            return;
        }

        if (!isPermissionsLoaded) {
            return;
        }
        if (
            requiredPermission &&
            !hasPermission(user, permissions, requiredPermission)
        ) {
            navigate('/error', { replace: true });
            return;
        }

        setIsLoading(false); // Data ready
    }, [accessToken, permissions, requiredPermission, navigate]);

    if (!accessToken || (requiredPermission && !hasPermission(user, permissions, requiredPermission))) {
        return null;
    }

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return children ? children : <Outlet />;
}
