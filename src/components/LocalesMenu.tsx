import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCheckCircle, FaClock, FaTimesCircle } from 'react-icons/fa';
import { AiFillStar } from 'react-icons/ai';

const LocalesMenu: React.FC = () => {
    const navigate = useNavigate();

    const locales = [
        {
            name: "Restaurante Italiano",
            description: "Especialidad en pastas y pizzas tradicionales italianas.",
            available: true,
            image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/21/21/5f/e3/piazza-italia-by-storia.jpg?w=600&h=-1&s=1",
            discount: true,
            rating: 95,
            time: "15-25 min"
        },
        {
            name: "Comida Rápida",
            description: "Hamburguesas, papas fritas, refrescos.",
            available: true,
            image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1c/b4/01/1b/el-faro-pizzeria-bar.jpg?w=600&h=-1&s=1",
            discount: false,
            rating: 91,
            time: "10-20 min"
        },
        {
            name: "Café & Pastelería",
            description: "Café gourmet y postres artesanales.",
            available: true,
            image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/10/eb/23/9b/la-migueria-laureles.jpg?w=600&h=400&s=1",
            discount: true,
            rating: 98,
            time: "5-15 min"
        },
        {
            name: "Restaurante Vegetariano",
            description: "Platos vegetarianos y veganos frescos y saludables.",
            available: false,
            image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/21/7d/a3/d4/retaurante-mezcla.jpg?w=600&h=400&s=1",
            discount: false,
            rating: 89,
            time: "20-30 min"
        },
        {
            name: "Sushi Bar",
            description: "Sushi fresco y platos japoneses.",
            available: true,
            image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/22/08/e2/a9/teriyaki-en-la-calle.jpg?w=900&h=500&s=1",
            discount: false,
            rating: 93,
            time: "10-25 min"
        },
        {
            name: "Asados del Valle",
            description: "Carnes asadas y parrilladas.",
            available: true,
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9xdeG5A_JRMXrbY20rpCAvZaOGtMmZzfmPg&s",
            discount: true,
            rating: 90,
            time: "20-30 min"
        },
        {
            name: "Pizzería Gourmet",
            description: "Pizzas gourmet con ingredientes frescos.",
            available: true,
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS59YR-IJPmcxayB-ivSCfrx-N4w3voqH8ONA&s",
            discount: false,
            rating: 94,
            time: "15-20 min"
        },
        {
            name: "Comida Mexicana",
            description: "Tacos, burritos, guacamole y más.",
            available: false,
            image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/26/f4/bc/07/los-mejores-espacios.jpg?w=600&h=-1&s=1",
            discount: true,
            rating: 87,
            time: "20-30 min"
        },
        {
            name: "Cevichería del Mar",
            description: "Ceviches frescos y platos de mariscos.",
            available: true,
            image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/18/c8/26/42/le-cadre.jpg?w=900&h=500&s=1",
            discount: false,
            rating: 92,
            time: "15-25 min"
        },
        {
            name: "Burgers & Fries",
            description: "Hamburguesas y papas fritas al estilo americano.",
            available: true,
            image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/19/bb/d2/9c/double-cheese-and-fries.jpg?w=900&h=500&s=1",
            discount: true,
            rating: 97,
            time: "10-20 min"
        }
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5 gap-6">
            {locales.map((local, index) => (
                <div
                    key={index}
                    onClick={() => navigate(`/restaurante/${index}`)}
                    className="group cursor-pointer bg-white hover:bg-[#E63946] rounded-3xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden relative border border-gray-200"
                >
                    {/* Imagen con overlays */}
                    <div className="relative h-48">
                        <img
                            src={local.image}
                            alt={local.name}
                            className="w-full h-full object-cover transition-transform hover:scale-105"
                        />
                        {/* Gradiente superior */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10" />

                        {/* Descuento */}
                        {local.discount && (
                            <span className="absolute top-2 left-2 z-20 bg-white text-yellow-600 text-xs font-bold px-2 py-1 rounded-lg shadow">
                                -20% Algunos productos
                            </span>
                        )}

                        {/* Calificación */}
                        <div className="absolute bottom-2 right-2 z-20 bg-white text-green-600 font-semibold text-xs px-3 py-1 rounded-full flex items-center gap-1 shadow">
                            <AiFillStar className="text-green-500" /> {local.rating}%
                        </div>
                    </div>

                    {/* Contenido */}
                    <div className="p-4 space-y-2">
                        <h3 className="text-base font-bold text-gray-800 group-hover:text-white truncate">{local.name}</h3>
                        <p className="text-sm text-gray-500 group-hover:text-white line-clamp-2">{local.description}</p>

                        <div className="flex items-center justify-between text-xs font-medium group-hover:text-white text-gray-600 pt-2">
                            <div className="flex items-center gap-1">
                                <FaClock className="text-green-600 group-hover:text-white" />
                                {local.time}
                            </div>
                            {local.available ? (
                                <span className="flex items-center group-hover:text-white text-green-600 gap-1">
                                    <FaCheckCircle /> Disponible
                                </span>
                            ) : (
                                <span className="flex items-center group-hover:text-white text-red-500 gap-1">
                                    <FaTimesCircle /> No disponible
                                </span>
                            )}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default LocalesMenu;
