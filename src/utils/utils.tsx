declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

export const loadGoogleAnalytics = () => {
  if (localStorage.getItem('cookiesAccepted') === 'true') {
    // Si ya existe gtag (ya cargado), solo actualizamos consentimiento
    if (window.dataLayer && window.dataLayer.length > 0) {
      window.gtag?.('consent', 'update', {
        'ad_storage': 'granted',
        'analytics_storage': 'granted',
        'functionality_storage': 'granted',
        'security_storage': 'granted'
      });
      return;
    }

    // Cargar GA4 solo si no está cargado
    const script = document.createElement('script');
    script.src = `https://www.googletagmanager.com/gtag/js?id=G-85W2TDMXTH`;
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      window.dataLayer = window.dataLayer || [];
      window.gtag = (...args: any[]) => window.dataLayer.push(args);

      // Consentimiento inicial (granted porque ya aceptó)
      window.gtag('consent', 'default', {
        'ad_storage': 'granted',
        'analytics_storage': 'granted',
        'functionality_storage': 'granted',
        'security_storage': 'granted'
      });

      window.gtag('js', new Date());
      window.gtag('config', 'G-85W2TDMXTH');
    };
  }
};
