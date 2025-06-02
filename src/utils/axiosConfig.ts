import axios from 'axios';
import { BASE_URL } from './baseUrl';

const useAxiosInstance = () => {
    const token = localStorage.getItem('access_token'); // ✅ toma el token del localStorage

    const axiosInstance = axios.create({
        baseURL: BASE_URL,
        headers: {
            'Content-Type': 'application/json',
            ...(token ? { Authorization: `Bearer ${token}` } : {}), // ✅ agrega el header si existe
        },
    });

    return axiosInstance;
};

export default useAxiosInstance;
