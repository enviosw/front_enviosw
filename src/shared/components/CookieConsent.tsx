import React, { useState, useEffect } from 'react';

const CookieConsent: React.FC = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  // Efecto para verificar si el usuario ya aceptó las cookies
  useEffect(() => {
    const accepted = localStorage.getItem('cookiesAccepted');
    if (accepted !== 'true') {
      setIsVisible(true);
    }
  }, []);

  // Función para aceptar las cookies
  const handleAcceptCookies = () => {
    localStorage.setItem('cookiesAccepted', 'true');
    setIsVisible(false);
  };

  // Función para rechazar las cookies
  const handleDeclineCookies = () => {
    localStorage.setItem('cookiesAccepted', 'false');
    setIsVisible(false);
  };

  return (
    isVisible && (
      <div className="fixed bottom-0 left-0 w-full bg-gray-800 text-white p-4 shadow-lg z-50">
        <div className="flex justify-between items-center max-w-screen-xl mx-auto px-4">
          <p className="text-sm md:text-base">
            Usamos cookies para mejorar tu experiencia. Al continuar, aceptas nuestra{' '}
            <a href="/privacy-policy" className="underline text-blue-400">
              Política de Privacidad
            </a>
            .
          </p>
          <div className="space-x-4">
            <button
              onClick={handleDeclineCookies}
              className="text-sm md:text-base px-4 py-2 bg-gray-500 rounded-lg hover:bg-gray-600 transition duration-300"
            >
              Rechazar
            </button>
            <button
              onClick={handleAcceptCookies}
              className="text-sm md:text-base px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Aceptar
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default CookieConsent;
