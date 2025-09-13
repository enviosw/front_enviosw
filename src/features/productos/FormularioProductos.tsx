import React, { useMemo, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { productoSchema } from '../../shared/schemas/productoSchema';
import { useCategoriasPorComercio } from '../../services/categoriasServices';
import { useCrearProducto, useActualizarProducto } from '../../services/productosServices';
import { useAuth } from '../../context/AuthContext';
// import { validateImageFilesWithClean } from '../../utils/validateImageFiles'; // ❌ Ya no se usa
import { formatMiles, unformatMiles } from '../../utils/numberFormat';
import { BASE_URL } from '../../utils/baseUrl';

type ProductoFormData = z.infer<typeof productoSchema>;

interface FormularioProductosProps {
  producto?: Partial<ProductoFormData> & { id?: number; categoria?: { id: number }; comercio?: { id: number } };
}

// === Utilidades de compresión ===
const readFileAsImage = (file: File): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = reader.result as string;
    };
    reader.readAsDataURL(file);
  });
};

const canvasToBlob = (canvas: HTMLCanvasElement, quality: number): Promise<Blob> => {
  return new Promise((resolve) => {
    canvas.toBlob(
      (blob) => resolve(blob as Blob),
      'image/jpeg',
      quality
    );
  });
};

/**
 * Comprime una imagen a ~targetKB. Estrategia:
 * 1) Reducir calidad JPEG de forma iterativa
 * 2) Si no alcanza, reducir dimensiones progresivamente
 */
const compressImageToTarget = async (
  file: File,
  targetKB = 200,
  maxWidth = 1600,
  maxHeight = 1600,
  minQuality = 0.4
): Promise<File> => {
  // Cargamos imagen
  const img = await readFileAsImage(file);

  // Dimensionado inicial respetando maxWidth/maxHeight
  let width = img.naturalWidth;
  let height = img.naturalHeight;

  const clampByBox = (w: number, h: number) => {
    const ratio = Math.min(maxWidth / w, maxHeight / h, 1);
    return { w: Math.round(w * ratio), h: Math.round(h * ratio) };
  };

  ({ w: width, h: height } = clampByBox(width, height) as any);

  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d')!;
  let quality = 0.8; // punto de partida razonable
  const targetBytes = targetKB * 1024;

  const drawScaled = (w: number, h: number) => {
    canvas.width = w;
    canvas.height = h;
    ctx.clearRect(0, 0, w, h);
    ctx.drawImage(img, 0, 0, w, h);
  };

  // Bucle: bajar calidad => si no, bajar tamaño y repetir
  for (let dimStep = 0; dimStep < 6; dimStep++) {
    drawScaled(width, height);

    // Primero barrido de calidades
    quality = 0.8;
    while (quality >= minQuality) {
      const blob = await canvasToBlob(canvas, quality);
      if (blob.size <= targetBytes) {
        // Devolvemos como File (JPEG)
        return new File([blob], (file.name.replace(/\.(png|webp|heic|heif|gif)$/i, '') || 'imagen') + '.jpg', {
          type: 'image/jpeg',
          lastModified: Date.now(),
        });
      }
      quality -= 0.1;
    }

    // Si no se alcanzó, reducimos dimensiones ~10% y repetimos
    width = Math.max(320, Math.round(width * 0.9));
    height = Math.max(320, Math.round(height * 0.9));
  }

  // Fallback: devolver la mejor versión encontrada (última compresión)
  drawScaled(width, height);
  const fallbackBlob = await canvasToBlob(canvas, Math.max(minQuality, 0.4));
  return new File([fallbackBlob], (file.name.replace(/\.(png|webp|heic|heif|gif)$/i, '') || 'imagen') + '.jpg', {
    type: 'image/jpeg',
    lastModified: Date.now(),
  });
};

