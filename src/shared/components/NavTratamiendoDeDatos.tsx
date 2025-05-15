import React from 'react';

const NavTratamientoDeDatos: React.FC = () => {
    return (
        <nav className="w-full bg-white shadow-md">
            <div className="container mx-auto px-5 py-4 flex justify-between items-center max-w-4xl">
                <div className="text-xl font-bold">DomiciliosW</div>
                <div>
                    <a href="/" className="rounded-md text-gray-800 no-underline py-2 px-4 hover:bg-gray-100 transition duration-150 ease-in-out">Inicio</a>
                </div>
            </div>
        </nav>
    );
};

export default NavTratamientoDeDatos;