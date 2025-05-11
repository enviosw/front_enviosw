import React from 'react';
import { useCategoriasPorComercio } from '../../../services/categoriasServices';

interface CategoryCarouselProps {
  comercioId?: number;
  onSelectCategoria: (categoriaId?: number) => void;
  selectedCategoriaId?: number;
}

const CategoryCarousel: React.FC<CategoryCarouselProps> = ({
  comercioId,
  onSelectCategoria,
  selectedCategoriaId
}) => {
  const { data: categories } = useCategoriasPorComercio(comercioId);


  const handleClick = (categoriaId?: number) => {
    onSelectCategoria(categoriaId);
  };

  return (
    <div className="flex justify-start overflow-x-auto space-x-4 py-4 scrollbar-hidden w-full">
      <div className="flex gap-4 whitespace-nowrap flex-nowrap justify-start items-center px-4">
        <div
          onClick={() => handleClick(undefined)}
          className={`rounded-full flex flex-col items-center 
    w-16 h-16 md:w-20 md:h-20 justify-center shadow-sm cursor-pointer transition
    ${selectedCategoriaId === undefined ? 'bg-[#FFB84D]' : ' hover:bg-[#FFB84D]'}`}
        >
          <div className="text-2xl md:text-3xl">📦</div>
          <span className="text-[10px] md:text-xs font-medium text-gray-700 mt-1 text-center truncate">
            Todas
          </span>
        </div>

        {categories?.map((category) => (
          <div
            key={category.id}
            onClick={() => handleClick(category.id)}
            className={`rounded-full flex flex-col items-center 
    w-16 h-16 md:w-20 md:h-20 justify-center shadow-sm cursor-pointer transition
    ${selectedCategoriaId === category.id ? 'bg-[#FFB84D]' : ' hover:bg-[#FFB84D]'}`}
          >
            <div className="text-2xl md:text-3xl">📦</div>
            <span className="text-[10px] md:text-xs font-medium text-gray-700 mt-1 text-center truncate">
              {category.nombre}
            </span>
          </div>

        ))}
      </div>
    </div>
  );
};

export default CategoryCarousel