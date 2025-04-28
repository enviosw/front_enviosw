// src/axiosConfig.ts
import axios from 'axios';


const useAxiosInstance = () => {
    // Accede al contexto para obtener el token

    const axiosInstance = axios.create({
        baseURL: 'https://bwd0wg7v-3000.use2.devtunnels.ms/',

        // baseURL: import.meta.env.VITE_API_URL,
        headers: {
            'Content-Type': 'application/json',
        },
    });

    return axiosInstance;
};

export default useAxiosInstance;