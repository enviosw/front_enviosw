import React, { useEffect, useRef, useState } from 'react';
import WhatsappButton from './buttons/WhatsappButton';
import { Animate } from 'react-simple-animate';
import InstagramButton from './buttons/InstagramButton';
import FacebookButton from './buttons/FacebookButton';
import ContactoInfo from '../../features/home/inicio/ContactoInfo';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';




const Slider2: React.FC = () => {


    // Definimos los componentes que se mostrarán en cada slide
    const slides = [
        {
            content: (
                <div className="relative w-full h-full bg-[#FFB84D] pt-12 flex flex-col md:flex-row items-center justify-between px-6 md:px-16 py-8 overflow-hidden">
                    <div className="flex w-[85%] mx-auto relative">
                        <div className="w-full flex flex-col justify-center items-start text-left space-y-2 lg:space-y-4 relative z-10">
                            <Animate play duration={1.5} delay={0.3} start={{ opacity: 0, transform: 'translateY(20px)' }} end={{ opacity: 1, transform: 'translateY(0px)' }}>
                                <p className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-sans font-bold uppercase text-white text-left">
                                    <span className="text-white">Domicilios</span> <span className="text-primary">W</span>
                                </p>
                            </Animate>
                            <Animate play duration={1.5} delay={0.6} start={{ opacity: 0, transform: 'translateY(20px)' }} end={{ opacity: 1, transform: 'translateY(0px)' }}>
                                <p className="text-xl sm:text-2xl md:text-3xl font-sans font-medium text-white text-center mb-4">
                                    <span className="text-white">Te ahorramos</span> <span className="text-primary font-bold">Tiempo</span> y sobre todo <span className="text-primary font-bold">Dinero</span>
                                </p>
                            </Animate>
                            <div className="items-center hidden lg:flex justify-center right-10 bottom-30 gap-6 z-20">
                                <Animate play duration={1} delay={0.8} start={{ opacity: 0, transform: 'translateY(30px)' }} end={{ opacity: 1, transform: 'translateY(0px)' }}>
                                    <WhatsappButton phoneNumber="573001234567" message="¡Hola! Quisiera más información sobre su servicio de domicilios." />
                                </Animate>
                                <Animate play duration={1} delay={1.0} start={{ opacity: 0, transform: 'translateY(30px)' }} end={{ opacity: 1, transform: 'translateY(0px)' }}>
                                    <InstagramButton username="your_instagram_username" />
                                </Animate>
                                <Animate play duration={1} delay={1.2} start={{ opacity: 0, transform: 'translateY(30px)' }} end={{ opacity: 1, transform: 'translateY(0px)' }}>
                                    <FacebookButton pageId="your_facebook_page_id" />
                                </Animate>
                            </div>
                        </div>
                        <div className="w-full flex justify-end items-center h-full mt-6 md:mt-0 relative z-10">
                            <img
                                loading="lazy"
                                className="w-[100%] sm:w-[60%] lg:w-[45%]"
                                src="domi.png"
                                alt="Repartidor en moto"
                                width="640"  // Ancho explícito en píxeles
                                height="480" // Alto explícito en píxeles
                            />                        </div>
                    </div>
                    <div className="absolute hidden lg:flex right-0 lg:right-5 bottom-7 z-20">
                        <ContactoInfo />
                    </div>
                </div>

            ),
        },
        {
            content: (
                <div className="relative w-full h-full bg-[#4D4DFF] pt-12 flex flex-col md:flex-row items-center justify-between px-6 md:px-16 py-8 overflow-hidden">
                    <div className="flex w-[85%] mx-auto relative">
                        <div className="w-full flex flex-col justify-center items-start text-left space-y-2 lg:space-y-4 relative z-10">
                            <Animate play duration={1.5} delay={0.3} start={{ opacity: 0, transform: 'translateY(20px)' }} end={{ opacity: 1, transform: 'translateY(0px)' }}>
                                <p className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-sans font-bold uppercase text-white text-left">
                                    <span className="text-white">Entrega</span> <span className="text-primary">Rápida</span>
                                </p>
                            </Animate>
                            <Animate play duration={1.5} delay={0.6} start={{ opacity: 0, transform: 'translateY(20px)' }} end={{ opacity: 1, transform: 'translateY(0px)' }}>
                                <p className="text-xl sm:text-2xl md:text-3xl font-sans font-medium text-white text-center mb-4">
                                    <span className="text-white">Recibe tus productos</span> <span className="text-primary font-bold">en tiempo récord</span>
                                </p>
                            </Animate>
                        </div>
                        <div className="w-full flex justify-end items-center h-full mt-6 md:mt-0 relative z-10">
                            <img
                                loading="lazy"
                                className="w-[100%] sm:w-[60%] lg:w-[45%]"
                                src="https://images.freeimages.com/image/previews/702/italian-pizza-chef-character-5692723.png"
                                alt="Repartidor en moto"
                                width="640"  // Ancho explícito en píxeles
                                height="480" // Alto explícito en píxeles
                            />
                        </div>

                    </div>
                </div>

            ),
        },
        {
            content: (
                <div className="relative w-full h-full bg-[#34B9F1] pt-12 flex flex-col md:flex-row items-center justify-between px-6 md:px-16 py-8 overflow-hidden">
                    <div className="flex w-[85%] mx-auto relative">
                        <div className="w-full flex flex-col justify-center items-start text-left space-y-2 lg:space-y-4 relative z-10">
                            <Animate play duration={1.5} delay={0.3} start={{ opacity: 0, transform: 'translateY(20px)' }} end={{ opacity: 1, transform: 'translateY(0px)' }}>
                                <p className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-sans font-bold uppercase text-white text-left">
                                    <span className="text-white">Servicio</span> <span className="text-primary">Seguro</span>
                                </p>
                            </Animate>
                            <Animate play duration={1.5} delay={0.6} start={{ opacity: 0, transform: 'translateY(20px)' }} end={{ opacity: 1, transform: 'translateY(0px)' }}>
                                <p className="text-xl sm:text-2xl md:text-3xl font-sans font-medium text-white text-center mb-4">
                                    <span className="text-white">Confía en nosotros</span> <span className="text-primary font-bold">para entregas seguras</span>
                                </p>
                            </Animate>
                        </div>
                        <div className="w-full flex justify-end items-center h-full mt-6 md:mt-0 relative z-10">
                            <img
                                loading="lazy"
                                className="w-[100%] sm:w-[60%] lg:w-[45%]"
                                src="https://static.vecteezy.com/system/resources/previews/008/492/236/non_2x/delivery-cartoon-illustration-png.png"
                                alt="Entrega segura"
                                width="640"  // Ancho explícito en píxeles
                                height="480" // Alto explícito en píxeles
                            />
                        </div>
                    </div>
                </div>

            ),
        },
    ];

    const [currentSlide, setCurrentSlide] = useState(0);
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

    const startAutoSlide = () => {
        if (intervalRef.current) clearInterval(intervalRef.current);
        intervalRef.current = setInterval(() => {
            setCurrentSlide(prev => (prev + 1) % slides.length);
        }, 5000);
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
        <div className="w-full overflow-hidden relative mb-5 lg:mb-8 h-[32vh] lg:h-[42vh]">
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
                className="absolute left-3 lg:left-10 top-1/2 transform -translate-y-1/2 p-2 bg-gray-800 text-white rounded-full z-20"
                aria-label="Ir a la diapositiva anterior"
            >
                <FaChevronLeft />
            </button>
            <button
                onClick={goToNextSlide}
                className="absolute right-3 lg:right-10 top-1/2 transform -translate-y-1/2 p-2 bg-gray-800 text-white rounded-full z-20"
                aria-label="Ir a la siguiente diapositiva"
            >
                <FaChevronRight />
            </button>

        </div>
    );

};

export default Slider2;
