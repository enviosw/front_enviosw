// src/pages/(ruta-que-uses)/DomiciliosPendientes2.tsx
import React, { useMemo } from "react";
import { useDomiciliosPlataforma } from "../../services/domiServices";
import Loader from "../../utils/Loader";
import { formatDate } from "../../utils/formatearFecha";

// Estado acá no lo usamos porque siempre será pendiente para este listado
export type Domicilio = {
  id: number;
  fecha?: string | null;
  hora?: string | null;
  tipo_servicio?: string | number | null;
  origen_direccion?: string | null;
  destino_direccion?: string | null;
  notas?: string | null;
  detalles_pedido?: string | null;
};

const formatFechaHora = (iso?: string | null, hora?: string | null) => {
  const base = iso
    ? formatDate?.(iso) ??
      new Date(iso).toLocaleDateString("es-CO", { timeZone: "America/Bogota" })
    : "—";

  const hhmm =
    hora ??
    (iso
      ? new Date(iso).toLocaleTimeString("es-CO", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
          timeZone: "America/Bogota",
        })
      : null);

  return hhmm ? `${base} · ${hhmm}` : base;
};

// 🎯 Tarjeta simple tipo lista, solo con turno + origen + destino + detalles
const DomicilioCardPublic: React.FC<{ d: Domicilio; index: number }> = ({ d, index }) => {
  const fechaMostrada = useMemo(() => {
    return formatFechaHora(d.fecha, d.hora);
  }, [d.fecha, d.hora]);

  // Texto para que la gente vea cuántos turnos faltan
  const pedidosAntes = index;
  let textoTurnoExtra = "";

  if (pedidosAntes === 0) {
    textoTurnoExtra = "Tu pedido es el siguiente que vamos a tomar. 👇";
  } else if (pedidosAntes === 1) {
    textoTurnoExtra = "Falta 1 pedido antes de que tomemos el tuyo.";
  } else {
    textoTurnoExtra = `Faltan ${pedidosAntes} pedidos antes de que tomemos el tuyo.`;
  }

  return (
    <li className="card bg-base-100 shadow-sm border border-base-200">
      <div className="card-body p-3 gap-2">
        {/* Turno + fecha */}
        <div className="flex items-center justify-between gap-2">
          <div>
            <p className="text-[11px] text-base-content/60 font-medium">Turno</p>
            <p className="text-lg font-extrabold text-base-content">
              #{index + 1}
            </p>
          </div>
          <p className="text-[11px] text-right text-base-content/60">
            {fechaMostrada}
          </p>
        </div>

        <p className="text-[11px] text-emerald-600">
          {textoTurnoExtra}
        </p>

        <div className="divider my-2" />

        {/* Solo info clave para que el cliente se reconozca */}
        <div className="text-xs text-base-content space-y-1">
          {d.origen_direccion && (
            <p>
              <span className="font-semibold">Origen: </span>
              {d.origen_direccion}
            </p>
          )}

          {d.destino_direccion && (
            <p>
              <span className="font-semibold">Destino: </span>
              {d.destino_direccion}
            </p>
          )}

          {d.detalles_pedido && (
            <p className="break-words">
              <span className="font-semibold">Detalles: </span>
              {d.detalles_pedido}
            </p>
          )}
        </div>
      </div>
    </li>
  );
};

const DomiciliosPendientes2: React.FC = () => {
  const {
    data: domicilios,
    isLoading,
    error,
    isFetching,
    refetch,
  } = useDomiciliosPlataforma(0); // aquí ya asumes que este endpoint trae solo pendientes

  const items = useMemo(() => domicilios ?? [], [domicilios]);

  return (
    <section className="w-full max-w-md mx-auto space-y-3 p-3">
      {/* Header + botón Actualizar */}
      <header className="space-y-2">
        <div className="flex items-center justify-between gap-2">
          <div className="text-left">
            <h2 className="text-lg font-bold text-base-content">
              Domicilios en fila
            </h2>
            <p className="text-[11px] text-base-content/60 max-w-xs">
              Busca tu pedido por la dirección y los detalles que escribiste.
              El turno indica en qué posición va tu pedido.
            </p>
          </div>

          <button
            type="button"
            onClick={() => refetch()}
            className="btn btn-xs btn-outline btn-primary"
            disabled={isFetching}
          >
            {isFetching ? "Actualizando..." : "Actualizar"}
          </button>
        </div>
      </header>

      {isLoading ? (
        <div className="alert alert-info text-xs flex items-center justify-center gap-2">
          <span>Cargando domicilios…</span>
          <Loader />
        </div>
      ) : error ? (
        <div className="alert alert-error text-sm">
          <span>Ocurrió un error al cargar los domicilios.</span>
        </div>
      ) : items.length === 0 ? (
        <div className="alert alert-neutral text-sm justify-center">
          <span>No hay domicilios en este momento.</span>
        </div>
      ) : (
        <ul className="flex flex-col gap-2">
          {items.map((d, index) => (
            <DomicilioCardPublic key={d.id} d={d as Domicilio} index={index} />
          ))}
        </ul>
      )}
    </section>
  );
};

export default DomiciliosPendientes2;
