import { useServicios } from '../../../services/serviciosServices';
import { Servicio } from '../../../shared/types/serviciosInterface';
import { Icon } from '../../../shared/components/Icon';
import { useState, useEffect, useMemo, useCallback } from 'react';
import { Animate } from 'react-simple-animate';

export const IconButtons = ({ onSelectServicio }: { onSelectServicio: (servicioIdOrNombre: number | string) => void }) => {
    const { data: servicios } = useServicios();

    console.log(servicios)

    // Estado para el servicio seleccionado
    const [selectedServicioId, setSelectedServicioId] = useState<number | string | null>(null);

    // UseMemo para memorizar la lista de servicios ordenada
    const sortedServicios = useMemo(() => {
        if (!Array.isArray(servicios)) return [];
        return servicios.sort((a, b) => (a.id ?? 0) - (b.id ?? 0));
    }, [servicios]);

    // useCallback fuera de condicionales, garantizando el mismo orden de hooks
    const handleClick = useCallback((servicio: Servicio) => {
        const servicioSeleccionado = servicio.estado === 'activo' ? Number(servicio.id) : String(servicio.nombre);
        setSelectedServicioId(servicioSeleccionado);
        onSelectServicio(servicioSeleccionado);
    }, [onSelectServicio]);

    // Efecto para seleccionar el primer servicio por defecto al cargar
    useEffect(() => {
        if (sortedServicios.length > 0 && selectedServicioId === null) {
            const firstServicio = sortedServicios[0];
            const servicioSeleccionado = firstServicio.estado === 'activo' ? Number(firstServicio.id) : String(firstServicio.nombre);
            setSelectedServicioId(servicioSeleccionado);
            onSelectServicio(servicioSeleccionado);
        }
    }, [sortedServicios, selectedServicioId, onSelectServicio]);

    return (
        <div className="flex justify-start overflow-x-auto space-x-4 py-4 scrollbar-hidden w-full">
            {sortedServicios.map((servicio: Servicio) => (
                <Animate
                    key={servicio.id}
                    play
                    duration={0.8}
                    delay={0.2} // Puedes usar un delay fijo para mejorar rendimiento
                    start={{ opacity: 0, transform: 'translateY(20px)' }}
                    end={{ opacity: 1, transform: 'translateY(0px)' }}
                >
                    <div className="flex flex-col items-center">
                        <button
                            style={{ backgroundColor: servicio.color }}
                            onClick={() => handleClick(servicio)}
                            className={`hover:bg-opacity-80 text-white rounded-full cursor-pointer p-4 flex items-center justify-center transition-all duration-75 
                                ${selectedServicioId === servicio.id || selectedServicioId === servicio.nombre
                                    ? 'border-2 border-primary scale-110'
                                    : 'border-2 border-transparent'
                                }`}
                        >
                            <Icon iconName={servicio?.icon ?? ''} size={35} />
                        </button>
                        <span
                            className='text-sm lg:text-base'
                            style={{
                                marginTop: '0.5rem',
                                color: selectedServicioId === servicio.id || selectedServicioId === servicio.nombre
                                    ? servicio.color
                                    : '#000000',
                            }}
                        >
                            {servicio.nombre}
                        </span>
                    </div>
                </Animate>
            ))}
        </div>
    );
};

export default IconButtons;
