import React from 'react';

interface Category {
    id: number;
    name: string;
    icon?: string; // Emoji o URL de imagen
}

const categories: Category[] = [
    { id: 1, name: 'Hamburguesas', icon: '🍔' },
    { id: 2, name: 'Pizzas', icon: '🍕' },
    { id: 3, name: 'Bebidas', icon: '🥤' },
    { id: 4, name: 'Postres', icon: '🍰' },
    { id: 5, name: 'Ensaladas', icon: '🥗' },
    { id: 6, name: 'Sopas', icon: '🍲' },
    { id: 7, name: 'Snacks', icon: '🍟' },
    { id: 8, name: 'Comida Mexicana', icon: '🌮' },
    { id: 9, name: 'Comida China', icon: '🥡' },
    { id: 10, name: 'Café y Té', icon: '☕' },
    { id: 11, name: 'Helados', icon: '🍦' },
    { id: 12, name: 'Carnes', icon: '🥩' },
    { id: 13, name: 'Vegetariano', icon: '🧆' }
];

const CategoryCarousel: React.FC = () => {
    return (
        <div className="w-full bg-[#f5f0f0] py-2 my-1 rounded-xl px-2 overflow-hidden">
            <div className="carousel carousel-center max-w-full space-x-4 overflow-x-auto scrollbar-hide px-2">
                {categories.map((category) => (
                    <div key={category.id} className="carousel-item max-w-full overflow-hidden">
                        <div className="bg-white w-24 overflow-hidden h-24 md:w-40 md:h-24 rounded-xl   flex flex-col items-center justify-center text-center hover:scale-105 transition-transform">
                            <div className="text-5xl md:text-6xl mb-1">{category.icon}</div>
                            <span className="text-xs md:text-sm font-medium text-gray-800 truncate">
                                {category.name}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CategoryCarousel;
