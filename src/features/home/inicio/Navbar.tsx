import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { FaSignInAlt } from 'react-icons/fa';

export const Navbar: React.FC = () => {

    const navigate = useNavigate();

    const { user } = useAuth()

    console.log(user)
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

<FaSignInAlt size={24} />
                </button>


                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            <img
                                alt="Tailwind CSS Navbar component"
                                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                        </div>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        <li>
                            <a className="justify-between">
                                Profile
                                <span className="badge">New</span>
                            </a>
                        </li>
                        <li><a>Logout</a></li>
                    </ul>
                </div>
            </div>

        </div>
    );
};
