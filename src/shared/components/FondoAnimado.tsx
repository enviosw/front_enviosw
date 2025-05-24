import { useEffect, useRef } from "react";

declare global {
    interface Window {
        VANTA: any;
        THREE: any;
    }
}

const FondoAnimado = () => {
    const vantaRef = useRef(null);
    const vantaEffect = useRef<any>(null);

    useEffect(() => {
        const tryInitializeVanta = () => {
            if (window.VANTA && window.THREE && !vantaEffect.current) {
                vantaEffect.current = window.VANTA.NET({
                    el: vantaRef.current,
                    mouseControls: true,
                    touchControls: true,
                    gyroControls: false,
                    minHeight: 200.0,
                    minWidth: 200.0,
                    scale: 1.0,
                    scaleMobile: 1.0,
                    color: 0xff6a00, // nuevo tono de naranja más brillante
                    backgroundColor: 0x000000, // fondo negro

                });
            }
        };

        const interval = setInterval(() => {
            if (window.VANTA && window.THREE) {
                tryInitializeVanta();
                clearInterval(interval);
            }
        }, 100);

        return () => {
            if (vantaEffect.current) vantaEffect.current.destroy();
            clearInterval(interval);
        };
    }, []);

    return <div ref={vantaRef} className="absolute z-10 inset-0 opacity-50 w-full h-full hidden lg:flex" />;
};

export default FondoAnimado;
