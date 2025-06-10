import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { productoSchema } from '../../shared/schemas/productoSchema';
import { useCategoriasPorComercio } from '../../services/categoriasServices';
import { useCrearProducto, useActualizarProducto } from '../../services/productosServices';
import { useAuth } from '../../context/AuthContext';
import { validateImageFilesWithClean } from '../../utils/validateImageFiles';
import { formatMiles, unformatMiles } from '../../utils/numberFormat';

type ProductoFormData = z.infer<typeof productoSchema>;

interface FormularioProductosProps {
  producto?: Partial<ProductoFormData> & { id?: number; categoria?: { id: number }; comercio?: { id: number } };
}

const FormularioProductos: React.FC<FormularioProductosProps> = ({ producto }) => {
  const crearMutation = useCrearProducto();
  const actualizarMutation = useActualizarProducto();
  const [imagen, setImagen] = useState<File | null>(null);
  const { user } = useAuth();
  const comercioId = user?.comercioId || 0;
  const [precioVisual, setPrecioVisual] = useState<string>(
    producto?.precio ? formatMiles(producto.precio) : ''
  );

  const { data: categorias = [] } = useCategoriasPorComercio(comercioId);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<ProductoFormData>({
    resolver: zodResolver(productoSchema),
    defaultValues: {
      ...producto,
      categoriaId: producto?.categoria?.id ? String(producto.categoria.id) : '',
      comercioId: String(comercioId),
    },
  });

  const onSubmit: SubmitHandler<ProductoFormData> = (data) => {
    // console.log('✅ Datos del formulario:', data);

    const formData = new FormData();

    for (const key in data) {
      const valor = data[key as keyof ProductoFormData];
      if (valor !== undefined && valor !== null && valor !== '') {
        formData.append(key, String(valor));
      }
    }


    // for (const [key, value] of formData.entries()) {
    //   console.log(`${key}:`, value);
    // }


    // console.log("---------", formData)

    if (imagen) {
      formData.append('logo', imagen);
    }

    if (producto?.id) {
      formData.append('id', String(producto.id)); // 🔥 ESTO ES LO QUE FALTABA
    }

    // console.log('🧾 FormData contenido:');
    // for (const [key, value] of formData.entries()) {
    //   console.log(`${key}:`, value);
    // }

    if (producto?.id) {
      actualizarMutation.mutate(formData);
    } else {
      crearMutation.mutate(formData);
    }

    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-0 lg:p-4 bg-white">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-semibold text-gray-800 mb-2">Nombre</label>
          <input {...register('nombre')} className="input input-bordered w-full" />
          {errors.nombre && <p className="text-red-500">{errors.nombre.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-800 mb-2">Descripción</label>
          <input {...register('descripcion')} className="input input-bordered w-full" />
          {errors.descripcion && <p className="text-red-500">{errors.descripcion.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-800 mb-2">Precio</label>

          <input
            type="text"
            value={precioVisual}
            onChange={(e) => {
              const raw = e.target.value.replace(/[^\d.]/g, ''); // solo números y puntos
              const unformatted = unformatMiles(raw);
              if (!isNaN(unformatted)) {
                setPrecioVisual(formatMiles(unformatted));
              }
            }}
            onBlur={() => {
              // sincroniza con el formulario cuando pierde foco
              const raw = unformatMiles(precioVisual);
              setValue('precio', raw); // setea en react-hook-form
            }}
            className="input input-bordered w-full"
          />
          {errors.precio && <p className="text-red-500">{errors.precio.message}</p>}
        </div>



        <div className='hidden'>
          <label className="block text-sm font-semibold text-gray-800 mb-2">Precio Descuento (opcional)</label>
          <input type="hidden" step="0.01" {...register('precio_descuento')} className="input input-bordered w-full" />
        </div>

        <div className='hidden'>
          <label className="block text-sm font-semibold text-gray-800 mb-2">Unidad</label>
          <input type='hidden' defaultValue="unidad" {...register('unidad')} className="input input-bordered w-full" />
          {errors.unidad && <p className="text-red-500">{errors.unidad.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-800 mb-2">Categoría</label>
          <select {...register('categoriaId')} className="select select-bordered w-full">
            <option value="">Seleccionar...</option>
            {categorias.map((cat) => (
              <option key={cat.id} value={String(cat.id)}>{cat.nombre}</option>
            ))}
          </select>
          {errors.categoriaId && <p className="text-red-500">{errors.categoriaId.message}</p>}
        </div>

        {producto?.id && (
          <>
            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-2">Estado</label>
              <select {...register('estado')} className="select select-bordered w-full">
                <option value="activo">Activo</option>
                <option value="inactivo">Inactivo</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-2">Estado Descuento</label>
              <select {...register('estado_descuento')} className="select select-bordered w-full">
                <option value="activo">Activo</option>
                <option value="inactivo">Inactivo</option>
              </select>
            </div>
          </>
        )}

        <div>
          <label className="block text-sm font-semibold text-gray-800 mb-2">Imagen</label>
          <input
            type="file"
            accept="image/*"
            name="logo"
            onChange={(e) => validateImageFilesWithClean(e, 500, setImagen)}
            className="file-input file-input-bordered w-full"
          />

        </div>
      </div>

      <div className="flex justify-center mt-8">
        <button type="submit" className="py-3 px-8 bg-orange-500 text-white font-bold rounded-full shadow-lg transform transition-all duration-300 ease-in-out hover:scale-105 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:opacity-50 disabled:cursor-not-allowed">
          {producto?.id ? 'Actualizar Producto' : 'Registrar Producto'}
        </button>
      </div>
    </form>
  );
};

export default FormularioProductos;
