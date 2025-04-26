// src/types/comercioInterface.ts

import { TipoComercio } from "./tipos";

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
  activo?: string;
  tipo?: TipoComercio | number;
  tipo_id?: number | undefined | string
}

