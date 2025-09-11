import { useServicios } from '../../../services/serviciosServices';
import { Servicio } from '../../../shared/types/serviciosInterface';
import { useState, useEffect, useMemo, useCallback } from 'react';
import { BASE_URL } from '../../../utils/baseUrl';

export const IconButtons = ({ onSelectServicio }: { onSelectServicio: (servicioIdOrNombre: number | string) => void }) => {
  const { data: servicios } = useServicios();
  const [selectedServicioId, setSelectedServicioId] = useState<number | string | null>(null);

  // Orden base por id (copia segura)
  const sortedServicios = useMemo(() => {
    if (!Array.isArray(servicios)) return [];
    return servicios.slice().sort((a, b) => (a.id ?? 0) - (b.id ?? 0));
  }, [servicios]);

  // Orden final por "orden" manteniendo relativo
  const serviciosOrdenados = useMemo(() => {
    return [...sortedServicios].sort((a, b) => {
      if (a.orden != null && b.orden != null) return a.orden - b.orden;
      if (a.orden != null) return -1;
      if (b.orden != null) return 1;
      return 0;
    });
  }, [sortedServicios]);

  // Número de columnas (mitad arriba, mitad abajo)
  const half = Math.ceil(serviciosOrdenados.length / 2);
  const numCols = half;

  const handleClick = useCallback((servicio: Servicio) => {
    const servicioSeleccionado = servicio.estado === 'activo' ? Number(servicio.id) : String(servicio.nombre);
    localStorage.setItem('ultimoServicioSeleccionado', JSON.stringify(servicioSeleccionado));
    setSelectedServicioId(null);
    setTimeout(() => {
      setSelectedServicioId(servicioSeleccionado);
      onSelectServicio(servicioSeleccionado);
    }, 0);
  }, [onSelectServicio]);

  // Selección inicial (último guardado o primero)
  useEffect(() => {
    if (serviciosOrdenados.length > 0 && selectedServicioId === null) {
      const guardado = localStorage.getItem('ultimoServicioSeleccionado');
      if (guardado) {
        try {
          const servicioSeleccionado = JSON.parse(guardado);
          setSelectedServicioId(servicioSeleccionado);
          onSelectServicio(servicioSeleccionado);
          return;
        } catch (e) {
          console.error('Error leyendo localStorage', e);
        }
      }
      const first = serviciosOrdenados[0];
      const servicioSeleccionado = first.estado === 'activo' ? Number(first.id) : String(first.nombre);
      setSelectedServicioId(servicioSeleccionado);
      onSelectServicio(servicioSeleccionado);
    }
  }, [serviciosOrdenados, selectedServicioId, onSelectServicio]);

  const defaultImage = '/logo_w_fondo_negro.jpeg';

  // Item reutilizable (icono + texto)
  const Item = ({ servicio }: { servicio: Servicio }) => (
    <div className="w-[clamp(64px,10vw,88px)] md:w-[clamp(80px,8vw,110px)] overflow-y-hidden">
      <div className="flex flex-col items-center overflow-y-hidden">
        <button
          style={{ backgroundColor: servicio.color }}
          aria-label={`Seleccionar servicio ${servicio.nombre}`}
          onClick={() => handleClick(servicio)}
          className={`
            hover:bg-opacity-80
            rounded-full cursor-pointer mt-3 p-0.5 md:p-1 flex items-center justify-center
            transition-transform duration-75
            border ${selectedServicioId === servicio.id || selectedServicioId === servicio.nombre
              ? 'border-[#FFB84D] bg-[#FFB84D]/80 text-white scale-105 md:scale-110'
              : 'border-transparent bg-transparent'}
          `}
        >
<div className="size-[clamp(36px,7.5vw,48px)] md:size-[clamp(44px,5.5vw,60px)] overflow-hidden">
  <img
    src={servicio.foto ? `${BASE_URL}/${servicio.foto}` : defaultImage}
    alt={servicio.nombre}
    className="w-full h-full object-contain rounded-full"
    loading="lazy"
  />
</div>

        </button>

        <span
          className="text-[clamp(9px,2.2vw,12px)] md:text-[clamp(10px,1.4vw,14px)] text-gray-700 leading-tight text-center"
          style={{ marginTop: '0.2rem', color: (selectedServicioId === servicio.id || selectedServicioId === servicio.nombre) ? '#FF6600' : undefined }}
        >
          {servicio.nombre}
        </span>
      </div>
    </div>
  );

  return (
    // Scroll horizontal, dos filas fijas: 1..half arriba, half+1..n abajo
    <div className="w-full overflow-x-auto overscroll-x-contain snap-x snap-mandatory scrollbar-thin">
      <div className="grid grid-rows-2 grid-flow-col auto-cols-max gap-x-3 md:gap-x-4 gap-y-1 px-1 py-1">
        {Array.from({ length: numCols }).map((_, i) => {
          // 🔁 Cambio clave: índices por mitades
          const topIdx = i;              // 0..half-1
          const bottomIdx = i + half;    // half..n-1

          const topItem = serviciosOrdenados[topIdx];
          const bottomItem = serviciosOrdenados[bottomIdx];

          return (
            <div key={`col-${i}`} className="contents">
              {topItem && (
                <div className="snap-start row-start-1">
                  <Item servicio={topItem} />
                </div>
              )}
              {bottomItem && (
                <div className="snap-start row-start-2">
                  <Item servicio={bottomItem} />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default IconButtons;
