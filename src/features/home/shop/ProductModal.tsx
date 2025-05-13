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
  const [addedToCart, setAddedToCart] = useState(false); // Nuevo estado para controlar si el producto fue agregado
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
    setAddedToCart(true); // Establece el estado a "true" cuando el producto se agrega
  };

  return (
    <div className="w-full mx-auto p-4 md:p-8">
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
        {/* Cambié el botón para que se desactive después de agregar el producto */}
        <button
          onClick={handleAddToCart}
          disabled={addedToCart} // Deshabilita el botón si el producto ya fue agregado
          className="bg-[#E63946] text-white text-sm p-3 flex justify-center items-center rounded-full hover:bg-orange-600 transition  disabled:cursor-not-allowed"
        >
          {addedToCart ? (
            <span>Producto agregado</span>
          ) : (
            <>
              <FaPlus />
              <span className="ml-2">Agregar</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default ProductModal;
