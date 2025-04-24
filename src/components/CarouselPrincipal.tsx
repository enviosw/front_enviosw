import React, { useEffect, useState } from 'react';

const slides = [
  { id: 1, src: 'slide3.png' },
  { id: 2, src: 'slide3.png' },
  { id: 3, src: 'slide3.png' },
  { id: 4, src: 'slide3.png' },
];

const CarouselPrincipal: React.FC = () => {
  const [current, setCurrent] = useState(0);

  // Avanza automáticamente cada 5 segundos
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="w-full max-h-[410px] lg:max-h-[500px] relative bg-[#E63946] overflow-hidden">
      <div className="relative w-full h-[500px]">
        {slides.map((slide, index) => (
          <img
            key={slide.id}
            // src={slide.src}
            // alt={`Slide ${slide.id}`}
            className={`absolute w-full h-[500px] object-cover transition-all duration-1000 ease-in-out ${index === current ? 'opacity-100 translate-x-0 z-20' : 'opacity-0 translate-x-full z-10'
              }`}
          />
        ))}
      </div>

      {/* Botones */}
      <div className="absolute left-5 right-5 top-1/2  -translate-y-1/2 transform justify-between z-30 hidden">
        <button onClick={prevSlide} className="btn btn-circle bg-red-500 border-none shadow-none text-white">❮</button>
        <button onClick={nextSlide} className="btn btn-circle bg-red-500 border-none shadow-none text-white">❯</button>
      </div>
    </div>
  );
};

export default CarouselPrincipal;
