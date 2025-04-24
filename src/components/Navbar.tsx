import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const Navbar: React.FC = () => {
    const [scrolling, setScrolling] = useState(false);
    const navigate = useNavigate();

    // Detectar el desplazamiento del scroll
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 20) {
                setScrolling(true);
            } else {
                setScrolling(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div
            className={`navbar sticky top-0 lg:fixed  text-white w-full z-50 transition-all duration-300 ${scrolling ? 'bg-[#E63946] shadow-md lg:top-0' : 'bg-transparent lg:top-8'
                }`}
        >
            <div className="flex-1">
                {/* Nombre de la empresa */}
                <div className="flex gap-2">
                    <img className="bg-white rounded-2xl z-50 w-10 h-10" src="logo.png" alt="" />
                    <a className="m-0 p-0 btn-ghost text-black lg:text-[#ffffff] text-2xl font-semibold">
                        Envíos Express
                    </a>
                </div>
            </div>
            <div className="flex-none">
                {/* Icono de carrito de compras o pedidos */}
                <button className="btn btn-square btn-ghost">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        className="inline-block h-6 w-6 stroke-[#000] lg:stroke-[#ffffff]"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M3 3h18l-1 12H4L3 3zM9 3v12m6-12v12"
                        ></path>
                    </svg>
                </button>
                {/* Icono de perfil o usuario */}
                <button className="btn btn-square btn-ghost ml-4"

                    onClick={() => navigate(`/login`)}
                >

                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        className="inline-block h-6 w-6 stroke-[#000] lg:stroke-[#ffffff]"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.66 0-8 1.34-8 4v2h16v-2c0-2.66-5.34-4-8-4z"
                        ></path>
                    </svg>
                </button>
            </div>
        </div>
    );
};
