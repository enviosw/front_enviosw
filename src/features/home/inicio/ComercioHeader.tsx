import React from 'react';

interface ComercioHeaderProps {
    nombre: string;
    descripcion: string;
    horario: string;
    imagen?: string;
}

const ComercioHeader: React.FC<ComercioHeaderProps> = ({
    nombre,
    descripcion,
    imagen,
}) => {
    const imagenFinal =
        imagen ||
        'https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=1200&q=80';

    return (
        <div
            className="w-full shadow-lg mb-4 py-2 md:py-6 relative"
            style={{
                backgroundImage: `url(${imagenFinal})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
            }}
        >
            {/* Capa oscura sobre la imagen */}
            <div className="absolute inset-0 bg-black opacity-80"></div>

            <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
                {/* Texto a la izquierda */}
                <div className="text-white text-center md:text-left space-y-2 md:space-y-3 flex-1">
                    <h1 className="text-2xl sm:text-3xl uppercase md:text-4xl font-bold">{nombre}</h1>
                    <p className="text-sm sm:text-base md:text-lg uppercase text-primary">{descripcion}</p>
                    {/* <span className="text-xs sm:text-sm md:text-base text-gray-400 italic">
                        ⏰ {horario}
                    </span> */}
                </div>

                {/* Imagen a la derecha */}
                <div className="w-24 h-24 sm:w-32 sm:h-32 md:w-52 md:h-52 rounded-full overflow-hidden lg:translate-y-28 shrink-0">
                    <img
                        src={imagenFinal}
                        alt={`Foto del comercio ${nombre}`}
                        className="w-full h-full object-cover"
                    />
                </div>
            </div>
        </div>
    );
};

export default ComercioHeader;
