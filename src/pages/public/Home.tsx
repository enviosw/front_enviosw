import React, { useState, useEffect } from 'react';
// import CarouselLayout from '../../shared/layout/CarouselLayout';
import IconButtons from '../../features/home/inicio/IconButtons';
import LocalesComerciales from '../../features/home/inicio/LocalesComerciales';
import TipoServicio from '../../features/home/inicio/TipoServicio';
import WhatsAppFloatButton from '../../shared/components/WhatsAppFloatButton';
import Slider from '../../shared/components/Slider';
// import { Animate } from 'react-simple-animate';
// import InstagramButton from '../../shared/components/buttons/InstagramButton';
// import WhatsappButton from '../../shared/components/buttons/WhatsappButton';
// import FacebookButton from '../../shared/components/buttons/FacebookButton';
// import ContactoInfo from '../../features/home/inicio/ContactoInfo';
import Slider2 from '../../shared/components/Slider2';
import CookieConsent from '../../shared/components/CookieConsent';

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
      {/* <CarouselLayout /> */}

      <Slider2 />
      {/* <div className="relative w-full h-[40vh] lg:[50vh] mt-10 bg-secondary flex flex-col md:flex-row items-center justify-between px-6 md:px-16 py-8 overflow-hidden">


        <div className=' flex container mx-auto relative'>
          <div className="w-full flex flex-col justify-center items-center text-left space-y-2 lg:space-y-4 relative z-10">
            <Animate play duration={1} start={{ opacity: 0, transform: 'scale(0.8)' }} end={{ opacity: 1, transform: 'scale(1)' }}>
              <img
                loading="lazy"
                className="w-[70%] hidden lg:flex sm:w-[60%] lg:w-[45%] mx-auto filter drop-shadow-2xl rounded-lg"
                src="logoW_1.png"
                alt="Logo Domi"
              />
            </Animate>

            <Animate play duration={1.5} delay={0.3} start={{ opacity: 0, transform: 'translateY(20px)' }} end={{ opacity: 1, transform: 'translateY(0px)' }}>
              <p className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-sans italic font-bold uppercase text-white text-center">
                <span className="text-white">Domicilios</span> <span className="text-primary">W</span>
              </p>
            </Animate>

            <Animate play duration={1.5} delay={0.6} start={{ opacity: 0, transform: 'translateY(20px)' }} end={{ opacity: 1, transform: 'translateY(0px)' }}>
              <p className="text-xl sm:text-2xl md:text-3xl font-sans font-normal text-white text-center px-4 py-0">
                <span className="text-white">Te ahorramos</span>
                <span className="text-primary"> Tiempo</span>
                <span className="text-white"> y sobre todo</span>
                <span className="text-primary"> Dinero...</span>
              </p>
            </Animate>
          </div>

          <div className="w-full flex justify-center items-center h-full mt-6 md:mt-0 relative z-10">
            <img
              loading="lazy"
              className="w-[100%] sm:w-[60%] lg:w-[45%]"
              src="domi.png" // Reemplaza con tu imagen
              alt="Repartidor en moto"
            />
          </div>

          <div className="absolute  flex-col items-center hidden lg:flex justify-center right-10 bottom-30 space-y-6 z-20">
            <Animate play duration={1} delay={0.8} start={{ opacity: 0, transform: 'translateY(30px)' }} end={{ opacity: 1, transform: 'translateY(0px)' }}>
              <WhatsappButton phoneNumber="573001234567" message="¡Hola! Quisiera más información sobre su producto." />
            </Animate>

            <div className="flex flex-col space-y-4">
              <Animate play duration={1} delay={1.0} start={{ opacity: 0, transform: 'translateY(30px)' }} end={{ opacity: 1, transform: 'translateY(0px)' }}>
                <InstagramButton username="your_instagram_username" />
              </Animate>

              <Animate play duration={1} delay={1.2} start={{ opacity: 0, transform: 'translateY(30px)' }} end={{ opacity: 1, transform: 'translateY(0px)' }}>
                <FacebookButton pageId="your_facebook_page_id" />
              </Animate>
            </div>
          </div>


        </div>

        <div className="absolute hidden lg:flex right-0 lg:right-10 bottom-10 z-20">
          <ContactoInfo />
        </div>
      </div> */}






      {/* <div className='bg-white rounded-t-4xl z-20 -translate-y-8'> */}

      {/* Contenido principal */}
      <section className="w-full lg:w-[85%] mx-auto px-4 lg:px-10">

        <h2 className="text-center text-service lg:text-left mb-2 lg:mb-5 text-3xl lg:text-4xl text-primary font-normal">
          Selecciona el <span>Servicio!</span> {/* Cambié text-primary a text-gray-800 para mejorar el contraste */}
        </h2>

        <IconButtons onSelectServicio={handleSelectServicio} />
      </section>

      <section className="h-auto flex justify-start items-center relative mt-2 lg:mt-5">
        <div className="relative z-20 w-full lg:w-[85%] mx-auto pb-20 px-4 lg:px-10 lg:flex justify-center gap-10">
          {servicioId !== null ? (
            <div className="w-full">



              <LocalesComerciales key={servicioId}
                servicioId={servicioId} />
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

        {/* </div> */}

        <Slider images={images} />

        <WhatsAppFloatButton />

        <CookieConsent />
      </div>

    </>
  );
};

export default Home;
