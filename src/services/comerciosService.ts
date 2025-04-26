import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosInstance from "../utils/axiosConfig";
import { Comercio } from "../shared/types/comercioInterface";
import { AxiosError } from "axios";
import { ServerError } from "../shared/types/serverErrorInterface";

export const useComercios = () => {
    const axiosInstance = useAxiosInstance();
    return useQuery<Comercio[]>({
        queryKey: ['comercios'],
        queryFn: async () => {
            try {
                const { data } = await axiosInstance.get<Comercio[]>('/comercios');
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


export const useCrearComercio = () => {
    const axiosInstance = useAxiosInstance();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (comercio: Comercio) => {
            const { data } = await axiosInstance.post("/comercios", comercio);
            return data;
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ["comercios"] });
        },
        onError: (error: AxiosError<ServerError>) => {
            const messageError: string[] | string = error.response?.data?.message || "Error al crear el comercio";
            console.log(messageError)
        },
    });
};