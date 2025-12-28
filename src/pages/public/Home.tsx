import React, { useState, useEffect, lazy, Suspense, useCallback } from 'react';
import Loading from '../../utils/Loading';
// import ToggleButton from '../../shared/components/buttons/ToggleButton';
// import { GoArrowDown } from "react-icons/go";
const IconButtons = lazy(() => import('../../features/home/inicio/IconButtons'));
const LocalesComerciales = lazy(() => import('../../features/home/inicio/LocalesComerciales'));
const TipoServicio = lazy(() => import('../../features/home/inicio/TipoServicio'));
const Slider2 = lazy(() => import('../../shared/components/Slider2'));
const CookieConsent = lazy(() => import('../../shared/components/CookieConsent'));


const Home: React.FC = () => {
  const [servicioId, setServicioId] = useState<number | null>(null);
  const [servicioNombre, setServicioNombre] = useState<string | null>(null);
  // const [open, setOpen] = useState(false)

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

  const handleSelectServicio = useCallback((v: number | string) => {
    if (typeof v === 'number') { setServicioId(v); setServicioNombre(null); }
    else { setServicioNombre(v); setServicioId(null); }
  }, []);

  return (
    <>
      <img className='w-10' src='/domiw.png'></img>
      <Slider2 key="slider2-main" />

      <Suspense fallback={<Loading />}>
        <section
          key="select-servicio"
          className="w-full flex flex-col items-center justify-center text-center pt-3 bg-[#ffffff]"
        >
          <h2 className="text-md font-semibold text-gray-700 mx-auto w-[80%] lg:m-0 tracking-wide">
            ¡Selecciona el servicio que necesitas!
          </h2>

          <div className="items-center w-full lg:w-[85%] mx-auto px-4 lg:px-10 mt-2 mb-2">
            <IconButtons onSelectServicio={handleSelectServicio} />
          </div>
        </section>
      </Suspense>

      <Suspense fallback={<Loading />}>
        <section
          className="h-auto flex bg-[#ffffff] justify-start items-center relative mt-2 lg:mt-5"
        >
          <div className="relative z-20 w-full lg:w-[85%] mx-auto pb-10 lg:pb-20 px-4 lg:px-10 lg:flex justify-center gap-10">
            <div className="w-full">
              <div style={{ display: servicioId !== null ? 'block' : 'none' }}>
                <LocalesComerciales servicioId={servicioId as number} />
              </div>
              <div style={{ display: servicioNombre ? 'block' : 'none' }}>
                <TipoServicio tipo={String(servicioNombre ?? '')} />
              </div>
            </div>
          </div>
        </section>
      </Suspense>

      <Suspense fallback={<Loading />}>
        <div key="cookie-consent">
          <CookieConsent />
        </div>
      </Suspense>
    </>
  );
};

export default Home;
