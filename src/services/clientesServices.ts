import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosInstance from "../utils/axiosConfig";
import { AxiosError } from "axios";
import { ServerError } from "../shared/types/serverErrorInterface";
import { AlertService } from "../utils/AlertService";
import { useModal } from "../context/ModalContext";
import { Cliente } from "../shared/types/clienteInterface";

// Obtener lista de clientes con filtros
export const useClientes = (filters: { page: number; search?: string; estado?: string; fechaInicio?: string; fechaFin?: string }) => {
    const axiosInstance = useAxiosInstance();

    return useQuery<Cliente[]>({
        queryKey: ['clientes', filters],
        queryFn: async () => {
            const { data } = await axiosInstance.get<Cliente[]>('/clientes', { params: filters });
            return data;
        },
    });
};
// Crear nuevo cliente
export const useCrearCliente = () => {
    const axiosInstance = useAxiosInstance();
    const queryClient = useQueryClient();

        const { closeModal, setModalTitle, setModalContent } = useModal();
    

    return useMutation({
        mutationFn: async (cliente: Cliente) => {
            console.log(cliente);
            
            const { data } = await axiosInstance.post("/clientes", cliente);
            return data;
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ["clientes"] });
            AlertService.success('Guardado exitosamente', 'El cliente ha sido registrado.');
            closeModal()
            setModalTitle('')
            setModalContent('')
        },
        onError: (error: AxiosError<ServerError>) => {
            const messageError: string[] | string = error.response?.data?.message || "Error al crear el cliente";
            console.error(messageError);
            AlertService.error('Error al guardar', messageError);
        },
    });
};

// Actualizar cliente
export const useActualizarCliente = () => {
    const axiosInstance = useAxiosInstance();
    const queryClient = useQueryClient();
    const { closeModal, setModalTitle, setModalContent } = useModal();


    return useMutation({
        mutationFn: async (cliente: Cliente) => {
            const clienteId = cliente.id;
            if (!clienteId) throw new Error('ID del cliente es requerido para actualizar');

            const { data } = await axiosInstance.patch(`/clientes/${clienteId}`, cliente);
            
            return data;
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ["clientes"] });
            AlertService.success('Actualizado exitosamente', 'El cliente ha sido actualizado.');
            closeModal()
            setModalTitle('')
            setModalContent('')
        },
        onError: (error: AxiosError<ServerError>) => {
            const messageError: string[] | string = error.response?.data?.message || "Error al actualizar el cliente";
            console.error(messageError);
            AlertService.error('Error al actualizar', messageError);
        },
    });
};

export const useOcultarClientes = () => {
    const axiosInstance = useAxiosInstance();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (ids: number[]) => {
            const { data } = await axiosInstance.patch(`/clientes/hideCustomers`, {'ids': ids});
            return data;
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ["clientes"] });
            AlertService.success('Eliminado exitosamente', 'El cliente ha sido eliminado.');
        },
        onError: (error: AxiosError<ServerError>) => {
            const messageError: string[] | string = error.response?.data?.message || "Error al eliminar el cliente";
            console.error(messageError);
            AlertService.error('Error al eliminar', messageError);
        },
    });
};

// Eliminar cliente
export const useEliminarCliente = () => {
    const axiosInstance = useAxiosInstance();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (clienteId: number) => {
            const { data } = await axiosInstance.delete(`/clientes/${clienteId}`);
            return data;
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ["clientes"] });
            AlertService.success('Eliminado exitosamente', 'El cliente ha sido eliminado.');
        },
        onError: (error: AxiosError<ServerError>) => {
            const messageError: string[] | string = error.response?.data?.message || "Error al eliminar el cliente";
            console.error(messageError);
            AlertService.error('Error al eliminar', messageError);
        },
    });
};