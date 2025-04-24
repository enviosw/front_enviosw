import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { FaPlus } from 'react-icons/fa';
import Cart from '../../components/Cart';

const ProductPage: React.FC = () => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const [quantity, setQuantity] = useState(1);

    if (!state) {
        return (
            <div className="text-center p-6">
                <p className="text-red-600">❌ Producto no encontrado.</p>
                <button
                    onClick={() => navigate('/')}
                    className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
                >
                    Volver al menú
                </button>
            </div>
        );
    }

    const { name, description, price, image } = state;

    const handleAddToCart = () => {
        addToCart({
            name,
            description,
            price: price * quantity, // Multiply price by quantity
            image
        });
    };

    return (
        <div className="max-w-xl mx-auto p-4 md:p-8 bg-white shadow-lg rounded-lg">
            {/* Product Image */}
            <img
                src={image}
                alt={name}
                className="rounded-lg mb-4 w-full object-cover h-64 sm:h-80 lg:h-96"
            />

            {/* Product Name */}
            <h1 className="text-2xl font-bold mb-4 text-center">{name}</h1>

            {/* Product Description */}
            <p className="text-gray-700 mb-2">{description}</p>

            {/* Price */}
            <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-orange-600">${(price * quantity).toFixed(2)}</span>
                <span className="text-sm text-gray-500 line-through">${(price * 1.14).toFixed(2)}</span>
            </div>

            {/* Quantity Selector */}
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

            {/* WhatsApp Button */}
            <div className='fixed bottom-10 right-10'>
                <Cart />
            </div>
        </div>
    );
};

export default ProductPage;
