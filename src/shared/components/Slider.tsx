import React, { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { BASE_URL } from "../../utils/baseUrl";

type SliderProps = {
    images: string[];
};

const Slider: React.FC<SliderProps> = ({ images }) => {

    const [currentIndex, setCurrentIndex] = useState(0);
    const [transitioning, setTransitioning] = useState(false);

    const totalImages = images.length;

    useEffect(() => {
        const interval = setInterval(() => {
            handleNext();
        }, 6000);
        return () => clearInterval(interval);
    }, []);

    const handleNext = () => {
        if (transitioning) return;
        setTransitioning(true);
        setCurrentIndex((prevIndex) => (prevIndex + 1) % totalImages);
    };

    const handlePrev = () => {
        if (transitioning) return;
        setTransitioning(true);
        setCurrentIndex((prevIndex) => (prevIndex - 1 + totalImages) % totalImages);
    };

    const onTransitionEnd = () => {
        setTransitioning(false);
    };

    const imageUrls = images.map((img) => `${BASE_URL.replace(/\/$/, '')}/${img}`);


    return (
        <div className="my-6 lg:my-20 bg-neutral-100 relative w-full overflow-hidden max-h-[60vh]">
            <div
                className="flex transition-transform duration-1000 ease-in-out"
                style={{
                    transform: `translateX(-${currentIndex * 100}%)`,
                }}
                onTransitionEnd={onTransitionEnd}
            >
                {imageUrls.map((image, index) => (
                    <img
                        key={index}
                        src={image}
                        alt={`Slide ${index}`}
                        className="w-full flex-shrink-0 object-cover"
                        loading="lazy"  // Lazy load
                        width="100%" // Ajusta según sea necesario
                        height="auto" // Mantén las proporciones
                    />
                ))}
            </div>

            <div className="absolute top-1/2 left-0 right-0 flex justify-between items-center px-4">
                <button
                    onClick={handlePrev}
                    className="text-white text-xl bg-black/60 p-3 rounded-full"
                    aria-label="Ir a la diapositiva anterior"
                >
                    <FaChevronLeft />
                </button>
                <button
                    onClick={handleNext}
                    className="text-white text-xl bg-black/60 p-3 rounded-full"
                    aria-label="Ir a la siguiente diapositiva"
                >
                    <FaChevronRight />
                </button>
            </div>

            <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {images.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`w-3 h-3 rounded-full ${index === currentIndex ? "bg-white" : "bg-black"
                            }`}
                        aria-label={`Ir a la diapositiva ${index + 1}`}
                    />
                ))}
            </div>
            {/* <div className="blur-bottom"></div> */}
        </div>
    );
};

export default Slider;
