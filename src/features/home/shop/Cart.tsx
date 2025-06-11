import React, { useState } from 'react';
import { useCart } from '../../../context/CartContext';
import { FaPlus, FaMinus, FaTrash, FaTimes, FaShoppingCart } from 'react-icons/fa';
import { BASE_URL } from '../../../utils/baseUrl';
import { useComercioId } from '../../../utils/obtenerComercio';
import { formatNumber } from '../../../utils/formatNumber';
import { useComercioIdent } from '../../../services/comerciosService';

const Cart: React.FC = () => {
    const { cartItems, increment, decrement, removeFromCart, total, clearCart } = useCart(); // Asegurarse de que clearCart esté disponible
    const [direccion, setDireccion] = useState('');
    const [telefono, setTelefono] = useState(''); // Campo para teléfono
    const comercioId = useComercioId();
    // Calcular el total de productos en el carrito

    const { data: comercio } = useComercioIdent(Number(comercioId));
    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    const handleWhatsAppOrder = () => {
        const numeroWhatsApp = comercio?.activar_numero === 1
            ? comercio?.telefono_secundario
            : comercio?.telefono;
        const productos = cartItems
            .map(item => `• ${item.quantity}x ${item.nombre} - $${(parseFloat(item.precio_descuento) * item.quantity).toFixed(2)}`)
            .join('%0A');

        const mensaje = `¡Hola! 👋 Me gustaría hacer un pedido de ${comercio?.nombre_comercial} con los siguientes productos:%0A%0A${productos}%0A%0A🔸 Total: $${total.toFixed(2)} %2B domicilio%0A📍 Dirección de envío: ${direccion}%0A${telefono ? `📞 Teléfono: ${telefono}` : ''
            }%0A%0A¿Me puedes confirmar si todo está bien? ¡Gracias! 🙌`;

        const url = `https://wa.me/57${numeroWhatsApp}?text=${mensaje}`;

        if (comercioId) {
            localStorage.removeItem(`cart_${comercioId}`);
        }

        window.open(url, '_blank');
    };

    // Actualiza el estado y el localStorage al limpiar el carrito
    const handleClearCart = () => {
        if (comercioId) {
            localStorage.removeItem(`cart_${comercioId}`);
        }
        clearCart(); // Vacía el carrito en el contexto de React
    };

    const defaultImage = 'logo_w_fondo_negro.jpeg';

    return (
        <div className="drawer drawer-end z-50">
            <input id="cart-drawer" type="checkbox" className="drawer-toggle" />

            {/* Botón flotante con número de productos */}
            <div className="drawer-content">
                <label
                    htmlFor="cart-drawer"
                    className="relative flex items-center size-12 justify-center bg-white backdrop-blur-xl rounded-full text-[#25D366] hover:bg-green-500 hover:text-white transition-all duration-300 shadow-md"
                >
                    <FaShoppingCart size={25} className="text-xl text-red-500 hover:text-red-500 transition" />
                    {totalItems > 0 && (
                        <span className="absolute top-0 right-0 flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full">
                            {totalItems}
                        </span>
                    )}
                </label>
            </div>

            {/* Drawer lateral */}
            <div className="drawer-side">
                <label htmlFor="cart-drawer" aria-label="close sidebar" className="drawer-overlay" />

                <div className="bg-white text-base-content min-h-full w-full md:w-96 p-6 flex flex-col justify-between shadow-lg">
                    <div>
                        {/* Título y cerrar */}
                        <div className="flex items-center justify-between mb-6">
                            <h4 className="text-3xl font-bold text-gray-800">🛍️ Tu carrito de {comercio?.nombre_comercial}</h4>
                            <label htmlFor="cart-drawer" className="cursor-pointer">
                                <FaTimes className="text-xl text-gray-500 hover:text-red-500 transition" />
                            </label>
                        </div>

                        {/* Contenido del carrito */}
                        {cartItems.length === 0 ? (
                            <p className="text-gray-500">Tu carrito está vacío.</p>
                        ) : (
                            <div className="space-y-4">
                                {cartItems.map(item => (
                                    <div key={item.id} className="flex items-start gap-3 border-b pb-4">
                                        <img
                                            src={`${BASE_URL}/${item.image}` || defaultImage}
                                            alt={item.nombre}
                                            className="w-16 h-16 object-cover rounded-md border"
                                        />
                                        <div className="flex-1">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <h4 className="text-lg font-semibold text-gray-800">{item.nombre}</h4>
                                                    <p className="text-sm text-gray-500 mt-1">
                                                        {formatNumber((parseFloat(item.precio || '0') * item.quantity))}
                                                    </p>
                                                </div>
                                                <button
                                                    onClick={() => removeFromCart(Number(item.id))} // Usando id en lugar de name
                                                    className="text-red-500 hover:text-red-600"
                                                >
                                                    <FaTrash className="text-base" />
                                                </button>
                                            </div>
                                            <div className="flex items-center gap-2 mt-3">
                                                <button
                                                    onClick={() => decrement(Number(item.id))} // Usando id en lugar de name
                                                    className="p-1 bg-gray-200 rounded-full hover:bg-gray-300"
                                                >
                                                    <FaMinus />
                                                </button>
                                                <span className="font-medium">{item.quantity}</span>
                                                <button
                                                    onClick={() => increment(Number(item.id))} // Usando id en lugar de name
                                                    className="p-1 bg-gray-200 rounded-full hover:bg-gray-300"
                                                >
                                                    <FaPlus />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Footer */}
                    <div className="mt-6 pt-4  mb-10 lg:mb-0">
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-xl font-bold">Total:</span>
                            <span className="text-2xl font-extrabold text-orange-600">
                                ${formatNumber(total)}
                            </span>
                        </div>

                        {/* Input de Dirección */}
                        <div className="mb-4">
                            <label htmlFor="direccion" className="block text-sm font-medium text-gray-700 mb-1">
                                Dirección de envío
                            </label>
                            <input
                                type="text"
                                id="direccion"
                                name="direccion"
                                value={direccion}
                                onChange={e => setDireccion(e.target.value)}
                                placeholder="Ej: Calle 123 #45-67"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                            />
                        </div>

                        {/* Input de Teléfono (opcional) */}
                        <div className="mb-4">
                            <label htmlFor="telefono" className="block text-sm font-medium text-gray-700 mb-1">
                                Teléfono (opcional)
                            </label>
                            <input
                                type="text"
                                id="telefono"
                                name="telefono"
                                value={telefono}
                                onChange={e => setTelefono(e.target.value)}
                                placeholder="Ej: 3001234567"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                            />
                        </div>

                        <button
                            disabled={cartItems.length === 0 || !direccion}
                            onClick={handleWhatsAppOrder}
                            className="w-full bg-success text-white py-3 rounded-xl font-semibold text-lg hover:bg-green-700 transition"
                        >
                            Finalizar pedido por WhatsApp
                        </button>

                        {/* Botón para limpiar el carrito */}
                        <button
                            onClick={handleClearCart} // Función para limpiar el carrito
                            className="mt-4 w-full bg-error text-white py-3 rounded-xl font-semibold text-lg hover:bg-red-700 transition"
                        >
                            Vaciar carrito
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;