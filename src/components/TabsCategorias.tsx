import React from 'react';

const categorias = [
    {
        nombre: 'Salud',
        img: 'https://media.istockphoto.com/id/1312665318/es/vector/vector-de-dise%C3%B1o-de-logotipos-m%C3%A9dicos.jpg?s=612x612&w=0&k=20&c=1h_GsM56_MchjGSdY6yVXYxHpu5rnkAchm8_SN4ccPA=',
        contenido: 'Servicios médicos y farmacias disponibles.'
    },
    {
        nombre: 'Comida Rápida',
        img: 'https://static4.depositphotos.com/1007168/269/i/450/depositphotos_2699508-stock-illustration-cartoon-hamburger-drink-and-french.jpg',
        contenido: 'Hamburguesas, papas, bebidas y más.'
    },
    {
        nombre: 'Envíos',
        img: 'https://img.freepik.com/vector-premium/plantilla-vector-diseno-logotipo-entrega-urgente_441059-204.jpg?semt=ais_hybrid&w=740',
        contenido: 'Envíos y mensajería rápida a tu ubicación.'
    },
    {
        nombre: 'Ubicación',
        img: 'https://media.istockphoto.com/id/1361979526/es/vector/marcador-de-posici%C3%B3n-del-pin-del-mapa-icono-de-vector-de-ubicaci%C3%B3n-icono-de-punto-de-anclaje.jpg?s=612x612&w=0&k=20&c=vYpRZ-r7ucuouEp8LbWCynGlAZhk12IXTe9qRLoZK8Y=',
        contenido: 'Locales cerca de ti.'
    }
];

const TabsCategorias: React.FC = () => {
    return (
        <div className="w-full mx-auto py-8 px-4">
            <h2 className="text-center text-3xl font-bold mb-6 text-gray-800">¡Elige tu categoría!</h2>

            {/* Contenedor para tabs y filtros */}
            <div className="w-full flex flex-col md:flex-row gap-10 justify-between items-center mb-8">

                {/* Filtros y búsqueda */}
                <div className="w-full md:w-1/3 flex flex-col md:flex-row gap-4 justify-start">
                    <select className="w-full rounded px-3 py-2 text-white bg-[#E63946] outline-none"
                    >
                        <option value="">Todas las zonas</option>
                        <option value="norte">Zona Norte</option>
                        <option value="sur">Zona Sur</option>
                        <option value="centro">Zona Centro</option>
                    </select>

                    <input
                        type="text"
                        placeholder="Buscar local..."
                        className="w-full border border-[#E63946] outline-none rounded px-3 py-2"
                    />
                </div>

                {/* Tabs de categorías */}
                <div className="tabs flex flex-wrap justify-center gap-6 w-full md:w-2/3">
                    {categorias.map((cat, index) => (
                        <div key={index} className="flex flex-col items-center">
                            <input
                                type="radio"
                                name="tabs_categoria"
                                className="tab hidden peer"
                                id={`tab-${index}`}
                                defaultChecked={index === 0}
                            />
                            <label
                                htmlFor={`tab-${index}`}
                                className="tab tab-bordered cursor-pointer rounded-xl w-full text-center"
                            >
                                <div className="flex flex-col items-center">
                                    <img
                                        src={cat.img}
                                        alt={cat.nombre}
                                        className={`w-16 h-16 rounded-full object-cover mb-1 peer-checked:border-4 peer-checked:border-red-500`} // Aplica el borde rojo cuando el tab está seleccionado
                                    />
                                    <span className="text-xs font-medium">{cat.nombre}</span>
                                </div>
                            </label>
                        </div>
                    ))}
                </div>

            </div>

            {/* Contenidos de cada tab */}
            <div className="mt-6">
                {categorias.map((cat, index) => (
                    <div
                        key={index}
                        className="tab-content hidden peer-checked:block border rounded-xl p-6 bg-base-100"
                        id={`content-${index}`}
                    >
                        <div className="text-center text-base">{cat.contenido}</div>
                    </div>
                ))}
            </div>

        </div>
    );
};

export default TabsCategorias;
