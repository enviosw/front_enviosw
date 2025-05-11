export interface Cliente {
    id?: number;
    name: string;
    lastName: string;
    email: string;
    password: string;
    rol_id: number;
    rol?: {
      id: number;
      name: string;
    };
    status?: 'activo' | 'inactivo';
    phone?: string;
    phone_2?: string;
    address?: string;
  }