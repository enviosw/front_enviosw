import React, { useRef, useEffect, useState, lazy, Suspense } from 'react';
import { Navbar } from '../../features/home/inicio/Navbar';
import { Contenido } from '../types/childrenInterface';

const LazyFooter = lazy(() => import('../components/Footer'));

const MainLayout: React.FC<Contenido> = ({ children }) => {
  const [showFooter, setShowFooter] = useState(false);
  const footerTriggerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
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

    return () => {
      if (target) observer.unobserve(target);
    };
  }, []);

  return (
    <div className="w-full flex flex-col">
      {/* ✅ Sticky funciona mejor si el padre NO tiene overflow */}
      <Navbar />

      {/* ✅ Si necesitas ocultar overflow horizontal, hazlo aquí */}
      <div className="w-full overflow-x-hidden">
        {children}

        {/* Activador para cargar el footer */}
        <div ref={footerTriggerRef} className="w-full h-[100px]" />

        {/* Footer diferido */}
        {showFooter && (
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
