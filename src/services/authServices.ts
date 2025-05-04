import { useMutation } from "@tanstack/react-query";
import useAxiosInstance from "../utils/axiosConfig";
import { AxiosError } from "axios";
import { ServerError } from "../shared/types/serverErrorInterface";
import { AlertService } from "../utils/AlertService";
import { AuthResponse, Login, RegisterAuth } from "../shared/types/authInterface";


export const useLogin = () => {
    const axiosInstance = useAxiosInstance();

    return useMutation({
        mutationFn: async (body: Login): Promise<AuthResponse> => {
            const { data } = await axiosInstance.post('/auth/login', body);
            return data;
        },
        onSuccess: (data) => {
            localStorage.setItem('access_token', data.access_token);
            localStorage.setItem('refresh_token', data.refresh_token);
            localStorage.setItem('user', JSON.stringify(data.user));
            AlertService.success('Bienvenido', `Hola, ${data.user.nombre}`);

            // Redirige según el rol
            const userRole = data.user.rol;
            if (userRole === 'administrador') {
                window.location.href = '/dashboard';
            } else if (userRole === 'aliado') {
                window.location.href = '/mi-comercio';
            } else {
                window.location.href = '/';
            }
        },
        onError: (error: AxiosError<ServerError>) => {
            const message = error.response?.data.message || 'Error de inicio de sesión';
            AlertService.error('Error', message);
        },
    });
};


export const useRegister = () => {
    const axiosInstance = useAxiosInstance();

    return useMutation({
        mutationFn: async (body: RegisterAuth): Promise<AuthResponse> => {
            const { data } = await axiosInstance.post('/auth/register', body);
            return data;
        },
        onSuccess: (data) => {
            AlertService.success('Registro exitoso', `Bienvenido, ${data.user.nombre}`);
        },
        onError: (error: AxiosError<ServerError>) => {
            const message = error.response?.data.message || 'Error en el registro';
            AlertService.error('Error', message);
        },
    });
};

export const useRefreshToken = () => {
    const axiosInstance = useAxiosInstance();

    return useMutation({
        mutationFn: async (): Promise<{ access_token: string }> => {
            const refresh_token = localStorage.getItem('refresh_token');
            const userId = JSON.parse(localStorage.getItem('user') || '{}')?.id;

            const { data } = await axiosInstance.post('/auth/refresh', {
                userId,
                refreshToken: refresh_token,
            });

            return data;
        },
        onSuccess: (data) => {
            localStorage.setItem('access_token', data.access_token);
        },
        onError: (error: AxiosError<ServerError>) => {
            console.error('Error al refrescar el token', error);
        },
    });
};

export const useLogout = () => {
    const axiosInstance = useAxiosInstance();

    return useMutation({
        mutationFn: async (): Promise<void> => {
            await axiosInstance.post('/auth/logout');
        },
        onSuccess: () => {
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            localStorage.removeItem('user');
            AlertService.success('Sesión cerrada', 'Has cerrado sesión correctamente.');
        },
        onError: (error: AxiosError<ServerError>) => {
            const message = error.response?.data.message || 'Error al cerrar sesión';
            AlertService.error('Error', message);
        },
    });
};