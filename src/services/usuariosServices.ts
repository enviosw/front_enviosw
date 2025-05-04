import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Usuario } from "../shared/types/usuariosInterface";
import useAxiosInstance from "../utils/axiosConfig";
import { AxiosError } from "axios";
import { ServerError } from "../shared/types/serverErrorInterface";
import { AlertService } from "../utils/AlertService";
import { useModal } from "../context/ModalContext";

// Obtener lista de usuarios con filtros
export const useUsuarios = (filters: { page: number; search?: string; estado?: string; fechaInicio?: string; fechaFin?: string }) => {
    const axiosInstance = useAxiosInstance();

    return useQuery<Usuario[]>({
        queryKey: ['usuarios', filters],
        queryFn: async () => {
            const { data } = await axiosInstance.get<Usuario[]>('/usuarios', { params: filters });
            return data;
        },
    });
};
// Crear nuevo usuario
export const useCrearUsuario = () => {
    const axiosInstance = useAxiosInstance();
    const queryClient = useQueryClient();

        const { closeModal, setModalTitle, setModalContent } = useModal();
    

    return useMutation({
        mutationFn: async (usuario: Usuario) => {
            const { data } = await axiosInstance.post("/usuarios", usuario);
            return data;
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ["usuarios"] });
            AlertService.success('Guardado exitosamente', 'El usuario ha sido registrado.');
            closeModal()
            setModalTitle('')
            setModalContent('')
        },
        onError: (error: AxiosError<ServerError>) => {
            const messageError: string[] | string = error.response?.data?.message || "Error al crear el usuario";
            console.error(messageError);
            AlertService.error('Error al guardar', messageError);
        },
    });
};

// Actualizar usuario
export const useActualizarUsuario = () => {
    const axiosInstance = useAxiosInstance();
    const queryClient = useQueryClient();
    const { closeModal, setModalTitle, setModalContent } = useModal();


    return useMutation({
        mutationFn: async (usuario: Usuario) => {
            const usuarioId = usuario.id;
            if (!usuarioId) throw new Error('ID del usuario es requerido para actualizar');

            const { data } = await axiosInstance.patch(`/usuarios/${usuarioId}`, usuario);
            return data;
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ["usuarios"] });
            AlertService.success('Actualizado exitosamente', 'El usuario ha sido actualizado.');
            closeModal()
            setModalTitle('')
            setModalContent('')
        },
        onError: (error: AxiosError<ServerError>) => {
            const messageError: string[] | string = error.response?.data?.message || "Error al actualizar el usuario";
            console.error(messageError);
            AlertService.error('Error al actualizar', messageError);
        },
    });
};

// Eliminar usuario
export const useEliminarUsuario = () => {
    const axiosInstance = useAxiosInstance();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (usuarioId: number) => {
            const { data } = await axiosInstance.delete(`/usuarios/${usuarioId}`);
            return data;
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ["usuarios"] });
            AlertService.success('Eliminado exitosamente', 'El usuario ha sido eliminado.');
        },
        onError: (error: AxiosError<ServerError>) => {
            const messageError: string[] | string = error.response?.data?.message || "Error al eliminar el usuario";
            console.error(messageError);
            AlertService.error('Error al eliminar', messageError);
        },
    });
};
