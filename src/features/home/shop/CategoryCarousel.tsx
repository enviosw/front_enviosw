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
    <div className="flex justify-center overflow-x-auto space-x-4 py-4 scrollbar-hidden w-full pl-[200px] pr-5 md:px-0">
      <div className="flex gap-4 whitespace-nowrap flex-nowrap justify-start items-center px-4">
        <div
          onClick={() => handleClick(undefined)}
          className={`p-1 py-1 rounded-xl flex flex-col items-center 
            w-20 h-16 md:w-28 md:h-20 justify-center shadow-sm cursor-pointer transition
            ${selectedCategoriaId === undefined ? 'bg-[#FFB8AD]' : 'bg-[#F7F7F7] hover:bg-[#FFE0DC]'}`}
        >
          <div className="text-2xl md:text-4xl">📦</div>
          <span className="text-[10px] md:text-sm font-medium text-gray-700 mt-2 text-center truncate">
            Todas
          </span>
        </div>

        {categories?.map((category) => (
          <div
            key={category.id}
            onClick={() => handleClick(category.id)}
            className={`p-1 py-1 bg-white rounded-xl flex flex-col items-center 
              w-20 h-16 md:w-28 md:h-20 justify-center shadow-sm cursor-pointer transition
              ${selectedCategoriaId === category.id ? 'bg-[#FFB8AD]' : 'bg-[#F7F7F7] hover:bg-[#FFE0DC]'}`}
          >
            <div className="text-2xl md:text-4xl">📦</div>
            <span className="text-[10px] md:text-sm font-medium text-gray-700 mt-2 text-center truncate">
              {category.nombre}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryCarousel