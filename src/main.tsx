import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './index.css'
import App from './App.tsx';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 10,      // 10 min: los datos se consideran frescos
      gcTime: 1000 * 60 * 15,         // 15 min antes de limpiar del caché
      refetchOnMount: false,          // No volver a pedir si hay datos en caché
      refetchOnWindowFocus: false,    // No refrescar al cambiar de pestaña
      refetchOnReconnect: false,      // No refrescar al recuperar conexión
      placeholderData: (prev: any) => prev // Mantiene datos previos al cambiar de page
    }
  }
});

createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
)
