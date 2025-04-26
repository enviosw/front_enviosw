import React from 'react'
import WhatsappButton from '../components/buttons/WhatsappButton'
import ContactoInfo from '../../features/home/inicio/ContactoInfo'

const CarouselLayout: React.FC = () => {
    return (
        <div className="relative w-full h-[40vh]  lg:h-[60vh] overflow-hidden mt-16 lg:mt-0 bg-gradient-to-r from-[#E63946] to-[#FF6A13]">
            <img
                loading="lazy"
                className="absolute z-20 w-[90%] lg:w-[45%] hidden lg:flex -bottom-5 left-16 transform -translate-x-1/2 lg:left-0 lg:top-0 lg:translate-x-0 object-cover"
                src="domi4.png"
                alt="Motociclista"
            />
            <img
                loading="lazy"
                className="absolute z-20 w-[90%] lg:w-[45%] -bottom-5 right-16 transform translate-x-1/2 lg:right-0 lg:top-3 lg:translate-x-0 object-cover"
                src="domi.png"
                alt="Motociclista"
            />

            <div className="absolute inset-0 flex flex-col justify-end items-center text-center z-30">
                <div className='w-full text-2xl h-auto max-w-2xl mx-auto text-white rounded-xl flex flex-col items-start justify-center py-8 px-4'>
                    <div className='flex items-center justify-start gap-6'>
                        {/* Logo de bienvenida */}
                        <img className='w-32 h-32 lg:w-36 lg:h-36 object-contain' src="w.png" alt="Logo" />
                        {/* Título de bienvenida */}
                        <h1 className="text-xl lg:text-8xl font-normal uppercase pt-6 text-transparent bg-clip-text bg-gradient-to-r from-[#ffffff] to-[#ffffff] leading-tight drop-shadow-lg">
                            - Domicilios <br />
                            - Entregas <br />
                            - y Mas...
                        </h1>
                    </div>
                    {/* Descripción */}
                    <div className='text-center mt-4'>
                        <p className="mb-4 text-lg lg:text-2xl z-50 bg-white/10 text-white rounded-xl font-semibold drop-shadow-lg">
                            ¡Conectamos lo que necesitas, de manera rápida, segura y sencilla!

                        </p>

                        {/* Botones de contacto */}
                        <div className="flex flex-wrap justify-start items-center gap-6">
                            <WhatsappButton phoneNumber="573001234567" message="¡Hola! Quisiera más información sobre su producto." />
                        </div>
                    </div>
                </div>

                {/* Información de contacto en pantallas grandes */}
                <div className="absolute hidden lg:flex lg:right-10 bottom-2">
                    <ContactoInfo />
                </div>
            </div>


        </div>


    )
}

export default CarouselLayout
