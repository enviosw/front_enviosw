export const loadGoogleAnalytics = () => {
  if (localStorage.getItem('cookiesAccepted') === 'true') {
    // Comprobar si ya se ha cargado Google Analytics
    if (window.dataLayer && window.dataLayer.length > 0) return; // Evita inicialización repetida

    // Crear el script solo si el usuario acepta las cookies
    const script = document.createElement('script');
    script.src = `https://www.googletagmanager.com/gtag/js?id=G-85W2TDMXTH`;
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      // Inicializamos dataLayer si no está definido
      window.dataLayer = window.dataLayer ?? [];

      // Declaramos la función gtag fuera de la condición
      function gtag(...args: any[]) {
        window.dataLayer.push(args);
      }

      // Inicializar Google Analytics solo una vez
      gtag('js', new Date()); // Usamos Date correctamente
      gtag('config', 'G-85W2TDMXTH');
    };
  }
};
