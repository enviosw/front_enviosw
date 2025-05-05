// src/productos/types/producto.interface.ts
export interface Categoria {
    id: number;
    nombre: string;
}

export interface Comercio {
    id: number;
    nombre_comercial: string;
    razon_social: string;
    telefono: string;
    direccion: string;
    // Puedes agregar más campos de la entidad Comercio si es necesario
}

export interface Producto {
    id: number;
    nombre: string;
    descripcion: string;
    categoria: Categoria; // Relación con Categoria
    comercio: Comercio; // Relación con Comercio
    precio: number;
    precio_descuento: number | null; // Puede ser nulo
    estado: string;
    estado_descuento: string;
    unidad: string;
    fecha_creacion: string; // Fecha en formato string (puede ser formateada en el frontend)
    fecha_actualizacion: string; // Fecha en formato string
    imagen_url?: string
}
