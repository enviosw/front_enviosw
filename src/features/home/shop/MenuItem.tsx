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
  
}) => {
  const { addToCart, cartItems } = useCart();
  const { openModal, setModalTitle, setModalContent } = useModal();

  const defaultImage = 'logo_w_fondo_negro.jpeg';

  const mostrarDescuento = precio_descuento < precio;
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
      onClick={openProductModal}
      className={`rounded-3xl shadow cursor-pointer border-b border-gray-200 p-2 transition w-full lg:max-w-72 flex items-center gap-4 ${
        isInCart ? 'bg-orange-200' : 'bg-[#F7F7F7]'
      }`}
    >
      <div className="avatar">
        <div className="mask mask-squircle bg-white w-24">
          <img src={`${BASE_URL}/${image}` || defaultImage} alt={nombre} />
        </div>
      </div>

      <div className="flex flex-col justify-between flex-1">
        <h3 className="text-base font-semibold text-gray-800 truncate">{nombre}</h3>
        <p className="text-sm text-gray-500 line-clamp-2 break-all">{descripcion}</p>

        <div className="flex justify-between items-center mt-3">
          <div className="flex flex-col">
            {mostrarDescuento ? (
              <>
               <span className="text-sm text-gray-500">
                  ${precio.toFixed(2)}
                </span>
                {/* <span className="text-sm text-gray-500 line-through">
                  ${precio.toFixed(2)}
                </span>
                <span className="text-base text-orange-600 font-bold">
                  ${precio_descuento.toFixed(2)}
                </span> */}
              </>
            ) : (
              <span className="text-base text-orange-600 font-bold">
              ${formatNumber(precio)}
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
                quantity: 1,
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
