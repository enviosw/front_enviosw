import React from 'react';
import { useCart } from '../../../context/CartContext';
import { FaPlus } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../../utils/baseUrl';

const MenuItem: React.FC<any> = ({
  id,
  nombre,
  descripcion,
  precio,
  precio_descuento,
  unidad,
  image,
  categoria,
  estado,
  estado_descuento,
  fecha_creacion,
  fecha_actualizacion,
  comercioId
}) => {
  const { addToCart, cartItems } = useCart();
  const navigate = useNavigate();

  const defaultImage = 'logo_w_fondo_negro.jpeg';

  const handleCardClick = () => {
    navigate(`/comercio/${comercioId}/producto/${id}`, {
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

  const mostrarDescuento = precio_descuento < precio;

  // Verifica si el producto está en el carrito
  const isInCart = cartItems.some(item => item.id === id);

  return (
    <div
      onClick={handleCardClick}
      className={`rounded-xl shadow cursor-pointer border-b border-gray-200 p-2 transition w-full lg:max-w-72 flex items-center gap-4 ${
        isInCart ? 'bg-orange-200' : 'bg-[#F7F7F7]' // Cambia el color si está en el carrito
      }`}
    >
      <div className="avatar">
        <div className="mask mask-squircle w-24">
          <img src={`${BASE_URL}/${image}` || defaultImage} alt={nombre} />
        </div>
      </div>

      <div className="flex flex-col justify-between flex-1">
        <h3 className="text-base font-semibold text-gray-800 truncate">{nombre}</h3>
        <p className="text-sm text-gray-500 line-clamp-2">{descripcion}</p>

        <div className="flex justify-between items-center mt-3">
          <div className="flex flex-col">
            {mostrarDescuento ? (
              <>
                <span className="text-sm text-gray-500 line-through">
                  ${precio.toFixed(2)}
                </span>
                <span className="text-base text-orange-600 font-bold">
                  ${precio_descuento.toFixed(2)}
                </span>
              </>
            ) : (
              <span className="text-base text-orange-600 font-bold">
                ${precio.toFixed(2)}
              </span>
            )}
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              addToCart({
                id,
                nombre,
                descripcion,
                precio,
                precio_descuento,
                unidad,
                image,
                categoria,
                estado,
                estado_descuento,
                fecha_creacion,
                fecha_actualizacion,
                quantity: 1
              });
            }}
            className="bg-[#E63946] cursor-pointer text-white text-sm size-10 flex justify-center items-center rounded-full hover:bg-orange-600 transition"
          >
            <FaPlus size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MenuItem;
