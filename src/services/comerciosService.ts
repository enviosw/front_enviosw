import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosInstance from "../utils/axiosConfig";
import { Comercio } from "../shared/types/comercioInterface";
import { AxiosError } from "axios";
import { ServerError } from "../shared/types/serverErrorInterface";
import { AlertService } from "../utils/AlertService";
import { useModal } from "../context/ModalContext";

interface ComercioFilters {
    page: number;
    search?: string;
    estado?: string;
    fechaInicio?: string;
    fechaFin?: string;
}

interface ComercioResponse {
    data: Comercio[];
    total: number;
    page: number;
    lastPage: number;
}

export const useComercios = (filters: ComercioFilters) => {
    const axiosInstance = useAxiosInstance();

    return useQuery<ComercioResponse>({
        queryKey: ['comercios', filters],
        queryFn: async () => {
            const { data } = await axiosInstance.get('/comercios', { params: filters });
            return data;
        },
    });
};


export const useComerciosPublicos = (servicioId: number | null) => {
    const axiosInstance = useAxiosInstance();

    return useQuery<Comercio[]>({
        queryKey: ['comercios-publicos', servicioId],
        queryFn: async () => {
            if (!servicioId) return [];

            try {
                const { data } = await axiosInstance.get<Comercio[]>(`/comercios/publicos?servicio_id=${servicioId}`);
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

    const { closeModal, setModalTitle, setModalContent } = useModal();

    return useMutation({
        mutationFn: async (formData: FormData) => {
            const { data } = await axiosInstance.post("/comercios", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            return data;
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ["comercios"] });
            AlertService.success('Guardado exitosamente', 'Tu registro ha sido almacenado.');

            closeModal()
            setModalTitle('')
            setModalContent('')

        },
        onError: (error: AxiosError<ServerError>) => {
            const messageError: string[] | string = error.response?.data?.message || "Error al crear el comercio";
            console.log(messageError)
            AlertService.error('Error al guardar', messageError);
        },
    });
};



export const useActualizarComercio = () => {
    const axiosInstance = useAxiosInstance();
    const queryClient = useQueryClient();
    const { closeModal, setModalTitle, setModalContent } = useModal();


    return useMutation({
        mutationFn: async (formData: FormData) => {
            const comercioId = formData.get('id');
            
            if (!comercioId) throw new Error('ID del comercio es requerido para actualizar');

            const { data } = await axiosInstance.patch(`/comercios/${comercioId}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            return data;
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ["comercios"] });
            closeModal()
            setModalTitle('')
            setModalContent('')
            AlertService.success('Actualizado exitosamente', 'El comercio ha sido actualizado.');
        },
        onError: (error: AxiosError<ServerError>) => {
            const messageError: string[] | string = error.response?.data?.message || "Error al actualizar el comercio";
            console.error(messageError);
            AlertService.error('Error al actualizar', messageError);
        },
    });
};

export const useBuscarComercios = (search: string) => {
    const axiosInstance = useAxiosInstance();
  
    return useQuery<Comercio[], AxiosError<ServerError>>({
      queryKey: ['comercios-search', search],
      queryFn: async () => {
        if (!search.trim()) return [];
        const { data } = await axiosInstance.get(`/comercios/search`, {
          params: { search },
        });
        return data;
      },
      enabled: !!search, // Solo se ejecuta si hay una búsqueda
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 10,
    });
  };