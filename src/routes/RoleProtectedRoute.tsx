import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface Props {
    children: React.ReactNode;
    requiredRole?: 'administrador' | 'aliado' | 'cliente';
}

const RoleProtectedRoute: React.FC<Props> = ({ children, requiredRole }) => {
    const { isAuthenticated, user } = useAuth();
    const location = useLocation();
    const [timeoutReached, setTimeoutReached] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (!user) setTimeoutReached(true);
        }, 1000);

        return () => clearTimeout(timer); // limpia si el user se carga antes
    }, [user]);

    if (timeoutReached) {
        return <Navigate to={location.state?.from || '/'} replace />;
    }

    if (user === null) {
        return <div className="text-center py-10">Verificando sesión...</div>;
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    if (user.rol.toLowerCase() !== requiredRole?.toLowerCase()) {
        return <Navigate to="/" replace />;
    }

    return <>{children}</>;
};

export default RoleProtectedRoute;
