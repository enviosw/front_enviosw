import React, { useEffect, useState } from "react";

interface ToastProps {
    message: string;
    type?: "info" | "success" | "error" | "warning";
    duration?: number;
}

const Toast: React.FC<ToastProps> = ({ message, type = "info", duration = 3000 }) => {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setVisible(false);
        }, duration);

        return () => clearTimeout(timer);
    }, [duration]);

    if (!visible) return null;

    return (
        <div className="toast toast-bottom toast-end z-50 px-4">
            <div
                className={`
                    alert alert-${type} shadow-lg 
                    transition-all duration-500 animate-fade-in 
                    max-w-sm sm:max-w-md md:max-w-lg 
                    whitespace-normal break-words text-lg
                     bg-black/80 border-none text-white 
                `}
            >
                <span>{message}</span>
            </div>
        </div>
    );
};

export default Toast;
