import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { FaUserCircle } from 'react-icons/fa';
import { AlertService } from '../../../utils/AlertService';

export const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth(); // Obtenemos el usuario y la función logout del contexto

  // Manejar la acción de cerrar sesión
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

  console.log(user);

  return (
    <div className={`navbar w-full lg:w-[80%] mx-auto left-0 right-0 bg-transparent flex lg:fixed top-0 z-50 transition-all duration-300`}>
      <div className="flex-1">
        <div className="flex gap-2 items-end">
          <img
            className="rounded-2xl z-50 w-10 h-10 object-contain bg-black"
            src="logoW_1.png"
            alt="Logo W"
          />
          <div className="m-0 p-0 text-black text-lg lg:text-2xl font-semibold">
            Domicilios <span className="text-primary">W</span>
          </div>
        </div>
      </div>

      {/* Texto centrado: solo visible en sm+ */}
      <div className="text-center text-red-700 text-xl font-medium pt-3">
        Pitalito - Huila
      </div>

      <div className="flex-none ml-4">
        {!user ? (
          <button
            className="btn btn-square text-primary lg:text-white btn-ghost ml-4"
            onClick={() => navigate('/login')}
          >
            <FaUserCircle size={40} />
          </button>
        ) : (
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img
                  alt="User Avatar"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                />
              </div>
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
              <li>
                <a className="justify-between">
                  {user.nombre}
                  <span className="badge">User</span>
                </a>
              </li>
              <li><a onClick={() => navigate('/mi-comercio')}>Mi Comercio</a></li>
              <li><a onClick={handleLogout}>Logout</a></li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};
