export interface Usuario {
    id?: number;             // El id es opcional ya que no es necesario al crear un usuario
    nombre: string;          // El nombre es obligatorio
    email: string;           // El email es obligatorio
    password?: string;       // El password es opcional solo cuando se edita un usuario
    rol?: any// El rol puede ser 'admin' o 'usuario'
    estado?: any // El estado puede ser 'activo' o 'inactivo'
}
