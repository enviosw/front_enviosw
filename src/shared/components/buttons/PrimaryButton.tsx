import React from "react";

interface PrimaryButtonProps {
    text: string;
    onClick?: () => void;
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({ text, onClick }) => {
    return (
        <button
            onClick={onClick}
            className="bg-primary w-full lg:w-auto hover:bg-[#fb8c00] text-white font-semibold py-2.5 px-6 rounded-md shadow-md transition duration-300"
        >
            {text}
        </button>
    );
};

export default PrimaryButton;
