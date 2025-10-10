import React, { useMemo } from "react";
import { useDomiciliariosPorDisponibilidad } from "../../services/domiServices";

export type Domi = {
  id: number;
  nombre: string;
  apellido: string;
  alias?: string;
  telefono_whatsapp?: string;
  disponible: boolean;
  turno_orden: number;
    zona_id?: number;
};

// Ordena: siempre primero los disponibles por turno ASC, luego no disponibles por turno ASC
const ordenar = (xs: Domi[]) => {
  const disponibles = xs.filter((d) => d.disponible).sort((a, b) => (a.turno_orden ?? 0) - (b.turno_orden ?? 0));
  const noDisponibles = xs.filter((d) => !d.disponible).sort((a, b) => (a.turno_orden ?? 0) - (b.turno_orden ?? 0));
  return [...disponibles, ...noDisponibles];
};

// Asigna posición absoluta en la fila (1..n)
const conPosicion = (xs: Domi[]) => xs.map((d, i) => ({ ...d, posicion: i + 1 }));

const ListDomi: React.FC = () => {
  const { data = [], isLoading, isError, error, refetch, isRefetching } = useDomiciliariosPorDisponibilidad();

  const ordered = useMemo(() => conPosicion(ordenar(data as Domi[])), [data]);

  return (
    <section className="space-y-3 mt-4 px-3">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Fila de turnos</h2>
        <button
          onClick={() => refetch()}
          className={isRefetching ? "btn btn-xs btn-disabled" : "btn btn-xs btn-outline"}
        >
          {isRefetching ? "Actualizando…" : "Refrescar"}
        </button>
      </div>

      {isLoading && <div className="p-4 text-sm text-base-content/60">Cargando…</div>}
      {isError && <div className="p-4 text-sm text-error">{(error as Error)?.message || "Error al cargar"}</div>}

      <ol className="divide-y divide-base-300 rounded-xl border border-base-300 overflow-hidden">
        {ordered.map((d) => (
          <li key={d.id} className="flex items-center gap-3 p-3 hover:bg-base-200/50">
            {/* posición en la fila */}
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-content text-xs font-bold">
              {d.posicion}
            </span>

            {/* nombre */}
            <div className="flex-1 min-w-0">
              <div className="font-medium truncate">
                {d.nombre} {d.apellido}
              </div>
              {d.alias && <div className="text-xs text-base-content/60 truncate">Alias: {d.alias}</div>}
            </div>

            {/* turno y estado básico */}
            <div className="text-right text-xs leading-tight">
              <div className="font-semibold">Turno: {d.turno_orden ?? 0}</div>
                 <div className="font-semibold"><span
                          className={`badge-sm badge flex min-w-24 text-white ${d.zona_id === 1
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
                        </span></div>
              <div
                className={
                  "mt-0.5 inline-flex items-center rounded-full px-2 py-0.5 " +
                  (d.disponible ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800")
                }
              >
                {d.disponible ? "Disponible" : "No disponible"}
              </div>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
};

export default ListDomi;