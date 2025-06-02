import React, { useState, useEffect, lazy, Suspense } from 'react';
import Loading from '../../utils/Loading';
import ToggleButton from '../../shared/components/buttons/ToggleButton';
import { GoArrowDown } from "react-icons/go";
import { useImagenes } from '../../services/imagenesService';
const IconButtons = lazy(() => import('../../features/home/inicio/IconButtons'));
const LocalesComerciales = lazy(() => import('../../features/home/inicio/LocalesComerciales'));
const TipoServicio = lazy(() => import('../../features/home/inicio/TipoServicio'));
const WhatsAppFloatButton = lazy(() => import('../../shared/components/WhatsAppFloatButton'));
const Slider = lazy(() => import('../../shared/components/Slider'));
const Slider2 = lazy(() => import('../../shared/components/Slider2'));
const CookieConsent = lazy(() => import('../../shared/components/CookieConsent'));


const Home: React.FC = () => {

  const [servicioId, setServicioId] = useState<number | null>(null);
  const [servicioNombre, setServicioNombre] = useState<string | null>(null);
  const [open, setOpen] = useState(false)
  const { data: imagenes } = useImagenes();


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
          <div className="relative z-20 w-full lg:w-[85%] mx-auto pb-20 px-4 lg:px-10 lg:flex justify-center gap-10">
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
        <Slider images={(imagenes?.map(img => img.ruta)) ?? images2} />
      </Suspense>

      <ToggleButton open={open} setOpen={setOpen} />



      <div className={`${open ? 'block' : 'hidden'}`}>
        <section className="max-w-6xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Tarjeta 1 */}
            <div className="bg-white shadow-md rounded-md p-5 text-center">
              <h3 className="text-lg font-bold text-[#374151] mb-3">Cobertura Local Extensa</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Operamos en todos los rincones de <span className="font-bold text-[#22C55E]">Pitalito</span>, llevando tu pedido rápido y seguro.
              </p>
            </div>

            {/* Tarjeta 2 */}
            <div className="bg-white shadow-md rounded-md p-5 text-center">
              <h3 className="text-lg font-bold text-[#374151] mb-3">Personal Capacitado</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Nuestro equipo está entrenado para brindarte una atención confiable y eficiente cada vez.
              </p>
            </div>

            {/* Tarjeta 3 */}
            <div className="bg-white shadow-md rounded-md p-5 text-center">
              <h3 className="text-lg font-bold text-[#374151] mb-3">Sabores Laboyanos</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Prueba la mejor <span className="text-[#ef4444] font-semibold">comida tradicional</span> y <span className="text-[#6366f1] font-semibold">gourmet</span> desde casa.
              </p>
            </div>

            {/* Tarjeta 4 */}
            <div className="bg-white shadow-md rounded-md p-5 text-center">
              <h3 className="text-lg font-bold text-[#374151] mb-3">Atención Personalizada</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Nos enfocamos en brindar <span className="text-[#F97316] font-semibold">una experiencia única</span> para cada cliente.
              </p>
            </div>
          </div>

          {/* Botón */}
          <div className="flex justify-center mt-10">
            <button className="bg-[#d97706] hover:bg-[#b45309] text-white font-bold py-3 px-8 rounded-full text-xl transition duration-300 ease-in-out transform hover:scale-105">
              ¡Pedir ahora es fácil!
            </button>
          </div>
        </section>



        <section className="w-full relative overflow-hidden px-6 my-10">
          <div className="flex items-center justify-center h-full gap-6 flex-wrap">
            <picture>
              <source srcSet="motoexpress.png" type="image/png" />
              <img
                src="motoexpress.png"
                alt="Moto Express - Domicilios rápidos en Pitalito"
                width="640"
                height="480"
                loading="lazy"
              />
            </picture>
            <div className="flex flex-col justify-center items-start text-left">
              <h2 className="text-gray-800 text-3xl md:text-5xl font-bold mb-4">
                ¡Tu Aliado en Domicilios Rápidos y Seguros!
              </h2>
              <p className="text-gray-600 text-sm md:text-lg mb-6 max-w-md">
                ¿Tienes hambre? ¿Necesitas hacer compras? ¿Enviar productos o realizar trámites? ¡Nosotros te ayudamos! Haz tu pedido y recíbelo directamente en tu puerta, de forma rápida y segura.
              </p>
              <button
                aria-label="Realiza tu pedido ahora"
                className="bg-orange-600 text-white font-semibold py-3 px-5 rounded-full hover:bg-orange-700 transition duration-300 shadow-lg transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-orange-400"
              >
                ¡Haz tu Pedido Ahora!
              </button>
            </div>
          </div>



          <Suspense fallback={<Loading />}>
            <WhatsAppFloatButton />
          </Suspense>
          <Suspense fallback={<Loading />}>
            <CookieConsent />
          </Suspense>
        </section>

      </div>
    </>
  );
};

export default Home;
