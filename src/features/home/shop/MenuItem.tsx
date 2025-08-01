import React from 'react';
import { useCart } from '../../../context/CartContext';
import { FaPlus } from 'react-icons/fa';
import { BASE_URL } from '../../../utils/baseUrl';
import { useModal } from '../../../context/ModalContext';
import ProductModal from './ProductModal';
import { formatNumber } from '../../../utils/formatNumber';

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
  onAddToCartSuccess,
}) => {
  const { addToCart, cartItems } = useCart();
  const { openModal, setModalTitle, setModalContent } = useModal();

  const defaultImage = '/logo_w_fondo_negro.jpeg';
  const isInCart = cartItems.some(item => item.id === id);

  const openProductModal = () => {
    setModalTitle(nombre);
    setModalContent(
      <ProductModal
        product={{
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
        }}
      />
    );
    openModal();
  };

  return (
    <div
      className={`
        rounded-2xl shadow-md cursor-pointer p-3 transition w-full lg:max-w-72 flex items-center gap-4 
        ${isInCart
          ? 'bg-orange-100 border-2 border-orange-500 shadow-md'
          : 'bg-white border border-gray-200 hover:shadow-lg hover:border-orange-300'}
      `}
    >
      {/* Imagen del producto */}
      <div
        onClick={openProductModal}
        className="w-24 h-24 rounded-xl overflow-hidden border border-gray-200 bg-white hover:scale-105 transition-transform duration-200"
      >
        <img
          src={image ? `${BASE_URL}/${image}` : defaultImage}
          alt={nombre}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Contenido del producto */}
      <div className="flex flex-col justify-between flex-1 overflow-hidden">
        <h3 className="text-base font-semibold text-gray-900 truncate">{nombre}</h3>
        <p className="text-sm text-gray-600 line-clamp-2">{descripcion}</p>

        <div className="flex justify-between items-center mt-3">
          <span className="text-base font-bold text-orange-600">
            ${formatNumber(precio)}
          </span>

          <button
            onClick={(e) => {
              e.stopPropagation();
              if (!isInCart) {
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
                  quantity: 1,
                });

                onAddToCartSuccess?.(`¡${nombre} añadido al carrito!`);
              }
            }}
            className="size-10 flex justify-center items-center rounded-full text-white bg-orange-500 hover:bg-orange-600 transition disabled:opacity-60 disabled:cursor-not-allowed"
            disabled={isInCart}
          >
            <FaPlus size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MenuItem;
