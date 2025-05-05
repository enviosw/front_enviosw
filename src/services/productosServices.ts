import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Producto } from "../shared/types/productosInterface";
import useAxiosInstance from "../utils/axiosConfig";
import { ServerError } from "../shared/types/serverErrorInterface";
import { AxiosError } from "axios";
import { useModal } from "../context/ModalContext";
import { AlertService } from "../utils/AlertService";


interface ProductoFilters {
  page: number;
  take?: number;
  search?: string;
  estado?: string;
  categoriaId?: number;
  comercioId?: number;
}

interface ProductosResponse {
  data: Producto[];
  total: number;
  page: number;
  lastPage: number;
}


export const useProductos = (filters: ProductoFilters) => {
  const axiosInstance = useAxiosInstance();

  return useQuery<ProductosResponse>({
    queryKey: ['productos', filters],
    queryFn: async () => {
      const { data } = await axiosInstance.get('/productos', { params: filters });
      return data;
    },
    // keepPreviousData: true, // opcional
  });
};


export const useCrearProducto = () => {

  const axiosInstance = useAxiosInstance();
  const queryClient = useQueryClient();
  const { closeModal, setModalTitle, setModalContent } = useModal();

  return useMutation({
    mutationFn: async (formData: FormData) => {
      for (const [key, value] of formData.entries()) {
        console.log(`📦 ${key}:`, value);
      }
      const { data } = await axiosInstance.post('/productos', formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['productos'] });
      AlertService.success('Producto creado', 'El producto fue guardado correctamente.');
      closeModal();
      setModalTitle('');
      setModalContent('');
    },
    onError: (error: AxiosError<ServerError>) => {
      const messageError = error.response?.data?.message || 'Error al crear el producto';
      AlertService.error('Error', messageError);
    },
  });
};


export const useActualizarProducto = () => {
  const axiosInstance = useAxiosInstance();
  const queryClient = useQueryClient();
  const { closeModal, setModalTitle, setModalContent } = useModal();

  return useMutation({
    mutationFn: async (formData: FormData) => {
      console.log(formData)
      const productoId = formData.get('id');
      console.log("ID", productoId)
      if (!productoId) throw new Error('ID del producto es requerido para actualizar');

      const { data } = await axiosInstance.patch(`/productos/${productoId}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });



      return data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['productos'] });
      AlertService.success('Producto actualizado', 'Los cambios se guardaron correctamente.');
      closeModal();
      setModalTitle('');
      setModalContent('');
    },
    onError: (error: AxiosError<ServerError>) => {
      const messageError = error.response?.data?.message || 'Error al actualizar el producto';
      AlertService.error('Error', messageError);
    },
  });
};


export const useProducto = (id: number) => {
  const axiosInstance = useAxiosInstance();

  return useQuery<Producto>({
    queryKey: ['producto', id],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/productos/${id}`);
      return data;
    },
    enabled: !!id,
  });
};



// services/productosServices.ts
export const useProductosPublicos = (comercioId: number | null, categoriaId?: number) => {
  const axiosInstance = useAxiosInstance();

  return useQuery<Producto[]>({
    queryKey: ['productos-publicos', comercioId, categoriaId],
    queryFn: async () => {
      if (!comercioId) return [];

      const params: Record<string, number> = { comercio_id: comercioId };
      if (categoriaId) params.categoria_id = categoriaId;

      const { data } = await axiosInstance.get<Producto[]>('/productos/comercio', { params });
      return data;
    },
    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 15,
  });
};

