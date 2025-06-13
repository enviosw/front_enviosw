import React, { useState, useEffect, useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

type SliderProps = {
    images: string[];
};

const Slider: React.FC<SliderProps> = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [transitioning, setTransitioning] = useState(false);
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

    const totalImages = images.length;

    const resetInterval = () => {
        if (intervalRef.current) clearInterval(intervalRef.current);
        intervalRef.current = setInterval(() => {
            handleNext();
        }, 6000);
    };

    useEffect(() => {
        resetInterval();
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, []);

    const handleNext = () => {
        if (transitioning) return;
        setTransitioning(true);
        setCurrentIndex((prevIndex) => (prevIndex + 1) % totalImages);
        resetInterval(); // Reiniciar el intervalo al hacer clic
    };

    const handlePrev = () => {
        if (transitioning) return;
        setTransitioning(true);
        setCurrentIndex((prevIndex) => (prevIndex - 1 + totalImages) % totalImages);
        resetInterval(); // Reiniciar el intervalo al hacer clic
    };

    const goToSlide = (index: number) => {
        setCurrentIndex(index);
        resetInterval(); // Reiniciar el intervalo al hacer clic
    };

    const onTransitionEnd = () => {
        setTransitioning(false);
    };


    return (
        <div className="my-6 lg:my-20 bg-neutral-100 relative w-full overflow-hidden max-h-[60vh]">
            <div
                className="flex transition-transform duration-1000 ease-in-out"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                onTransitionEnd={onTransitionEnd}
            >
                {images.map((image, index) => (
                    <img
                        key={index}
                        src={image}
                        alt={`Slide ${index}`}
                        className="w-full flex-shrink-0 object-contain max-h-[60vh]"
                        loading="lazy"
                    />
                ))}
            </div>

            <div className="absolute top-1/2 left-0 right-0 flex justify-between items-center px-4">
                <button
                    onClick={handlePrev}
                    className="text-white text-xl bg-black/60 p-3 rounded-full"
                    aria-label="Anterior"
                >
                    <FaChevronLeft />
                </button>
                <button
                    onClick={handleNext}
                    className="text-white text-xl bg-black/60 p-3 rounded-full"
                    aria-label="Siguiente"
                >
                    <FaChevronRight />
                </button>
            </div>

            <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {images.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`w-3 h-3 rounded-full ${index === currentIndex ? "bg-white" : "bg-black"}`}
                        aria-label={`Slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default Slider;
