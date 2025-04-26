import React, { useEffect, useState } from 'react'
import CarouselLayout from '../../shared/layout/CarouselLayout';
import AnimationMoto from '../../features/home/inicio/AnimationMoto';
import LocalesMenu from '../../features/home/inicio/LocalesMenu';
import IconButtons from '../../features/home/inicio/IconButtons';


const Home: React.FC = () => {

  const [showAnimation, setShowAnimation] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAnimation(false);
    }, 2000); // 4 segundos

    return () => clearTimeout(timer); // limpiar el timer si el componente se desmonta
  }, []);

  return (

    <>

      {showAnimation && <AnimationMoto />}

      <CarouselLayout />

      <section className='mt-5 w-full'>
        <h2 className='text-center text-2xl font-bold lg:font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#FF6347] to-[#FF4500] drop-shadow-md'>
          - Selecciona el Servicio -
        </h2>        <IconButtons />
      </section>

      <section className='w-full lg:w-[85%] mx-auto pb-20 px-3 lg:px-10 my-5  flex justify-center gap-10'>
        <LocalesMenu />
      </section>


    </>

  )
}

export default Home