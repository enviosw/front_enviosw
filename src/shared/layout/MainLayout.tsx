import React, { useRef, useEffect, useState, lazy, Suspense } from 'react';
import { Navbar } from '../../features/home/inicio/Navbar';
import { Contenido } from '../types/childrenInterface';

const LazyFooter = lazy(() => import('../components/Footer'));

const MainLayout: React.FC<Contenido> = ({ children }) => {
  const [showFooter, setShowFooter]   = useState(false);
  const [footerReady, setFooterReady] = useState(true);
  const footerTriggerRef = useRef<HTMLDivElement | null>(null);

  // Escucha eventos de LocalesComerciales para saber si aún está cargando
  useEffect(() => {
    const onLoading = () => { setFooterReady(false); setShowFooter(false); };
    const onDone    = () => setFooterReady(true);
    window.addEventListener('locales-loading', onLoading);
    window.addEventListener('locales-done',    onDone);
    return () => {
      window.removeEventListener('locales-loading', onLoading);
      window.removeEventListener('locales-done',    onDone);
    };
  }, []);

  // Solo observar el trigger cuando el contenido está listo
  useEffect(() => {
    if (!footerReady) return;

    let hasShown = false;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasShown) {
          hasShown = true;
          setShowFooter(true);
        }
      },
      { threshold: 0.1 }
    );

    const target = footerTriggerRef.current;
    if (target) observer.observe(target);
    return () => { if (target) observer.unobserve(target); };
  }, [footerReady]);

  return (
    <div className="w-full flex flex-col">
      <Navbar />

      <div className="w-full overflow-x-hidden">
        {children}

        {/* Trigger solo aparece cuando el contenido terminó de cargar */}
        {footerReady && (
          <div ref={footerTriggerRef} className="w-full h-[100px]" />
        )}

        {showFooter && footerReady && (
          <div key="footer-stable" className="w-full">
            <Suspense fallback={<div className="h-20 bg-gray-100" />}>
              <LazyFooter />
            </Suspense>
          </div>
        )}
      </div>
    </div>
  );
};

export default MainLayout;
