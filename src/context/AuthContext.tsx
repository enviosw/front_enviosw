import React, { createContext, useContext, useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';

interface User {
  id: number;
  email: string;
  nombre: string;
  rol: 'administrador' | 'aliado'; // ✅ Cambiado a "rol"
  comercioId?: number | null;
}

interface AuthContextProps {
  isAuthenticated: boolean;
  user: User | null;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);


  useEffect(() => {
    const token = localStorage.getItem('access_token');
    const comercioIdRaw = localStorage.getItem('comercio_id'); // 👈 obtiene como string
  
    if (token) {
      const decoded: any = jwtDecode(token);
      const comercioId = comercioIdRaw ? Number(comercioIdRaw) : null; // 👈 convierte a número
  
      setUser({
        id: decoded.sub,
        email: decoded.email,
        nombre: decoded.nombre || '',
        rol: decoded.rol,
        comercioId: comercioId !== null && !isNaN(comercioId) ? comercioId : null,
      });
    }
  }, []);
  
  const login = (token: string) => {
    localStorage.setItem('access_token', token);
    const decoded: any = jwtDecode(token);
    setUser({
      id: decoded.sub,
      email: decoded.email,
      nombre: decoded.nombre || '',
      rol: decoded.rol,
    });
  };

  const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated: !!user, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
