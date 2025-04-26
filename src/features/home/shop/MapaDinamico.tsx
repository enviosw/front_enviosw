import React, { useState } from 'react';

const MapaDinamico: React.FC = () => {
    const [direccion, setDireccion] = useState("Cra 2 Este #14-57, Pitalito, Huila ");

    const handleChange = (e: any) => {
        setDireccion(e.target.value);
    };

    const url = `https://www.google.com/maps?q=${encodeURIComponent(direccion)}&output=embed`;

    return (
        <div className="space-y-4">
            <input
                type="text"
                value={direccion}
                onChange={handleChange}
                placeholder="Escribe una dirección"
                className="p-2 border border-gray-300 rounded w-full"
            />

            <div className="w-full h-[400px]">
                <iframe
                    src={url}
                    className="w-full h-full border-0"
                    allowFullScreen={true}
                    loading="lazy"
                ></iframe>
            </div>
        </div>
    );
};

export default MapaDinamico;
