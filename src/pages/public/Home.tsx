import React, { useEffect, useState } from 'react'
import CarouselLayout from '../../layout/CarouselLayout';
import AnimationMoto from '../../components/AnimationMoto';
import LocalesMenu from '../../components/LocalesMenu';
// import CardCategorias from '../../components/CardCategorias';
import TabsCategorias from '../../components/TabsCategorias';
// import CategoryCarousel from '../../components/CategoryCarousel';

const Home: React.FC = () => {

  const [showAnimation, setShowAnimation] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAnimation(false);
    }, 5000); // 4 segundos

    return () => clearTimeout(timer); // limpiar el timer si el componente se desmonta
  }, []);

  return (

    <>

      {showAnimation && <AnimationMoto />}

      <CarouselLayout />

      <section className='w-full lg:w-[85%] mx-auto pb-20 px-3 lg:px-10 py-10  flex justify-center gap-10'>

        <div className='w-full'>
          <div className='w-full border-b-1 pb-5  my-5'>

            {/* <CardCategorias /> */}

            <TabsCategorias />

          </div>

          <LocalesMenu />

        </div>
      </section>


    </>

  )
}

export default Home