import React, { useState, useEffect } from 'react';
import CarouselLayout from '../../shared/layout/CarouselLayout';
import IconButtons from '../../features/home/inicio/IconButtons';
import LocalesComerciales from '../../features/home/inicio/LocalesComerciales';
import TipoServicio from '../../features/home/inicio/TipoServicio';
import WhatsAppFloatButton from '../../shared/components/WhatsAppFloatButton';
import Slider from '../../shared/components/Slider';

const Home: React.FC = () => {

  const [servicioId, setServicioId] = useState<number | null>(null);
  const [servicioNombre, setServicioNombre] = useState<string | null>(null);

  // Set the page title and meta tags
  useEffect(() => {
    document.title = "Domicilios en Pitalito | Tu aliado en entregas rápidas";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "Pide comida, haz compras, envía productos o gestiona trámites. Te lo entregamos rápido y fácil en Pitalito.");
    }
    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
      metaKeywords.setAttribute("content", "domicilios, pitalito, comida, entregas, compras, productos, trámites");
    }
  }, []);

  const handleSelectServicio = (servicioIdOrNombre: number | string) => {
    if (typeof servicioIdOrNombre === 'number') {
      setServicioId(servicioIdOrNombre);
      setServicioNombre(null); // Limpiar el nombre si recibimos un ID
    } else {
      setServicioNombre(servicioIdOrNombre);
      setServicioId(null); // Limpiar el ID si recibimos un nombre
    }
  };

  const images = [
    "slider1.png",
    "slider2.png",
    "slider3.png",
  ];

  return (
    <>
      <CarouselLayout />

      {/* <div className="relative overflow-x-hidden w-full h-[40vh] md:h-[50vh] mt-10 bg-gradient-to-br from-[#FF5733] via-[#FF5733] to-[#ffffff] to- flex flex-row items-center justify-between px-4 pr-2 md:px-16 py-6 overflow-hidden">

        <div className="w-1/2 text-left z-10">
          <Animate
            play
            duration={1.5}
            delay={0.3}
            start={{ opacity: 0, transform: 'translateY(10px)' }}
            end={{ opacity: 1, transform: 'translateY(0px)' }}
          >
            <h1 className="text-4xl uppercase w-full flex gap-2 sm:text-5xl md:text-6xl font-semibold text-white leading-tight drop-shadow-md">
              Domicilios <span className="font-bold uppercase">W</span>
            </h1>
          </Animate>
          <p className="text-2xl md:text-2xl w-full italic text-white mt-4 font-medium tracking-wide leading-tight">
            <span className="text-white">Te ahorramos</span>
            <span className="text-secondary font-semibold ibnl"> Tiempo</span> <br />    <span className="text-white"> y sobre todo</span>
            <span className="text-secondary font-semibold"> Dinero</span>
          </p>
          <p className="bg-white/70 absolute text-lg bottom-10 right-5 shadow-md rounded-xl justify-center p-2 items-end mx-auto flex gap-2">
            Pitalito - Huila
          </p>
        </div>


        <div className="flex w-full scale-200 -translate-x-12 translate-y-5 justify-center z-0">
          <img
            src="hombre.png"
            alt="Domicilios W"
            className="w-[100%] opacity-85"
          />
        </div>
      </div> */}



      <div className='bg-white rounded-t-4xl z-20 -translate-y-6'>

        {/* Contenido principal */}
        <section className="mt-5 w-full">
          <h2 className="text-center text-2xl text-black font-normal italic drop-shadow-md">
            Selecciona el Servicio!
          </h2>
          <IconButtons onSelectServicio={handleSelectServicio} />
        </section>

        <section className="h-auto flex justify-start items-center relative">
          <div className="relative z-20 w-full lg:w-[85%] mx-auto pb-20 px-4 lg:px-10 py-6 lg:flex justify-center gap-10">
            {servicioId !== null ? (
              <div className="w-full">
                <LocalesComerciales servicioId={servicioId} />
              </div>
            ) : servicioNombre ? (
              <div className="text-center text-lg font-semibold w-full">
                <TipoServicio tipo={String(servicioNombre)} />
              </div>
            ) : null}
          </div>
        </section>

        {/* Sección de promoción con imagen y texto */}
        <div className="w-full relative overflow-hidden px-6 my-10">
          <div className="flex items-center justify-center h-full gap-6 flex-wrap">
            <img
              src="motoexpress.png"
              alt="Moto Express - Domicilios rápidos en Pitalito"
              className="h-80 w-auto object-contain"
            />
            <div className="flex flex-col justify-center items-start text-left">
              <h2 className="text-gray-800 text-3xl md:text-5xl font-bold mb-2">
                Tu aliado en domicilios
              </h2>
              <p className="text-gray-600 text-sm md:text-lg mb-4 max-w-md">
                Pide comida, haz tus compras, envía productos o gestiona trámites. Nosotros lo entregamos en tu puerta, fácil y rápido.
              </p>
              <button className="bg-orange-600 text-white font-semibold py-3 px-5 rounded-full hover:bg-orange-700 transition duration-300 shadow-md">
                ¡Pedir ahora!
              </button>
            </div>
          </div>
        </div>

        <Slider images={images} />
        <WhatsAppFloatButton />
      </div>

    </>
  );
};

export default Home;
