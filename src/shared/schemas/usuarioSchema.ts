import { z } from 'zod';

export const usuarioSchema = z.object({
    nombre: z.string().min(1, 'Requerido'),
    email: z.string().email('Correo no válido'),
    password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
    rol: z.enum(['administrador', 'aliado'], {
        required_error: 'El rol es obligatorio',
    }).optional(),
    estado: z.enum(['activo', 'inactivo'], {
        required_error: 'El estado es obligatorio',
    }).optional(),
    telefono: z.string().min(10, 'El teléfono debe tener al menos 10 caracteres').optional(),
    direccion: z.string().min(5, 'La dirección debe tener al menos 5 caracteres').optional(),
});
