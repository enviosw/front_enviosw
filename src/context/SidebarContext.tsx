import React, { createContext, useState, useContext, useEffect } from 'react';
import { Contenido } from '../shared/types/childrenInterface';

interface SidebarContextType {
    isOpen: boolean;
    toggleSidebar: () => void;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export const useSidebar = (): SidebarContextType => {
    const context = useContext(SidebarContext);
    if (!context) {
        throw new Error('useSidebar debe ser usado dentro de un SidebarProvider');
    }
    return context;
};

export const SidebarProvider: React.FC<Contenido> = ({ children }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    useEffect(() => {
        // Tailwind's sm breakpoint = 640px
        const handleResize = () => {
            if (window.innerWidth > 640) {
                setIsOpen(true);
            }
        };

        // Llama al inicio
        handleResize();

        // También escucha cambios de tamaño
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const toggleSidebar = () => setIsOpen(prev => !prev);

    return (
        <SidebarContext.Provider value={{ isOpen, toggleSidebar }}>
            {children}
        </SidebarContext.Provider>
    );
};
