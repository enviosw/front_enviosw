export interface DomiciliarioType {
  id?: number;
  nombre: string;
  apellido: string;
  alias: string;
  telefono_whatsapp: string;
  placa_moto: string;
  numero_chaqueta: number;
  direccion_residencia: string;
  estado: boolean;
  disponible: boolean;
  turno_orden: number;
  fecha_creacion?: Date;
  fecha_actualizacion?: Date;
}
