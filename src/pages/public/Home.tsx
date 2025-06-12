import React, { useState, useEffect, lazy, Suspense } from 'react';
import Loading from '../../utils/Loading';
// import ToggleButton from '../../shared/components/buttons/ToggleButton';
import { GoArrowDown } from "react-icons/go";
import { useImagenes } from '../../services/imagenesService';
import { HiLocationMarker, HiMap, HiUser, HiUserGroup } from 'react-icons/hi';
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
                <HiLocationMarker className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />

              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Cobertura Local Extensa</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                Operamos en todos los rincones de <span className="font-semibold text-indigo-500">Pitalito</span>, llevando tu pedido rápido y seguro.
              </p>
            </div>

            {/* Tarjeta 2 */}
            <div className="group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 border border-gray-200 dark:border-gray-700 hover:border-green-500">
              <div className="flex items-center justify-center h-12 w-12 rounded-full bg-green-100 dark:bg-green-900 mb-5">
                <HiUserGroup className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Personal Capacitado</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                Nuestro equipo está entrenado para brindarte una atención confiable y eficiente cada vez.
              </p>
            </div>

            {/* Tarjeta 3 */}
            <div className="group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 border border-gray-200 dark:border-gray-700 hover:border-red-500">
              <div className="flex items-center justify-center h-12 w-12 rounded-full bg-red-100 dark:bg-red-900 mb-5">
                <HiMap className="h-6 w-6 text-red-600 dark:text-red-400" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Sabores Laboyanos</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                Prueba la mejor <span className="text-red-500 font-semibold">comida tradicional</span> y <span className="text-purple-400 font-semibold">gourmet</span> desde casa.
              </p>
            </div>

            {/* Tarjeta 4 */}
            <div className="group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 border border-gray-200 dark:border-gray-700 hover:border-amber-500">
              <div className="flex items-center justify-center h-12 w-12 rounded-full bg-amber-100 dark:bg-amber-900 mb-5">
                <HiUser className="h-6 w-6 text-amber-600 dark:text-amber-400" />

              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Atención Personalizada</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                Nos enfocamos en brindar <span className="text-amber-500 font-semibold">una experiencia única</span> para cada cliente.
              </p>
            </div>
          </div>

          {/* Botón */}
          <div className="flex justify-center mt-16">
            <button className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold py-4 px-10 rounded-full text-lg transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-orange-300 dark:focus:ring-orange-700">
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
