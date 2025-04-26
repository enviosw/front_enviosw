import { useQuery } from "@tanstack/react-query";
import useAxiosInstance from "../utils/axiosConfig";
import { TipoComercio } from "../shared/types/tipos";
import { AxiosError } from "axios";
import { ServerError } from "../shared/types/serverErrorInterface";

export const useTipoComercio = () => {
    const axiosInstance = useAxiosInstance();
    return useQuery<TipoComercio[]>({
        queryKey: ['tipos-comercios'],
        queryFn: async () => {
            try {
                const { data } = await axiosInstance.get<TipoComercio[]>('/tipos-comercios');
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
