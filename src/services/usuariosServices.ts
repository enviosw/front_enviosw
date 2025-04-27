import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Usuario } from "../shared/types/usuariosInterface";
import useAxiosInstance from "../utils/axiosConfig";
import { AxiosError } from "axios";
import { ServerError } from "../shared/types/serverErrorInterface";
import { AlertService } from "../utils/AlertService";

export const useUsuarios = () => {
    const axiosInstance = useAxiosInstance();
    return useQuery<Usuario[]>({
        queryKey: ['usuarios'],
        queryFn: async () => {
            try {
                const { data } = await axiosInstance.get<Usuario[]>('/usuarios');
                return data;
            } catch (error) {
                const axiosError = error as AxiosError<ServerError>;
                throw new Error(axiosError.response?.data.message);
            }
        },
        staleTime: 1000 * 60 * 10,
        gcTime: 1000 * 60 * 15,
    });
};


export const useCrearUsuario = () => {
    const axiosInstance = useAxiosInstance();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (comercio: Usuario) => {
            const { data } = await axiosInstance.post("/usuarios", comercio);
            return data;
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ["usuarios"] });
            AlertService.success('Guardado exitosamente', 'Tu registro ha sido almacenado.');

        },
        onError: (error: AxiosError<ServerError>) => {
            const messageError: string[] | string = error.response?.data?.message || "Error al crear el comercio";
            console.log(messageError)
            AlertService.error('Error al guardar', messageError);

        },
    });
};