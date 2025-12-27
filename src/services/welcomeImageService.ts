import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosInstance from "../utils/axiosConfig";
import { AxiosError } from "axios";
import { ServerError } from "../shared/types/serverErrorInterface";
import { AlertService } from "../utils/AlertService";
import { useModal } from "../context/ModalContext";

export interface WelcomeImageResponse {
  id: number;
  code: string;
  path: string; // "/uploads/xxxx.png"
}

export const useWelcomeImage = () => {
  const axiosInstance = useAxiosInstance();

  return useQuery<WelcomeImageResponse | null>({
    queryKey: ["welcome-image"],
    queryFn: async () => {
      try {
        const { data } = await axiosInstance.get("/welcome-image");
        return data; // puede venir null si no existe
      } catch (error) {
        // si tu backend lanza 404 cuando no hay registro, devolvemos null
        const err = error as AxiosError;
        if (err.response?.status === 404) return null;
        throw error;
      }
    },
    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 15,
  });
};

export const useUploadWelcomeImage = () => {
  const axiosInstance = useAxiosInstance();
  const queryClient = useQueryClient();
  const { closeModal, setModalTitle, setModalContent } = useModal();

  return useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append("image", file);

      const { data } = await axiosInstance.post("/welcome-image", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      return data as WelcomeImageResponse;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["welcome-image"] });

      AlertService.success("Guardado", "Imagen de bienvenida actualizada.");
      closeModal();
      setModalTitle("");
      setModalContent("");
    },
    onError: (error: AxiosError<ServerError>) => {
      const messageError: string[] | string =
        error.response?.data?.message || "Error al subir la imagen";
      AlertService.error("Error", messageError);
    },
  });
};
