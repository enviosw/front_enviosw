export interface CategoriaType {
  id?: number;
  nombre: string;
  comercioId?: number
  comercio?: {
    id?: number;
    nombre_comercial?: string;
  };
}
