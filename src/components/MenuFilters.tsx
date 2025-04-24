import React, { useState, useEffect } from 'react';

interface FilterProps {
    categories: string[];
    onFilterChange: (filters: {
        category: string;
        minPrice: number;
        maxPrice: number;
        sortBy: string;
        search: string;
    }) => void;
}

const MenuFilters: React.FC<FilterProps> = ({ categories, onFilterChange }) => {
    const [category, setCategory] = useState('');
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(100);
    const [sortBy, setSortBy] = useState('');
    const [search, setSearch] = useState('');

    useEffect(() => {
        onFilterChange({ category, minPrice, maxPrice, sortBy, search });
    }, [category, minPrice, maxPrice, sortBy, search]);

    return (
        <>

            <div className="collapse bg-base-100 border-base-300 border lg:hidden">
                <input type="checkbox" />
                <div className="collapse-title font-semibold text-lg text-gray-800 hover:text-[#E63946] flex justify-between items-center gap-2">
                    <span>Mostrar Filtros</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#E63946]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                </div>
                <div className="collapse-content text-sm">
                    <div className="w-full flex flex-wrap 2xl:flex-nowrap gap-4">
                        {/* Categoría */}
                        <div className="w-full sm:w-1/2 md:w-1/4">
                            <label className="block text-sm font-semibold mb-1">Categoría</label>
                            <select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="w-full rounded px-3 py-2 text-white bg-[#E63946] outline-none"
                            >
                                <option value="">Todas</option>
                                {categories.map((cat, i) => (
                                    <option key={i} value={cat}>
                                        {cat}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Rango de precio */}
                        <div className="flex gap-2 w-full sm:w-1/2 md:w-1/4">
                            <div className="flex-1">
                                <label className="block text-sm font-semibold mb-1">Precio mín.</label>
                                <input
                                    type="number"
                                    className="w-full border border-[#E63946] outline-none rounded px-3 py-2"
                                    value={minPrice}
                                    onChange={(e) => setMinPrice(Number(e.target.value))}
                                />
                            </div>
                            <div className="flex-1">
                                <label className="block text-sm font-semibold mb-1">Precio máx.</label>
                                <input
                                    type="number"
                                    className="w-full border border-[#E63946] outline-none rounded px-3 py-2"
                                    value={maxPrice}
                                    onChange={(e) => setMaxPrice(Number(e.target.value))}
                                />
                            </div>
                        </div>

                        {/* Ordenar por */}
                        <div className="w-full sm:w-1/2 md:w-1/4">
                            <label className="block text-sm font-semibold mb-1">Ordenar por</label>
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="w-full rounded px-3 py-2 text-white bg-[#E63946] outline-none"
                            >
                                <option value="">Por defecto</option>
                                <option value="price-asc">Precio ascendente</option>
                                <option value="price-desc">Precio descendente</option>
                                <option value="name-asc">Nombre A-Z</option>
                                <option value="name-desc">Nombre Z-A</option>
                            </select>
                        </div>

                        {/* Buscar */}
                        <div className="w-full sm:w-1/2 md:w-1/4">
                            <label className="block text-sm font-semibold mb-1">Buscar</label>
                            <input
                                type="text"
                                className="w-full border border-[#E63946] outline-none rounded px-3 py-2"
                                placeholder="Buscar por nombre..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>

                        <div className="w-full sm:w-1/2 md:w-1/4 flex items-end">
                            <button className="btn w-full text-white bg-[#E63946]">Filtrar</button>
                        </div>

                    </div>
                </div>
            </div>


            <div className="w-full flex-wrap 2xl:flex-nowrap gap-4 hidden lg:flex">
                {/* Categoría */}
                <div className="w-full sm:w-1/2 md:w-1/4">
                    <label className="block text-sm font-semibold mb-1">Categoría</label>
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full rounded px-3 py-2 text-white bg-[#E63946] outline-none"
                    >
                        <option value="">Todas</option>
                        {categories.map((cat, i) => (
                            <option key={i} value={cat}>
                                {cat}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Rango de precio */}
                <div className="flex gap-2 w-full sm:w-1/2 md:w-1/4">
                    <div className="flex-1">
                        <label className="block text-sm font-semibold mb-1">Precio mín.</label>
                        <input
                            type="number"
                            className="w-full border border-[#E63946] outline-none rounded px-3 py-2"
                            value={minPrice}
                            onChange={(e) => setMinPrice(Number(e.target.value))}
                        />
                    </div>
                    <div className="flex-1">
                        <label className="block text-sm font-semibold mb-1">Precio máx.</label>
                        <input
                            type="number"
                            className="w-full border border-[#E63946] outline-none rounded px-3 py-2"
                            value={maxPrice}
                            onChange={(e) => setMaxPrice(Number(e.target.value))}
                        />
                    </div>
                </div>

                {/* Ordenar por */}
                <div className="w-full sm:w-1/2 md:w-1/4">
                    <label className="block text-sm font-semibold mb-1">Ordenar por</label>
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="w-full rounded px-3 py-2 text-white bg-[#E63946] outline-none"
                    >
                        <option value="">Por defecto</option>
                        <option value="price-asc">Precio ascendente</option>
                        <option value="price-desc">Precio descendente</option>
                        <option value="name-asc">Nombre A-Z</option>
                        <option value="name-desc">Nombre Z-A</option>
                    </select>
                </div>

                {/* Buscar */}
                <div className="w-full sm:w-1/2 md:w-1/4">
                    <label className="block text-sm font-semibold mb-1">Buscar</label>
                    <input
                        type="text"
                        className="w-full border border-[#E63946] outline-none rounded px-3 py-2"
                        placeholder="Buscar por nombre..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                <div className="w-full sm:w-1/2 md:w-1/4 flex items-end">
                    <button className="btn w-full text-white bg-[#E63946]">Filtrar</button>
                </div>

            </div>



        </>
    );
};

export default MenuFilters;
