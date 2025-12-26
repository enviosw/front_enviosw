import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

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

  return (
    <div className="w-full pt-4">
      <Swiper
        slidesPerView="auto"
        spaceBetween={12}
        grabCursor
        freeMode
        className="w-full"
      >
        {/* BOTÓN TODOS */}
        <SwiperSlide style={{ width: 'auto' }}>
          <CategoryBadge
            text="Todas"
            isSelected={selectedCategoriaId === undefined}
            onClick={() => onSelectCategoria(undefined)}
          />
        </SwiperSlide>

        {/* CATEGORÍAS */}
        {categories?.map((category) => (
          <SwiperSlide key={category.id} style={{ width: 'auto' }}>
            <CategoryBadge
              text={category.nombre}
              isSelected={selectedCategoriaId === category.id}
              onClick={() => onSelectCategoria(category.id)}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

interface CategoryBadgeProps {
  text: string;
  isSelected: boolean;
  onClick: () => void;
}

const CategoryBadge: React.FC<CategoryBadgeProps> = ({
  text,
  isSelected,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className={`
        px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap
        transition-all duration-200 ease-in-out
        border
        ${
          isSelected
            ? 'bg-orange-300 text-orange-700 border-orange-300 shadow-md'
            : 'bg-white text-gray-600 border-gray-200 hover:bg-orange-50 hover:border-orange-300 hover:text-orange-600'
        }
      `}
    >
      {text}
    </button>
  );
};

export default CategoryCarousel;
