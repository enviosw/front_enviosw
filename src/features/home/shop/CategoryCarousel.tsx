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
    <div
      className="
        flex gap-3 overflow-x-auto w-full pt-4
        scrollbar-hide scroll-smooth
      "
    >
      <CategoryBadge
        text="Todas"
        isSelected={selectedCategoriaId === undefined}
        onClick={() => handleClick(undefined)}
      />
      {categories?.map((category) => (
        <CategoryBadge
          key={category.id}
          text={category.nombre}
          isSelected={selectedCategoriaId === category.id}
          onClick={() => handleClick(category.id)}
        />
      ))}
    </div>
  );
};

interface CategoryBadgeProps {
  text: string;
  isSelected: boolean;
  onClick: () => void;
}

const CategoryBadge: React.FC<CategoryBadgeProps> = ({ text, isSelected, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`
        px-4 py-2 rounded-full text-sm cursor-pointer font-medium whitespace-nowrap
        transition-all duration-200 ease-in-out
        border 
        ${
          isSelected
            ? 'bg-orange-300 text-orange-700 border-orange-300 shadow-sm'
            : 'bg-white text-gray-600 border-gray-200 hover:border-orange-300 hover:bg-orange-50 hover:text-orange-500'
        }
      `}
    >
      {text}
    </button>
  );
};

export default CategoryCarousel;
