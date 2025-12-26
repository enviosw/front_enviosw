// src/pages/publicidad/FormularioPublicidad.tsx
import React, { useEffect, useMemo, useState } from "react";
import { useForm, type SubmitHandler, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  useActualizarPublicidad,
  useCrearPublicidad,
} from "../../services/PublicidadServices";
import { validateImageFilesWithClean } from "../../utils/validateImageFiles";

type PublicidadModel = {
  id?: number;
  imagen?: string;
  ruta?: string;
  estado?: number;
  orden?: number;
  fecha_inicio?: string | null;
  fecha_fin?: string | null;
};

interface FormularioPublicidadProps {
  publicidad?: PublicidadModel;
}

// ✅ Validador: 12 dígitos exactos y empieza por 57.
const phone57Schema = z
  .string()
  .min(1, "El teléfono es requerido")
  .transform((v) => v.replace(/\D/g, "")) // deja solo dígitos
  .refine((v) => v.length === 12, "El teléfono debe tener 12 dígitos (ej: 573133112345)")
  .refine((v) => v.startsWith("57"), "El teléfono debe iniciar con 57 (ej: 573133112345)");

const publicidadSchema = z.object({
  ruta: phone57Schema,
  estado: z.coerce.number().int().default(1),
  orden: z.coerce.number().int().min(1, "El orden debe ser mayor a 0").default(1),
  fecha_inicio: z.string().nullable().optional(),
  fecha_fin: z.string().nullable().optional(),
});

type PublicidadFormData = z.infer<typeof publicidadSchema>;

const toDateInputValue = (isoOrNull?: string | null) => {
  if (!isoOrNull) return null;
  return isoOrNull.slice(0, 10);
};

