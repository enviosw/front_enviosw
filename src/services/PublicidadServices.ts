// src/services/PublicidadServices.ts
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosInstance from "../utils/axiosConfig";
import { AxiosError } from "axios";
import { ServerError } from "../shared/types/serverErrorInterface";
import { AlertService } from "../utils/AlertService";
import { useModal } from "../context/ModalContext";

/** ✅ Ajusta esta interfaz si tu entidad tiene más campos */
export interface Publicidad {
  id: number;
  imagen: string;
  ruta: string;
  estado: number;
  orden: number;
  fecha_inicio?: string | null;
  fecha_fin?: string | null;
  created_at?: string;
  updated_at?: string;
}

/** ✅ LISTAR TODAS */
export const usePublicidades = () => {
  const axiosInstance = useAxiosInstance();

  return useQuery<Publicidad[]>({
    queryKey: ["publicidad"],
    queryFn: async () => {
      const { data } = await axiosInstance.get("/publicidad");
      return data;
    },
  });
};

/** ✅ LISTAR VIGENTES PARA SLIDER */
export const usePublicidadSlider = () => {
  const axiosInstance = useAxiosInstance();

  return useQuery<Publicidad[]>({
    queryKey: ["publicidad-slider"],
    queryFn: async () => {
      const { data } = await axiosInstance.get("/publicidad/vigentes/slider");
      return data;
    },
    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 15,
  });
};

/** ✅ OBTENER UNA POR ID */
export const usePublicidadById = (id: number | null) => {
  const axiosInstance = useAxiosInstance();

  return useQuery<Publicidad>({
    queryKey: ["publicidad", id],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/publicidad/${id}`);
      return data;
    },
    enabled: !!id,
  });
};

/** ✅ CREAR (multipart/form-data, con imagen opcional) */
export const useCrearPublicidad = () => {
  const axiosInstance = useAxiosInstance();
  const queryClient = useQueryClient();
  const { closeModal, setModalTitle, setModalContent } = useModal();

  return useMutation({
    mutationFn: async (formData: FormData) => {
      const { data } = await axiosInstance.post("/publicidad", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["publicidad"] });
      await queryClient.invalidateQueries({ queryKey: ["publicidad-slider"] });

      AlertService.success("Guardado exitosamente", "La publicidad fue creada.");

      closeModal();
      setModalTitle("");
      setModalContent("");
    },
    onError: (error: AxiosError<ServerError>) => {
      const messageError: string[] | string =
        error.response?.data?.message || "Error al crear la publicidad";
      console.error(messageError);
      AlertService.error("Error al guardar", messageError);
    },
  });
};

/** ✅ ACTUALIZAR (multipart/form-data, imagen opcional) */
export const useActualizarPublicidad = () => {
  const axiosInstance = useAxiosInstance();
  const queryClient = useQueryClient();
  const { closeModal, setModalTitle, setModalContent } = useModal();

  return useMutation({
    mutationFn: async (formData: FormData) => {
      const id = formData.get("id");
      if (!id) throw new Error("ID de la publicidad es requerido para actualizar");

      const { data } = await axiosInstance.patch(`/publicidad/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["publicidad"] });
      await queryClient.invalidateQueries({ queryKey: ["publicidad-slider"] });

      AlertService.success("Actualizado", "La publicidad fue actualizada.");

      closeModal();
      setModalTitle("");
      setModalContent("");
    },
    onError: (error: AxiosError<ServerError>) => {
      const messageError: string[] | string =
        error.response?.data?.message || "Error al actualizar la publicidad";
      console.error(messageError);
      AlertService.error("Error al actualizar", messageError);
    },
  });
};

/** ✅ ELIMINAR */
export const useEliminarPublicidad = () => {
  const axiosInstance = useAxiosInstance();
  const queryClient = useQueryClient();
  const { closeModal, setModalTitle, setModalContent } = useModal();

  return useMutation({
    mutationFn: async (id: number) => {
      if (!id) throw new Error("ID de la publicidad es requerido para eliminar");
      const { data } = await axiosInstance.delete(`/publicidad/${id}`);
      return data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["publicidad"] });
      await queryClient.invalidateQueries({ queryKey: ["publicidad-slider"] });

      AlertService.success("Eliminado", "La publicidad fue eliminada.");

      closeModal();
      setModalTitle("");
      setModalContent("");
    },
    onError: (error: AxiosError<ServerError>) => {
      const messageError: string[] | string =
        error.response?.data?.message || "Error al eliminar la publicidad";
      console.error(messageError);
      AlertService.error("Error al eliminar", messageError);
    },
  });
};
