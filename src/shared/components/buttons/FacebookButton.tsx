import React from 'react';
import { FaFacebook } from 'react-icons/fa';

interface FacebookButtonProps {
    pageId: string;
}

const FacebookButton: React.FC<FacebookButtonProps> = ({ pageId }) => {
    const facebookUrl = `https://www.facebook.com/${pageId}`;

    return (
        <a
            href={facebookUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 flex items-center justify-center bg-white rounded-full hover:bg-black transition-colors duration-300 shadow-md"
        >
            <FaFacebook size={24} className="text-black hover:text-white transition-colors duration-300" />
        </a>
    );
};

export default FacebookButton;
