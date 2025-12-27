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
        bg-orange-500/90 backdrop-blur-md
        shadow-md
      "
    >
      {/* Línea decorativa superior */}
      <div className="h-[2px] bg-gradient-to-r from-orange-300 via-orange-200 to-orange-300" />

      <div className="relative w-full max-w-7xl mx-auto flex items-center justify-between px-4 py-2">
        {/* LOGO (texto) */}
        <div className="flex items-center gap-2">
          <span className="text-white font-extrabold text-xl tracking-wide select-none">
            Domicilios<span className="text-orange-200 ml-1">W</span>
          </span>
        </div>

        {/* REDES */}
        <div className="flex gap-2 bg-white/15 px-2 py-1 rounded-xl border border-white/20">
          <div className="opacity-90 hover:opacity-100 transition">
            <WhatsappButton phoneNumber="573134089563" message="" />
          </div>
          <div className="opacity-90 hover:opacity-100 transition">
            <InstagramButton username="/envioswpitalito/" />
          </div>
          <div className="opacity-90 hover:opacity-100 transition">
            <FacebookButton pageId="/envioswexpress/" />
          </div>
        </div>

        {/* USUARIO */}
        <div className="flex items-center gap-3">
          {!user ? (
            <button
              className="text-white hover:bg-white/20 p-2 rounded-full transition"
              onClick={() => navigate('/login')}
              aria-label="Iniciar sesión"
              type="button"
            >
              <FaUserCircle size={34} />
            </button>
          ) : (
            <div className="dropdown dropdown-end">
              <button
                className="btn btn-ghost btn-circle text-white hover:bg-white/20"
                aria-label="Abrir menú de usuario"
                type="button"
              >
                <FaUser size={20} />
              </button>

              <ul className="menu menu-sm dropdown-content bg-white rounded-xl z-10 mt-3 w-56 p-2 shadow-xl">
                <li>
                  <button className="justify-between text-sm font-semibold">
                    {user.nombre}
                    <span className="badge badge-warning text-white">User</span>
                  </button>
                </li>

                {user.rol === 'administrador' ? (
                  <li>
                    <button className="hover:text-orange-600" onClick={() => navigate('/dashboard')}>
                      Dashboard
                    </button>
                  </li>
                ) : (
                  <li>
                    <button className="hover:text-orange-600" onClick={() => navigate('/mi-comercio')}>
                      Mi Comercio
                    </button>
                  </li>
                )}

                <li>
                  <button className="text-red-600 hover:bg-red-50" onClick={handleLogout}>
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
