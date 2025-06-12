import React, { useRef, useEffect, useState, Suspense } from 'react';
import { HiLocationMarker, HiUserGroup, HiMap, HiUser } from 'react-icons/hi';
import Loading from '../../../../utils/Loading';

const WhyChooseUsContent: React.FC = () => (
  <section className="bg-gray-50 py-16 sm:py-24">
    <div className="max-w-7xl mx-auto px-6 lg:px-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">¿Por Qué Elegirnos?</h2>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
          Tu mejor opción para domicilios en Pitalito. Calidad y rapidez garantizada.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <div className="group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 border border-gray-200 dark:border-gray-700 hover:border-indigo-500">
          <div className="flex items-center justify-center h-12 w-12 rounded-full bg-indigo-100 dark:bg-indigo-900 mb-5">
            <HiLocationMarker className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Cobertura Local Extensa</h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
            Operamos en todos los rincones de <span className="font-semibold text-indigo-500">Pitalito</span>.
          </p>
        </div>

        <div className="group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 border border-gray-200 dark:border-gray-700 hover:border-green-500">
          <div className="flex items-center justify-center h-12 w-12 rounded-full bg-green-100 dark:bg-green-900 mb-5">
            <HiUserGroup className="h-6 w-6 text-green-600 dark:text-green-400" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Personal Capacitado</h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
            Nuestro equipo está entrenado para darte atención confiable y eficiente.
          </p>
        </div>

        <div className="group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 border border-gray-200 dark:border-gray-700 hover:border-red-500">
          <div className="flex items-center justify-center h-12 w-12 rounded-full bg-red-100 dark:bg-red-900 mb-5">
            <HiMap className="h-6 w-6 text-red-600 dark:text-red-400" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Sabores Laboyanos</h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
            Prueba comida <span className="text-red-500 font-semibold">tradicional</span> y <span className="text-purple-400 font-semibold">gourmet</span>.
          </p>
        </div>

        <div className="group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 border border-gray-200 dark:border-gray-700 hover:border-amber-500">
          <div className="flex items-center justify-center h-12 w-12 rounded-full bg-amber-100 dark:bg-amber-900 mb-5">
            <HiUser className="h-6 w-6 text-amber-600 dark:text-amber-400" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Atención Personalizada</h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
            Brindamos <span className="text-amber-500 font-semibold">una experiencia única</span> para cada cliente.
          </p>
        </div>
      </div>

      <div className="flex justify-center mt-16">
        <button className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold py-4 px-10 rounded-full text-lg transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-orange-300 dark:focus:ring-orange-700">
          ¡Pide Ahora y Disfruta!
        </button>
      </div>
    </div>
  </section>
);

// 🔁 Wrapper con lazy render basado en scroll
const WhyChooseUs: React.FC = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setShow(true);
        observer.disconnect();
      }
    }, { threshold: 0.1 });

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref}>
      {show && (
        <Suspense fallback={<Loading />}>
          <WhyChooseUsContent />
        </Suspense>
      )}
    </div>
  );
};

export default WhyChooseUs;
