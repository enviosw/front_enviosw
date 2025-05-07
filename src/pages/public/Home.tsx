import React, { useState } from 'react';
import CarouselLayout from '../../shared/layout/CarouselLayout';
import IconButtons from '../../features/home/inicio/IconButtons';
import LocalesComerciales from '../../features/home/inicio/LocalesComerciales';
import TipoServicio from '../../features/home/inicio/TipoServicio';
import WhatsAppFloatButton from '../../shared/components/WhatsAppFloatButton';
import Slider from '../../shared/components/Slider';

const Home: React.FC = () => {

  const [servicioId, setServicioId] = useState<number | null>(null);
  const [servicioNombre, setServicioNombre] = useState<string | null>(null);

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
    "https://files.visitbogota.co/drpl/sites/default/files/2023-09/astoria-104--1920x1080px.jpg",
    "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/26/f4/bc/07/los-mejores-espacios.jpg?w=600&h=-1&s=1",
    "https://assets.hyatt.com/content/dam/hyatt/hyattdam/images/2019/03/20/1322/Grand-Hyatt-Bogota-P287-Ilustre-Bar-Seating.jpg/Grand-Hyatt-Bogota-P287-Ilustre-Bar-Seating.16x9.jpg?imwidth=1920",
  ];


  return (
    <>
      <CarouselLayout />

      <section className="mt-5 w-full">
        <h2 className="text-center text-2xl text-black font-normal italic drop-shadow-md">
          Selecciona el Servicio!
        </h2>
        <IconButtons onSelectServicio={handleSelectServicio} />
      </section>

      <section className="h-auto flex justify-start items-center relative">
        {/* Fondo desde la mitad hacia abajo */}
        {/* Contenido principal */}
        <div className="relative z-20 w-full lg:w-[85%] mx-auto pb-20 px-4 lg:px-10 py-10 lg:flex justify-center gap-10">
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

      <div className="w-full h-60 bg-gradient-to-r from-[#F9D423] to-[#e65c00] top-1/4 z-10 shadow-lg rounded-lg relative overflow-hidden">

        {/* <div className="absolute inset-0 bg-black opacity-25"></div> */}

        <div className="relative z-20 flex flex-col justify-center items-center h-full px-6">
          <h2 className="text-white text-3xl font-semibold leading-tight mb-3">Domicilios y Trámites al instante</h2>
          <p className="text-white text-lg mb-5 text-center">Realiza tus pedidos de comida, compras, pagos, o trámites con entrega a domicilio. ¡También enviamos productos y gestionamos tu logística!</p>
          <button className="bg-white text-[#FF6F61] font-semibold py-2 px-6 rounded-full hover:bg-[#FF8C00] transition duration-300 ease-in-out">
            ¡Haz tu pedido ahora!
          </button>
        </div>
      </div>


      <Slider images={images} />
      <WhatsAppFloatButton />
    </>
  );
};

export default Home;
