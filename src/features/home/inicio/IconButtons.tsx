import { useServicios } from '../../../services/serviciosServices';
import { Servicio } from '../../../shared/types/serviciosInterface';
import { Icon } from '../../../shared/components/Icon';
import { useState, useEffect } from 'react';

export const IconButtons = ({ onSelectServicio }: { onSelectServicio: (servicioIdOrNombre: number | string) => void }) => {
    const { data: servicios, isLoading, isError } = useServicios();

    // Estado para el servicio seleccionado
    const [selectedServicioId, setSelectedServicioId] = useState<number | string | null>(null);

    // Efecto para seleccionar el primer servicio por defecto al cargar
    useEffect(() => {
        if (servicios && servicios.length > 0 && selectedServicioId === null) {
            const firstServicio = servicios[0];
            // Selecciona el primer servicio por defecto (según su estado)
            if (firstServicio.estado === 'activo') {
                setSelectedServicioId(Number(firstServicio.id)); // Si está activo, selecciona por ID
                onSelectServicio(Number(firstServicio.id)); // Pasar el ID al callback
            } else {
                setSelectedServicioId(String(firstServicio.nombre)); // Si está inactivo, selecciona por nombre
                onSelectServicio(String(firstServicio.nombre)); // Pasar el nombre al callback
            }
        }
    }, [servicios, selectedServicioId, onSelectServicio]);

    if (isLoading) return <div>Cargando...</div>;
    if (isError) return <div>Error al cargar los servicios</div>;

    const handleClick = (servicio: Servicio) => {
        if (servicio.estado === 'activo') {
            setSelectedServicioId(Number(servicio.id)); // Actualizar el servicio seleccionado
            onSelectServicio(Number(servicio.id));
        } else {
            setSelectedServicioId(String(servicio.nombre)); // Actualizar el servicio seleccionado
            onSelectServicio(String(servicio.nombre));
        }
    };

    return (
        <div className="flex justify-center overflow-x-auto space-x-6 py-4 scrollbar-hidden w-full pl-[350px] pr-5 md:px-0">
            {servicios?.map((servicio: Servicio) => (
                <div key={servicio.id} className="flex flex-col items-center">
                    <button
                        onClick={() => handleClick(servicio)}
                        className={`bg-${servicio.color} hover:bg-opacity-75 text-white rounded-full cursor-pointer p-4 flex items-center justify-center ${selectedServicioId === servicio.id || selectedServicioId === servicio.nombre
                            ? 'border-2 border-[#f56e00]' // Agregar borde verde si está seleccionado
                            : ''
                            }`}
                    >
                        <Icon iconName={servicio?.icon ?? ''} size={24} />
                    </button>
                    <span className="mt-2 text-black text-sm lg:text-lg font-semibold lg:font-normal">
                        {servicio.nombre}
                    </span>
                </div>
            ))}
        </div>
    );
};

export default IconButtons;
