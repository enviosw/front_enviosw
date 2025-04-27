export interface Servicio {
    id?: number; // El id es opcional si se utiliza en creación
    nombre?: string; // Nombre del servicio
    icon?: string; // Icono del servicio, representado por el nombre del ícono de react-icons
    color?: string; // Color del servicio, por ejemplo: 'bg-blue-500'
    estado?: 'activo' | 'inactivo'; // Estado del servicio, puede ser 'activo' o 'inactivo'
    fecha_creacion?: string; // Fecha de creación, formato de fecha ISO
    fecha_actualizacion?: string; // Fecha de actualización, formato de fecha ISO
}
