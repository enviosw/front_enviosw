// src/types/comercioInterface.ts

import { TipoComercio } from "./tipos";

export interface Comercio {
    id: number;
    nombre_comercial: string;
    razon_social: string;
    nit: string;
    descripcion: string;
    categoria: string;
    responsable: string;
    email_contacto: string;
    telefono: string;
    telefono_secundario: string;
    direccion: string;
    logo_url?: string;
    activo: boolean;
    fecha_creacion: string;
    fecha_actualizacion: string;
    tipo: TipoComercio;
  }
  
