export interface Cliente {
    id?: number;
    name: string;
    lastName: string;
    email: string;
    password: string;
    rol_id: string;
    rol?: {
      id: string;
      name: string;
    };
status?: 'activo' | 'inactivo' | string;
    phone?: string;
    phone_2?: string;
    address?: string;
  }