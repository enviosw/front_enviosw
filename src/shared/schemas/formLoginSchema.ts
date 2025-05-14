import { z } from "zod";


export const formRegisterSchema = z.object({
    name: z.string().min(3, 'Debes insertar un nombre válido'),
    lastName: z.string().min(3, 'Debes insertar un apellido válido'),
    phone: z.string().min(10, 'El teléfono debe tener al menos 10 caracteres'),
    phone_2: z.string().optional(),
    address: z.string().min(5, 'La dirección debe tener al menos 5 caracteres'),
});

export const formRegisterLoginSchema = z.object({
    email: z.string().email('Correo no válido'),
    password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
});

export const formLoginSchema = z.object({
    email: z.string().email('Correo no válido'),
    password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
});