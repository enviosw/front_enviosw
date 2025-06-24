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
      // Contenedor principal del carrusel:
      // - Un poco más de padding vertical.
      // - Sombra sutil en la parte inferior para indicar que se puede desplazar.
      // - Remueve el scrollbar por defecto si Tailwind lo permite o usa un scrollbar oculto personalizado.
      // - Usa 'no-scrollbar' si tienes una configuración de Tailwind para ocultarlo.
      className="flex justify-start overflow-x-auto space-x-6 py-3 px-4 w-full
                 border-b border-gray-100
                 scrollbar-hide md:scrollbar-default" // 'scrollbar-hide' para ocultar en navegadores con Webkit (Chrome/Safari), 'md:scrollbar-default' si quieres que se muestre en escritorio.
    >
      <CategoryItem
        text="Todas"
        isSelected={selectedCategoriaId === undefined}
        onClick={() => handleClick(undefined)}
      />

      {categories?.map((category) => (
        <CategoryItem
          key={category.id}
          text={category.nombre}
          isSelected={selectedCategoriaId === category.id}
          onClick={() => handleClick(category.id)}
        />
      ))}
    </div>
  );
};

// Componente auxiliar para cada ítem de categoría, mejora la legibilidad y mantenibilidad.
interface CategoryItemProps {
  text: string;
  isSelected: boolean;
  onClick: () => void;
}

const CategoryItem: React.FC<CategoryItemProps> = ({ text, isSelected, onClick }) => {
  const primaryColor = 'orange-500'; // Puedes centralizar este color en una variable o en el archivo de configuración de Tailwind
  const hoverPrimaryColor = 'orange-600'; // Color al pasar el ratón

  return (
    <span
      onClick={onClick}
      className={`
        cursor-pointer text-base md:text-lg font-semibold whitespace-nowrap
        pb-2 border-b-2
        transition-all duration-200 ease-in-out transform hover:scale-105

        ${isSelected
          ? `text-${primaryColor} border-${primaryColor} scale-105` // Más grande y color primario si está seleccionado
          : `text-gray-600 border-transparent hover:text-${hoverPrimaryColor} hover:border-${hoverPrimaryColor}` // Gris por defecto, se ilumina al pasar el ratón
        }
      `}
    >
      {text}
    </span>
  );
};

export default CategoryCarousel;