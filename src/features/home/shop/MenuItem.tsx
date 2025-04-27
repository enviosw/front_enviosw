import React from 'react';
// import { MenuItemType } from '../../../context/CartContext';
import { useCart } from '../../../context/CartContext';
import { FaPlus } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const MenuItem: React.FC<any> = ({
  id,
  nombre,
  descripcion,
  precio_descuento,
  image,
  categoria
}) => {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  // Imagen predeterminada si no se proporciona una imagen
  const defaultImage = 'https://via.placeholder.com/150';

  const handleCardClick = () => {
    navigate('/producto', {
      state: {
        id,
        nombre,
        descripcion,
        precio_descuento,
        image,
        categoria
      }
    });
  };

  return (
    <div
      onClick={handleCardClick}
      className="bg-white hover:rounded-xl hover:shadow cursor-pointer border-b border-gray-200 hover:bg-gray-100 p-2 transition w-full lg:max-w-72 flex items-center gap-4"
    >
      <div className="avatar">
        <div className="mask mask-squircle w-24">
          <img src={image || defaultImage} alt={nombre} />
        </div>
      </div>

      <div className="flex flex-col justify-between flex-1">
        <h3 className="text-base font-semibold text-gray-800 truncate">{nombre}</h3>
        <p className="text-sm text-gray-500 line-clamp-2">{descripcion}</p>

        <div className="flex justify-between items-center mt-3">
          <span className="text-base text-orange-600 font-bold">${parseFloat(precio_descuento).toFixed(2)}</span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              addToCart({
                id,
                nombre,
                descripcion,
                precio: precio_descuento, // Usar precio_descuento en lugar de precio
                precio_descuento,
                unidad: "kg",  // Asegúrate de definir una unidad
                image,
                categoria,
                estado: '',
                estado_descuento: '',
                fecha_creacion: '',
                fecha_actualizacion: '',
                quantity: 1  // Aquí agregamos la cantidad inicial
              });
            }}
            className="bg-[#E63946] text-white text-sm size-8 flex justify-center items-center rounded-full hover:bg-orange-600 transition"
          >
            <FaPlus />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MenuItem;
