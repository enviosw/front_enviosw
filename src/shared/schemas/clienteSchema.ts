import { z } from 'zod';

export const clienteSchema = z.object({
  name: z.string().min(1, 'Requerido'),
  lastName: z.string().min(1, 'Requerido'),
  email: z.string().email('Correo no válido'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),

  rol_id: z.number().refine((val) => [1, 2, 3].includes(val), {
    message: 'Debes agregar un rol válido',
  }),

  status: z.string().refine((val) => ['activo', 'inactivo'].includes(val), {
    message: 'El estado debe ser activo o inactivo',
  }),

  phone: z.string().min(10, 'El teléfono debe tener al menos 10 caracteres').optional(),
  phone_2: z.string().optional(),
  address: z.string().min(5, 'La dirección debe tener al menos 5 caracteres').optional(),
});