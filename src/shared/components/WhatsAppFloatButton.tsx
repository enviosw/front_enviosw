import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';

const WhatsAppFloatButton: React.FC = () => {
    const numeroWhatsApp = '3171530428'; // Cambia por el número real del negocio
    const mensaje = "¡Hola! Me gustaría solicitar el servicio con las siguientes especificaciones:"; // Personaliza el mensaje si es necesario
    const url = `https://wa.me/57${numeroWhatsApp}?text=${encodeURIComponent(mensaje)}`;

    return (
        <a
            href={url}
            target="_blank"
            rel="noreferrer noopener"
            aria-label="Contactar por WhatsApp"
            className="
                fixed bottom-5 right-5 z-50
                inline-flex items-center justify-center
                w-14 h-14 rounded-full
                bg-[#25D366]
                shadow-[0_6px_24px_rgba(37,211,102,0.5)]
                hover:shadow-[0_8px_32px_rgba(37,211,102,0.65)]
                hover:scale-110 active:scale-95
                transition-all duration-300 ease-in-out
                focus:outline-none focus:ring-2 focus:ring-[#25D366]/60 focus:ring-offset-2
            "
        >
            {/* Pulso externo */}
            <div className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-40" />
            {/* Ícono */}
            <div className="relative z-10">
                <FaWhatsapp size={26} color="#fff" />
            </div>
        </a>
    );
};

export default WhatsAppFloatButton;