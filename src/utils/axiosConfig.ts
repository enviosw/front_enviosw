// src/axiosConfig.ts
import axios from 'axios';
import { BASE_URL } from './baseUrl';


const useAxiosInstance = () => {
    // Accede al contexto para obtener el token

    const axiosInstance = axios.create({
        baseURL: BASE_URL,

        // baseURL: import.meta.env.VITE_API_URL,
        headers: {
            'Content-Type': 'application/json',
        },
    });

    return axiosInstance;
};

export default useAxiosInstance;