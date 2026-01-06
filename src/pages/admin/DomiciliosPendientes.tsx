import React, { useMemo, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useDomiciliosPlataforma } from "../../services/domiServices";
import Loader from "../../utils/Loader";
import { formatDate } from "../../utils/formatearFecha";
import { useAuth } from "../../context/AuthContext"; // ✅ NUEVO (ajusta la ruta si es diferente)

export type Domicilio = {
  id: number;
  mensaje_confirmacion?: string | null;
  estado: number;
  fecha?: string | null;
  hora?: string | null;
  numero_cliente?: string | null;
  tipo_servicio?: string | number | null;
  origen_direccion?: string | null;
  destino_direccion?: string | null;
  telefono_contacto_origen?: string | null;
  telefono_contacto_destino?: string | null;
  notas?: string | null;
  detalles_pedido?: string | null;
  foto_entrega_url?: string | null;
  fecha_creacion?: string | null;
  fecha_actualizacion?: string | null;
  fecha_asignacion?: string | null;
  fecha_cancelacion?: string | null;
  motivo_cancelacion?: string | null;
};

/** Helper de clases */
const cx = (...classes: (string | false | undefined)[]) => classes.filter(Boolean).join(" ");

/** Paleta por estado (estado 1 en verde Bootstrap, como pediste) */
const estadoConfig: Record<
  number,
  { label: string; bg: string; text: string; dot: string; ring: string; border: string; pill: string }
> = {
  1: {
    // PENDIENTE -> VERDE (Bootstrap)
    label: "PENDIENTE",
    bg: "bg-success",
    text: "text-white",
    dot: "bg-white",
    ring: "ring-emerald-200",
    border: "border-emerald-200",
    pill: "from-emerald-100 to-emerald-50",
  },
  2: {
    // ASIGNADO
    label: "ASIGNADO",
    bg: "bg-indigo-50",
    text: "text-indigo-800",
    dot: "bg-indigo-500",
    ring: "ring-indigo-200",
    border: "border-indigo-200",
    pill: "from-indigo-100 to-indigo-50",
  },
  3: {
    // EN RUTA
    label: "EN RUTA",
    bg: "bg-sky-50",
    text: "text-sky-800",
    dot: "bg-sky-500",
    ring: "ring-sky-200",
    border: "border-sky-200",
    pill: "from-sky-100 to-sky-50",
  },
  4: {
    // ENTREGADO
    label: "ENTREGADO",
    bg: "bg-emerald-50",
    text: "text-emerald-800",
    dot: "bg-emerald-500",
    ring: "ring-emerald-200",
    border: "border-emerald-200",
    pill: "from-emerald-100 to-emerald-50",
  },
  5: {
    // CANCELADO
    label: "CANCELADO",
    bg: "bg-rose-50",
    text: "text-rose-800",
    dot: "bg-rose-500",
    ring: "ring-rose-200",
    border: "border-rose-200",
    pill: "from-rose-100 to-rose-50",
  },
};

const fallbackCfg = {
  label: "ESTADO",
  bg: "bg-gray-50",
  text: "text-gray-800",
  dot: "bg-gray-400",
  ring: "ring-gray-200",
  border: "border-gray-200",
  pill: "from-gray-100 to-gray-50",
};

const EstadoBadge: React.FC<{ value: number }> = ({ value }) => {
  const cfg = estadoConfig[value] ?? { ...fallbackCfg, label: `ESTADO ${value}` };

  return (
    <span
      className={cx(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold ring-1 ring-inset",
        cfg.bg,
        cfg.text,
        cfg.ring
      )}
    >
      <span className={cx("inline-block h-1.5 w-1.5 rounded-full", cfg.dot)} />
      {cfg.label}
    </span>
  );
};

const Field: React.FC<{ label: string; children: React.ReactNode; icon?: React.ReactNode }> = ({
  label,
  children,
  icon,
}) => (
  <div className="rounded-xl bg-gray-200 p-3 ring-1 ring-inset ring-slate-200">
    <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wide text-slate-500">
      {icon}
      <span>{label}</span>
    </div>
    <div className="mt-1 text-sm text-slate-800">{children}</div>
  </div>
);

const PhoneIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
    <path
      d="M2 5c0-1.1.9-2 2-2h2c.8 0 1.5.5 1.8 1.2l1.1 2.6c.3.7.1 1.6-.5 2.1l-1.2 1c1.1 2.3 3 4.2 5.3 5.3l1-1.2c.5-.6 1.4-.8 2.1-.5l2.6 1.1c.7.3 1.2 1 1.2 1.8v2c0 1.1-.9 2-2 2h-1C9.6 22 2 14.4 2 5V5Z"
      stroke="currentColor"
      strokeWidth="1.5"
    />
  </svg>
);
const OriginIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
    <path
      d="M12 2v20M5 9l7-7 7 7"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
const DestIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
    <path
      d="M12 22V2M19 15l-7 7-7-7"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/** Util: fecha + hora (CO) */
const formatFechaHora = (iso?: string | null, hora?: string | null) => {
  const base = iso
    ? formatDate?.(iso) ?? new Date(iso).toLocaleDateString("es-CO", { timeZone: "America/Bogota" })
    : "—";
  // Si viene 'hora' en el payload la usamos; si no, la derivamos del ISO
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

// ✅ NUEVO: recibe isAdmin para ocultar info sensible
const DomicilioItem: React.FC<{ d: Domicilio; isAdmin: boolean }> = ({ d, isAdmin }) => {
  const [open, setOpen] = useState(false);

  /** AHORA: fechaMostrada incluye hora */
  const fechaMostrada = useMemo(() => {
    const iso = d.fecha ?? d.fecha_creacion ?? "";
    return formatFechaHora(iso, d.hora);
  }, [d.fecha, d.fecha_creacion, d.hora]);

  const cfg = estadoConfig[d.estado] ?? fallbackCfg;

  return (
    <li
      className={cx("group rounded-2xl border bg-white p-4 shadow-sm transition", "hover:shadow-md", cfg.border)}
      style={{
        backgroundImage: `linear-gradient(to right, var(--tw-gradient-from), var(--tw-gradient-to))`,
      }}
    >
      <div className={cx("rounded-xl bg-white/80 p-3 backdrop-blur", "ring-1 ring-inset", cfg.ring)}>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div
              className={cx(
                "flex h-10 w-10 items-center justify-center rounded-xl text-sm font-bold",
                cfg.bg,
                cfg.text,
                "ring-1 ring-inset",
                cfg.ring
              )}
            >
              #{d.id}
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <EstadoBadge value={d.estado} />
                <span className="text-xs text-slate-500">{fechaMostrada}</span>
              </div>

              {/* ✅ NUEVO: si NO es admin, NO mostrar numero_cliente */}
              <div className="mt-0.5 text-sm text-slate-600">
                {isAdmin ? (
                  <>
                    Cliente: <span className="font-medium">{d.numero_cliente ?? "—"}</span>
                  </>
                ) : (
                  <span className="font-medium">Hay un pedido para tomar</span>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 sm:justify-end">
            {/* ✅ NUEVO: llamar SOLO admin */}
            {isAdmin && d.numero_cliente && (
              <a
                href={`tel:${d.numero_cliente}`}
                className={cx(
                  "inline-flex items-center gap-1.5  text-success rounded-xl px-3 py-1.5 text-sm font-medium",
                  "ring-1 ring-inset",
                  cfg.ring,
                  cfg.text,
                  "bg-white hover:bg-slate-50"
                )}
                aria-label={`Llamar al cliente ${d.numero_cliente}`}
              >
                <span className="flex text-black gap-2">
                  <PhoneIcon />
                  Llamar
                </span>
              </a>
            )}

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className={cx(
                "rounded-xl px-3 py-1.5 text-sm font-semibold text-white shadow-sm",
                "bg-slate-900 hover:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2",
                cfg.ring
              )}
              aria-expanded={open}
              aria-controls={`detalle-${d.id}`}
            >
              {open ? "Ocultar" : "Ver"} detalles
            </button>
          </div>
        </div>

        {/* ✅ NUEVO: Origen/Destino SOLO admin */}
        {isAdmin ? (
          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <Field label="Origen" icon={<OriginIcon />}>
              {d.origen_direccion || "—"}
            </Field>
            <Field label="Destino" icon={<DestIcon />}>
              {d.destino_direccion || "—"}
            </Field>
          </div>
        ) : (
          <div className="mt-4 rounded-xl bg-slate-50 p-3 ring-1 ring-inset ring-slate-200 text-sm text-slate-700">
            Pedido disponible para tomar. La información del cliente está protegida.
          </div>
        )}

        {/* ✅ NUEVO: detalles sensibles SOLO admin; si no, aviso */}
        {open && isAdmin && (
          <div id={`detalle-${d.id}`} className="mt-4 rounded-xl bg-white/70 p-3 ring-1 ring-inset ring-slate-200">
            <div className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">Detalles del pedido</div>
            <pre className="mt-1 whitespace-pre-wrap break-words text-sm text-slate-800">{d.detalles_pedido || "—"}</pre>

            {(d.notas || d.mensaje_confirmacion) && (
              <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {d.notas && (
                  <div className="rounded-lg bg-slate-50 p-3 ring-1 ring-inset ring-slate-200">
                    <div className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">Notas</div>
                    <p className="mt-1 text-sm text-slate-700">{d.notas}</p>
                  </div>
                )}
                {d.mensaje_confirmacion && (
                  <div className="rounded-lg bg-slate-50 p-3 ring-1 ring-inset ring-slate-200">
                    <div className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">Mensaje</div>
                    <p className="mt-1 text-sm text-slate-700">{d.mensaje_confirmacion}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {open && !isAdmin && (
          <div id={`detalle-${d.id}`} className="mt-4 rounded-xl bg-amber-50 p-3 ring-1 ring-inset ring-amber-200">
            <div className="text-[11px] font-semibold uppercase tracking-wide text-amber-800">Acceso restringido</div>
            <p className="mt-1 text-sm text-amber-800">Tu rol no puede ver información sensible del cliente.</p>
          </div>
        )}
      </div>
    </li>
  );
};

const DomiciliosPendientes: React.FC = () => {
  const queryClient = useQueryClient();

  // ✅ NUEVO: obtenemos el usuario y calculamos isAdmin
  const { user } = useAuth();
  const isAdmin = user?.rol === "administrador";

  const { data: domicilios, isLoading, error, isFetching } = useDomiciliosPlataforma(0, { pollMs: 10000 });
  const items = domicilios ?? [];

  /** También muestro hora en “Última actualización” */
  //   const ultimaActualizacion = formatFechaHora(new Date().toISOString(), null);

  return (
    <section className="w-full space-y-4">
      {/* Header sticky con gradiente */}
      <div className="sticky top-0 z-10 -mx-2 mb-1 px-2 py-3 backdrop-blur">
        <div className="rounded-2xl bg-gradient-to-r from-indigo-600 via-fuchsia-600 to-rose-600 p-[1px] shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-white/95 px-3 py-2">
            <div>
              <h2 className="text-lg font-bold tracking-tight sm:text-xl">Domicilios pendientes</h2>
              <p className="text-xs text-slate-500 sm:text-sm">Chatbot </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() =>
                  queryClient.invalidateQueries({
                    queryKey: ["domicilios", "plataforma", { estado: 1 }],
                  })
                }
                className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-300"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path
                    d="M4 4v6h6M20 20v-6h-6M6.5 6.5a7.5 7.5 0 0 1 12.3 2.7M17.5 17.5A7.5 7.5 0 0 1 5.2 14.8"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
                {isFetching ? "Actualizando…" : "Refrescar"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center gap-2 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-6 text-slate-700">
          Cargando domicilios… <Loader />
        </div>
      ) : error ? (
        <div className="rounded-2xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700">
          Error: {(error as Error).message}
        </div>
      ) : items.length === 0 ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-slate-100 to-white ring-1 ring-inset ring-slate-200">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M4 7h16M4 12h16M4 17h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>
          <h3 className="text-base font-semibold text-slate-900">Sin pendientes</h3>
          <p className="mt-1 text-sm text-slate-500">No hay domicilios en estado 1 por ahora.</p>
          <button
            type="button"
            onClick={() =>
              queryClient.invalidateQueries({
                queryKey: ["domicilios", "plataforma", { estado: 1 }],
              })
            }
            className="mt-4 rounded-xl px-3 py-2 text-sm font-medium text-slate-700 ring-1 ring-inset ring-slate-200 hover:bg-slate-50"
          >
            Volver a intentar
          </button>
        </div>
      ) : (
        <>
          {/* <div className="flex flex-col gap-2 rounded-2xl border border-slate-200 bg-white p-3 text-sm text-slate-700 sm:flex-row sm:items-center sm:justify-between">
            <span>
              Total: <span className="font-semibold">{items.length}</span>
            </span>
            <span className="text-slate-500">
              Última actualización: {ultimaActualizacion}
            </span>
          </div> */}

          <ul className="grid grid-cols-1 gap-3">
            {items.map((d: any) => (
              <DomicilioItem key={d.id} d={d} isAdmin={isAdmin} />
            ))}
          </ul>
        </>
      )}
    </section>
  );
};

export default DomiciliosPendientes;
