import React, { useState } from 'react';
import { useCart } from '../../../context/CartContext';
import { BASE_URL } from '../../../utils/baseUrl';
import { FaPlus } from 'react-icons/fa';
import { formatNumber } from '../../../utils/formatNumber';

interface ProductModalProps {
  product: any;
}

const ProductModal: React.FC<ProductModalProps> = ({ product }) => {
  const { addToCart, cartItems } = useCart();
  const [quantityToAdd, setQuantityToAdd] = useState(1);
  const defaultImage = 'logo_w_fondo_negro.jpeg';

  // Verificar si ya está en el carrito
  const cartItem = cartItems.find(item => item.id === product.id);
  const currentQuantityInCart = cartItem ? cartItem.quantity : 0;

  const handleAddToCart = () => {
    const newQuantity = currentQuantityInCart + quantityToAdd;

    addToCart({
      ...product,
      precio_descuento: (product.precio_descuento * newQuantity).toString(),
      precio: (product.precio_descuento * newQuantity).toString(),
      unidad: 'Unidad',
      estado: 'Activo',
      quantity: newQuantity,
    });

    setQuantityToAdd(1); // Reinicia la cantidad a agregar para futuras veces
  };

        const buttonLabel = currentQuantityInCart > 0 ? 'Aumentar Cantidad' : 'Agregar';


  return (
    <div className="w-full mx-auto p-4 md:p-8">
      <img
        src={product.image ? `${BASE_URL}/${product.image}` : defaultImage}
        alt={product.nombre}
        className="rounded-lg mb-4 w-full object-cover h-64 sm:h-80 lg:h-96"
      />

      <h1 className="text-2xl font-bold mb-4 text-center">{product.nombre}</h1>
      <p className="text-gray-700 mb-2">{product.descripcion}</p>

      <div className="flex justify-between items-center">
        <span className="text-lg font-bold text-orange-600">
          ${formatNumber(product.precio * quantityToAdd)}
        </span>
      </div>

      <div className="mt-4 flex justify-end items-center">
        {/* <div className="flex items-center">
          <button
            onClick={() => setQuantityToAdd(Math.max(1, quantityToAdd - 1))}
            className="px-4 py-2 border rounded-lg"
          >
            -
          </button>
          <span className="mx-4">{quantityToAdd}</span>
          <button
            onClick={() => setQuantityToAdd(quantityToAdd + 1)}
            className="px-4 py-2 border rounded-lg"
          >
            +
          </button>
        </div>
         */}


        <button
          onClick={handleAddToCart}
          className="bg-[#E63946] text-white text-sm p-3 flex justify-center items-center rounded-full hover:bg-orange-600 transition"
        >
          <FaPlus />
          <span className="ml-2">{buttonLabel}</span>
        </button>

      </div>

      {/* Mostrar cuántas unidades ya hay en el carrito */}
      {currentQuantityInCart > 0 && (
        <div className="mt-2 text-sm text-green-600 text-center">
          Ya tienes {currentQuantityInCart} en el carrito
        </div>
      )}
    </div>
  );
};

export default ProductModal;
