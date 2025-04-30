export interface Login {
    email: string
    password: string
}

export interface RegisterAuth {
    nombre: string
    email: string
    password: string
    rol?: string
}


export interface AuthResponse {
    access_token: string;
    refresh_token: string;
    user: {
      id: number;
      nombre: string;
      email: string;
      role: string;
    };
  }