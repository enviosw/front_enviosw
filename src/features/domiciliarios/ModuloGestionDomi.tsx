import React, { useMemo } from 'react';
import {
  useDomiciliariosPorDisponibilidad,
  useSiguienteDomiciliario,
  useReiniciarTurnosACero
} from '../../services/domiServices';
import { AlertService } from '../../utils/AlertService';
import {
  FiRefreshCcw,
  FiRotateCcw,
  FiCheckCircle,
  FiXCircle,
  FiPhone,
  FiUser,
  FiClock,
  FiUsers
} from 'react-icons/fi';

/* --------- helpers UI --------- */
const Badge: React.FC<{ color?: 'success' | 'error' | 'warning' | 'info'; children: React.ReactNode }> = ({
  color = 'info',
  children
}) => (
  <span
    className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium
      ${color === 'success' && 'bg-green-100 text-green-800'}
      ${color === 'error' && 'bg-red-100 text-red-800'}
      ${color === 'warning' && 'bg-amber-100 text-amber-800'}
      ${color === 'info' && 'bg-blue-100 text-blue-800'}
    `}
  >
    {children}
  </span>
);

const SkeletonLine: React.FC<{ w?: string }> = ({ w = 'w-full' }) => (
  <div className={`animate-pulse h-4 bg-base-300/70 rounded ${w}`} />
);

const getInitials = (n?: string, a?: string) =>
  `${(n || '').charAt(0)}${(a || '').charAt(0)}`.toUpperCase() || '—';

/* ===========================================
   MÓDULO
=========================================== */
const ModuloGestionDomi: React.FC = () => {
  // hooks que consumen los 3 endpoints
  const {
    data: domisOrdenados,
    isLoading: loadingOrden,
    error: errorOrden,
    refetch: refetchOrden
  } = useDomiciliariosPorDisponibilidad();

  const {
    data: siguiente,
    isLoading: loadingSiguiente,
    error: errorSiguiente,
    refetch: refetchSiguiente
  } = useSiguienteDomiciliario();

  const { mutate: reiniciar, isPending: reiniciando } = useReiniciarTurnosACero();

  // métricas
  const stats = useMemo(() => {
    const total = domisOrdenados?.length ?? 0;
    const disponibles = domisOrdenados?.filter(d => d.disponible).length ?? 0;
    const noDisponibles = total - disponibles;
    const promedioTurno = total
      ? Math.round(
        (domisOrdenados!.reduce((acc, d) => acc + (d.turno_orden || 0), 0) / total) * 10
      ) / 10
      : 0;
    return { total, disponibles, noDisponibles, promedioTurno };
  }, [domisOrdenados]);

  const handleReiniciar = async () => {
    const ok = await AlertService.confirm(
      '¿Reiniciar turnos a 0 y dejar a todos NO disponibles?',
      'Esta acción actualizará todos los domiciliarios activos.'
    );
    if (!ok) return;

    reiniciar(undefined, {
      onSuccess: async () => {
        await Promise.all([refetchOrden(), refetchSiguiente()]);
      }
    });
  };

  return (
    <section className="space-y-6">
      {/* Header / Hero */}
      <div className="rounded-2xl p-5 md:p-6 bg-gradient-to-r from-indigo-500 via-sky-500 to-cyan-500 text-white shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Gestión de Domiciliarios</h2>
            <p className="text-white/90 mt-1">
              Control de disponibilidad, turnos y vista del siguiente asignable.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              className="btn btn-sm md:btn-md bg-white/95 text-slate-900 hover:bg-white shadow-md gap-2"
              onClick={() => {
                refetchOrden();
                refetchSiguiente();
              }}
              title="Refrescar datos"
            >
              <FiRefreshCcw className="text-slate-700" />
              Refrescar
            </button>
            <button
              className={`btn btn-sm md:btn-md btn-error text-white gap-2 ${reiniciando ? 'btn-disabled' : ''}`}
              onClick={handleReiniciar}
              disabled={reiniciando}
              title="Reiniciar turnos a 0 y marcar no disponibles"
            >
              <FiRotateCcw />
              {reiniciando ? 'Reiniciando…' : 'Reiniciar turnos a 0'}
            </button>
          </div>
        </div>

        {/* Métricas */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-5">
          <div className="rounded-xl bg-white/10 backdrop-blur p-4">
            <div className="text-sm text-white/80 flex items-center gap-2">
              <FiUsers /> Total
            </div>
            <div className="text-2xl font-semibold mt-1">{stats.total}</div>
          </div>
          <div className="rounded-xl bg-white/10 backdrop-blur p-4">
            <div className="text-sm text-white/80 flex items-center gap-2">
              <FiCheckCircle /> Disponibles
            </div>
            <div className="text-2xl font-semibold mt-1">{stats.disponibles}</div>
          </div>
          <div className="rounded-xl bg-white/10 backdrop-blur p-4">
            <div className="text-sm text-white/80 flex items-center gap-2">
              <FiXCircle /> No disponibles
            </div>
            <div className="text-2xl font-semibold mt-1">{stats.noDisponibles}</div>
          </div>
          <div className="rounded-xl bg-white/10 backdrop-blur p-4">
            <div className="text-sm text-white/80 flex items-center gap-2">
              <FiClock /> Promedio turno
            </div>
            <div className="text-2xl font-semibold mt-1">{stats.promedioTurno}</div>
          </div>
        </div>
      </div>

      {/* Siguiente disponible */}
      <div className="card bg-base-100 shadow-md border border-base-300/60 rounded-2xl">
        <div className="card-body p-5">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Siguiente disponible (sin asignar)</h3>
            <Badge color="info">Vista previa</Badge>
          </div>

          {loadingSiguiente ? (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mt-3">
              <SkeletonLine />
              <SkeletonLine />
              <SkeletonLine />
              <SkeletonLine />
            </div>
          ) : errorSiguiente ? (
            <p className="text-red-600 mt-2">Error: {(errorSiguiente as Error).message}</p>
          ) : siguiente ? (
            <div className="mt-3 flex items-center gap-4">
              <div className="avatar placeholder">
                <div className="bg-indigo-600 text-white w-14 rounded-full shadow">
                  <span className="text-lg font-semibold">{getInitials(siguiente.nombre, siguiente.apellido)}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-sm w-full">
                <div className="p-3 rounded-xl bg-base-200">
                  <div className="text-xs text-base-content/70 flex items-center gap-2">
                    <FiUser /> Nombre
                  </div>
                  <div className="font-medium">{siguiente.nombre} {siguiente.apellido}</div>
                </div>
                <div className="p-3 rounded-xl bg-base-200">
                  <div className="text-xs text-base-content/70 flex items-center gap-2">
                    <FiPhone /> Teléfono
                  </div>
                  <div className="font-medium">{siguiente.telefono_whatsapp}</div>
                </div>
                <div className="p-3 rounded-xl bg-base-200">
                  <div className="text-xs text-base-content/70 flex items-center gap-2">
                    <FiClock /> Turno
                  </div>
                  <div className="font-medium">{siguiente.turno_orden}</div>
                </div>
              </div>
            </div>
          ) : (
            <div className="mt-3 p-4 rounded-xl bg-base-200 text-base-content/80">
              No hay domiciliarios disponibles ahora mismo.
            </div>
          )}
        </div>
      </div>

      {/* Listado por disponibilidad */}
      <div className="card bg-base-100 shadow-md border border-base-300/60 rounded-2xl">
        <div className="card-body p-0">
          <div className="px-5 pt-5 pb-3 flex items-center justify-between">
            <h3 className="text-lg font-semibold">Listado por disponibilidad</h3>
            <div className="flex items-center gap-2 text-xs">
              <Badge color="success">Disponible</Badge>
              <Badge color="error">No disponible</Badge>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead className="sticky top-0 z-10 bg-base-200/80 backdrop-blur">
                <tr className="text-xs uppercase tracking-wide text-base-content/70">
                  <th className="rounded-tl-2xl">#</th>
                  <th>Nombre</th>
                  <th>Teléfono</th>
                  <th>Estado</th>
                  <th className="rounded-tr-2xl">Turno</th>
                  <th className="rounded-tr-2xl">Zona</th>
                </tr>
              </thead>

              <tbody>
                {loadingOrden && (
                  <>
                    {Array.from({ length: 6 }).map((_, i) => (
                      <tr key={`sk-${i}`}>
                        <td><SkeletonLine w="w-10" /></td>
                        <td><SkeletonLine w="w-40" /></td>
                        <td><SkeletonLine w="w-32" /></td>
                        <td><SkeletonLine w="w-24" /></td>
                        <td><SkeletonLine w="w-16" /></td>
                      </tr>
                    ))}
                  </>
                )}

                {!loadingOrden && errorOrden && (
                  <tr>
                    <td colSpan={5} className="text-center py-8 text-red-600">
                      Error: {(errorOrden as Error).message}
                    </td>
                  </tr>
                )}

                {!loadingOrden && !errorOrden && (domisOrdenados?.length || 0) === 0 && (
                  <tr>
                    <td colSpan={5} className="text-center py-8 text-base-content/60">
                      No hay registros para mostrar.
                    </td>
                  </tr>
                )}

                {!loadingOrden &&
                  !errorOrden &&
                  domisOrdenados?.map((d) => (
                    <tr
                      key={d.id}
                      className="hover:bg-base-200/60 transition-colors"
                    >
                      <td className="font-medium">{d.id}</td>
                      <td className="whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <div className="avatar placeholder">
                            <div className="bg-base-300 text-base-content w-9 rounded-full">
                              <span className="text-xs font-semibold">{getInitials(d.nombre, d.apellido)}</span>
                            </div>
                          </div>
                          <div className="leading-tight">
                            <div className="font-medium">{d.nombre} {d.apellido}</div>
                            <div className="text-[11px] opacity-70">Alias: {d.alias || '—'}</div>
                          </div>
                        </div>
                      </td>
                      <td className="whitespace-nowrap">
                        <div className="inline-flex items-center gap-2">
                          <FiPhone className="opacity-70" />
                          {d.telefono_whatsapp}
                        </div>
                      </td>
                      <td>
                        {d.disponible ? (
                          <Badge color="success">
                            <FiCheckCircle /> Disponible
                          </Badge>
                        ) : (
                          <Badge color="error">
                            <FiXCircle /> No disponible
                          </Badge>
                        )}
                      </td>
                      <td className="font-medium">{d.turno_orden}</td>
                      <td className="font-medium">
                        <span
                          className={`badge ${d.zona_id === 1
                              ? 'badge-info'
                              : d.zona_id === 2
                                ? 'badge-success'
                                : 'badge-ghost'
                            }`}
                        >
                          {d.zona_id === 1
                            ? 'Zona Centro'
                            : d.zona_id === 2
                              ? 'Zona Solarte'
                              : `Zona ${d.zona_id ?? '—'}`}
                        </span>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>

          {/* Footer tabla */}
          <div className="px-5 py-3 text-xs text-base-content/60 border-t border-base-300/60 rounded-b-2xl">
            {loadingOrden
              ? 'Cargando registro…'
              : `${stats.total} registro(s) · ${stats.disponibles} disponible(s) · ${stats.noDisponibles} no disponible(s)`}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ModuloGestionDomi;
