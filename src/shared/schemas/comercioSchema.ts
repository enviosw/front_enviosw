import { z } from 'zod';

export const comercioSchema = z.object({
    nombre_comercial: z.string().min(1, 'Requerido'),
    razon_social: z.string().min(1, 'Requerido'),
    nit: z
        .string()
        .min(5, 'El NIT debe tener al menos 5 dígitos')
        .refine(val => /^\d+$/.test(val), {
            message: 'El NIT debe contener solo números',
        }),
    descripcion: z.string().min(1, 'Requerido'),
    responsable: z.string().min(1, 'Requerido'),
    email_contacto: z.string().email('Correo no válido'),
    telefono: z.string().min(1, 'Requerido'),
    telefono_secundario: z.string().optional(),
    direccion: z.string().min(1, 'Requerido'),
    estado: z.enum(['activo', 'inactivo'], {
        required_error: 'El estado es obligatorio',
    }).optional(),
    servicio_id: z.union([z.string(), z.number()])
        .refine(val => val !== '' && val !== undefined && val !== null, {
            message: 'El tipo de comercio es obligatorio',
        }),

});
