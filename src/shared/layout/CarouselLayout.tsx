import React from 'react'
import WhatsappButton from '../components/buttons/WhatsappButton'
import ContactoInfo from '../../features/home/inicio/ContactoInfo'
import InstagramButton from '../components/buttons/InstagramButton'
import FacebookButton from '../components/buttons/FacebookButton'
import { Animate } from 'react-simple-animate';


const CarouselLayout: React.FC = () => {
    return (
        <div className="relative w-full h-[40vh] lg:h-[60vh] overflow-hidden mt-16 lg:mt-0">
            {/* Imagen de fondo */}
            <img
                src="pitalito3.png"
                alt="Fondo"
                className="absolute inset-0 mx-auto w-full 2xl:w-[100%] h-full"
            />

            {/* Capa opaca negra encima */}
            <div className="absolute inset-0 bg-black/30"></div>
            <img
                loading="lazy"
                className="absolute hidden lg:flex z-20 w-[80%] lg:w-[50%] xl:w-[38%] -bottom-5 left-16 transform -translate-x-1/2 lg:-left-10 lg:top-10 lg:translate-x-0 object-cover"
                src="mujer.png"
                alt="Motociclista"
            />
            <img
                loading="lazy"
                className="absolute z-20 w-full scale-110 md:scale-100 lg:w-[60%] xl:w-[60%] flex -bottom-1  lg:-bottom-5 right-32 transform translate-x-1/2 lg:right-0 lg:top-10 lg:translate-x-0 object-cover"
                src="hombre.png"
                alt="Motociclista"
            />
            <div className="absolute inset-0 flex flex-col  justify-center pt-2 lg:pt-10 items-center text-center z-30 px-4 ">
                <div className="flex flex-col justify-center items-center">
                    <Animate play duration={1} start={{ opacity: 0, transform: 'scale(0.8)' }} end={{ opacity: 1, transform: 'scale(1)' }}>
                        <h1 className="text-5xl md:text-7xl flex flex-col lg:flex-row items-center gap-2 lg:text-8xl font-extrabold leading-tight bg-gradient-to-r from-[#FE6601] via-white to-[#FE6601] text-transparent bg-clip-text drop-shadow-lg">
                            <img
                                loading="lazy"
                                className="w-[50%] lg:w-[35%] mx-auto filter drop-shadow-[0_0_1px_black] p-0 m-0"
                                src="logoW_1.png"
                                alt="Logo Domi"
                            />
                        </h1>
                    </Animate>

                    <Animate play duration={1.5} delay={0.3} start={{ opacity: 0, transform: 'translateY(20px)' }} end={{ opacity: 1, transform: 'translateY(0px)' }}>
                        <p className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-sans italic font-bold uppercase pt-2">
                            <span className="text-white">Domicilios</span> <span className="text-primary pr-2.5">W</span>
                        </p>
                    </Animate>

                    <Animate play duration={1.5} delay={0.6} start={{ opacity: 0, transform: 'translateY(20px)' }} end={{ opacity: 1, transform: 'translateY(0px)' }}>
                        <p className="text-xl md:text-2xl lg:text-3xl font-sans italic font-semibold px-4 py-0">
                            <span className="text-white">Te ahorramos</span>
                            <span className="text-primary"> Tiempo</span>
                            <span className="text-white"> y sobre todo</span>
                            <span className="text-primary"> Dinero</span>
                        </p>
                    </Animate>
                </div>

                <div className="flex flex-col lg:mt-3">
                    <div className="flex flex-wrap justify-center items-center gap-4 mt-5 mb-5">

                        {/* Botón WhatsApp animado */}
                        <Animate play duration={1} delay={0.8} start={{ opacity: 0, transform: 'translateY(30px)' }} end={{ opacity: 1, transform: 'translateY(0px)' }}>
                            <WhatsappButton phoneNumber="573001234567" message="¡Hola! Quisiera más información sobre su producto." />
                        </Animate>

                        {/* Botón Instagram animado */}
                        <div className="hidden lg:flex">
                            <Animate play duration={1} delay={1.0} start={{ opacity: 0, transform: 'translateY(30px)' }} end={{ opacity: 1, transform: 'translateY(0px)' }}>
                                <InstagramButton username="your_instagram_username" />
                            </Animate>
                        </div>

                        {/* Botón Facebook animado */}
                        <Animate play duration={1} delay={1.2} start={{ opacity: 0, transform: 'translateY(30px)' }} end={{ opacity: 1, transform: 'translateY(0px)' }}>
                            <FacebookButton pageId="your_facebook_page_id" />
                        </Animate>

                    </div>

                    {/* ContactoInfo (puedes decidir si también quieres animarlo aparte) */}
                    <div className="absolute hidden lg:flex right-0 lg:right-10 bottom-2">
                        <ContactoInfo />
                    </div>
                </div>

            </div>

        </div>


    )
}

export default CarouselLayout
