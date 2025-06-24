import React, { Suspense } from 'react';
import { HiLocationMarker, HiUserGroup, HiMap, HiUser } from 'react-icons/hi';
import Loading from '../../../../utils/Loading';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

// Animación base para las tarjetas
const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.6,
      ease: 'easeOut',
    },
  }),
};

const Card = ({
  icon,
  title,
  text,
  color,
  border,
  index,
}: {
  icon: any;
  title: string;
  text: any;
  color: string;
  border: string;
  index: number;
}) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  React.useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      className={`group ${color} rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 border-2 border-transparent hover:${border} transform hover:-translate-y-1`}
      custom={index}
      initial="hidden"
      animate={controls}
      variants={cardVariants}
    >
      <div className={`flex items-center justify-center h-16 w-16 rounded-full ${color.replace('50', '100')} mb-6 shadow-md`}>
        {icon}
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
      <p className="text-gray-700 text-base leading-relaxed">{text}</p>
    </motion.div>
  );
};

const WhyChooseUsContent: React.FC = () => {
  const cards = [
    {
      icon: <HiLocationMarker className="h-8 w-8 text-orange-500" />,
      title: 'Cobertura Local Extensa',
      text: (
        <>
          Operamos en todos los rincones de <span className="font-bold text-orange-600">Pitalito</span>, llegando donde otros no.
        </>
      ),
      color: 'bg-orange-50',
      border: 'border-orange-400',
    },
    {
      icon: <HiUserGroup className="h-8 w-8 text-green-500" />,
      title: 'Personal Capacitado',
      text: (
        <>
          Nuestro equipo está entrenado para darte una atención <span className="font-bold text-green-600">confiable y eficiente</span>.
        </>
      ),
      color: 'bg-green-50',
      border: 'border-green-400',
    },
    {
      icon: <HiMap className="h-8 w-8 text-purple-500" />,
      title: 'Sabores Laboyanos',
      text: (
        <>
          Explora la gastronomía local: desde comida <span className="font-bold text-red-500">tradicional</span> hasta opciones{' '}
          <span className="font-bold text-purple-600">gourmet</span>.
        </>
      ),
      color: 'bg-purple-50',
      border: 'border-purple-400',
    },
    {
      icon: <HiUser className="h-8 w-8 text-blue-500" />,
      title: 'Atención Personalizada',
      text: (
        <>
          Brindamos <span className="font-bold text-blue-600">una experiencia única</span>, adaptada a tus necesidades.
        </>
      ),
      color: 'bg-blue-50',
      border: 'border-blue-400',
    },
  ];

  return (
    <section className="bg-white py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-gray-900 sm:text-5xl leading-tight">
            ¿Por Qué <span className="text-orange-500">Elegirnos</span>?
          </h2>
          <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
            Tu mejor opción para domicilios en Pitalito. <span className="font-semibold text-orange-600">Calidad y rapidez garantizada.</span>
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {cards.map((card, i) => (
            <Card key={i} {...card} index={i} />
          ))}
        </div>

        <div className="flex justify-center mt-16">
          <button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold py-4 px-12 rounded-full text-xl transition-all duration-300 ease-in-out transform hover:scale-105 shadow-xl hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-orange-300 focus:ring-opacity-75">
            ¡Pide Ahora y Disfruta!
          </button>
        </div>
      </div>
    </section>
  );
};

const WhyChooseUs: React.FC = () => (
  <Suspense fallback={<Loading />}>
    <WhyChooseUsContent />
  </Suspense>
);

export default WhyChooseUs;
