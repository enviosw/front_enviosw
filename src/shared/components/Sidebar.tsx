import React from 'react';
import { useSidebar } from '../../context/SidebarContext';
import { NavLink, useNavigate } from 'react-router-dom'; // Importar NavLink de React Router
import { HiMenu, HiHome, HiUser, HiLibrary, HiUsers, HiCollection, HiTag } from 'react-icons/hi';
import { FiLogOut, FiMessageSquare } from "react-icons/fi";
import { FaHome, FaMotorcycle, FaTimes } from 'react-icons/fa';
import { AlertService } from '../../utils/AlertService';
import { useAuth } from '../../context/AuthContext';
// import { HiMenu, HiHome, HiUser, HiCube, HiChartBar, HiCollection, HiShoppingCart, HiTag } from 'react-icons/hi';

// Actualiza los elementos del menú con sus rutas
const menuItems = [
  { icon: <HiHome />, label: 'Dashboard', to: '/dashboard' },
  { icon: <HiUser />, label: 'Usuarios', to: '/usuarios' },
  { icon: <HiLibrary />, label: 'Comercios', to: '/comercios' },
  { icon: <HiUsers />, label: 'Clientes', to: '/clientes' },
  { icon: <FaHome />, label: 'Domicilios', to: '/domicilios' },
    { icon: <FaMotorcycle />, label: 'Pendientes', to: '/domicilios-pendientes' },

  { icon: <HiTag />, label: 'Domiciliarios', to: '/domiciliarios' },
  { icon: <FiMessageSquare />, label: 'Chats', to: '/chats' },
    { icon: <HiTag />, label: 'Turnos', to: '/turnnoss-app' },
  { icon: <HiCollection />, label: 'Publicidad', to: '/publicidad' },

    { icon: <HiUsers />, label: 'Precios', to: '/precios' },
];


const Sidebar: React.FC = () => {
    const { isOpen, toggleSidebar } = useSidebar();

    const navigate = useNavigate();
    const { logout } = useAuth();

    const handleLogOut = async () => {

        const confirmed = await AlertService.confirm(
            '¿Cerrar sesión?',
            '¿Estás seguro de que deseas salir de tu cuenta?'
        );

        if (confirmed) {
            logout();
            navigate('/login');
        }

    }

    return (
        <nav
            className={`w-1/4 bg-gray-800 z-50 text-white max-sm:max-h-11/12 flex flex-col p-4 rounded-lg m-2 transition-all duration-500 ease-in-out max-sm:absolute max-sm:right-2 max-sm:top-2
                ${isOpen ? 'w-64' : 'w-[73px] max-sm:p-2 max-sm:w-[58px] max-sm:max-h-[40px] max-sm:overflow-hidden max-sm:bg-white max-sm:border-1 max-sm:border-gray-300'}`}
        >
            {/* Sidebar Toggle Button */}
            <div className='flex gap-2 items-center mb-4 cursor-pointer max-sm:flex-row-reverse' onClick={toggleSidebar}>
                <button className="cursor-pointer px-2 ">

                    {isOpen ? <FaTimes size={24} /> : <HiMenu size={24} className='max-sm:text-secondary' />}
                </button>
                {isOpen && <span className="transition-all duration-300 ease-in-out">Menu</span>}

            </div>

            <hr />

            {/* Sidebar Menu */}
            <ul className='h-full overflow-y-auto overflow-x-hidden mt-2'>
                {menuItems.map((item, index) => (
                    <li key={index} className="mb-2">
                        <NavLink
                            to={item.to}
                            className={({ isActive }) =>
                                `flex items-center justify-start cursor-pointer hover:text-white rounded-md gap-2 py-2 transition-all duration-300 ease-in-out max-sm:flex-row-reverse
                                ${isActive ? 'bg-primary text-white' : 'hover:bg-gray-600'}`
                            }
                        >
                            <div className={`transition-transform duration-300 ease-in-out text-2xl px-2`}>
                                {item.icon}
                            </div>
                            {isOpen && <span className="transition-all duration-300 ease-in-out">{item.label}</span>}
                        </NavLink>
                    </li>
                ))}
            </ul>

            <hr />

            <div className='flex items-center hover:bg-gray-600 mt-2 justify-start cursor-pointer hover:text-white rounded-md gap-2 py-2 transition-all duration-300 ease-in-out max-sm:flex-row-reverse' onClick={handleLogOut}>

                <button className="cursor-pointer px-2 ">

                    <FiLogOut size={24} className={isOpen ? '' : 'max-sm:text-secondary'} />
                </button>

                {isOpen && <span className="transition-all duration-300 ease-in-out">Salir</span>}

            </div>
        </nav>
    );
};

export default Sidebar;