const buildImageUrl = (value?: string) => {
  if (!value) return "";
  if (/^https?:\/\//i.test(value)) return value;

  const filename = value.replace(/^\/?uploads\//, "");
  return `${import.meta.env.VITE_API_URL}/${filename}`;
};

/**
 * ✅ Comprime automáticamente a JPG para que pese máximo `maxKB` (por defecto 150KB).
 * - Primero intenta bajando calidad
 * - Si no alcanza, reduce dimensiones progresivamente
 * - Si aún no alcanza, retorna el mejor intento (el más pequeño) como fallback
 */
const compressImageToMaxKB = async (file: File, maxKB = 150): Promise<File> => {
  if (file.size <= maxKB * 1024) return file;

  const bitmap = await createImageBitmap(file);
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  if (!ctx) return file;

  const targetBytes = maxKB * 1024;

  const drawScaled = (maxSide: number) => {
    const scale = Math.min(maxSide / bitmap.width, maxSide / bitmap.height, 1);
    const w = Math.max(1, Math.round(bitmap.width * scale));
    const h = Math.max(1, Math.round(bitmap.height * scale));
    canvas.width = w;
    canvas.height = h;
    ctx.clearRect(0, 0, w, h);
    ctx.drawImage(bitmap, 0, 0, w, h);
  };

  const toBlob = (q: number) =>
    new Promise<Blob | null>((resolve) => {
      canvas.toBlob((b) => resolve(b), "image/jpeg", q);
    });

  let bestBlob: Blob | null = null;

  // 1) Intento: mantener tamaño razonable, bajar calidad
  drawScaled(1600);

  for (let quality = 0.85; quality >= 0.15; quality -= 0.05) {
    const blob = await toBlob(quality);
    if (!blob) continue;

    if (!bestBlob || blob.size < bestBlob.size) bestBlob = blob;

    if (blob.size <= targetBytes) {
      const newName = file.name.replace(/\.\w+$/, ".jpg");
      return new File([blob], newName, {
        type: "image/jpeg",
        lastModified: Date.now(),
      });
    }
  }

  // 2) Si no alcanzó, reducir dimensiones por pasos + calidad
  for (let maxSide = 1400; maxSide >= 600; maxSide -= 200) {
    drawScaled(maxSide);

    for (let quality = 0.8; quality >= 0.15; quality -= 0.05) {
      const blob = await toBlob(quality);
      if (!blob) continue;

      if (!bestBlob || blob.size < bestBlob.size) bestBlob = blob;

      if (blob.size <= targetBytes) {
        const newName = file.name.replace(/\.\w+$/, ".jpg");
        return new File([blob], newName, {
          type: "image/jpeg",
          lastModified: Date.now(),
        });
      }
    }
  }

  // 3) Fallback: devuelve el más pequeño que se logró (aunque no llegue a 150KB)
  if (bestBlob) {
    const newName = file.name.replace(/\.\w+$/, ".jpg");
    return new File([bestBlob], newName, {
      type: "image/jpeg",
      lastModified: Date.now(),
    });
  }

  return file;
};

const FormularioPublicidad: React.FC<FormularioPublicidadProps> = ({ publicidad }) => {
  console.log("FormularioPublicidad render", { publicidad });

  const crearMutation = useCrearPublicidad();
  const actualizarMutation = useActualizarPublicidad();
  const [imagen, setImagen] = useState<File | null>(null);

  const defaultValues = useMemo(
    () => ({
      ruta: publicidad?.ruta ?? "",
      estado: typeof publicidad?.estado === "number" ? publicidad.estado : 1,
      orden: typeof publicidad?.orden === "number" ? publicidad.orden : 1,
      fecha_inicio: toDateInputValue(publicidad?.fecha_inicio) ?? null,
      fecha_fin: toDateInputValue(publicidad?.fecha_fin) ?? null,
    }),
    [publicidad]
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<PublicidadFormData>({
    resolver: zodResolver(publicidadSchema) as unknown as Resolver<PublicidadFormData>,
    defaultValues,
  });

  useEffect(() => {
    reset(defaultValues);
    setImagen(null);
  }, [defaultValues, reset]);

  const onSubmit: SubmitHandler<PublicidadFormData> = (data) => {
    const formData = new FormData();

    formData.append("ruta", data.ruta.trim());
    formData.append("estado", String(Number(data.estado) || 1));
    formData.append("orden", String(Number(data.orden) || 1));

    if (data.fecha_inicio) formData.append("fecha_inicio", data.fecha_inicio);
    if (data.fecha_fin) formData.append("fecha_fin", data.fecha_fin);

    if (imagen) formData.append("imagen", imagen);

    if (publicidad?.id) {
      formData.append("id", String(publicidad.id));
      actualizarMutation.mutate(formData as any);
    } else {
      crearMutation.mutate(formData as any);
    }
  };

  const handleImagenChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    // ✅ sin límite de tamaño (ponemos un valor enorme por compatibilidad)
    validateImageFilesWithClean(e, Number.MAX_SAFE_INTEGER, async (file) => {
      try {
        // ✅ comprime a máximo 150KB antes de setear
        const compressed = await compressImageToMaxKB(file, 150);
        setImagen(compressed);
      } catch {
        setImagen(file);
      }
    });
  };

  const isPending = publicidad?.id ? actualizarMutation.isPending : crearMutation.isPending;
  const isError = publicidad?.id ? actualizarMutation.isError : crearMutation.isError;
  const error = publicidad?.id ? actualizarMutation.error : crearMutation.error;

  const currentImageSrc = publicidad?.imagen ? buildImageUrl(publicidad.imagen) : "";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-0 lg:p-4 bg-white">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-semibold text-gray-800 mb-2">
            Whatsapp +57
          </label>
          <input
            type="tel"
            inputMode="numeric"
            placeholder="573133112345"
            {...register("ruta")}
            className="p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50"
          />
          {errors.ruta && <p className="text-red-500">{errors.ruta.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-800 mb-2">
            Orden
          </label>
          <input
            type="number"
            {...register("orden", {
              valueAsNumber: true,
              setValueAs: (v) => {
                if (v === "" || v === null || v === undefined) return 1;
                const n = Number(v);
                return Number.isFinite(n) ? n : 1;
              },
            })}
            className="p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50"
          />
          {errors.orden && <p className="text-red-500">{errors.orden.message}</p>}
        </div>

        {publicidad?.id && (
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-2">
              Estado
            </label>
            <select
              {...register("estado", {
                setValueAs: (v) => (v === "" ? 1 : Number(v)),
              })}
              className="p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50"
            >
              <option value={1}>Activo</option>
              <option value={0}>Inactivo</option>
            </select>
          </div>
        )}

        <div>
          <label className="block text-sm font-semibold text-gray-800 mb-2">
            Fecha inicio (opcional)
          </label>
          <input
            type="date"
            {...register("fecha_inicio")}
            className="p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-800 mb-2">
            Fecha fin (opcional)
          </label>
          <input
            type="date"
            {...register("fecha_fin")}
            className="p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-800 mb-2">
            Imagen {publicidad?.id ? "(opcional si no quieres cambiarla)" : ""}
          </label>
          <input
            type="file"
            name="imagen"
            onChange={handleImagenChange}
            accept="image/*"
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-white
              file:mr-4 file:py-3 file:px-4 file:rounded-md file:border-0
              file:text-sm file:font-semibold file:bg-gray-400 file:text-white
              hover:file:bg-gray-800"
          />

          {publicidad?.imagen && !imagen && (
            <div className="mt-2">
              <p className="text-xs text-gray-500 mb-1">Imagen actual:</p>
              <img
                src={currentImageSrc}
                alt="Publicidad"
                className="h-20 rounded-md border object-cover"
              />
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-center mt-8">
        <button
          type="submit"
          className="py-3 px-8 bg-orange-500 text-white font-bold rounded-full shadow-lg hover:scale-105 hover:bg-orange-600 transition-all disabled:opacity-50"
          disabled={isPending}
        >
          {isPending
            ? publicidad?.id
              ? "Actualizando..."
              : "Registrando..."
            : publicidad?.id
            ? "Actualizar Publicidad"
            : "Registrar Publicidad"}
        </button>
      </div>

      {isError && <p className="text-red-500 mt-4">{(error as any)?.message}</p>}
    </form>
  );
};

export default FormularioPublicidad;
