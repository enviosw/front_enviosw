import React, { useState } from 'react';
import { useCart } from '../../../context/CartContext';
import { BASE_URL } from '../../../utils/baseUrl';
import { FaPlus } from 'react-icons/fa';
import { formatNumber } from '../../../utils/formatNumber';

interface ProductModalProps {
  product: any;
}

const ProductModal: React.FC<ProductModalProps> = ({ product }) => {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const defaultImage = 'logo_w_fondo_negro.jpeg';

  const handleAddToCart = () => {
    addToCart({
      ...product,
      precio_descuento: (product.precio_descuento * quantity).toString(),
      precio: (product.precio_descuento * quantity).toString(),
      unidad: 'Unidad',
      estado: 'Activo',
      quantity,
    });
  };

  return (
    <div className="max-w-xl mx-auto p-4 md:p-8">
      <img
        src={`${BASE_URL}/${product.image}` || defaultImage}
        alt={product.nombre}
        className="rounded-lg mb-4 w-full object-cover h-64 sm:h-80 lg:h-96"
      />

      <h1 className="text-2xl font-bold mb-4 text-center">{product.nombre}</h1>
      <p className="text-gray-700 mb-2">{product.descripcion}</p>

      <div className="flex justify-between items-center">
        <span className="text-lg font-bold text-orange-600">
          ${formatNumber(product.precio * quantity)}
        </span>
        {/* <span className="text-sm text-gray-500 line-through">
          ${(product.precio_descuento * 1.14).toFixed(2)}
        </span> */}
      </div>

      <div className="mt-4 flex justify-between items-center">
        <div className="flex items-center">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="px-4 py-2 border rounded-lg"
          >
            -
          </button>
          <span className="mx-4">{quantity}</span>
          <button
            onClick={() => setQuantity(quantity + 1)}
            className="px-4 py-2 border rounded-lg"
          >
            +
          </button>
        </div>
        <button
          onClick={handleAddToCart}
          className="bg-[#E63946] text-white text-sm p-3 flex justify-center items-center rounded-full hover:bg-orange-600 transition"
        >
          <FaPlus />
          <span className="ml-2">Agregar</span>
        </button>
      </div>
    </div>
  );
};

export default ProductModal;
