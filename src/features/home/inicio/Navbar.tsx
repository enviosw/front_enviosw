import React from 'react';
import { useNavigate } from 'react-router-dom';

export const Navbar: React.FC = () => {

    const navigate = useNavigate();

    return (
        <div
            className={`navbar bg-white fixed top-0 w-full z-50 transition-all duration-300 shadow-2xl`}
        >
            <div className="flex-1">
                {/* Nombre de la empresa */}
                <div className="flex gap-2 items-end">
                    {/* Logo */}
                    <img
                        className="rounded-2xl z-50 w-10 h-10 object-cover bg-black"
                        src="logoW.png"
                        alt="Logo W"
                    />

                    {/* Texto "Domicilios W" */}
                    <div className="m-0 p-0 text-black text-2xl font-semibold">
                        Domicilios{" "}
                        <span className="text-primary">
                            W
                        </span>
                    </div>
                </div>

            </div>
            <div className="flex-none">

                {/* Icono de perfil o usuario */}
                <button className="btn btn-square btn-ghost ml-4"

                    onClick={() => navigate(`/login`)}
                >

                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        className="inline-block h-6 w-6 stroke-[#000] lg:stroke-[#000000]"
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
