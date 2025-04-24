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
            className="flex items-center gap-2 px-5 py-3 bg-white backdrop-blur-sm rounded-full text-[#1877F2] hover:bg-blue-600 hover:text-white transition-all duration-300 shadow-md"
        >
            <FaFacebook size={20} className="text-[#1877F2]" />
            <span className="font-medium text-sm">Facebook</span>
        </a>
    );
};

export default FacebookButton;
