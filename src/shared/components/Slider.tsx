// Slider.tsx
import React, { useState, useEffect } from "react";
import "./slider.css";

type SliderProps = {
    images: string[];
};

const Slider: React.FC<SliderProps> = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [transitioning, setTransitioning] = useState(false);
    const totalImages = images.length;

    // Cambia automáticamente cada 3 segundos
    useEffect(() => {
        const interval = setInterval(() => {
            handleNext();
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    // Función para cambiar a la siguiente imagen con animación
    const handleNext = () => {
        if (transitioning) return;
        setTransitioning(true);
        // Incrementa el índice de la imagen
        setCurrentIndex((prevIndex) => (prevIndex + 1) % totalImages);
    };

    // Función para cambiar a la imagen anterior con animación
    const handlePrev = () => {
        if (transitioning) return;
        setTransitioning(true);
        // Decrementa el índice de la imagen
        setCurrentIndex(
            (prevIndex) => (prevIndex - 1 + totalImages) % totalImages
        );
    };

    // Control de la transición
    const onTransitionEnd = () => {
        setTransitioning(false);
    };

    return (
        <div className="slider-container my-20">
            <div className="slider">
                <div
                    className="slider-images"
                    style={{
                        transform: `translateX(-${currentIndex * 100}%)`,
                        transition: transitioning ? "transform 1s ease-in-out" : "none",
                    }}
                    onTransitionEnd={onTransitionEnd}
                >
                    {images.map((image, index) => (
                        <img
                            key={index}
                            src={image}
                            alt={`Slide ${index}`}
                            className="slider-image min-w-screen"
                        />
                    ))}
                </div>
            </div>
            <div className="controls">
                <button className="prev" onClick={handlePrev}>
                    &#10094;
                </button>
                <button className="next" onClick={handleNext}>
                    &#10095;
                </button>
            </div>
        </div>
    );
};

export default Slider;
