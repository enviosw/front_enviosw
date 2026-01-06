import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useAxiosInstance from '../utils/axiosConfig';
import { AxiosError } from 'axios';
import { ServerError } from '../shared/types/serverErrorInterface';
import { AlertService } from '../utils/AlertService';

export interface Phone {
  id: number;
  key: string;
  value: string;
  createdAt?: string; // si lo tienes en la entidad
}

/**
 * GET /phones/cuentas
 */
export const useTelefonoCuentas = (enabled: boolean = true) => {
  const axiosInstance = useAxiosInstance();

  return useQuery<Phone, AxiosError<ServerError>>({
    queryKey: ['phones', 'cuentas'],
    queryFn: async () => {
      const { data } = await axiosInstance.get<Phone>('/phones/cuentas');
      return data;
    },
    staleTime: 1000 * 60 * 10, // 10 min
    gcTime: 1000 * 60 * 15,    // 15 min
    enabled,
  });
};

/**
 * PATCH /phones/cuentas  { value }
 */
export const useActualizarTelefonoCuentas = () => {
  const axiosInstance = useAxiosInstance();
  const queryClient = useQueryClient();

  return useMutation<Phone, AxiosError<ServerError>, { value: string }>({
    mutationFn: async ({ value }) => {
      const { data } = await axiosInstance.patch<Phone>('/phones/cuentas', { value });
      return data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['phones', 'cuentas'] });
      AlertService.success('Actualizado', 'Teléfono de CUENTAS actualizado correctamente.');
    },
    onError: (error) => {
      const messageError =
        error.response?.data?.message || 'Error al actualizar el teléfono de CUENTAS';
      AlertService.error('Error', messageError);
    },
  });
};

/**
 * GET /phones/quejas
 */
export const useTelefonoQuejas = (enabled: boolean = true) => {
  const axiosInstance = useAxiosInstance();

  return useQuery<Phone, AxiosError<ServerError>>({
    queryKey: ['phones', 'quejas'],
    queryFn: async () => {
      const { data } = await axiosInstance.get<Phone>('/phones/quejas');
      return data;
    },
    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 15,
    enabled,
  });
};

/**
 * PATCH /phones/quejas  { value }
 */
export const useActualizarTelefonoQuejas = () => {
  const axiosInstance = useAxiosInstance();
  const queryClient = useQueryClient();

  return useMutation<Phone, AxiosError<ServerError>, { value: string }>({
    mutationFn: async ({ value }) => {
      const { data } = await axiosInstance.patch<Phone>('/phones/quejas', { value });
      return data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['phones', 'quejas'] });
      AlertService.success('Actualizado', 'Teléfono de QUEJAS actualizado correctamente.');
    },
    onError: (error) => {
      const messageError =
        error.response?.data?.message || 'Error al actualizar el teléfono de QUEJAS';
      AlertService.error('Error', messageError);
    },
  });
};
