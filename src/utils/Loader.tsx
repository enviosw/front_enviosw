import React from 'react';

const Loader: React.FC = () => {
    return (
        <div className="fixed inset-0 z-50 bg-[#121212] flex items-center justify-center pointer-events-none">
            <img src="loader.gif" alt="Cargando..." className="size-32" />
        </div>
    );
};

export default Loader;
