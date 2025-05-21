import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';

interface WhatsappButtonProps {
    phoneNumber: string;
    message: string;
}

const WhatsappButton: React.FC<WhatsappButtonProps> = ({ phoneNumber, message }) => {
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    return (
        <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 flex items-center justify-center bg-white rounded-full hover:bg-black transition-colors duration-300 shadow-md"
        >
            <FaWhatsapp size={24} className="text-black hover:text-white transition-colors duration-300" />
        </a>
    );
};

export default WhatsappButton;
