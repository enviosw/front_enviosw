import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import useAxiosInstance from '../utils/axiosConfig';
import { AlertService } from '../utils/AlertService';
import { ServerError } from '../shared/types/serverErrorInterface';

// Tipo del payload de pedido
interface ProductoPedido {
    nombre: string;
    cantidad: number;
    precio: number;
}

interface PedidoWhatsAppPayload {
    destino: string; // ejemplo: "573001112233"
    productos: ProductoPedido[];
    direccion: string;
    telefono?: string;
}

export const useEnviarPedidoWhatsApp = () => {
    const axiosInstance = useAxiosInstance();

    return useMutation({
        mutationFn: async (pedido: PedidoWhatsAppPayload) => {
            const { data } = await axiosInstance.post('/whatsapp/enviar-pedido', pedido);
            return data;
        },
        onSuccess: () => {
            AlertService.success('Pedido enviado', 'El pedido fue enviado a WhatsApp correctamente.');
        },
        onError: (error: AxiosError<ServerError>) => {
            const mensaje = error.response?.data?.message || 'Error al enviar el pedido a WhatsApp';
            console.error(mensaje);
            AlertService.error('Error al enviar', mensaje);
        },
    });
};
