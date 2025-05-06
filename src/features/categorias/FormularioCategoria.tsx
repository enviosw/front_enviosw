import React, { useState } from 'react';
import { z } from 'zod';
import { CategoriaType } from '../../shared/types/categoriaInterface';
import { useRegistrarCategoria, useActualizarCategoria } from '../../services/categoriasServices';
import { useAuth } from '../../context/AuthContext';

// Definir el esquema de validación con Zod
const categoriaSchema = z.object({
  nombre: z.string().min(1, { message: "El nombre es requerido" }),
});

interface Props {
  categoria?: CategoriaType;
}

const FormularioCategoria: React.FC<Props> = ({ categoria }) => {
  const { mutate: registrarCategoria } = useRegistrarCategoria();
  const { mutate: actualizarCategoria } = useActualizarCategoria();
  
    const { user } = useAuth();
    const comercioId = user?.comercioId || 0;

  const [error, setError] = useState<string | null>(null); // Para manejar el error

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    const data: CategoriaType = {
      id: categoria?.id,
      nombre: formData.get('nombre') as string,
      comercioId: Number(comercioId)

    };

    // Validar los datos con Zod
    const result = categoriaSchema.safeParse(data);

    if (!result.success) {
      // Si la validación falla, establecer el error
      setError(result.error.errors[0].message);
      return;
    }

    // Si la validación es exitosa, enviar los datos
    if (categoria?.id) {
      actualizarCategoria(data);
    } else {
      registrarCategoria(data);
    }

    setError(null); // Limpiar el error si la validación es exitosa
    form.reset(); // Limpiar el formulario tras enviar
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label className="label">Nombre</label>
        <input
          type="text"
          name="nombre"
          defaultValue={categoria?.nombre || ''}
          className="input input-bordered w-full"
        />
        {/* Mostrar el mensaje de error debajo del input */}
        {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
      </div>

      <button type="submit" className="btn btn-primary w-full">
        {categoria ? 'Actualizar Categoría' : 'Registrar Categoría'}
      </button>
    </form>
  );
};

export default FormularioCategoria;
