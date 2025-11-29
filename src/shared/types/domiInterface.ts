export interface DomiciliarioType {
  id?: number;
  nombre: string;
  apellido: string;
  telefono_whatsapp: string;
  placa_moto: string;
  numero_chaqueta: number;
  direccion_residencia: string;
  estado: boolean;
  disponible: boolean;
  fecha_creacion?: Date;
  fecha_actualizacion?: Date;
  zona_id?: number;

    // 👇 Nuevos campos
  horario?: string | null;
  descanso?: string | null;
}
