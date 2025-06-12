import React, { useState, useEffect, lazy, Suspense } from 'react';
import Loading from '../../utils/Loading';
// import ToggleButton from '../../shared/components/buttons/ToggleButton';
import { GoArrowDown } from "react-icons/go";
import { useImagenes } from '../../services/imagenesService';
const IconButtons = lazy(() => import('../../features/home/inicio/IconButtons'));
const LocalesComerciales = lazy(() => import('../../features/home/inicio/LocalesComerciales'));
const TipoServicio = lazy(() => import('../../features/home/inicio/TipoServicio'));
const Slider = lazy(() => import('../../shared/components/Slider'));
const Slider2 = lazy(() => import('../../shared/components/Slider2'));
const CookieConsent = lazy(() => import('../../shared/components/CookieConsent'));
const LazyWhyChooseUs = lazy(() => import('../../features/home/inicio/components/WhyChooseUs'));
const LazyMotoExpress = lazy(() => import('../../features/home/inicio/components/MotoExpress'));



const Home: React.FC = () => {

  const [servicioId, setServicioId] = useState<number | null>(null);
  const [servicioNombre, setServicioNombre] = useState<string | null>(null);
  // const [open, setOpen] = useState(false)
  const { data: imagenes, isLoading, isError } = useImagenes();

  // Set the page title and meta tags
  useEffect(() => {
    document.title = "Domicilios Pitalito | Entregas Rápidas, Económicas y Seguras | DomiciliosW";
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

  const images2 = [
    "slider1.png",
    "slider2.png",
    "slider3.png",
  ];



  if (isLoading) {
    return <Loading />; // Muestra el loading si las imágenes están siendo cargadas
  }

  if (isError) {
    return <div>Error al cargar las imágenes</div>; // Muestra un error si la carga falla
  }

  return (
    <>
      <Suspense fallback={<Loading />}>
        <Slider2 />
      </Suspense>

      <Suspense fallback={<Loading />}>
        <section className='w-full flex flex-col items-center justify-center text-center py-3 bg-gray-100'>
          <h3 className='text-2xl font-bold text-gray-600 mb-2'>¡Selecciona el servicio que necesitas!</h3>


          <figure className="text-2xl size-7 animate-bounce rounded-full border-1 p-1 bg-transparent text-orange-500 flex items-center justify-center">
            <GoArrowDown />
          </figure>


          <div className="items-center w-full lg:w-[85%] mx-auto px-4 lg:px-10 mt-2 lg:mt-7 mb-2">
            <IconButtons onSelectServicio={handleSelectServicio} />
          </div>
        </section>
      </Suspense>
      <Suspense fallback={
        <Loading />}>
        <section className="h-auto flex justify-start items-center relative mt-2 lg:mt-5">
          <div className="relative z-20 w-full lg:w-[85%] mx-auto pb-10 lg:pb-20 px-4 lg:px-10 lg:flex justify-center gap-10">
            {servicioId !== null ? (
              <div className="w-full">
                <LocalesComerciales key={servicioId} servicioId={servicioId} />
              </div>
            ) : servicioNombre ? (
              <div className="text-center text-lg font-semibold w-full">
                <TipoServicio tipo={String(servicioNombre)} />
              </div>
            ) : null}
          </div>
        </section>
      </Suspense>


      <Suspense fallback={<Loading />}>
        <Slider images={imagenes?.length ? imagenes.map(img => img.ruta) : images2} />
      </Suspense>


      {/* <ToggleButton open={open} setOpen={setOpen} /> */}



      {/* <div className={`${open ? 'block' : 'hidden'}`}> */}

        <Suspense fallback={<Loading />}>
          <LazyWhyChooseUs />
        </Suspense>
     

      {/* Activador visual para cargar sección 2 */}

        <Suspense fallback={<Loading />}>
          <LazyMotoExpress />
        </Suspense>
   

      {/* </div> */}
      <Suspense fallback={<Loading />}>
        <CookieConsent />
      </Suspense>
    </>
  );
};

export default Home;