const FormularioProductos: React.FC<FormularioProductosProps> = ({ producto }) => {
  const crearMutation = useCrearProducto();
  const actualizarMutation = useActualizarProducto();

  const [imagen, setImagen] = useState<File | null>(null);
  const [isCompressing, setIsCompressing] = useState(false);
  const [precioVisual, setPrecioVisual] = useState<string>(
    producto?.precio ? formatMiles(producto.precio) : ''
  );

  const { user } = useAuth();
  const comercioId = user?.comercioId || 0;
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
    const formData = new FormData();

    for (const key in data) {
      const valor = data[key as keyof ProductoFormData];
      if (valor !== undefined && valor !== null && valor !== '') {
        formData.append(key, String(valor));
      }
    }

    if (imagen) {
      formData.append('logo', imagen); // -> ya viene comprimida
    }

    if (producto?.id) {
      formData.append('id', String(producto.id));
    }

    if (producto?.id) {
      actualizarMutation.mutate(formData);
    } else {
      crearMutation.mutate(formData);
    }

    reset();
    setImagen(null);
  };

  const previewUrl = useMemo(() => {
    if (imagen) return URL.createObjectURL(imagen);
    if (producto?.imagen_url) return `${BASE_URL}/${producto.imagen_url}`;
    return '';
  }, [imagen, producto?.imagen_url]);

  const handleFileChange: React.ChangeEventHandler<HTMLInputElement> = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsCompressing(true);
      // Opcional: validación básica de tipo de imagen (no peso)
      if (!/^image\//.test(file.type)) {
        alert('Por favor selecciona un archivo de imagen válido.');
        setIsCompressing(false);
        e.target.value = '';
        return;
      }

      // Comprimir a ~200 KB
      const comprimida = await compressImageToTarget(file, 200, 1600, 1600, 0.4);
      setImagen(comprimida);
    } catch (err) {
      console.error('Error comprimiendo la imagen:', err);
      alert('No se pudo comprimir la imagen. Intenta con otra imagen.');
      setImagen(null);
    } finally {
      setIsCompressing(false);
    }
  };

  const submitDisabled =
    isCompressing || crearMutation.isPending || actualizarMutation.isPending;

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
              const raw = e.target.value.replace(/[^\d.]/g, '');
              const unformatted = unformatMiles(raw);
              if (!isNaN(unformatted)) {
                setPrecioVisual(formatMiles(unformatted));
              }
            }}
            onBlur={() => {
              const raw = unformatMiles(precioVisual);
              setValue('precio', raw);
            }}
            className="input input-bordered w-full"
          />
          {errors.precio && <p className="text-red-500">{errors.precio.message}</p>}
        </div>

        <div className="hidden">
          <label className="block text-sm font-semibold text-gray-800 mb-2">Precio Descuento (opcional)</label>
          <input type="hidden" step="0.01" {...register('precio_descuento')} className="input input-bordered w-full" />
        </div>

        <div className="hidden">
          <label className="block text-sm font-semibold text-gray-800 mb-2">Unidad</label>
          <input type="hidden" defaultValue="unidad" {...register('unidad')} className="input input-bordered w-full" />
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
            onChange={handleFileChange} // ✅ sin validación de peso; sí compresión
            className="file-input file-input-bordered w-full"
            disabled={isCompressing}
          />
          {isCompressing && (
            <div className="mt-2 flex items-center gap-2 text-sm text-gray-600">
              <span className="loading loading-spinner loading-sm" />
              <span>Comprimiendo la imagen…</span>
            </div>
          )}
        </div>

        {(imagen || producto?.imagen_url) && (
          <div className="mt-4 flex flex-col items-center justify-center">
            <p className="text-sm text-gray-700 mb-2">Vista previa:</p>
            <img
              src={previewUrl}
              alt="Vista previa"
              className="w-40 h-40 object-cover border rounded-md"
            />
            {imagen && (
              <p className="mt-2 text-xs text-gray-500">
                Tamaño final: {(imagen.size / 1024).toFixed(0)} KB
              </p>
            )}
          </div>
        )}
      </div>

      <div className="flex justify-center mt-8">
        <button
          type="submit"
          className="py-3 px-8 bg-orange-500 text-white font-bold rounded-full shadow-lg transform transition-all duration-300 ease-in-out hover:scale-105 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={submitDisabled}
        >
          {isCompressing
            ? 'Esperando compresión…'
            : producto?.id ? 'Actualizar Producto' : 'Registrar Producto'}
        </button>
      </div>
    </form>
  );
};

export default FormularioProductos;
