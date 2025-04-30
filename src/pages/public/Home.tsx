import React, { useState } from 'react';
import CarouselLayout from '../../shared/layout/CarouselLayout';
import IconButtons from '../../features/home/inicio/IconButtons';
import LocalesComerciales from '../../features/home/inicio/LocalesComerciales';
import TipoServicio from '../../features/home/inicio/TipoServicio';
import WhatsAppFloatButton from '../../shared/components/WhatsAppFloatButton';

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

  return (
    <>
      <CarouselLayout />
      <div>
        <section className="mt-5 w-full">
          <h2 className="text-center text-2xl text-black font-normal italic drop-shadow-md">
            Selecciona el Servicio!
          </h2>
          <IconButtons onSelectServicio={handleSelectServicio} />
        </section>

        <section className="w-[100%] lg:w-[85%] mx-auto pb-20 lg:px-10  lg:py-10 lg:flex justify-center gap-10">
          {servicioId !== null ? (
            <div className='px-3 lg:px-0'><LocalesComerciales servicioId={servicioId} /></div>
          ) : servicioNombre ? (
            <div className="text-center text-lg px-3 font-semibold w-full">

              <TipoServicio tipo={String(servicioNombre)} />
            </div>
          ) : null}
        </section>
      </div>

      <WhatsAppFloatButton />
    </>
  );
};

export default Home;
