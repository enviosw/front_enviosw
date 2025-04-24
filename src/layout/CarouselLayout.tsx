import React from 'react'
import CarouselPrincipal from '../components/CarouselPrincipal'
import WhatsappButton from '../components/WhatsappButton'
import InstagramButton from '../components/InstagramButton'
import FacebookButton from '../components/FacebookButton'
import ContactoInfo from '../components/ContactoInfo'

const CarouselLayout: React.FC = () => {
    return (
        <div className="relative w-full overflow-hidden">
            {/* Fondo oscuro con gradiente para mejorar contraste */}
            {/* <div className="absolute inset-0 bg-gradient-to-t from- via-transparent to-transparent z-10"></div> */}

            <img
                loading="lazy"
                className="absolute animate-float z-20 w-[100%] lg:w-[45%] -bottom-10 -left-20 lg:top-0 lg:left-0 flex"
                src="domi4.png"
                alt="Motociclista"
            />

            <img
                loading="lazy"
                className="absolute animate-float z-20 w-[100%] lg:w-[45%] -bottom-10 -right-20 lg:top-3 lg:right-0 flex"
                src="domi.png"
                alt="Motociclista"
            />


            {/* Título y botones centrados */}
            <div className="absolute inset-0 flex flex-col justify-start pt-2 lg:pt-10 lg:justify-center items-center text-center z-30 px-4 ">
                <h1 className="text-5xl md:text-7xl flex flex-col lg:flex-row items-center gap-2 lg:text-8xl font-extrabold leading-tight bg-gradient-to-r from-[#FE6601] via-white to-[#FE6601] text-transparent bg-clip-text drop-shadow-lg">
                    <img
                        loading="lazy"
                        className="bg-white p-0.5 rounded-2xl z-50 size-20 text-sm"
                        src="logo.png"
                        alt="Logo Domi"
                    />
                    Domi <span className="text-white drop-shadow-sm">Express</span>
                </h1>

                <p className="text-sm md:text-xl lg:text-2xl text-white/90 mt-4 max-w-2xl mx-auto bg-white/30 lg:bg-white/20 rounded-xl px-4 py-2">
                    ¡Tu comida favorita, más cerca de ti!
                </p>

                <div className="flex flex-wrap justify-center items-center gap-4 mt-4">
                    <WhatsappButton phoneNumber="573001234567" message="¡Hola! Quisiera más información sobre su producto." />
                    <InstagramButton username="your_instagram_username" />

                    <FacebookButton pageId="your_facebook_page_id" />

                </div>

                <div className='absolute hidden lg:flex lg:right-10 bottom-2'>
                    <ContactoInfo />
                </div>
            </div>

            {/* Carrusel al fondo */}
            <CarouselPrincipal />

        </div>
    )
}

export default CarouselLayout
