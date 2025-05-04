// shop/CategoryCarousel.tsx
import React from 'react';
import { useCategoriasPorComercio } from '../../../services/categoriasServices';

interface CategoryCarouselProps {
  comercioId?: number;
  onSelectCategoria: (categoriaId?: number) => void;
}

const CategoryCarousel: React.FC<CategoryCarouselProps> = ({ comercioId, onSelectCategoria }) => {
  const { data: categories, isLoading, isError } = useCategoriasPorComercio(comercioId);

  if (isLoading) return <p>Cargando...</p>;
  if (isError) return <p className="text-red-500">Error al cargar categorías</p>;

  return (
    <div className="w-auto overflow-x-auto py-2">
      <div className="flex gap-4 whitespace-nowrap scrollbar-hide justify-center items-center flex-wrap">
        <div
          onClick={() => onSelectCategoria(undefined)}
          className="bg-[#FFE0DC] p-3 py-1 rounded-xl flex flex-col items-center w-24 h-20 md:w-28 justify-center shadow-sm cursor-pointer"
        >
          <span className="text-sm font-semibold text-center text-gray-800">Todas</span>
        </div>

        {categories?.map((category) => (
          <div
            key={category.id}
            onClick={() => onSelectCategoria(category.id)}
            className="bg-[#F7F7F7] hover:bg-[#FFE0DC] transition p-3 py-1 rounded-xl flex flex-col items-center w-24 h-20 md:w-28 justify-center shadow-sm cursor-pointer"
          >
            <div className="text-3xl md:text-4xl">📦</div>
            <span className="text-xs md:text-sm font-medium text-gray-700 mt-2 text-center truncate">
              {category.nombre}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryCarousel;
