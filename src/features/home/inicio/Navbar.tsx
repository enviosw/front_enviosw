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

  // Estado para el color del navbar
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Detectar si el scroll ha superado el 40vh
      if (window.scrollY > window.innerHeight * 0.2) {
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
      className={`navbar border-none w-full mx-auto flex fixed left-0 right-0 ${isScrolled ? 'bg-[#000000]' : 'bg-transparent'
        } top-0 z-50 transition-all duration-300`}
    >
      <div className="w-full flex lg:w-[80%] mx-auto items-center justify-between">
        <div className="flex-1 flex gap-2 items-center">

          <div
            className={`rounded-2xl flex justify-center items-center bg-white/70  px-2 z-50 w-10 h-10 ${isScrolled ? 'text-primary' : 'text-primary'
              }`}
          >
            <span className='font-black'>W</span>
          </div>
          <span className='text-white opacity-80 font-bold text-3xl hidden lg:flex'>Domicilios w</span>

        </div>


        <div className='flex gap-2 mx-2 opacity-70'>
          <WhatsappButton phoneNumber="573001234567" message="¡Hola! Quiero pedir un domicilio." />
          <InstagramButton username="your_instagram_username" />

          <FacebookButton pageId="your_facebook_page_id" />
        </div>

        <div className="bg-white/70 shadow-md rounded-xl hidden lg:flex p-2 items-end mx-auto  gap-2">
          Pitalito - Huila
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
                <FaUser size={25} color='#fff' />

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
