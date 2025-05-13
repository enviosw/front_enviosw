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
  horarios?: any
}


// shared/types/comercioInterface.ts

export interface Horario {
  apertura: string;
  cierre: string;
}

export interface ComercioHorario {
  id: number;
  nombre_comercial: string;
  razon_social: string;
  horarios: {
    lunes: Horario;
    martes: Horario;
    miercoles: Horario;
    jueves: Horario;
    viernes: Horario;
    sabado: Horario;
    domingo: Horario;
  };
  servicio_id: number;
  estado_comercio?: boolean;
  logo_url?: string;
}
