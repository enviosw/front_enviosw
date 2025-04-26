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
            className="flex items-center gap-2 px-5 py-3 bg-white backdrop-blur-sm rounded-full text-pink-500 hover:bg-pink-600 hover:text-white transition-all duration-300 shadow-md"
        >
            <FaInstagram size={20} className="text-pink-500" />
            <span className="font-medium text-sm">Instagram</span>
        </a>
    );
};

export default InstagramButton;
