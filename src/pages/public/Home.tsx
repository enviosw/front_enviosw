import React, { useEffect, useState } from 'react';
import CarouselLayout from '../../shared/layout/CarouselLayout';
import AnimationMoto from '../../features/home/inicio/AnimationMoto';
import IconButtons from '../../features/home/inicio/IconButtons';
import LocalesComerciales from '../../features/home/inicio/LocalesComerciales';
import TipoServicio from '../../features/home/inicio/TipoServicio';

const Home: React.FC = () => {
  const [showAnimation, setShowAnimation] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAnimation(false);
    }, 2000); // 4 segundos

    return () => clearTimeout(timer); // Limpiar el timer si el componente se desmonta
  }, []);

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
      {showAnimation && <AnimationMoto />}
      <CarouselLayout />
      <div>
        <section className="mt-5 w-full">
          <h2 className="text-center text-2xl font-bold lg:font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#FF6347] to-[#FF4500] drop-shadow-md">
            - Selecciona el Servicio -
          </h2>
          <IconButtons onSelectServicio={handleSelectServicio} />
        </section>

        <section className="w-[95%] lg:w-[85%] mx-auto pb-20 lg:px-10 my-5 lg:flex justify-center gap-10">
          {servicioId !== null ? (
            <LocalesComerciales servicioId={servicioId} /> // Mostrar LocalesComerciales solo si es un número
          ) : servicioNombre ? (
            <div className="text-center text-lg font-semibold w-full">

              <TipoServicio tipo={String(servicioNombre)} />
            </div>
          ) : null}
        </section>
      </div>
    </>
  );
};

export default Home;
