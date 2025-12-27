import React, { useEffect, useMemo, useState } from "react";
import Loader from "../../utils/Loader";
import { useUploadWelcomeImage, useWelcomeImage } from "../../services/welcomeImageService";
import { validateImageFilesWithClean } from "../../utils/validateImageFiles";

/** ✅ Usa ESTA función para mostrar la imagen */
const buildImageUrl = (value?: string) => {
  if (!value) return "";
  if (/^https?:\/\//i.test(value)) return value;

  const filename = value.replace(/^\/?uploads\//, "");
  return `${import.meta.env.VITE_API_URL}/${filename}`;
};

/**
 * ✅ Comprime automáticamente a JPG para que pese máximo `maxKB` (por defecto 70KB).
 * - Primero intenta bajando calidad
 * - Si no alcanza, reduce dimensiones progresivamente
 * - Si aún no alcanza, retorna el mejor intento (el más pequeño) como fallback
 */
const compressImageToMaxKB = async (file: File, maxKB = 70): Promise<File> => {
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

  // 3) Fallback: devuelve el más pequeño que se logró (aunque no llegue a 70KB)
  if (bestBlob) {
    const newName = file.name.replace(/\.\w+$/, ".jpg");
    return new File([bestBlob], newName, {
      type: "image/jpeg",
      lastModified: Date.now(),
    });
  }

  return file;
};

const GestionarWelcomeImage: React.FC = () => {
  const { data, isLoading, error } = useWelcomeImage();
  const { mutate: upload, isPending } = useUploadWelcomeImage();

  const [file, setFile] = useState<File | null>(null);

  // ✅ Preview local
  const previewUrl = useMemo(() => {
    if (!file) return null;
    return URL.createObjectURL(file);
  }, [file]);

  // ✅ Limpia objectURL para evitar leaks
  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  // ✅ URL de imagen actual (para <img>) usando buildImageUrl
  const currentImageUrl = useMemo(() => {
    return buildImageUrl(data?.path);
  }, [data?.path]);

  // ✅ Mostrar solo nombre del archivo (sin /uploads/)
  const fileName = useMemo(() => {
    if (!data?.path) return null;
    return data.path.replace(/^\/?uploads\//, "");
  }, [data?.path]);

  // ✅ Manejo de cambio de imagen: valida + comprime a 70KB
  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    validateImageFilesWithClean(e, Number.MAX_SAFE_INTEGER, async (selected) => {
      try {
        const compressed = await compressImageToMaxKB(selected, 70);
        setFile(compressed);
      } catch {
        setFile(selected);
      }
    });
  };

  if (isLoading) return <div className="text-center">Cargando... <Loader /></div>;
  if (error) return <p className="text-red-600">Error al cargar la imagen</p>;

  return (
    <div className="space-y-4 bg-white p-4 rounded-lg border">
      <h2 className="text-lg font-semibold">Imagen de bienvenida</h2>

      <div className="grid md:grid-cols-2 gap-4">
        {/* Imagen actual */}
        <div className="border rounded-lg p-3">
          <p className="text-sm font-semibold mb-2">Imagen actual</p>

          {currentImageUrl ? (
            <img
              src={currentImageUrl}
              alt="Imagen actual"
              className="w-full max-h-64 object-contain bg-gray-50 rounded"
            />
          ) : (
            <p className="text-sm text-gray-500">No hay imagen registrada</p>
          )}

          {fileName && (
            <p className="text-xs text-gray-500 mt-2">
              Archivo: <span className="font-mono">{fileName}</span>
            </p>
          )}
        </div>

        {/* Subida */}
        <div className="border rounded-lg p-3">
          <p className="text-sm font-semibold mb-2">Subir nueva imagen (máx 70KB)</p>

          <input
            type="file"
            accept="image/*"
            className="file-input file-input-bordered w-full"
            onChange={handleImageChange}
          />

          {file && (
            <p className="text-xs text-gray-500 mt-2">
              Imagen lista: {(file.size / 1024).toFixed(1)} KB
            </p>
          )}

          {previewUrl && (
            <div className="mt-3">
              <p className="text-xs text-gray-500 mb-1">Vista previa</p>
              <img
                src={previewUrl}
                alt="Preview"
                className="w-full max-h-64 object-contain bg-gray-50 rounded"
              />
            </div>
          )}

          <button
            className="btn btn-primary mt-4 w-full"
            disabled={!file || isPending}
            onClick={() => file && upload(file)}
          >
            {isPending ? "Subiendo..." : "Guardar imagen"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default GestionarWelcomeImage;
