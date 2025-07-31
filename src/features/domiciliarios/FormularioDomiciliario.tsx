import React, { useState } from 'react';
import { z } from 'zod';
import { DomiciliarioType } from '../../shared/types/domiInterface';
import { useRegistrarDomiciliario, useActualizarDomiciliario } from '../../services/domiServices';

// Esquema de validación con Zod
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
});

interface Props {
  domiciliario?: DomiciliarioType;
}

const FormularioDomiciliario: React.FC<Props> = ({ domiciliario }) => {
  const { mutate: registrarDomiciliario } = useRegistrarDomiciliario();
  const { mutate: actualizarDomiciliario } = useActualizarDomiciliario();
  const [error, setError] = useState<string | null>(null);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    const data: DomiciliarioType = {
      id: domiciliario?.id,
      nombre: formData.get('nombre') as string,
      apellido: formData.get('apellido') as string,
      alias: formData.get('alias') as string,
      telefono_whatsapp: formData.get('telefono_whatsapp') as string,
      placa_moto: formData.get('placa_moto') as string,
      numero_chaqueta: Number(formData.get('numero_chaqueta')),
      direccion_residencia: formData.get('direccion_residencia') as string,
      estado: formData.get('estado') === 'on',
      disponible: formData.get('disponible') === 'on',
      turno_orden: Number(formData.get('turno_orden')),
    };

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
    form.reset();
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {[
        { label: 'Nombre', name: 'nombre' },
        { label: 'Apellido', name: 'apellido' },
        { label: 'Alias', name: 'alias' },
        { label: 'Teléfono WhatsApp', name: 'telefono_whatsapp' },
        { label: 'Placa Moto', name: 'placa_moto' },
        { label: 'Número Chaqueta', name: 'numero_chaqueta', type: 'number' },
        { label: 'Dirección', name: 'direccion_residencia' },
      ].map(({ label, name, type = 'text' }) => (
        <div key={name}>
          <label className="label">{label}</label>
          <input
            type={type}
            name={name}
            defaultValue={(domiciliario as any)?.[name] || ''}
            className="input input-bordered w-full"
          />
        </div>
      ))}

      <div className="flex gap-4">
        <label className="label cursor-pointer">
          <input
            type="checkbox"
            name="estado"
            defaultChecked={domiciliario?.estado ?? true}
            className="checkbox checkbox-sm"
          />
          <span className="ml-2">Activo</span>
        </label>

        <label className="label cursor-pointer">
          <input
            type="checkbox"
            name="disponible"
            defaultChecked={domiciliario?.disponible ?? true}
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
