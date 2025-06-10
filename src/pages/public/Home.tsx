import React, { useState, useEffect, lazy, Suspense } from 'react';
import Loading from '../../utils/Loading';
// import ToggleButton from '../../shared/components/buttons/ToggleButton';
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
        <section className="bg-gray-50  py-16 sm:py-24">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
                ¿Por Qué Elegirnos?
              </h2>
              <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
                Tu mejor opción para domicilios en Pitalito. Calidad y rapidez garantizada.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Tarjeta 1 */}
              <div className="group bg-white  rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 border border-gray-200 dark:border-gray-700 hover:border-indigo-500">
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-indigo-100 dark:bg-indigo-900 mb-5">
                  {/* Icono (ejemplo usando SVG) */}
                  <svg className="h-6 w-6 text-indigo-600 dark:text-indigo-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Cobertura Local Extensa</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                  Operamos en todos los rincones de <span className="font-semibold text-indigo-500">Pitalito</span>, llevando tu pedido rápido y seguro.
                </p>
              </div>

              {/* Tarjeta 2 */}
              <div className="group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 border border-gray-200 dark:border-gray-700 hover:border-green-500">
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-green-100 dark:bg-green-900 mb-5">
                  <svg className="h-6 w-6 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M15 21a6 6 0 00-9-5.197M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Personal Capacitado</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                  Nuestro equipo está entrenado para brindarte una atención confiable y eficiente cada vez.
                </p>
              </div>

              {/* Tarjeta 3 */}
              <div className="group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 border border-gray-200 dark:border-gray-700 hover:border-red-500">
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-red-100 dark:bg-red-900 mb-5">
                  <svg className="h-6 w-6 text-red-600 dark:text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0c-.454-.303-.977-.454-1.5-.454V5.454c0-.523.151-1.046.454-1.5a2.704 2.704 0 013 0 2.704 2.704 0 003 0 2.704 2.704 0 013 0 2.704 2.704 0 003 0c.303.454.454.977.454 1.5v10.092zM15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Sabores Laboyanos</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                  Prueba la mejor <span className="text-red-500 font-semibold">comida tradicional</span> y <span className="text-purple-400 font-semibold">gourmet</span> desde casa.
                </p>
              </div>

              {/* Tarjeta 4 */}
              <div className="group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 border border-gray-200 dark:border-gray-700 hover:border-amber-500">
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-amber-100 dark:bg-amber-900 mb-5">
                  <svg className="h-6 w-6 text-amber-600 dark:text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Atención Personalizada</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                  Nos enfocamos en brindar <span className="text-amber-500 font-semibold">una experiencia única</span> para cada cliente.
                </p>
              </div>
            </div>

            {/* Botón */}
            <div className="flex justify-center mt-16">
              <button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold py-4 px-10 rounded-full text-lg transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-indigo-300 dark:focus:ring-indigo-800">
                ¡Pide Ahora y Disfruta!
              </button>
            </div>
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

        </section>

      {/* </div> */}
      <Suspense fallback={<Loading />}>
        <CookieConsent />
      </Suspense>
    </>
  );
};

export default Home;
