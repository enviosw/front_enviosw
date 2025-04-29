import React from 'react'
import WhatsappButton from '../components/buttons/WhatsappButton'
import ContactoInfo from '../../features/home/inicio/ContactoInfo'
import InstagramButton from '../components/buttons/InstagramButton'
import FacebookButton from '../components/buttons/FacebookButton'

const CarouselLayout: React.FC = () => {
    return (
        <div className="relative w-full h-[35vh]  lg:h-[60vh] overflow-hidden mt-16 lg:mt-0 bg-[#2B2B2B]">
            <img
                loading="lazy"
                className="absolute z-20 w-[70%] lg:w-[45%] hidden lg:flex -bottom-5 left-16 transform -translate-x-1/2 lg:left-0 lg:top-0 lg:translate-x-0 object-cover"
                src="domi4.png"
                alt="Motociclista"
            />
            <img
                loading="lazy"
                className="absolute z-20 w-[80%] lg:w-[45%] hidden lg:flex  -bottom-5 right-14 transform translate-x-1/2 lg:right-0 lg:top-3 lg:translate-x-0 object-cover"
                src="domi.png"
                alt="Motociclista"
            />
            <div className="absolute inset-0 flex flex-col  justify-center pt-2 lg:pt-10 items-center text-center z-30 px-4 ">
                <div className="flex flex-col justify-center items-center">
                    <h1 className="text-5xl md:text-7xl flex flex-col lg:flex-row items-center gap-2 lg:text-8xl font-extrabold leading-tight bg-gradient-to-r from-[#FE6601] via-white to-[#FE6601] text-transparent bg-clip-text drop-shadow-lg">
                        <img
                            loading="lazy"
                            className="w-[50%] lg:w-[35%] mx-auto filter drop-shadow-[0_0_1px_black] p-0 m-0"
                            src="logoW_1.png"
                            alt="Logo Domi"
                        />
                    </h1>

                    <p className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-sans italic font-bold uppercase pt-2">
                        <span className="text-white">Domicilios</span> <span className="text-[#ff6600] pr-2.5">W</span>
                    </p>

                    <p className="text-xl md:text-2xl lg:text-3xl font-sans italic font-semibold px-4 py-0">
                        <span className="text-white">Te ahorramos</span>
                        <span className="text-[#ff6600]"> Tiempo</span>
                        <span className="text-white"> y sobre todo</span>
                        <span className="text-[#ff6600]"> Dinero</span>
                    </p>
                </div>

                <div className="flex flex-col lg:mt-3">
                    <div className="flex flex-wrap justify-center items-center gap-4 mt-5  mb-5">
                        <WhatsappButton phoneNumber="573001234567" message="¡Hola! Quisiera más información sobre su producto." />
                        <div className='hidden lg:flex'>
                            <InstagramButton username="your_instagram_username" />
                        </div>
                        <FacebookButton pageId="your_facebook_page_id" />

                    </div>

                    <div className='absolute hidden lgflex left-0 right-0 lg:right-10 bottom-2'>
                        <ContactoInfo />
                    </div>
                </div>
            </div>

        </div>


    )
}

export default CarouselLayout
