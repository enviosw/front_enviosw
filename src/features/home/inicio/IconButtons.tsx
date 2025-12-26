import { useServicios } from '../../../services/serviciosServices';
import { Servicio } from '../../../shared/types/serviciosInterface';
import { useState, useEffect, useMemo, useCallback } from 'react';
import { BASE_URL } from '../../../utils/baseUrl';

// ✅ Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';


export const IconButtons = ({
  onSelectServicio,
}: {
  onSelectServicio: (servicioIdOrNombre: number | string) => void;
}) => {
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

  // ✅ dividir en 2 filas (igual a tu lógica)
  const half = Math.ceil(serviciosOrdenados.length / 2);
  const firstRow = useMemo(() => serviciosOrdenados.slice(0, half), [serviciosOrdenados, half]);
  const secondRow = useMemo(() => serviciosOrdenados.slice(half), [serviciosOrdenados, half]);

  const handleClick = useCallback(
    (servicio: Servicio) => {
      const servicioSeleccionado =
        servicio.estado === 'activo' ? Number(servicio.id) : String(servicio.nombre);

      localStorage.setItem('ultimoServicioSeleccionado', JSON.stringify(servicioSeleccionado));

      setSelectedServicioId(null);
      setTimeout(() => {
        setSelectedServicioId(servicioSeleccionado);
        onSelectServicio(servicioSeleccionado);
      }, 0);
    },
    [onSelectServicio]
  );

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

  // ✅ helper: comparación robusta para selected
  const isServicioSelected = (servicio: Servicio) => {
    if (selectedServicioId == null) return false;

    // si selected es number, comparamos contra Number(servicio.id)
    if (typeof selectedServicioId === 'number') {
      const idNum = Number(servicio.id);
      return Number.isFinite(idNum) && idNum === selectedServicioId;
    }

    // si selected es string, comparamos nombre
    return String(servicio.nombre) === selectedServicioId;
  };

  // ✅ Item reutilizable (mejorado: ring + glow + check + badge)
  const Item = ({ servicio }: { servicio: Servicio }) => {
    const isSelected = isServicioSelected(servicio);

    return (
      <div className="w-[clamp(78px,12vw,104px)] md:w-[clamp(86px,8vw,118px)] overflow-y-hidden">
        <div className="flex flex-col items-center overflow-y-hidden">
          <button
            type="button"
            aria-label={`Seleccionar servicio ${servicio.nombre}`}
            onClick={() => handleClick(servicio)}
            className={`
              relative rounded-full cursor-pointer mt-3 p-1 md:p-1.5
              flex items-center justify-center
              transition-all duration-150
              ${isSelected ? 'scale-110' : 'hover:scale-105'}
            `}
          >
            {/* ✅ Halo / glow cuando está seleccionado */}
            <span
              className={`
                absolute inset-0 rounded-full
                ${isSelected ? 'ring-4 ring-orange-400/70 shadow-[0_0_0_6px_rgba(255,107,0,0.15)]' : 'ring-0'}
              `}
            />

            {/* ✅ Círculo de color (mantiene tu color) */}
            <div
              style={{ backgroundColor: servicio.color }}
              className={`
                relative rounded-full p-0.5 md:p-1
                ${isSelected ? 'bg-opacity-95' : 'bg-opacity-80 hover:bg-opacity-90'}
              `}
            >
              <div className="size-[clamp(44px,9vw,60px)] md:size-[clamp(46px,5.5vw,64px)] overflow-hidden rounded-full bg-white/10">
                <img
                  src={servicio.foto ? `${BASE_URL}/${servicio.foto}` : defaultImage}
                  alt={servicio.nombre}
                  className="w-full h-full object-contain rounded-full"
                  loading="lazy"
                />
              </div>

              {/* ✅ Check visible arriba derecha */}
              {isSelected && (
                <div className="absolute -top-1 -right-1 bg-orange-500 text-white text-[10px] md:text-xs font-bold rounded-full px-1.5 py-0.5 shadow-md">
                  ✓
                </div>
              )}
            </div>
          </button>

    

          <span
            className={`
              text-[clamp(10px,2.6vw,13px)] md:text-[clamp(10px,1.4vw,14px)]
              leading-tight text-center mt-1
              ${isSelected ? 'text-orange-600 font-bold' : 'text-gray-700 font-medium'}
            `}
          >
            {servicio.nombre}
          </span>
        </div>
      </div>
    );
  };

  // ✅ Swiper fila (reutilizable)
  const renderRow = (row: Servicio[], rowKey: string) => (
    <Swiper
      key={rowKey}
      modules={[Pagination]}
      slidesPerView={'auto'}
      spaceBetween={10}
      pagination={{ clickable: true }}
      className="w-full servicios-swiper"
    >
      {row.map((servicio, idx) => (
        <SwiperSlide
          key={`${rowKey}-${servicio.id ?? servicio.nombre}-${idx}`}
          style={{ width: 'auto' }}
          className="!w-auto"
        >
          <Item servicio={servicio} />
        </SwiperSlide>
      ))}
    </Swiper>
  );

  return (
    <div className="w-full">
      <style>{`
        .servicios-swiper {
          padding-top: 0.15rem;
          padding-bottom: 0.65rem;
        }
        .servicios-swiper .swiper-pagination {
          position: static;
          margin-top: 0.1rem;
        }
        .servicios-swiper .swiper-pagination-bullet {
          width: 16px;
          height: 4px;
          border-radius: 999px;
          background: #E4E4E7;
          opacity: 1;
          transition: all 0.2s ease;
        }
        .servicios-swiper .swiper-pagination-bullet-active {
          background: #FF6B00;
          transform: scale(1.1);
        }
      `}</style>

      {/* ✅ Fila 1 */}
      {renderRow(firstRow, 'row-1')}

      {/* ✅ Fila 2 */}
      {secondRow.length > 0 && (
        <div className="-mt-3.5">
          {renderRow(secondRow, 'row-2')}
        </div>
      )}
    </div>
  );
};

export default IconButtons;
