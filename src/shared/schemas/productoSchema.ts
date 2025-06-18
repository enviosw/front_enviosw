import { z } from 'zod';

export const productoSchema = z.object({
  nombre: z.string().min(2, 'El nombre es obligatorio'),
  descripcion: z.string().min(5, 'La descripción es obligatoria'),
  precio: z.number().or(z.string().regex(/^\d+(\.\d+)?$/, "Debe ser un número válido")),
  unidad: z.string(),
  comercioId: z.string(),
  categoriaId: z
    .string()
    .min(1, 'La categoría es obligatoria. Si no hay ninguna, créala primero.')
    .regex(/^\d+$/, 'Debe ser un ID numérico válido'),
  precio_descuento: z.any().optional(),
  estado: z.enum(['activo', 'inactivo']).optional(),
  estado_descuento: z.enum(['activo', 'inactivo']).optional(),
    imagen_url: z.any(),
});
