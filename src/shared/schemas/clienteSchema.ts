import { z } from 'zod';

export const clienteSchema = z.object({
    name: z.string().min(1, 'Requerido'),
    lastName: z.string().min(1, 'Requerido'),
    email: z.string().email('Correo no válido'),
    password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
    rol: z.enum(['administrador', 'aliado'], {
        required_error: 'El rol es obligatorio',
    }).optional(),
    estado: z.enum(['activo', 'inactivo'], {
        required_error: 'El estado es obligatorio',
    }).optional(),
    phone: z.string().min(10, 'El teléfono debe tener al menos 10 caracteres').optional(),
    phone_2: z.string().min(10, 'El teléfono debe tener al menos 10 caracteres').optional(),
    address: z.string().min(5, 'La dirección debe tener al menos 5 caracteres').optional(),
});
