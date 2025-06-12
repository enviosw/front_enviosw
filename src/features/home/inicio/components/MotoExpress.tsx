import React, { useEffect, useRef, useState, Suspense } from 'react';
import Loading from '../../../../utils/Loading';

const MotoExpressContent: React.FC = () => (
    <section className="w-full relative overflow-hidden px-6 my-10">
        <div className="flex items-center justify-center h-full gap-6 flex-wrap">
            <picture>
                <source srcSet="motoexpress.png" type="image/png" />
                <img
                    src="motoexpress.png"
                    alt="Moto Express - Domicilios rápidos en Pitalito"
                    width="640"
                    height="480"
                    loading="lazy"
                />
            </picture>
            <div className="flex flex-col justify-center items-start text-left">
                <h2 className="text-gray-800 text-3xl md:text-5xl font-bold mb-4">
                    ¡Tu Aliado en Domicilios Rápidos y Seguros!
                </h2>
                <p className="text-gray-600 text-sm md:text-lg mb-6 max-w-md">
                    ¿Tienes hambre? ¿Necesitas hacer compras? ¿Enviar productos o realizar trámites? ¡Haz tu pedido y recíbelo rápido y seguro!
                </p>
                <button
                    aria-label="Realiza tu pedido ahora"
                    className="bg-orange-600 text-white font-semibold py-3 px-5 rounded-full hover:bg-orange-700 transition duration-300 shadow-lg transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-orange-400"
                >
                    ¡Haz tu Pedido Ahora!
                </button>
            </div>
        </div>
    </section>
);

const MotoExpress: React.FC = () => {
    const ref = useRef<HTMLDivElement | null>(null);
    const [show, setShow] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setShow(true);
                observer.disconnect();
            }
        }, { threshold: 0.1 });

        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    return (
        <div ref={ref}>
            {show && (
                <Suspense fallback={<Loading />}>
                    <MotoExpressContent />
                </Suspense>
            )}
        </div>
    );
};

export default MotoExpress;
