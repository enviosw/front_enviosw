import { useQuery } from '@tanstack/react-query';
import useAxiosInstance from '../utils/axiosConfig'; // Asegúrate de que la instancia de Axios esté configurada correctamente
import { AxiosError } from 'axios';
import { ServerError } from '../shared/types/serverErrorInterface';
import { Rol } from '../shared/types/rolesInterface';



export const useRolesUsuario = () => {
    const axiosInstance = useAxiosInstance();
    return useQuery<Rol[]>({
        queryKey: ['roles'],
        queryFn: async () => {
            try {
                const { data } = await axiosInstance.get<Rol[]>('/roles');
                return data;
            } catch (error) {
                const axiosError = error as AxiosError<ServerError>;
                throw new Error(axiosError.response?.data.message || 'Error al obtener los roles');
            }
        },
        staleTime: 1000 * 60 * 10,  // Mantener los roles frescos por 10 minutos
        gcTime: 1000 * 60 * 15,    // Tiempo de recolección de basura de 15 minutos
    });
};
