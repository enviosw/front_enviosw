import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosInstance from "../utils/axiosConfig";
import { AxiosError } from "axios";
import { AlertService } from "../utils/AlertService";
import { ServerError } from "../shared/types/serverErrorInterface";
import { useModal } from "../context/ModalContext";

// Tipo para las imágenes
export interface Imagen {
  id: number;
  nombre: string;
  ruta: string;
  creadoEn: string;
}

// 🔍 Obtener imágenes
export const useImagenes = () => {
  const axiosInstance = useAxiosInstance();

  return useQuery<Imagen[], AxiosError<ServerError>>({
    queryKey: ["imagenes"],
    queryFn: async () => {
      const { data } = await axiosInstance.get("/imagenes");
      return data;
    },
    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 15,
  });
};

// 📤 Crear imagen
export const useCrearImagen = () => {
  const axiosInstance = useAxiosInstance();
  const queryClient = useQueryClient();
  const { closeModal, setModalContent, setModalTitle } = useModal();

  return useMutation({
    mutationFn: async (formData: FormData) => {
      const { data } = await axiosInstance.post("/imagenes/subir", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["imagenes"] });
      AlertService.success("Imagen guardada", "La imagen fue subida exitosamente.");
      closeModal();
      setModalTitle("");
      setModalContent("");
    },
    onError: (error: AxiosError<ServerError>) => {
      const msg = error.response?.data?.message || "Error al subir imagen";
      AlertService.error("Error", msg);
    },
  });
};

// ❌ Eliminar imagen
export const useEliminarImagen = () => {
  const axiosInstance = useAxiosInstance();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      await axiosInstance.delete(`/imagenes/${id}`);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["imagenes"] });
      AlertService.success("Imagen eliminada", "La imagen ha sido eliminada.");
    },
    onError: (error: AxiosError<ServerError>) => {
      const msg = error.response?.data?.message || "Error al eliminar imagen";
      AlertService.error("Error", msg);
    },
  });
};
