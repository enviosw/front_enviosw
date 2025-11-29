import React, { useEffect, useState } from 'react';
import { z } from 'zod';
import { DomiciliarioType } from '../../shared/types/domiInterface';
import { useRegistrarDomiciliario, useActualizarDomiciliario } from '../../services/domiServices';

// 👉 Schema actualizado
const domiciliarioSchema = z.object({
  nombre: z.string().min(1, { message: "El nombre es requerido" }),
  apellido: z.string().min(1, { message: "El apellido es requerido" }),
  telefono_whatsapp: z.string().min(10, { message: "Teléfono inválido" }),
  placa_moto: z.string().min(1, { message: "La placa es requerida" }),
  numero_chaqueta: z.coerce.number().int().min(1, { message: "Número de chaqueta requerido" }),
  direccion_residencia: z.string().min(1, { message: "Dirección requerida" }),

  estado: z.coerce.boolean(),
  disponible: z.coerce.boolean(),

  horario: z.string().optional().nullable(),

  // 👇 Ahora descanso solo acepta días válidos o null
  descanso: z
    .enum([
      "Lunes",
      "Martes",
      "Miércoles",
      "Jueves",
      "Viernes",
      "Sábado",
      "Domingo",
    ])
    .optional()
    .nullable(),
});

interface Props {
  domiciliario?: DomiciliarioType;
}

const diasSemana = [
  "Lunes",
  "Martes",
  "Miércoles",
  "Jueves",
  "Viernes",
  "Sábado",
  "Domingo",
];

const empty: DomiciliarioType = {
  id: undefined,
  nombre: '',
  apellido: '',
  telefono_whatsapp: '',
  placa_moto: '',
  numero_chaqueta: 0,
  direccion_residencia: '',
  estado: true,
  disponible: true,
  horario: null,
  descanso: null,
};

const FormularioDomiciliario: React.FC<Props> = ({ domiciliario }) => {
  const { mutate: registrarDomiciliario } = useRegistrarDomiciliario();
  const { mutate: actualizarDomiciliario } = useActualizarDomiciliario();

  const [formState, setFormState] = useState<DomiciliarioType>(empty);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setFormState(domiciliario ? { ...empty, ...domiciliario } : empty);
  }, [domiciliario]);

  const onChange =
    (name: keyof DomiciliarioType) =>
      (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const value = e.target.type === "number"
          ? Number(e.target.value)
          : e.target.value;
        setFormState((s) => ({ ...s, [name]: value }));
      };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data: DomiciliarioType = { ...formState, id: domiciliario?.id };

    const result = domiciliarioSchema.safeParse(data);
    if (!result.success) {
      setError(result.error.errors[0].message);
      return;
    }

    if (domiciliario?.id) actualizarDomiciliario(data);
    else registrarDomiciliario(data);

    setError(null);
    setFormState(empty);
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4">

      {/* Campos normales */}
      {[
        { label: 'Nombre', name: 'nombre' as const },
        { label: 'Apellido', name: 'apellido' as const },
        { label: 'Teléfono WhatsApp', name: 'telefono_whatsapp' as const },
        { label: 'Número Chaqueta', name: 'numero_chaqueta' as const, type: 'number' },

        { label: 'Placa Moto', name: 'placa_moto' as const },
        { label: 'Dirección', name: 'direccion_residencia' as const },
        { label: 'Horario (ej: 08:00-18:00)', name: 'horario' as const },
      ].map(({ label, name, type = 'text' }) => (
        <div key={name}>
          <label className="label">{label}</label>
          <input
            type={type}
            name={name}
            value={(formState as any)[name] ?? ''}
            onChange={onChange(name)}
            className="input input-bordered w-full"
          />
        </div>
      ))}

      {/* SELECT de descanso */}
      <div>
        <label className="label">Día de descanso</label>
        <select
          name="descanso"
          value={formState.descanso ?? ""}
          onChange={onChange("descanso")}
          className="select select-bordered w-full"
        >
          <option value="">Seleccione un día</option>

          {diasSemana.map((dia) => (
            <option key={dia} value={dia}>
              {dia}
            </option>
          ))}
        </select>
      </div>

      {error && <p className="text-red-600 text-sm">{error}</p>}

      <button type="submit" className="btn btn-primary w-full">
        {domiciliario ? 'Actualizar Domiciliario' : 'Registrar Domiciliario'}
      </button>
    </form>
  );
};

export default FormularioDomiciliario;
