import React from 'react';
import { useSidebar } from '../../context/SidebarContext';
import { NavLink } from 'react-router-dom'; // Importar NavLink de React Router
import { HiMenu, HiHome, HiUser, HiCube, HiChartBar, HiCollection, HiShoppingCart, HiTag } from 'react-icons/hi';

// Actualiza los elementos del menú con sus rutas
const menuItems = [
    { icon: <HiHome />, label: 'Dashboard', to: '/dashboard' },
    { icon: <HiUser />, label: 'Comercios', to: '/comercios' },
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
            ${isOpen ? 'w-64' : 'w-24'} flex flex-col`}
        >
            {/* Sidebar Toggle Button */}
            <div className="flex justify-start gap-2 items-center mb-4 cursor-pointer" onClick={toggleSidebar}>
                <button className="cursor-pointer">
                    <HiMenu size={24} />
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
                                `flex items-center justify-start cursor-pointer hover:bg-[#2B2B2B] hover:text-white rounded-md  gap-2  py-2 transition-all duration-300 ease-in-out
                                ${isActive ? 'bg-[#2B2B2B] text-white' : ''}`
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
