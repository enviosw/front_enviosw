import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';

interface WhatsappButtonProps {
    phoneNumber: string;
    message: string;
    color?: string
    text?: string
}

const WhatsappButton: React.FC<WhatsappButtonProps> = ({ phoneNumber, message, color="bg-white", text="text-black" }) => {
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    return (
        <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`w-9 h-9 flex items-center justify-center ${color} rounded-full hover:bg-black transition-colors duration-300 shadow-md`}
        >
            <FaWhatsapp size={24} className={`hover:text-white transition-colors duration-300hover:text-white  duration-300 ${text}`} />
        </a>
    );
};

export default WhatsappButton;
