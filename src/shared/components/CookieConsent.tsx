import React, { useState, useEffect } from 'react';
import { loadGoogleAnalytics } from '../../utils/utils';
import { Link } from 'react-router-dom';

const CookieConsent: React.FC = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    const accepted = localStorage.getItem('cookiesAccepted');
    if (accepted !== 'true') {
      setIsVisible(true);
    } else {
      loadGoogleAnalytics();
    }
  }, []);

  const handleAcceptCookies = () => {
    localStorage.setItem('cookiesAccepted', 'true');
    setIsVisible(false);
    loadGoogleAnalytics();
  };

  const handleDeclineCookies = () => {
    localStorage.setItem('cookiesAccepted', 'false');
    setIsVisible(false);
    // Podrías considerar no cargar Analytics si se rechazan las cookies de forma explícita.
    // Esto ya lo estás manejando implícitamente al no llamar loadGoogleAnalytics() aquí.
  };

  return (
    isVisible && (
      <div
        // Fondo más oscuro pero no totalmente negro, con una transparencia sutil si quieres un efecto "frosted glass" (requiere backdrop-filter)
        // Borde superior sutil para definirlo del resto del contenido.
        className="fixed bottom-10 left-0 w-full bg-gray-900 bg-opacity-95 text-white p-4 shadow-2xl z-[999]
                   transform translate-y-0 transition-transform duration-500 ease-out"
        role="dialog"
        aria-labelledby="cookieConsentLabel"
      >
        <div className="flex flex-col md:flex-row justify-between items-center max-w-screen-xl mx-auto px-4 gap-4">
          <p className="text-sm md:text-base text-center md:text-left leading-relaxed" id="cookieConsentLabel">
            Usamos cookies para mejorar tu experiencia. Al continuar, aceptas nuestra{' '}
            {/* El botón de la política de privacidad se convierte en un Link con un estilo más integrado */}
            <Link to="politicas-de-privacidad" className="font-semibold text-orange-400 hover:text-orange-300 underline transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-orange-300">
              Política de Privacidad
            </Link>.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto mt-3 md:mt-0">
            <button
              onClick={handleDeclineCookies}
              className="w-full sm:w-auto text-sm md:text-base px-6 py-2 border border-gray-600 text-gray-300 rounded-lg
                         hover:bg-gray-700 hover:border-gray-500 hover:text-white
                         transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-500"
              aria-label="Rechazar el uso de cookies"
            >
              Rechazar
            </button>
            <button
              onClick={handleAcceptCookies}
              // Botón de Aceptar con un gradiente vibrante, más prominente
              className="w-full sm:w-auto text-sm md:text-base px-6 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold rounded-lg
                         shadow-md hover:from-orange-600 hover:to-red-600 hover:shadow-lg
                         transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-orange-300"
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