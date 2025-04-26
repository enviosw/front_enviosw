import React from 'react';
import { FaPhoneAlt, FaClock, FaMapMarkerAlt } from 'react-icons/fa';

const Topbar: React.FC = () => {
    return (
        <div className="w-full h-8 bg-[#ffffff] text-black text-xs hidden lg:flex items-center justify-between px-1 lg:px-4 shadow-sm">
            <div className="flex items-center gap-2">
                <FaClock className="text-white" size={12} />
                <span>Entrega en menos de 30 min</span>
            </div>

            <div className="hidden sm:flex items-center gap-2">

            </div>

            <div className="flex items-center gap-2">
                <FaMapMarkerAlt className="text-black" size={12} />
                <span>Bogotá D.C.</span>

                <FaPhoneAlt className="text-black" size={12} />
                <span>+57 300 123 4567</span>
            </div>
        </div>
    );
};

export default Topbar;
