import { useQuery } from "@tanstack/react-query";
import { Producto } from "../shared/types/productosInterface";
import useAxiosInstance from "../utils/axiosConfig";
import { ServerError } from "../shared/types/serverErrorInterface";
import { AxiosError } from "axios";

export const useProductosPublicos = (comercioId: number | null) => {
    const axiosInstance = useAxiosInstance();
    return useQuery<Producto[]>({
        queryKey: ['productos-publicos', comercioId],
        queryFn: async () => {
            try {
                const { data } = await axiosInstance.get<Producto[]>(`/productos/comercio?comercio_id=${comercioId}`);
                return data;
            } catch (error) {
                const axiosError = error as AxiosError<ServerError>;
                throw new Error(axiosError.response?.data.message || 'Error al obtener los productos');
            }
        },
        staleTime: 1000 * 60 * 10,  // Mantener los roles frescos por 10 minutos
        gcTime: 1000 * 60 * 15,    // Tiempo de recolección de basura de 15 minutos
    });
};
