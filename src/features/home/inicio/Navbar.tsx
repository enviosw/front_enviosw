import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { FaUser, FaUserCircle } from 'react-icons/fa';
import { AlertService } from '../../../utils/AlertService';
import WhatsappButton from '../../../shared/components/buttons/WhatsappButton';
import FacebookButton from '../../../shared/components/buttons/FacebookButton';
import InstagramButton from '../../../shared/components/buttons/InstagramButton';

export const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    const confirmed = await AlertService.confirm(
      '¿Cerrar sesión?',
      '¿Estás seguro de que deseas salir de tu cuenta?'
    );

    if (confirmed) {
      logout();
      navigate('/login');
    }
  };

  return (
    <nav
      className="
        sticky top-0 w-full z-[9999]
        bg-[#1C0E06]/95 backdrop-blur-md
        shadow-[0_2px_20px_rgba(28,14,6,0.35)]
        border-b border-white/5
      "
    >
      {/* Línea decorativa superior — gradiente terracota */}
      <div className="h-[3px] bg-gradient-to-r from-[#E8622A] via-amber-400 to-[#E8622A]" />

      <div className="relative w-full max-w-7xl mx-auto flex items-center justify-between px-4 py-2.5">

        {/* LOGO */}
        <div className="flex items-center gap-3">
          <img
            src="/d1.png"
            alt="Envios W"
            className="w-9 h-9 rounded-full object-cover border-2 border-[#E8622A]/60 shadow-md transition-transform duration-300 hover:scale-105"
          />
          <img
            src="/d4.jpeg"
            alt="Envios W"
            className="h-8 opacity-95 hover:opacity-100 transition-opacity duration-300"
          />
        </div>

        {/* REDES SOCIALES */}
        <div className="flex gap-1 bg-white/8 px-2.5 py-1.5 rounded-2xl border border-white/10 backdrop-blur-sm">
          <div className="opacity-85 hover:opacity-100 transition-all duration-200 hover:scale-110">
            <WhatsappButton phoneNumber="573134089563" message="" />
          </div>
          <div className="opacity-85 hover:opacity-100 transition-all duration-200 hover:scale-110">
            <InstagramButton username="/envioswpitalito/" />
          </div>
          <div className="opacity-85 hover:opacity-100 transition-all duration-200 hover:scale-110">
            <FacebookButton pageId="/envioswexpress/" />
          </div>
        </div>

        {/* USUARIO */}
        <div className="flex items-center gap-3">
          {!user ? (
            <button
              className="
                flex items-center gap-2 text-white/85 hover:text-white
                bg-white/8 hover:bg-[#E8622A]/20
                border border-white/10 hover:border-[#E8622A]/40
                px-3 py-1.5 rounded-full
                text-sm font-medium
                transition-all duration-300
                focus:outline-none focus:ring-2 focus:ring-[#E8622A]/50
              "
              onClick={() => navigate('/login')}
              aria-label="Iniciar sesión"
              type="button"
            >
              <FaUserCircle size={18} />
              <span className="hidden sm:inline">Ingresar</span>
            </button>
          ) : (
            <div className="dropdown dropdown-end">
              <button
                className="
                  flex items-center gap-2
                  bg-[#E8622A]/15 hover:bg-[#E8622A]/25
                  border border-[#E8622A]/30
                  text-white px-3 py-1.5 rounded-full
                  transition-all duration-300
                  focus:outline-none focus:ring-2 focus:ring-[#E8622A]/50
                "
                aria-label="Abrir menú de usuario"
                type="button"
              >
                <FaUser size={14} />
                <span className="hidden sm:inline text-sm font-medium max-w-[80px] truncate">
                  {user.nombre}
                </span>
              </button>

              <ul className="menu menu-sm dropdown-content bg-white rounded-2xl z-10 mt-3 w-56 p-2 shadow-[0_8px_32px_rgba(28,14,6,0.18)] border border-[#EDE8E3]">
                <li>
                  <button className="justify-between text-sm font-semibold text-[#1A1208] pointer-events-none">
                    {user.nombre}
                    <span className="badge text-xs bg-[#E8622A] text-white border-0">Usuario</span>
                  </button>
                </li>
                <li className="mt-1">
                  {user.rol === 'administrador' ? (
                    <button
                      className="text-sm text-[#6B5E52] hover:text-[#E8622A] hover:bg-[#E8622A]/8 rounded-xl transition-all duration-200"
                      onClick={() => navigate('/dashboard')}
                    >
                      Dashboard
                    </button>
                  ) : (
                    <button
                      className="text-sm text-[#6B5E52] hover:text-[#E8622A] hover:bg-[#E8622A]/8 rounded-xl transition-all duration-200"
                      onClick={() => navigate('/mi-comercio')}
                    >
                      Mi Comercio
                    </button>
                  )}
                </li>
                <li className="mt-1">
                  <button
                    className="text-sm text-red-500 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all duration-200"
                    onClick={handleLogout}
                  >
                    Cerrar sesión
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};
