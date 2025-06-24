import React from "react";

interface PrimaryButtonProps {
  text: string;
  onClick?: () => void;
  // Puedes añadir más props si lo necesitas, como 'disabled?: boolean;'
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({ text, onClick }) => {
  return (
    <button
      onClick={onClick}
      // Estilo inspirado en Rappi: un naranja vibrante, sombra sutil y transiciones fluidas.
      // Puedes cambiar 'bg-[#FF5722]' (un naranja rojizo) por el color principal de tu marca.
      className="bg-[#FF5722] w-full lg:w-auto text-white font-semibold py-2 px-1 rounded-xl shadow-lg
                 hover:bg-[#E64A19] hover:shadow-xl
                 focus:outline-none focus:ring-4 focus:ring-[#FF5722] focus:ring-opacity-50
                 active:scale-98 transform transition-all duration-200 ease-in-out"
    >
      {text}
    </button>
  );
};

export default PrimaryButton;