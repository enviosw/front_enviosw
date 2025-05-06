import { AxiosError } from "axios";
import { CategoriaType } from "../shared/types/categoriaInterface";
import { ServerError } from "../shared/types/serverErrorInterface";
import useAxiosInstance from "../utils/axiosConfig";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useModal } from "../context/ModalContext";
import { AlertService } from "../utils/AlertService";

export const useCategoriasPorComercio = (comercioId?: number | null) => {
  const axiosInstance = useAxiosInstance();

  return useQuery<CategoriaType[]>({
    queryKey: ['categorias-por-comercio', comercioId],
    queryFn: async () => {
      if (!comercioId) return [];

      try {
        const { data } = await axiosInstance.get<CategoriaType[]>(`/categorias/comercio/${comercioId}`);
        return data;
      } catch (error) {
        const axiosError = error as AxiosError<ServerError>;
        throw new Error(axiosError.response?.data.message || 'Error al obtener categorías');
      }
    },
    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 15,
  });
};


// Hook para registrar una nueva categoría
export const useRegistrarCategoria = () => {
  const axiosInstance = useAxiosInstance();
  const { closeModal, setModalTitle, setModalContent } = useModal();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (categoria: CategoriaType) => {
      try {
        const { data } = await axiosInstance.post('/categorias', categoria);
        return data;
      } catch (error) {
        const axiosError = error as AxiosError<ServerError>;
        throw new Error(axiosError.response?.data.message || 'Error al registrar la categoría');
      }
    },
    onError: (error: AxiosError) => {
      AlertService.error('Error al guardar', String(error.response?.data) || error.message);

    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["categorias-por-comercio"] });
      AlertService.success('Categoría registrada correctamente', 'Tu registro ha sido almacenado.');

      closeModal()
      setModalTitle('')
      setModalContent('')
    },
  });
};

export const useActualizarCategoria = () => {
  const axiosInstance = useAxiosInstance();
  const { closeModal, setModalTitle, setModalContent } = useModal();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (categoria: CategoriaType) => {
      if (!categoria.id) {
        throw new Error("El ID de la categoría es requerido para actualizar");
      }

      try {
        const { data } = await axiosInstance.patch(`/categorias/${categoria.id}`, categoria);
        return data;
      } catch (error) {
        const axiosError = error as AxiosError<ServerError>;
        throw new Error(axiosError.response?.data.message || 'Error al actualizar la categoría');
      }
    },
    onError: (error: AxiosError) => {
      AlertService.error('Error al guardar', String(error.response?.data) || error.message);

    },
    onSuccess: async () => {
      console.log("Categoría actualizada correctamente");
      await queryClient.invalidateQueries({ queryKey: ["categorias-por-comercio"] });
      AlertService.success('Categoría registrada correctamente', 'Categoría actualizada correctamente');

      closeModal()
      setModalTitle('')
      setModalContent('')
    },
  });
};



// Hook para eliminar una categoría
export const useEliminarCategoria = () => {
  const axiosInstance = useAxiosInstance();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (categoriaId: number) => {
      try {
        const { data } = await axiosInstance.delete(`/categorias/${categoriaId}`);
        return data;
      } catch (error) {
        const axiosError = error as AxiosError<ServerError>;
        throw new Error(axiosError.response?.data.message || 'Error al eliminar la categoría');
      }
    },
    onError: (error: AxiosError) => {
      AlertService.error('Error al eliminar', String(error.response?.data) || error.message);
    },
    onSuccess: async () => {
      AlertService.success('Categoría eliminada correctamente', 'La categoría se ha eliminado.');
      // Invalidar la query para obtener las categorías actualizadas
      await queryClient.invalidateQueries({ queryKey: ["categorias-por-comercio"] });
    },
  });
};