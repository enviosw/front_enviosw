// src/services/preciosDomicilio.services.ts
import { AxiosError } from "axios";
import { useEffect } from "react";
import useAxiosInstance from "../utils/axiosConfig";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { AlertService } from "../utils/AlertService";

export type SumaPorDomiciliario = {
  numero_domiciliario: string;
  total: string;
};

export type SumaPorDia = {
  dia: string;   // 'YYYY-MM-DD'
  total: string;
};

export type ServerError = { message?: string };

/**
 * GET /precios-domicilio/sumas/hoy-por-domiciliario
 * Suma de costos agrupada por numero_domiciliario SOLO para el día actual (America/Bogota)
 */
export const useSumasHoyPorDomiciliario = (
  enabled = true,
  showErrors = true
) => {
  const axiosInstance = useAxiosInstance();

  const q = useQuery<SumaPorDomiciliario[], Error>({
    queryKey: ["precios-hoy-por-domiciliario"],
    queryFn: async () => {
      try {
        const { data } = await axiosInstance.get<SumaPorDomiciliario[]>(
          "/precios-domicilio/sumas/hoy-por-domiciliario"
        );
        return data ?? [];
      } catch (error) {
        const axiosError = error as AxiosError<ServerError>;
        const msg =
          axiosError.response?.data?.message ||
          "Error al obtener sumas de hoy";
        throw new Error(msg);
      }
    },
    enabled,
    // v5
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    retry: 1,
  });

  useEffect(() => {
    if (showErrors && q.isError) {
      AlertService.error("No se pudieron cargar los datos", q.error.message);
    }
  }, [showErrors, q.isError, q.error]);

  return q;
};

/**
 * GET /precios-domicilio/sumas/por-dia?start=YYYY-MM-DD&end=YYYY-MM-DD
 * Si no pasas fechas: el backend devuelve solo el día actual (America/Bogota)
 */
export const useSumasPorDia = (
  params?: { start?: string; end?: string },
  enabled = true,
  showErrors = true
) => {
  const axiosInstance = useAxiosInstance();

  const queryKey = ["precios-por-dia", params?.start ?? null, params?.end ?? null] as const;

  const q = useQuery<SumaPorDia[], Error>({
    queryKey,
    queryFn: async () => {
      try {
        const search =
          [
            params?.start ? `start=${encodeURIComponent(params.start)}` : null,
            params?.end ? `end=${encodeURIComponent(params.end)}` : null,
          ]
            .filter(Boolean)
            .join("&") || "";

        const suffix = search ? `?${search}` : "";

        const { data } = await axiosInstance.get<SumaPorDia[]>(
          `/precios-domicilio/sumas/por-dia${suffix}`
        );
        return data ?? [];
      } catch (error) {
        const axiosError = error as AxiosError<ServerError>;
        const msg =
          axiosError.response?.data?.message || "Error al obtener sumas por día";
        throw new Error(msg);
      }
    },
    enabled,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    retry: 1,
  });

  useEffect(() => {
    if (showErrors && q.isError) {
      AlertService.error("No se pudieron cargar los datos", q.error.message);
    }
  }, [showErrors, q.isError, q.error]);

  return q;
};

/** Prefetch opcional (no cambia con v5) */
export const usePreciosPrefetch = () => {
  const qc = useQueryClient();

  const prefetchSumasHoy = async () => {
    await qc.prefetchQuery({
      queryKey: ["precios-hoy-por-domiciliario"],
      queryFn: async () => [], // define si quieres realmente hacer fetch aquí
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 10,
    });
  };

  const prefetchSumasPorDia = async (start?: string, end?: string) => {
    await qc.prefetchQuery({
      queryKey: ["precios-por-dia", start ?? null, end ?? null],
      queryFn: async () => [],
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 10,
    });
  };

  return { prefetchSumasHoy, prefetchSumasPorDia };
};
