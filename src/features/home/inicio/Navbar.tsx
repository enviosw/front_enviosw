import React, { useState, useEffect } from 'react';
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

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > window.innerHeight * 0.2) setIsScrolled(true);
      else setIsScrolled(false);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
      className={[
        'w-full fixed left-0 right-0 top-0 z-50 border-none transition-all duration-300',
        // Fondo principal
        isScrolled
          ? 'bg-orange-600/95 backdrop-blur-md shadow-lg'
          : 'bg-gradient-to-b from-orange-600/65 to-transparent',
      ].join(' ')}
    >
      {/* Línea/Glow superior */}
      <div
        className={[
          'absolute inset-x-0 top-0 h-[2px]',
          isScrolled
            ? 'bg-gradient-to-r from-orange-200 via-white/70 to-orange-200 opacity-70'
            : 'bg-gradient-to-r from-orange-300 via-white/60 to-orange-300 opacity-50',
        ].join(' ')}
      />

      <div className="relative w-full flex lg:w-[80%] mx-auto items-center justify-between px-3 lg:px-0 py-2">
        {/* Left */}
        <div className="flex flex-1">
          <div className={isScrolled ? 'flex-1 flex gap-2 items-center' : 'hidden'}>
            <figure className="relative">
              <img
                src="logoW_1.png"
                alt="logo domicilios w"
                className="h-7 drop-shadow-sm"
              />
            </figure>

            <span className="text-white/95 font-extrabold text-2xl lg:text-3xl hidden lg:flex tracking-tight">
              Domicilios w
            </span>
          </div>
        </div>

        {/* Social Buttons */}
        <div className="flex gap-2 mx-2">
          <div className="flex gap-2 rounded-2xl bg-white/15 px-2 py-1 border border-white/15 backdrop-blur-md shadow-sm">
            <div className="opacity-90 hover:opacity-100 transition">
              <WhatsappButton phoneNumber="573134089563" message="¡Hola! Quiero pedir un domicilio." />
            </div>
            <div className="opacity-90 hover:opacity-100 transition">
              <InstagramButton username="/envioswpitalito/" />
            </div>
            <div className="opacity-90 hover:opacity-100 transition">
              <FacebookButton pageId="/envioswexpress/" />
            </div>
          </div>
        </div>

        {/* Location badge */}
        <div className="hidden lg:flex">
          <div className="px-4 py-2 rounded-2xl bg-white/90 text-orange-700 font-semibold shadow-md border border-orange-100">
            Pitalito - Huila
          </div>
        </div>

        {/* Right */}
        <div className="flex-none flex items-center gap-3">
          {!user ? (
            <button
              className={[
                'btn btn-square btn-ghost',
                'text-white hover:bg-white/15',
                'transition-all duration-300 transform hover:scale-110',
              ].join(' ')}
              onClick={() => navigate('/login')}
              aria-label="Iniciar sesión"
            >
              <FaUserCircle size={40} />
            </button>
          ) : (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className={[
                  'btn btn-ghost btn-circle avatar',
                  'hover:bg-white/15',
                  'transition-all duration-300 transform hover:scale-110',
                ].join(' ')}
                aria-label="Abrir menú de usuario"
              >
                <div className="w-10 h-10 rounded-full grid place-items-center items-center pt-2 bg-white/15 border border-white/20 shadow-sm">
                  <FaUser size={18} color="#fff" />
                </div>
              </div>

              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-2xl z-10 mt-3 w-56 p-2 shadow-xl border border-orange-100"
              >
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
