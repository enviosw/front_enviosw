import React from "react";

interface SecondaryButtonProps {
    text: string;
    onClick?: () => void;
}

const SecondaryButton: React.FC<SecondaryButtonProps> = ({ text, onClick }) => {
    return (
        <button
            onClick={onClick}
            className="bg-white w-full lg:w-auto hover:bg-gray-100 text-gray-500 font-semibold py-2.5 px-6 rounded-md shadow-md transition duration-300"
        >
            {text}
        </button>
    );
};

export default SecondaryButton;
