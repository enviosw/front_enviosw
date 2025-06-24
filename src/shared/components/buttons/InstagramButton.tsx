import React from 'react';
import { FaInstagram } from 'react-icons/fa';

interface InstagramButtonProps {
    username: string;
}

const InstagramButton: React.FC<InstagramButtonProps> = ({ username }) => {
    const instagramUrl = `https://www.instagram.com/${username}`;

    return (
        <a
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 flex items-center justify-center bg-white rounded-full hover:bg-black transition-colors duration-300 shadow-md"
        >
            <FaInstagram size={24} className="text-black hover:text-white transition-colors duration-300" />
        </a>
    );
};

export default InstagramButton;
