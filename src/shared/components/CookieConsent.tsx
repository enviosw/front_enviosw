import React, { useState, useEffect } from 'react';
import { loadGoogleAnalytics } from '../../utils/utils';

const CookieConsent: React.FC = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  // Efecto para verificar si el usuario ya aceptó las cookies
  useEffect(() => {
    const accepted = localStorage.getItem('cookiesAccepted');
    if (accepted !== 'true') {
      setIsVisible(true);
    } else {
      loadGoogleAnalytics(); // Cargar Google Analytics si ya se ha aceptado
    }
  }, []);

  const handleAcceptCookies = () => {
    localStorage.setItem('cookiesAccepted', 'true');
    setIsVisible(false);
    loadGoogleAnalytics(); // Cargar Google Analytics cuando se acepte
  };

  const handleDeclineCookies = () => {
    localStorage.setItem('cookiesAccepted', 'false');
    setIsVisible(false);
  };

  return (
    isVisible && (
      <div
        className="fixed bottom-0 left-0 w-full bg-gray-800 text-white p-4 shadow-lg z-50 transition-all duration-500"
        role="dialog"
        aria-labelledby="cookieConsentLabel"
      >
        <div className="flex justify-between items-center max-w-screen-xl mx-auto px-4">
          <p className="text-sm md:text-base" id="cookieConsentLabel">
            Usamos cookies para mejorar tu experiencia. Al continuar, aceptas nuestra{' '}
            <a href="/privacy-policy" className="underline text-blue-400">
              Política de Privacidad
            </a>.
          </p>
          <div className="gap-4 flex">
            <button
              onClick={handleDeclineCookies}
              className="text-sm md:text-base px-4 py-2 bg-gray-500 rounded-lg hover:bg-gray-600 transition duration-300"
              aria-label="Rechazar el uso de cookies"
            >
              Rechazar
            </button>
            <button
              onClick={handleAcceptCookies}
              className="text-sm md:text-base px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition duration-300"
              aria-label="Aceptar el uso de cookies"
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
