import React, { useState } from 'react';
import { useCart } from '../../../context/CartContext';
import { BASE_URL } from '../../../utils/baseUrl';
import { FaPlus, FaMinus } from 'react-icons/fa';
import { formatNumber } from '../../../utils/formatNumber';
import { motion, AnimatePresence } from 'framer-motion';
import { useModal } from '../../../context/ModalContext'; // Asumo que aquí tienes closeModal

interface ProductModalProps {
  product: any;
}

const ProductModal: React.FC<ProductModalProps> = ({ product }) => {
  const { addToCart, cartItems } = useCart();
  const { closeModal } = useModal();
  const [quantityToAdd, setQuantityToAdd] = useState(1);
  const defaultImage = '/logo_w_fondo_negro.jpeg';

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

    setQuantityToAdd(1);
  };

  const buttonLabel = currentQuantityInCart > 0 ? 'Aumentar cantidad' : 'Agregar al carrito';

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 border-none flex shadow-none bg-transparent justify-center items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={closeModal}
      >
        <motion.div
          className="w-full max-h-[90%] bg-white rounded-3xl p-5 overflow-y-auto"
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          onClick={(e) => e.stopPropagation()} // Previene cerrar al hacer click dentro
        >


          <motion.img
            src={product.image ? `${BASE_URL}/${product.image}` : defaultImage}
            alt={product.nombre}
            className="rounded-xl mb-6 w-full object-cover h-64 sm:h-80 lg:h-96 shadow-md"
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.4 }}
          />

          <p className="text-gray-600 mb-4">{product.descripcion}</p>

          <div className="flex justify-between items-center mb-5">
            <span className="text-xl font-bold text-orange-600">
              ${formatNumber(product.precio * quantityToAdd)}
            </span>

            <div className=" items-center hidden border border-gray-300 rounded-full overflow-hidden">
              <button
                onClick={() => setQuantityToAdd(Math.max(1, quantityToAdd - 1))}
                className="px-3 py-1 text-gray-700 hover:bg-gray-200 transition"
              >
                <FaMinus />
              </button>
              <span className="px-4 font-semibold">{quantityToAdd}</span>
              <button
                onClick={() => setQuantityToAdd(quantityToAdd + 1)}
                className="px-3 py-1 text-gray-700 hover:bg-gray-200 transition"
              >
                <FaPlus />
              </button>
            </div>
          </div>

          <motion.button
            onClick={handleAddToCart}
            className="w-full bg-orange-600 hover:bg-orange-700 transition-all text-white font-bold py-3 rounded-full shadow-lg flex items-center justify-center gap-2"
            whileTap={{ scale: 0.97 }}
          >
            <FaPlus />
            <span>{buttonLabel}</span>
          </motion.button>

          {currentQuantityInCart > 0 && (
            <div className="mt-4 text-sm text-green-600 text-center">
              Ya tienes <strong>{currentQuantityInCart}</strong> en el carrito
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ProductModal;
