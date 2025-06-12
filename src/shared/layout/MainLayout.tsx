import React, { useRef, useEffect, useState, lazy, Suspense } from 'react';
import { Navbar } from '../../features/home/inicio/Navbar';
import { Contenido } from '../types/childrenInterface';

// Footer se carga solo cuando se necesita
const LazyFooter = lazy(() => import('../components/Footer'));

const MainLayout: React.FC<Contenido> = ({ children }) => {
    const [showFooter, setShowFooter] = useState(false);
    const footerTriggerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setShowFooter(true);
                }
            },
            { threshold: 0.1 }
        );

        if (footerTriggerRef.current) {
            observer.observe(footerTriggerRef.current);
        }

        return () => {
            if (footerTriggerRef.current) {
                observer.unobserve(footerTriggerRef.current);
            }
        };
    }, []);

    return (
        <>
            <div className="w-full flex flex-col overflow-x-hidden">
                <Navbar />
                {children}

                {/* Punto de activación para el footer */}
                <div ref={footerTriggerRef} className="w-full h-[100px]" />

                {/* Footer diferido */}
                {showFooter && (
                    <Suspense fallback={<></>}>
                        <LazyFooter />
                    </Suspense>
                )}
            </div>
        </>
    );
};

export default MainLayout;
