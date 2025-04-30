export interface RouteConfig {
    path: string;
    element: React.LazyExoticComponent<React.FC>;
    requiresAuth: boolean;
    rol?: 'administrador' | 'aliado' | 'cliente'; // <- asegúrate de esto
    useLayout: boolean;
    useAdminLayout: boolean;
  }
  