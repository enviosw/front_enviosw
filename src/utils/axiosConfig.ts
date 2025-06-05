import axios from 'axios';
import { BASE_URL } from './baseUrl';

const useAxiosInstance = () => {
    const token = localStorage.getItem('access_token');

    const axiosInstance = axios.create({
        baseURL: BASE_URL,
        headers: {
            'Content-Type': 'application/json',
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
    });

    // ✅ Interceptor para respuestas con error
    axiosInstance.interceptors.response.use(
        (response) => response,
        (error) => {
            if (error.response && error.response.status === 401) {
                // 🔴 Eliminar token
                localStorage.removeItem('access_token');

                // 🔴 Redirigir al login o recargar
                window.location.href = '/login'; // Cambia a tu ruta de login real
            }

            return Promise.reject(error);
        }
    );

    return axiosInstance;
};

export default useAxiosInstance;
