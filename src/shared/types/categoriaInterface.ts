export interface CategoriaType {
    id: number;
    nombre: string;
    descripcion?: string;
    estado: string;
    comercio?: {
      id: number;
      nombre_comercial: string;
    };
}
