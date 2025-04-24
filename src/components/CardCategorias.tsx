import React from 'react';

const categorias = [
    {
        nombre: 'Salud',
        img: 'https://media.istockphoto.com/id/1312665318/es/vector/vector-de-dise%C3%B1o-de-logotipos-m%C3%A9dicos.jpg?s=612x612&w=0&k=20&c=1h_GsM56_MchjGSdY6yVXYxHpu5rnkAchm8_SN4ccPA='
    },
    {
        nombre: 'Comida Rápida',
        img: 'https://static4.depositphotos.com/1007168/269/i/450/depositphotos_2699508-stock-illustration-cartoon-hamburger-drink-and-french.jpg'
    },
    {
        nombre: 'Envíos',
        img: 'https://img.freepik.com/vector-premium/plantilla-vector-diseno-logotipo-entrega-urgente_441059-204.jpg?semt=ais_hybrid&w=740'
    },
    {
        nombre: 'Ubicación',
        img: 'https://media.istockphoto.com/id/1361979526/es/vector/marcador-de-posici%C3%B3n-del-pin-del-mapa-icono-de-vector-de-ubicaci%C3%B3n-icono-de-punto-de-anclaje.jpg?s=612x612&w=0&k=20&c=vYpRZ-r7ucuouEp8LbWCynGlAZhk12IXTe9qRLoZK8Y='
    }
];

const CardCategorias: React.FC = () => {
    return (
        <div className="py-10 px-6 bg-gradient-to-r from-teal-400 to-blue-500 rounded-lg shadow-lg">
            <h2 className="text-4xl font-extrabold text-white text-center mb-8">Selecciona una Categoría</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8">
                {categorias.map((cat, index) => (
                    <div
                        key={index}
                        className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow p-6 flex flex-col items-center justify-center cursor-pointer transform hover:scale-105 hover:bg-teal-50 duration-300"
                    >
                        <div className="w-24 h-24 mb-4 flex justify-center items-center bg-teal-100 rounded-full">
                            <img
                                src={cat.img}
                                alt={cat.nombre}
                                className="w-16 h-16 object-cover rounded-full"
                            />
                        </div>
                        <span className="text-lg font-semibold text-gray-800">{cat.nombre}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CardCategorias;
