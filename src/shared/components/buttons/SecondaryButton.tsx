import React from "react";

interface SecondaryButtonProps {
  text: string;
  onClick?: () => void;
}

const SecondaryButton: React.FC<SecondaryButtonProps> = ({ text, onClick }) => {
  return (
    <button
      onClick={onClick}
      // Estilo de botón secundario Rappi: fondo transparente, borde sutil y texto prominente.
      className="bg-white border border-gray-300 w-full lg:w-auto text-gray-700 font-semibold py-2 px-1 rounded-xl shadow-sm
                 hover:bg-gray-50 hover:border-gray-400 hover:text-gray-800
                 focus:outline-none focus:ring-4 focus:ring-gray-200 focus:ring-opacity-75
                 active:scale-98 transform transition-all duration-200 ease-in-out"
    >
      {text}
    </button>
  );
};

export default SecondaryButton;