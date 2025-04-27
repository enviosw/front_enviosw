import { useQuery } from "@tanstack/react-query";
import { Servicio } from "../shared/types/serviciosInterface";
import useAxiosInstance from "../utils/axiosConfig";
import { AxiosError } from "axios";
import { ServerError } from "../shared/types/serverErrorInterface";

export const useServicios = () => {
    const axiosInstance = useAxiosInstance();
    return useQuery<Servicio[]>({
        queryKey: ['servicios'],
        queryFn: async () => {
            try {
                const { data } = await axiosInstance.get<Servicio[]>('/servicios');
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
