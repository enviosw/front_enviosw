import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { FaUser, FaUserCircle } from 'react-icons/fa';
import { AlertService } from '../../../utils/AlertService';

export const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  // Estado para el color del navbar
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Detectar si el scroll ha superado el 40vh
      if (window.scrollY > window.innerHeight * 0.4) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    // Agregar evento de scroll
    window.addEventListener('scroll', handleScroll);

    // Limpiar el evento al desmontar
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
    <div
      className={`navbar border-none w-full mx-auto flex fixed left-0 right-0 ${isScrolled ? 'bg-[#FFB84D]' : 'bg-transparent'
        } top-0 z-50 transition-all duration-300`}
    >
      <div className="w-full flex lg:w-[80%] mx-auto items-center justify-between">
        <div className="flex-1 flex gap-2 items-center">
          <img
            className="rounded-2xl bg-secondary px-2 z-50 w-10 h-10 object-contain hidden lg:flex"
            src="logoW_1.png"
            alt="Logo W"
          />
          <div
            className={`text-lg hidden lg:flex lg:text-2xl uppercase ${isScrolled ? 'text-white' : 'text-black'
              }`}
          >
            Domicilios <span className={`${isScrolled ? 'text-black' : 'text-primary'}`}>W</span>
          </div>
        </div>

        <div className="hidden sm:block text-center text-white text-xl font-medium pt-3">
          {/* Mejorar el contraste del texto */}
          <span className="text-white bg-black bg-opacity-60 px-2 py-1 rounded-lg">
            Pitalito - Huila
          </span>
        </div>

        <div className="flex-none ml-4 flex items-center gap-4">
          {!user ? (
            <button
              className="btn btn-square text-primary lg:text-white btn-ghost transition-all duration-300 transform hover:scale-110"
              onClick={() => navigate('/login')}
            >
              <FaUserCircle size={40} />
            </button>
          ) : (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar transition-all duration-300 transform hover:scale-110"
                aria-label="Abrir menú de usuario"
              >
                  <FaUser size={25} color='#fff'/>
               
              </div>

              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow-lg"
              >
                <li>
                  <button className="justify-between text-sm font-medium">
                    {user.nombre}
                    <span className="badge">User</span>
                  </button>
                </li>
                {user.rol == 'administrador' ? <li>
                  <button onClick={() => navigate('/dashboard')}>Dashboard</button>
                </li> : <li>
                  <button onClick={() => navigate('/mi-comercio')}>Mi Comercio</button>
                </li>}
                <li>
                  <button onClick={handleLogout}>Cerrar sesión</button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
