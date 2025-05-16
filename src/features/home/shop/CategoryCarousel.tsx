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
  selectedCategoriaId,
}) => {
  const { data: categories } = useCategoriasPorComercio(comercioId);

  const handleClick = (categoriaId?: number) => {
    onSelectCategoria(categoriaId);
  };

  return (
    <div className="flex justify-start overflow-x-auto space-x-6 py-2 px-4 scrollbar-hidden w-full">
      <span
        onClick={() => handleClick(undefined)}
        className={`cursor-pointer text-sm md:text-base font-semibold whitespace-nowrap transition-all duration-150
        ${selectedCategoriaId === undefined
            ? 'text-primary border-b-2 border-primary'
            : 'text-gray-500 hover:text-primary hover:border-b-2 hover:border-primary'
          }`}
      >
        Todas
      </span>

      {categories?.map((category) => (
        <span
          key={category.id}
          onClick={() => handleClick(category.id)}
          className={`cursor-pointer text-sm md:text-base font-semibold whitespace-nowrap transition-all duration-150
          ${selectedCategoriaId === category.id
              ? 'text-primary border-b-2 border-primary'
              : 'text-gray-500 hover:text-primary hover:border-b-2 hover:border-primary'
            }`}
        >
          {category.nombre}
        </span>
      ))}
    </div>
  );
};

export default CategoryCarousel;
