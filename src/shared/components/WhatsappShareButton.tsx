import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';

interface WhatsappShareIconButtonProps {
  message: string;
  color?: string;
  text?: string;
}

const WhatsappShareIconButton: React.FC<WhatsappShareIconButtonProps> = ({
  message,
  color = "bg-success",
  text = "text-white"
}) => {
  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`w-9 h-9 flex items-center justify-center ${color} rounded-full hover:bg-green-600 transition-colors duration-300 shadow-md`}
    >
      <FaWhatsapp size={20} className={`transition-colors duration-300 ${text} hover:text-white`} />
    </a>
  );
};

export default WhatsappShareIconButton;
