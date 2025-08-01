import React, { useState } from 'react';
import {
    FaShareAlt,
    FaWhatsapp,
    FaFacebook,
    FaTelegram,
    FaTimes
} from 'react-icons/fa';
import { SiX } from 'react-icons/si'; // nuevo logo de Twitter (X)

interface SocialShareModalButtonProps {
    message: string;
    url: string;
}

const SocialShareModalButton: React.FC<SocialShareModalButtonProps> = ({ message, url }) => {
    const [open, setOpen] = useState(false);

    const encodedMessage = encodeURIComponent(message);
    const encodedUrl = encodeURIComponent(url);

    const shareUrls: Record<string, string> = {
        whatsapp: `https://wa.me/?text=${encodedMessage}%20${encodedUrl}`,
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
        telegram: `https://t.me/share/url?url=${encodedUrl}&text=${encodedMessage}`,
        twitter: `https://twitter.com/intent/tweet?text=${encodedMessage}%20${encodedUrl}`,
    };

    const handleShare = (platform: keyof typeof shareUrls) => {
        window.open(shareUrls[platform], '_blank');
        setOpen(false);
    };

    return (
        <>
            {/* Botón de abrir modal */}
            <button
                onClick={() => setOpen(true)}
                className="w-9 h-9 flex items-center cursor-pointer justify-center bg-white text-gray-800 rounded-full hover:bg-gray-200 transition-colors duration-300 shadow-md"
                aria-label="Compartir"
            >
                <FaShareAlt size={18} />
            </button>

            {/* DaisyUI Modal */}
            {open && (
                <dialog className="modal modal-open z-50">
                    <div className="modal-box text-center rounded-xl relative">

                     
                            <button onClick={() => setOpen(false)} className="text-red-500 btn btn-circle right-2 absolute top-2">
                                <FaTimes />
                            </button>
                  
                        <h3 className="font-bold text-xl mb-6 text-gray-800">Compartir con</h3>

                        {/* Íconos con fondo y tamaño grande */}
                        <div className="flex justify-center gap-6 flex-wrap">
                            <button
                                onClick={() => handleShare('whatsapp')}
                                className="bg-green-500 hover:bg-green-600 cursor-pointer text-white p-2 rounded-full shadow-lg transition"
                                title="WhatsApp"
                            >
                                <FaWhatsapp size={28} />
                            </button>

                            <button
                                onClick={() => handleShare('facebook')}
                                className="bg-blue-600 hover:bg-blue-700 cursor-pointer text-white p-2 rounded-full shadow-lg transition"
                                title="Facebook"
                            >
                                <FaFacebook size={28} />
                            </button>

                            <button
                                onClick={() => handleShare('telegram')}
                                className="bg-sky-500 hover:bg-sky-600 cursor-pointer text-white p-2 rounded-full shadow-lg transition"
                                title="Telegram"
                            >
                                <FaTelegram size={28} />
                            </button>

                            <button
                                onClick={() => handleShare('twitter')}
                                className="bg-blue-400 hover:bg-blue-500 cursor-pointer text-white p-2 rounded-full shadow-lg transition"
                                title="Twitter"
                            >
                                <SiX size={28} />
                            </button>
                        </div>


                        <div className='mt-5'>
                            <a className='text-primary font-bold ' href="https://domiciliosw.com">Domicilios W Pitalito</a>
                        </div>


                    </div>
                </dialog>
            )}
        </>
    );
};

export default SocialShareModalButton;
