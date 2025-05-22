import React, { useEffect, useRef, useState } from 'react';
import { Animate } from 'react-simple-animate';
import ContactoInfo from '../../features/home/inicio/ContactoInfo';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import PrimaryButton from './buttons/PrimaryButton';
import SecondaryButton from './buttons/SecondaryButton';
import Toast from '../../utils/Toast';
import FondoAnimado from './FondoAnimado';

const Slider2: React.FC = () => {
    const slides = [
        {
            content: (
                <div className="relative w-full h-[50vh] lg:h-[60vh] bg-[#000000] lg:pt-12 flex items-end lg:items-center justify-between px-6 md:px-16 py-8 overflow-hidden">
                    {/* Imagen de fondo */}

                    <FondoAnimado />
                    {/* <div
                        className="absolute inset- bg-cover bg-center z-10 opacity-10"
                        style={{ backgroundImage: 'url(ciudad.jpg)' }}
                    ></div> */}

                    {/* Capa oscura */}
                    {/* <div className="absolute inset-0 bg-black opacity-80 z-0"></div> */}

                    <div className="flex w-[100%] lg:w-[85%] mx-auto z-30" >
                        {/* Contenido principal */}
                        <div className="flex-1 flex flex-col justify-center space-y-4 text-left">
                            <Animate
                                play
                                duration={1.5}
                                delay={0.3}
                                start={{ opacity: 0, transform: "translateY(20px)" }}
                                end={{ opacity: 1, transform: "translateY(0px)" }}
                            >
                                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-sans font-bold uppercase text-white leading-tight flex flex-col space-y-1">
                                    <span>¡Domicilios</span>
                                    <span>Rápidos en <br className='hidden lg:flex' /> Pitalito!</span>
                                </h1>
                            </Animate>

                            <Animate
                                play
                                duration={1.5}
                                delay={0.6}
                                start={{ opacity: 0, transform: "translateY(20px)" }}
                                end={{ opacity: 1, transform: "translateY(0px)" }}
                            >
                                <p className="text-lg sm:text-lg md:text-xl text-white font-light leading-relaxed">
                                    ¿Necesitas un{" "}
                                    <span className="text-primary font-semibold">
                                        domicilio rápido y seguro
                                    </span>{" "}
                                    en Pitalito? Con{" "}
                                    <span className="text-primary font-semibold">Domicilios W</span>,<br />
                                    enviamos tus compras, comida y más a tu puerta.
                                </p>
                            </Animate>

                            <div className="flex gap-4 mt-4 z-10">
                                <PrimaryButton text="Hacer Pedido" onClick={() => handleAction('pedido')} />
                                <SecondaryButton text="Ver Comercios" onClick={() => handleAction('comercio')} />
                            </div>
                        </div>
                    </div >
                    <img
                        loading="lazy"
                        className="top-5 absolute w-[40%] hidden lg:flex right-32 z-30"
                        src="persona.png"
                        alt="Servicio de Domicilios en Pitalito"
                    />

                    {/* Información de contacto */}
                    <div className="absolute hidden lg:flex right-0 lg:right-5 bottom-7 z-30">
                        <ContactoInfo />
                    </div>
                </div >

            ),
        },
        {
            content: (
                <div className="relative w-full h-[40vh] bg-emerald-500 lg:pt-12 flex flex-col md:flex-row items-center justify-between px-6 md:px-16 py-8 overflow-hidden">
                    <div className="flex w-[100%] lg:w-[85%] mx-auto relative">
                        <div className="w-full flex flex-col justify-center items-start text-left space-y-2 lg:space-y-3 relative z-10">
                            <Animate play duration={1.5} delay={0.3} start={{ opacity: 0, transform: 'translateY(20px)' }} end={{ opacity: 1, transform: 'translateY(0px)' }}>
                                <h2 className="text-2xl text-style sm:text-3xl md:text-4xl lg:text-5xl font-sans font-bold uppercase text-white text-left leading-tight mb-2">
                                    <span className="text-white">Antojos y Más,</span> <span className="text-[#fff] rounded-4xl bg-gray-100/20"> <br />¡Directo a Tu Puerta en Pitalito!</span>
                                </h2>
                            </Animate>
                            <Animate play duration={1.5} delay={0.6} start={{ opacity: 0, transform: 'translateY(20px)' }} end={{ opacity: 1, transform: 'translateY(0px)' }}>
                                <ul className="list-disc pl-5 text-base text-style sm:text-lg md:text-xl font-medium text-white leading-relaxed">
                                    <li><span className="text-[#E0F2F1] font-bold">¿Hambre?</span> Pide de tus <span className="text-white">Restaurantes Favoritos</span>.</li>
                                    <li><span className="text-[#E0F2F1] font-bold">¡Celebra!</span> Licores y bebidas a domicilio, <span className="text-white">sin salir de casa</span>.</li>
                                    <li><span className="text-[#E0F2F1] font-bold">Un Detalle Especial:</span> Sorprende con regalos entregados <span className="text-white">rápidamente</span>.</li>
                                </ul>
                            </Animate>
                        </div>
                        <img
                            loading="lazy"
                            className="w-[50%] lg:w-[30%] lg:-top-15 absolute -right-10 -bottom-10 lg:right-10"
                            src="moto3.png"
                            alt="Domicilios de Restaurantes, Licores, Detalles y Droguerías en Pitalito"
                        />
                    </div>
                </div>
            ),
        },
        {
            content: (
                <div className="relative w-full h-[32vh] lg:h-[40vh] bg-[#2563EB] lg:pt-12 flex flex-col md:flex-row items-center justify-between px-6 md:px-16 py-8 overflow-hidden">
                    <div className="flex w-[100%] lg:w-[85%] mx-auto relative">
                        <div className="w-full flex flex-col justify-center items-start text-left space-y-2 lg:space-y-3 relative z-10">
                            <Animate play duration={1.5} delay={0.3} start={{ opacity: 0, transform: 'translateY(20px)' }} end={{ opacity: 1, transform: 'translateY(0px)' }}>
                                <h3 className="text-2xl text-style sm:text-3xl md:text-4xl lg:text-5xl font-sans font-bold uppercase text-white text-left leading-tight mb-2">
                                    <span className="text-white">Tu Aliado en Pitalito</span> <span className="text-primary"> <br />Para Más Que Entregas</span>
                                </h3>
                            </Animate>
                            <Animate play duration={1.5} delay={0.6} start={{ opacity: 0, transform: 'translateY(20px)' }} end={{ opacity: 1, transform: 'translateY(0px)' }}>
                                <ul className="list-disc pl-5 text-base text-style sm:text-lg md:text-xl font-medium text-white leading-relaxed">
                                    <li><span className="text-slate-200 font-bold">¿Sin Tiempo?</span> Nosotros hacemos tus <span className="text-white">Compras en Almacenes</span>.</li>
                                    <li><span className="text-slate-200 font-bold">¡Fácil y Rápido!</span> <span className="text-white">Recogemos</span> lo que necesites donde estés.</li>
                                    <li><span className="text-slate-200 font-bold">Evita Filas:</span> Realizamos tus <span className="text-white">Pagos</span> por ti.</li>
                                </ul>
                            </Animate>
                        </div>
                        <img
                            loading="lazy"
                            className="w-[50%] lg:w-[25%] lg:-top-15 absolute -right-10 -bottom-10 lg:right-10"
                            src="moto4.png"
                            alt="Servicios de Compras, Recogidas, Pagos y Envíos en Pitalito"
                        />
                    </div>
                </div>
            ),
        },
    ];

    const [toast, setToast] = useState<{ message: string, type?: string } | null>(null);

    // Función de scroll + toast
    const handleAction = (type: 'pedido' | 'comercio') => {
        window.scrollBy({ top: window.innerHeight * 0.45, behavior: 'smooth' });

        if (type === 'pedido') {
            setToast({ message: "¡Realizar tu pedido nunca fue tan fácil con Domicilios W!", type: 'success' });
        } else {
            setToast({ message: "Selecciona el comercio y elige tus productos favoritos con Domicilios W.", type: 'info' });
        }

        setTimeout(() => setToast(null), 4000); // Ocultar toast después de 4s
    };

    const [currentSlide, setCurrentSlide] = useState(0);
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

    const startAutoSlide = () => {
        if (intervalRef.current) clearInterval(intervalRef.current);
        intervalRef.current = setInterval(() => {
            setCurrentSlide(prev => (prev + 1) % slides.length);
        }, 200000);
    };

    useEffect(() => {
        startAutoSlide();
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [slides.length]);

    const goToNextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
        startAutoSlide(); // reinicia contador
    };

    const goToPreviousSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
        startAutoSlide(); // reinicia contador
    };

    return (
        <div className="w-full  relative mb-3 lg:mb-8]">

            {/* Contenedor deslizante */}
            <div
                className="flex transition-transform duration-1000 ease-in-out"
                style={{
                    transform: `translateX(-${currentSlide * 100}%)`
                }}
            >
                {slides.map((slide, index) => (
                    <div
                        key={index}
                        className="w-full flex-shrink-0"
                    >
                        {slide.content}
                    </div>
                ))}
            </div>

            <button
                onClick={goToPreviousSlide}
                className="hidden lg:flex absolute left-1.5 lg:left-10 top-1/2 transform -translate-y-1/2 p-2 bg-white/90 text-[#FFB84D] rounded-full z-20"
                aria-label="Ir a la diapositiva anterior"
            >
                <FaChevronLeft />
            </button>
            <button
                onClick={goToNextSlide}
                className="hidden lg:flex absolute right-1.5 lg:right-10 top-1/2 transform -translate-y-1/2 p-2 bg-white/90 text-[#FFB84D] rounded-full z-20"
                aria-label="Ir a la siguiente diapositiva"
            >
                <FaChevronRight />
            </button>

            {toast && <Toast message={toast.message} type={toast.type as any} />}

        </div>
    );
};

export default Slider2;