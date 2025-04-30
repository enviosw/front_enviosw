import React from 'react';

interface Category {
    id: number;
    name: string;
    icon?: string;
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
];

const CategoryCarousel: React.FC = () => {
    return (
        <div className="w-full bg-white shadow-md rounded-xl py-3 px-3 overflow-x-auto">
            <div className="flex gap-4 whitespace-nowrap scrollbar-hide justify-between items-center flex-wrap">
                {categories.map((category) => (
                    <div
                        key={category.id}
                        className="bg-[#F7F7F7] hover:bg-[#FFE0DC] transition p-3 py-1 rounded-xl flex flex-col items-center w-24 h-20 md:w-28  justify-center shadow-sm"
                    >
                        <div className="text-3xl md:text-4xl">{category.icon}</div>
                        <span className="text-xs md:text-sm font-medium text-gray-700 mt-2 text-center truncate">
                            {category.name}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CategoryCarousel;
