import { AxiosError } from "axios";
import { CategoriaType } from "../shared/types/categoriaInterface";
import { ServerError } from "../shared/types/serverErrorInterface";
import useAxiosInstance from "../utils/axiosConfig";
import { useMutation, useQuery } from "@tanstack/react-query";

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
      console.error("Error en el registro:", error.response?.data || error.message);
    },
    onSuccess: () => {
      console.log("Categoría registrada correctamente");
    },
  });
};

export const useActualizarCategoria = () => {
  const axiosInstance = useAxiosInstance();

  return useMutation({
    mutationFn: async (categoria: CategoriaType) => {
      if (!categoria.id) {
        throw new Error("El ID de la categoría es requerido para actualizar");
      }

      try {
        const { data } = await axiosInstance.put(`/categorias/${categoria.id}`, categoria);
        return data;
      } catch (error) {
        const axiosError = error as AxiosError<ServerError>;
        throw new Error(axiosError.response?.data.message || 'Error al actualizar la categoría');
      }
    },
    onError: (error: AxiosError) => {
      console.error("Error en la actualización:", error.response?.data || error.message);
    },
    onSuccess: () => {
      console.log("Categoría actualizada correctamente");
    },
  });
};