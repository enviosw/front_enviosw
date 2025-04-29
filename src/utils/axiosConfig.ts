// src/axiosConfig.ts
import axios from 'axios';


const useAxiosInstance = () => {
    // Accede al contexto para obtener el token

    const axiosInstance = axios.create({
        baseURL: 'http://localhost:3000',

        // baseURL: import.meta.env.VITE_API_URL,
        headers: {
            'Content-Type': 'application/json',
        },
    });

    return axiosInstance;
};

export default useAxiosInstance;