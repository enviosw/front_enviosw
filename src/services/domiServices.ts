import { AxiosError } from "axios";
import { DomiciliarioType } from "../shared/types/domiInterface";
import { ServerError } from "../shared/types/serverErrorInterface";
import useAxiosInstance from "../utils/axiosConfig";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useModal } from "../context/ModalContext";
import { AlertService } from "../utils/AlertService";

// ✅ Obtener domiciliarios
export const useDomiciliarios = () => {
  const axiosInstance = useAxiosInstance();

  return useQuery<DomiciliarioType[]>({
    queryKey: ['domiciliarios'],
    queryFn: async () => {
      const { data } = await axiosInstance.get('/domiciliarios');
      return data;
    },
    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 15,
  });
};

// ✅ Crear domiciliario
export const useRegistrarDomiciliario = () => {
  const axiosInstance = useAxiosInstance();
  const { closeModal, setModalTitle, setModalContent } = useModal();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (domiciliario: DomiciliarioType) => {
      const { data } = await axiosInstance.post('/domiciliarios', domiciliario);
      return data;
    },
    onError: (error: AxiosError<ServerError>) => {
      AlertService.error('Error al guardar', error.response?.data.message || error.message);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["domiciliarios"] });
      AlertService.success('Domiciliario registrado', 'Registro exitoso');
      closeModal();
      setModalTitle('');
      setModalContent('');
    },
  });
};

// ✅ Actualizar domiciliario
export const useActualizarDomiciliario = () => {
  const axiosInstance = useAxiosInstance();
  const { closeModal, setModalTitle, setModalContent } = useModal();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (domiciliario: DomiciliarioType) => {
      if (!domiciliario.id) {
        throw new Error("El ID del domiciliario es requerido");
      }
      const { data } = await axiosInstance.put(`/domiciliarios/${domiciliario.id}`, domiciliario);
      return data;
    },
    onError: (error: AxiosError<ServerError>) => {
      AlertService.error('Error al actualizar', error.response?.data.message || error.message);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["domiciliarios"] });
      AlertService.success('Domiciliario actualizado', 'Actualización exitosa');
      closeModal();
      setModalTitle('');
      setModalContent('');
    },
  });
};



// ✅ Cambiar estado activo/inactivo
export const useToggleEstadoDomiciliario = () => {
  const axiosInstance = useAxiosInstance();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      const { data } = await axiosInstance.patch(`/domiciliarios/${id}/toggle-estado`);
      return data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['domiciliarios'] });
      AlertService.success('Estado cambiado', 'El estado del domiciliario fue actualizado.');
    },
    onError: (error: AxiosError<ServerError>) => {
      AlertService.error('Error al cambiar estado', error.response?.data.message || error.message);
    }
  });
};
