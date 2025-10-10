// src/hooks/useZonas.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useAxiosInstance from '../utils/axiosConfig';
import { AxiosError } from 'axios';
import { ServerError } from '../shared/types/serverErrorInterface';
import { AlertService } from '../utils/AlertService';

// Si no tienes el type, puedes declararlo aquí o importarlo
export interface Zona {
  id: number;
  nombre: string;
  fecha_creacion?: string;
  fecha_actualizacion?: string;
}

/**
 * Lista todas las zonas
 * GET /zonas
 */
export const useZonas = (enabled: boolean = true) => {
  const axiosInstance = useAxiosInstance();

  return useQuery<Zona[], AxiosError<ServerError>>({
    queryKey: ['zonas'],
    queryFn: async () => {
      const { data } = await axiosInstance.get<Zona[]>('/zonas');
      return data;
    },
    staleTime: 1000 * 60 * 10, // 10 min
    gcTime: 1000 * 60 * 15,    // 15 min
    enabled,
  });
};

/**
 * Actualiza SOLO la zona de un comercio.
 * PATCH /comercios/:id  { zonaId?: number | null }
 *
 * - Enviar { zonaId: number } para asignar/cambiar zona
 * - Enviar { zonaId: null }  para quitar la zona
 */
export const useActualizarZonaComercio = () => {
  const axiosInstance = useAxiosInstance();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: { comercioId: number; zonaId: number | null }) => {
      const { comercioId, zonaId } = params;
      if (!comercioId) throw new Error('ID del comercio es requerido');

      // Importante: esta ruta asume que en tu backend el PATCH acepta { zonaId }
      const { data } = await axiosInstance.patch(`/comercios/${comercioId}`, { zonaId });
      return data;
    },
    onSuccess: async (_data, variables) => {
      // Invalida el listado y el detalle del comercio
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['comercios'] }),
        queryClient.invalidateQueries({ queryKey: ['comercio', variables.comercioId] }),
      ]);
      AlertService.success('Zona actualizada', 'La zona del comercio fue actualizada correctamente.');
    },
    onError: (error: AxiosError<ServerError>) => {
      const messageError = error.response?.data?.message || 'Error al actualizar la zona del comercio';
      AlertService.error('Error', messageError);
    },
  });
};
