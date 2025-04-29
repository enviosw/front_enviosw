import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';

const WhatsAppFloatButton: React.FC = () => {
    const numeroWhatsApp = '3232205900'; // Cambia por el número real del negocio
    const mensaje = "¡Hola! Me gustaría solicitar el servicio con las siguientes especificaciones:"; // Personaliza el mensaje si es necesario
    const url = `https://wa.me/57${numeroWhatsApp}?text=${encodeURIComponent(mensaje)}`;

    return (
        <a
            href={url}
            target="_blank"
            rel="noreferrer noopener"
            className="fixed bottom-4 right-4 z-50 inline-flex items-center justify-center w-14 h-14 rounded-full bg-[#25d366]"
        >
            <div className="absolute z-10 top-0 left-0 w-full h-full rounded-full bg-[#25d366] animate-ping"></div>
            <div className="relative z-20">
                <FaWhatsapp size={24} color="#fff" />
            </div>
        </a>
    );
};

export default WhatsAppFloatButton;