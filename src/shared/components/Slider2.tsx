import React, { useEffect, useRef, useState } from 'react';
import { Animate } from 'react-simple-animate';
import ContactoInfo from '../../features/home/inicio/ContactoInfo';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import PrimaryButton from './buttons/PrimaryButton';
import SecondaryButton from './buttons/SecondaryButton';
import Toast from '../../utils/Toast';
import { useNavigate } from 'react-router-dom';

const Slider2: React.FC = () => {
    const sliderRef = useRef<HTMLDivElement | null>(null);
    const [imgLoaded, setImgLoaded] = useState(false);


    const [touchStartX, setTouchStartX] = useState<number | null>(null);
    const [touchStartY, setTouchStartY] = useState<number | null>(null);
    const [touchEndX, setTouchEndX] = useState<number | null>(null);
    const [touchEndY, setTouchEndY] = useState<number | null>(null);




    const slides = [
        {
            content: (
                <div className="relative w-full h-[35vh] md:h-[40vh] lg:h-[55vh] flex items-end lg:items-center justify-between px-4 sm:px-6 md:px-12 py-6 lg:pt-12 overflow-hidden">
                    {/* Imagen de fondo */}
                    <div
                        className="absolute inset-0 bg-cover bg-center z-10 opacity-15"
                        style={{ backgroundImage: 'url(pitalito.png)' }}
                    ></div>

                    {/* Capa oscura */}
                    <div className="absolute inset-0 bg-black opacity-90 z-0"></div>

                    {/* Contenido principal */}
                    <div className="flex w-full lg:w-[85%] mx-auto z-30">
                        <div className="flex-1 flex flex-col justify-center space-y-3 text-left">
                            <Animate
                                play
                                duration={1.5}
                                delay={0.3}
                                start={{ opacity: 0, transform: "translateY(20px)" }}
                                end={{ opacity: 1, transform: "translateY(0px)" }}
                            >
                                <figure className="mb-[-10px]">
                                    <img src="logoW_1.png" alt="logo domicilios w" className="h-8 sm:h-10 md:h-16 lg:h-24" />
                                </figure>
                            </Animate>

                            <Animate
                                play
                                duration={1.5}
                                delay={0.3}
                                start={{ opacity: 0, transform: "translateY(20px)" }}
                                end={{ opacity: 1, transform: "translateY(0px)" }}
                            >
                                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-sans italic font-bold uppercase text-white leading-tight flex flex-col">
                                    <span>Domicilios <span className="text-primary">W</span></span>
                                </h1>
                                <h2 className="text-lg sm:text-lg md:text-xl lg:text-2xl font-sans text-white italic pt-2">
                                    Te ahorramos <span className="text-primary">Tiempo</span> y sobre todo <span className="text-primary">Dinero</span>
                                </h2>
                            </Animate>

                            <Animate
                                play
                                duration={1.5}
                                delay={0.6}
                                start={{ opacity: 0, transform: "translateY(20px)" }}
                                end={{ opacity: 1, transform: "translateY(0px)" }}
                            >
                                <p className="text-base sm:text-base md:text-lg lg:text-xl text-white font-light leading-relaxed">
                                    ¿Necesitas un <span className="text-primary font-semibold">domicilio rápido y seguro</span> en Pitalito?
                                    <br />
                                    Con <span className="text-primary font-semibold">Domicilios W</span>, enviamos tus compras, comida y más a tu puerta.
                                </p>
                            </Animate>
                        </div>
                    </div>

                    {/* Imagen decorativa (escritorio) */}
                    <img
                        loading="lazy"
                        className={`absolute top-5 right-10 w-[40%] hidden lg:block z-30 transition-opacity duration-500 ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
                        src="domi11.png"
                        alt="Servicio de Domicilios en Pitalito"
                        onLoad={() => setImgLoaded(true)}
                    />

                    {/* Contacto (escritorio) */}
                    <div className="absolute hidden lg:flex right-0 lg:right-5 bottom-7 z-30">
                        <ContactoInfo />
                    </div>
                </div>


            ),
        },
        {
            content: (
                <div className="relative w-full h-[35vh] md:h-[40vh] pt-10 lg:h-[55vh] flex items-end lg:items-center justify-between px-4 sm:px-6 md:px-12 py-6 lg:pt-12 overflow-hidden">
                    {/* Imagen de fondo */}
                    <div
                        className="absolute inset-0 bg-cover bg-center z-10 opacity-15"
                        style={{ backgroundImage: 'url(cafe.jpg)' }}
                    ></div>

                    {/* Capa oscura */}
                    <div className="absolute inset-0 bg-black opacity-90 z-0"></div>

                    {/* Contenedor principal */}
                    <div className="flex w-full lg:w-[85%] mx-auto relative z-10">
                        {/* Contenido textual */}
                        <div className="w-full flex flex-col justify-center items-start text-left space-y-2 lg:space-y-3">
                            <Animate
                                play
                                duration={1.5}
                                delay={0.3}
                                start={{ opacity: 0, transform: 'translateY(20px)' }}
                                end={{ opacity: 1, transform: 'translateY(0px)' }}
                            >
                                <h2 className="text-xl sm:text-xl md:text-4xl lg:text-5xl font-sans font-bold uppercase text-white leading-tight mb-2">
                                    <span>¿Tienes un negocio?</span>
                                    <br />
                                    <span className="rounded-xl bg-white/20 px-2 py-1 inline-block mt-1 text-white">
                                        ¡Regístrate y vende!
                                    </span>
                                </h2>
                            </Animate>

                            <Animate
                                play
                                duration={1.5}
                                delay={0.6}
                                start={{ opacity: 0, transform: 'translateY(20px)' }}
                                end={{ opacity: 1, transform: 'translateY(0px)' }}
                            >
                                <ul className="list-disc pl-4 sm:pl-5 text-sm sm:text-base md:text-lg lg:text-xl font-medium text-white leading-relaxed space-y-1">
                                    <li>
                                        <span className="text-[#E0F2F1] font-bold">Recibe pedidos</span> <span className="font-semibold">directo a tu negocio</span>.
                                    </li>
                                    <li>
                                        <span className="text-[#E0F2F1] font-bold">Publica y vende en línea</span>.
                                    </li>
                                    <li>
                                        <span className="text-[#E0F2F1] font-bold">Tus clientes te encontrarán aquí</span>.
                                    </li>
                                    <li>
                                        <span className="text-[#E0F2F1] font-bold">¡Es fácil, rápido y sin costo!</span>
                                    </li>
                                </ul>
                            </Animate>

                            <div className="flex gap-4 mt-3 sm:mt-2 z-10 hover:scale-105 transition-transform duration-300">
                                <SecondaryButton
                                    text="Quiero registrar mi negocio"
                                    onClick={() => handleAction('registrar_comercio')}
                                />
                            </div>
                        </div>

                        {/* Imagen decorativa (solo escritorio) */}
                        <img
                            loading="lazy"
                            className="absolute -top-32 right-10 w-[38%] hidden lg:flex z-30"
                            src="persona3.png"
                            alt="Servicio de Domicilios en Pitalito"
                        />
                    </div>
                </div>

            ),

        },
        {
            content: (
                <div className="relative w-full pt-10 h-[35vh] md:h-[40vh] lg:h-[55vh] flex items-end lg:items-center justify-between px-4 sm:px-6 md:px-12 py-6 lg:pt-12 overflow-hidden">
                    {/* Imagen de fondo */}
                    <div
                        className="absolute inset-0 bg-cover bg-start z-10 opacity-15"
                        style={{ backgroundImage: 'url(huila.jpg)' }}
                    ></div>

                    {/* Capa oscura */}
                    <div className="absolute inset-0 bg-black opacity-90 z-0"></div>

                    {/* Contenedor principal */}
                    <div className="flex w-full lg:w-[85%] mx-auto relative z-10">
                        {/* Contenido textual */}
                        <div className="w-full flex flex-col justify-center items-start text-left space-y-2 lg:space-y-3">
                            <Animate
                                play
                                duration={1.5}
                                delay={0.3}
                                start={{ opacity: 0, transform: 'translateY(20px)' }}
                                end={{ opacity: 1, transform: 'translateY(0px)' }}
                            >
                                <h3 className="text-xl sm:text-xl md:text-4xl lg:text-5xl font-sans font-bold uppercase text-white leading-tight mb-2">
                                    <span>¿Sin empleo?</span>
                                    <br />
                                    <span className="rounded-xl bg-white/20 px-2 py-1 inline-block mt-1 text-white">
                                        ¡Trabaja con nosotros!
                                    </span>
                                </h3>
                            </Animate>

                            <Animate
                                play
                                duration={1.5}
                                delay={0.6}
                                start={{ opacity: 0, transform: 'translateY(20px)' }}
                                end={{ opacity: 1, transform: 'translateY(0px)' }}
                            >
                                <ul className="list-disc pl-4 sm:pl-5 text-sm sm:text-base md:text-lg lg:text-xl font-medium text-white leading-relaxed space-y-1">
                                    <li>
                                        <span className="text-slate-200 font-bold">Únete y empieza a generar ingresos ya.</span>
                                    </li>
                                    <li>
                                        <span className="text-slate-200 font-bold">¡Tú decides cuándo trabajar!</span>
                                    </li>
                                    <li>
                                        <span className="text-slate-200 font-bold">Puedes elegir tus horarios.</span>
                                    </li>
                                </ul>
                            </Animate>

                            <div className="flex gap-4 mt-3 sm:mt-2 z-10 hover:scale-105 transition-transform duration-300">
                                <PrimaryButton
                                    text="Quiero ser domiciliario"
                                    onClick={() => handleAction('domiciliario')}
                                />
                            </div>
                        </div>

                        {/* Imagen decorativa (solo escritorio) */}
                        <img
                            loading="lazy"
                            className="absolute -top-32 right-10 w-[38%] hidden lg:flex z-30"
                            src="persona3.png"
                            alt="Servicio de Domicilios en Pitalito"
                        />
                    </div>
                </div>


            ),
        },
    ];

    const [toast, setToast] = useState<{ message: string, type?: string } | null>(null);
    const navigate = useNavigate();

    // Función de scroll + toast
    const handleAction = (type: string) => {
        window.scrollBy({ top: window.innerHeight * 0.45, behavior: 'smooth' });

        if (type === 'pedido') {
            setToast({ message: "¡Realizar tu pedido nunca fue tan fácil con Domicilios W!", type: 'success' });
        } else if (type === 'comercio') {
            setToast({ message: "Selecciona el comercio y elige tus productos favoritos con Domicilios W.", type: 'info' });
        } else if (type === 'registrar_comercio') {
            setToast({ message: "¡Registra tu comercio y empieza a recibir pedidos con Domicilios W!", type: 'success' });
            navigate('/comercios/registrar-mi-negocio');
        } else if (type === 'domiciliario') {
            setToast({ message: "¡Aplica para trabajar como domiciliario en Domicilios W!", type: 'success' });
            navigate('/domiciliarios/quiero-ser-domiciliario');
        }

        setTimeout(() => setToast(null), 7000); // Ocultar toast después de 4s
    };

    const [currentSlide, setCurrentSlide] = useState(0);
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

    const startAutoSlide = () => {
        if (intervalRef.current) clearInterval(intervalRef.current);
        intervalRef.current = setInterval(() => {
            setCurrentSlide(prev => (prev + 1) % slides.length);
        }, 8000);
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
        <div className="w-full relative overflow-x-hidden">


            {/* Contenedor deslizante */}
            <div
                ref={sliderRef}
                className="flex transition-transform duration-1000 ease-in-out touch-pan-x"
                style={{
                    transform: `translateX(-${currentSlide * 100}%)`,
                    touchAction: 'pan-y'
                }}

                onTouchStart={(e) => {
                    const touch = e.changedTouches[0];
                    setTouchStartX(touch.clientX);
                    setTouchStartY(touch.clientY);
                }}

                onTouchMove={(e) => {
                    const touch = e.changedTouches[0];
                    setTouchEndX(touch.clientX);
                    setTouchEndY(touch.clientY);
                }}

                onTouchEnd={() => {
                    if (
                        touchStartX === null || touchEndX === null ||
                        touchStartY === null || touchEndY === null
                    ) return;

                    const deltaX = touchEndX - touchStartX;
                    const deltaY = touchEndY - touchStartY;

                    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
                        if (deltaX < 0) {
                            goToNextSlide();
                        } else {
                            goToPreviousSlide();
                        }
                    }

                    // Reset
                    setTouchStartX(null);
                    setTouchEndX(null);
                    setTouchStartY(null);
                    setTouchEndY(null);
                }}


            >
                {slides.map((slide, index) => (
                    <div key={index} className="w-full flex-shrink-0">
                        {slide.content}
                    </div>
                ))}
            </div>


            <button
                onClick={goToPreviousSlide}
                className="hidden lg:flex absolute left-1.5 lg:left-10 top-1/2 transform -translate-y-1/2 p-2 bg-black/90 text-[#FFB84D] rounded-full z-20"
                aria-label="Ir a la diapositiva anterior"
            >
                <FaChevronLeft />
            </button>
            <button
                onClick={goToNextSlide}
                className="hidden lg:flex absolute right-1.5 lg:right-10 top-1/2 transform -translate-y-1/2 p-2 bg-black/90 text-[#FFB84D] rounded-full z-20"
                aria-label="Ir a la siguiente diapositiva"
            >
                <FaChevronRight />
            </button>

            {toast && <Toast message={toast.message} type={toast.type as any} />}

        </div>
    );
};

export default Slider2;