import React from 'react';
import { useSidebar } from '../../context/SidebarContext';
import { NavLink } from 'react-router-dom';
import { HiMenu, HiHome, HiUser, HiCube } from 'react-icons/hi';
import { FaTimes } from 'react-icons/fa';

const menuItems = [
    { icon: <HiHome />, label: 'Dashboard', to: '/dashboard' },
    { icon: <HiUser />, label: 'Comercios', to: '/comercios' },
    { icon: <HiUser />, label: 'Usuarios', to: '/usuarios' },
    { icon: <HiCube />, label: 'Clientes', to: '/clientes' },
];

const Sidebar: React.FC = () => {
    const { isOpen, toggleSidebar } = useSidebar();

    return (
        <>
            {/* Botón para abrir el sidebar (solo en móviles) */}
            {/* Mostrar solo cuando está cerrado */}
            {!isOpen && (
                <button
                    onClick={toggleSidebar}
                    className="fixed top-2 left-4 z-50 text-black md:hidden"
                >
                    <HiMenu size={28} />
                </button>
            )}

            {/* Mostrar solo cuando está abierto */}
            {isOpen && (
                <button
                    onClick={toggleSidebar}
                    className="fixed top-4 left-4 z-50 hidden text-black "
                >
                    <FaTimes size={24} />
                </button>
            )}


            {/* Sidebar responsive solo para móvil */}
            <div
                className={`
          fixed top-0 left-0 h-full z-40 bg-[#F7F7F7] text-black p-4 transition-all duration-500 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          w-64 md:translate-x-0 md:relative md:w-64 md:flex md:flex-col
        `}
            >
                {/* Botón cerrar (solo visible en móvil) */}
                <div className="flex justify-between items-center mb-4 md:hidden">
                    <span className="text-lg font-semibold">Menú</span>
                    <FaTimes size={20} onClick={toggleSidebar} className="cursor-pointer" />
                </div>

                <ul>
                    {menuItems.map((item, index) => (
                        <li key={index} className="mb-2">
                            <NavLink
                                to={item.to}
                                className={({ isActive }) =>
                                    `flex items-center gap-2 px-2 py-2 rounded-md hover:bg-[#E63946] hover:text-white transition
                   ${isActive ? 'bg-[#E63946] text-white' : ''}`
                                }
                                onClick={toggleSidebar} // Cierra menú en móvil al navegar
                            >
                                <span className="text-2xl">{item.icon}</span>
                                <span>{item.label}</span>
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
};

export default Sidebar;
