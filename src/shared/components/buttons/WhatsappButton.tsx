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
            className="flex items-center gap-2 px-5 py-3 bg-white backdrop-blur-xl rounded-full hover:text-white hover:bg-green-500 text-[#25D366] transition-all duration-300 shadow-md"
        >
            <FaWhatsapp size={20} className="text-green-600" />
            <span className="font-medium text-sm">WhatsApp</span>
        </a>
    );
};

export default WhatsappButton;
