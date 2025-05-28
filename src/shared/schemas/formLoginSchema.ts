import { z } from "zod";


export const formRegisterSchema = z.object({
    nombre: z.string().min(3, 'Debes insertar un nombre válido'),
    apellido: z.string().min(3, 'Debes insertar un apellido válido'),
    telefono: z.string().min(10, 'El teléfono debe tener al menos 10 caracteres'),
    telefono_2: z.string().optional(),
    direccion: z.string().min(5, 'La dirección debe tener al menos 5 caracteres'),
});

export const formRegisterLoginSchema = z.object({
    email: z.string().email('Correo no válido'),
    password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
});

export const formLoginSchema = z.object({
    email: z.string().email('Correo no válido'),
    password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
});