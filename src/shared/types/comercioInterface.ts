// src/types/comercioInterface.ts
export interface Comercio {
  id?: number;
  nombre_comercial: string;
  razon_social: string;
  nit: string;
  descripcion: string;
  responsable: string;
  email_contacto: string;
  telefono: string;
  telefono_secundario: string;
  direccion: string;
  logo_url?: string;
  estado?: string;
  tipo_id?: number | undefined | string
  logo?: any
  servicio?: any
  servicio_id?: number | undefined | string
}

