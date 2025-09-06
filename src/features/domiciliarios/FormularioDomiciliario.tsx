import React, { useEffect, useState } from 'react';
import { z } from 'zod';
import { DomiciliarioType } from '../../shared/types/domiInterface';
import { useRegistrarDomiciliario, useActualizarDomiciliario } from '../../services/domiServices';

const domiciliarioSchema = z.object({
  nombre: z.string().min(1, { message: "El nombre es requerido" }),
  apellido: z.string().min(1, { message: "El apellido es requerido" }),
  alias: z.string().min(1, { message: "El alias es requerido" }),
  telefono_whatsapp: z.string().min(10, { message: "Teléfono inválido" }),
  placa_moto: z.string().min(1, { message: "La placa es requerida" }),
  numero_chaqueta: z.coerce.number().int().min(1, { message: "Número de chaqueta requerido" }),
  direccion_residencia: z.string().min(1, { message: "Dirección requerida" }),
  estado: z.coerce.boolean(),
  disponible: z.coerce.boolean(),
  turno_orden: z.coerce.number().int().optional(), // lo usas abajo; añade input si es requerido
});

interface Props {
  domiciliario?: DomiciliarioType;
}

const empty: DomiciliarioType = {
  id: undefined,
  nombre: '',
  apellido: '',
  alias: '',
  telefono_whatsapp: '',
  placa_moto: '',
  numero_chaqueta: 0,
  direccion_residencia: '',
  estado: true,
  disponible: true,
  turno_orden: 0,
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
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const target = e.target;
      const value =
        target.type === 'checkbox'
          ? (target as HTMLInputElement).checked
          : target.type === 'number'
          ? Number(target.value)
          : target.value;
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

    if (domiciliario?.id) {
      actualizarDomiciliario(data);
    } else {
      registrarDomiciliario(data);
    }

    setError(null);
    // Limpia a vacío tras guardar si estás en modo “crear”
    setFormState(empty);
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {[
        { label: 'Nombre', name: 'nombre' as const },
        { label: 'Apellido', name: 'apellido' as const },
        { label: 'Alias', name: 'alias' as const },
        { label: 'Teléfono WhatsApp', name: 'telefono_whatsapp' as const },
        { label: 'Placa Moto', name: 'placa_moto' as const },
        { label: 'Número Chaqueta', name: 'numero_chaqueta' as const, type: 'number' },
        { label: 'Dirección', name: 'direccion_residencia' as const },
        // Si usas turno_orden, añade su input:
        { label: 'Turno Orden', name: 'turno_orden' as const, type: 'number' },
      ].map(({ label, name, type = 'text' }) => (
        <div key={name}>
          <label className="label">{label}</label>
          <input
            type={type}
            name={name}
            value={(formState as any)[name] ?? (type === 'number' ? 0 : '')}
            onChange={onChange(name)}
            className="input input-bordered w-full"
          />
        </div>
      ))}

      <div className="flex gap-4">
        <label className="label cursor-pointer">
          <input
            type="checkbox"
            name="estado"
            checked={!!formState.estado}
            onChange={onChange('estado')}
            className="checkbox checkbox-sm"
          />
          <span className="ml-2">Activo</span>
        </label>

        <label className="label cursor-pointer">
          <input
            type="checkbox"
            name="disponible"
            checked={!!formState.disponible}
            onChange={onChange('disponible')}
            className="checkbox checkbox-sm"
          />
          <span className="ml-2">Disponible</span>
        </label>
      </div>

      {error && <p className="text-red-600 text-sm">{error}</p>}

      <button type="submit" className="btn btn-primary w-full">
        {domiciliario ? 'Actualizar Domiciliario' : 'Registrar Domiciliario'}
      </button>
    </form>
  );
};

export default FormularioDomiciliario;
