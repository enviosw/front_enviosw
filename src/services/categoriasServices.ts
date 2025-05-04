import { AxiosError } from "axios";
import { CategoriaType } from "../shared/types/categoriaInterface";
import { ServerError } from "../shared/types/serverErrorInterface";
import useAxiosInstance from "../utils/axiosConfig";
import { useQuery } from "@tanstack/react-query";

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