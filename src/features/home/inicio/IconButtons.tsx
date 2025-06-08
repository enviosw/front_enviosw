import { useServicios } from '../../../services/serviciosServices';
import { Servicio } from '../../../shared/types/serviciosInterface';
// import { Icon } from '../../../shared/components/Icon';
import { useState, useEffect, useMemo, useCallback } from 'react';
import { Animate } from 'react-simple-animate';
import { BASE_URL } from '../../../utils/baseUrl';

export const IconButtons = ({ onSelectServicio }: { onSelectServicio: (servicioIdOrNombre: number | string) => void }) => {
    const { data: servicios } = useServicios();

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

        setSelectedServicioId(null); // limpia selección visual
        setTimeout(() => {
            setSelectedServicioId(servicioSeleccionado);
            onSelectServicio(servicioSeleccionado);
        }, 0);
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


    const serviciosOrdenados = [...sortedServicios].sort((a, b) => {
        // Si ambos tienen orden definido, ordenar ascendente
        if (a.orden != null && b.orden != null) {
            return a.orden - b.orden;
        }
        // Si solo uno tiene orden, priorizarlo
        if (a.orden != null) return -1;
        if (b.orden != null) return 1;
        // Si ninguno tiene orden, no cambiar el orden
        return 0;
    });

    return (
        <div className="flex justify-start md:justify-center overflow-x-auto gap-x-6 pl-1.5 py-1 scrollbar-hidden w-full">
            {serviciosOrdenados.map((servicio: Servicio) => (
                <Animate
                    key={servicio.id}
                    play
                    duration={0.8}
                    delay={0.2}
                    start={{ opacity: 0, transform: 'translateY(20px)' }}
                    end={{ opacity: 1, transform: 'translateY(0px)' }}
                >
                    <div className="flex flex-col items-center">
                    
                        <button
                            style={{ backgroundColor: servicio.color }}
                            aria-label={`Seleccionar servicio ${servicio.nombre}`}
                            onClick={() => handleClick(servicio)}
                            className={`hover:bg-opacity-80 size-[65px] text-primary rounded-full cursor-pointer p-1 flex items-center justify-center transition-all duration-75
                                    ${selectedServicioId === servicio.id || selectedServicioId === servicio.nombre
                                    ? 'border-2 border-[#FFB84D] bg-[#FFB84D]/80 text-white scale-110'
                                    : 'border-2 border-transparent bg-transparent'
                                }`}
                        >
                            <img
                                src={servicio.foto ? `${BASE_URL}/${servicio.foto}` : ''}
                                alt={servicio.nombre}
                                className="w-full h-full object-contain"
                            />
                        </button>


                        <span
                            className="text-sm lg:text-base text-gray-600"
                            style={{
                                marginTop: '0.3rem',
                                color: selectedServicioId === servicio.id || selectedServicioId === servicio.nombre
                                    ? '#FF6600'
                                    : '',
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
