import React from 'react';
import { useSidebar } from '../../context/SidebarContext';
import { NavLink } from 'react-router-dom'; // Importar NavLink de React Router
import { HiMenu, HiHome, HiUser, HiCube, HiChartBar, HiCollection, HiShoppingCart, HiTag } from 'react-icons/hi';
import { FaTimes } from 'react-icons/fa';

// Actualiza los elementos del menú con sus rutas
const menuItems = [
    { icon: <HiHome />, label: 'Dashboard', to: '/dashboard' },
    { icon: <HiUser />, label: 'Comercios', to: '/comercios' },
    { icon: <HiUser />, label: 'Usuarios', to: '/usuarios' },
    { icon: <HiCube />, label: 'Clientes', to: '/clientes' },
    { icon: <HiChartBar />, label: 'Configuraciones', to: '/configuraciones' },
    { icon: <HiCollection />, label: 'Reportes', to: '/reportes' },
    { icon: <HiShoppingCart />, label: 'Tarifas', to: '/tarifas' },
    { icon: <HiTag />, label: 'Perfil', to: '/perfil' }
];

const Sidebar: React.FC = () => {
    const { isOpen, toggleSidebar } = useSidebar();

    return (
        <div
            className={`bg-[#F7F7F7] text-black p-4 h-screen transition-all duration-500 ease-in-out
            ${isOpen ? 'w-64' : 'w-[73px]'} flex flex-col`}
        >
            {/* Sidebar Toggle Button */}
            <div className={`flex gap-2 items-center mb-4 cursor-pointer ${isOpen ? 'justify-start pl-2' : 'justify-center'}`} onClick={toggleSidebar}>
                <button className="cursor-pointer">

                    {isOpen ? <FaTimes size={24} /> : <HiMenu size={24} />}
                </button>
                {isOpen && <span className="transition-all duration-300 ease-in-out">Menu</span>}

            </div>

            {/* Sidebar Menu */}
            <ul>
                {menuItems.map((item, index) => (
                    <li key={index} className="mb-2">
                        <NavLink
                            to={item.to}
                            className={({ isActive }) =>
                                `flex items-center justify-start cursor-pointer hover:bg-[#E63946] hover:text-white rounded-md  gap-2  py-2 transition-all duration-300 ease-in-out
                                ${isActive ? 'bg-[#E63946] text-white' : ''}`
                            }
                        >
                            <div className={`transition-transform duration-300 ease-in-out text-2xl pl-2`}>
                                {item.icon}
                            </div>
                            {isOpen && <span className="transition-all duration-300 ease-in-out">{item.label}</span>}
                        </NavLink>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Sidebar;
