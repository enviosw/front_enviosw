import { AxiosError } from "axios";
import { DomiciliarioType } from "../shared/types/domiInterface";
import { ServerError } from "../shared/types/serverErrorInterface";
import useAxiosInstance from "../utils/axiosConfig";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useModal } from "../context/ModalContext";
import { AlertService } from "../utils/AlertService";

// ✅ Obtener domiciliarios
export const useDomiciliarios = () => {
  const axiosInstance = useAxiosInstance();

  return useQuery<DomiciliarioType[]>({
    queryKey: ['domiciliarios'],
    queryFn: async () => {
      const { data } = await axiosInstance.get('/domiciliarios');
      return data;
    },
    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 15,
  });
};

// ✅ Crear domiciliario
export const useRegistrarDomiciliario = () => {
  const axiosInstance = useAxiosInstance();
  const { closeModal, setModalTitle, setModalContent } = useModal();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (domiciliario: DomiciliarioType) => {
      const { data } = await axiosInstance.post('/domiciliarios', domiciliario);
      return data;
    },
    onError: (error: AxiosError<ServerError>) => {
      AlertService.error('Error al guardar', error.response?.data.message || error.message);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["domiciliarios"] });
      AlertService.success('Domiciliario registrado', 'Registro exitoso');
      closeModal();
      setModalTitle('');
      setModalContent('');
    },
  });
};

// ✅ Actualizar domiciliario
export const useActualizarDomiciliario = () => {
  const axiosInstance = useAxiosInstance();
  const { closeModal, setModalTitle, setModalContent } = useModal();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (domiciliario: DomiciliarioType) => {
      if (!domiciliario.id) {
        throw new Error("El ID del domiciliario es requerido");
      }
      const { data } = await axiosInstance.put(`/domiciliarios/${domiciliario.id}`, domiciliario);
      return data;
    },
    onError: (error: AxiosError<ServerError>) => {
      AlertService.error('Error al actualizar', error.response?.data.message || error.message);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["domiciliarios"] });
      AlertService.success('Domiciliario actualizado', 'Actualización exitosa');
      closeModal();
      setModalTitle('');
      setModalContent('');
    },
  });
};



// ✅ Cambiar estado activo/inactivo
export const useToggleEstadoDomiciliario = () => {
  const axiosInstance = useAxiosInstance();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      const { data } = await axiosInstance.patch(`/domiciliarios/${id}/toggle-estado`);
      return data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['domiciliarios'] });
      AlertService.success('Estado cambiado', 'El estado del domiciliario fue actualizado.');
    },
    onError: (error: AxiosError<ServerError>) => {
      AlertService.error('Error al cambiar estado', error.response?.data.message || error.message);
    }
  });
};



export interface MensajeType {
  id: string;
  conversacion_id: string;
  emisor: string;
  receptor: string;
  contenido: string;
  timestamp: string;
  tipo: string;
}

// export const useMensajesPorConversacion = (cliente: string, domiciliario: string) => {
//   const axiosInstance = useAxiosInstance();

//   return useQuery<MensajeType[], AxiosError<ServerError>>({
//     queryKey: ['mensajes', { cliente, domiciliario }],
//     queryFn: async () => {
//       const { data } = await axiosInstance.get(`/chatbot/mensajes`, {
//         params: { cliente, domiciliario },
//       });
//       return data;
//     },
//     enabled: !!cliente && !!domiciliario, // solo ejecuta si ambos existen
//   });
// };


export const useMensajesPorConversacion = (idConversacion?: string) => {
  const axiosInstance = useAxiosInstance();

  return useQuery<MensajeType[], AxiosError<ServerError>>({
    queryKey: ['mensajes', idConversacion],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/chatbot/mensajes/${idConversacion}`);
      return data;
    },
    enabled: !!idConversacion,
  });
};




export interface ChatResumenType {
  conversacionId: string;
  cliente: string;
  estado: 'activa' | 'finalizada';
  ultimoMensaje: string | null;
  timestamp: string;
  tipo: string;
}

export const useChatsPorDomiciliario = (numeroDomiciliario: string) => {
  const axiosInstance = useAxiosInstance();

  return useQuery<ChatResumenType[], AxiosError<ServerError>>({
    queryKey: ['chats', numeroDomiciliario],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/chatbot/chats/${numeroDomiciliario}`);
      return data;
    },
    enabled: !!numeroDomiciliario, // solo ejecuta si se pasa el número
  });
};


export interface DomiciliarioResumen {
  id: number;
  nombre: string;
  telefono_whatsapp: string;
}


// ✅ Hook: obtener resumen de domiciliarios usados en domicilios
export const useDomiciliariosResumen = () => {
  const axiosInstance = useAxiosInstance();

  return useQuery<DomiciliarioResumen[], AxiosError<ServerError>>({
    queryKey: ['domiciliarios', 'resumen'],
    queryFn: async () => {
      const { data } = await axiosInstance.get('/domiciliarios/resumen');
      return data;
    },
    staleTime: 1000 * 60 * 10, // 10 minutos
    gcTime: 1000 * 60 * 15,
  });
};





/** Si ya tienes este enum en "shared", impórtalo desde allí */
export enum DomicilioEstado {
  PENDIENTE = 0,
  ASIGNADO = 1,
  CANCELADO_TIMEOUT = -1,
  PROCESO = 3,

}

/** DTO que envía el front al endpoint /domicilios/plataforma */
export interface RegistrarDomiPlataformaDto {
  estado: DomicilioEstado | number;   // puedes dejar number si prefieres
  fecha?: string;                      // ISO 8601 (ej. new Date().toISOString())
  numero_cliente: string;
  tipo_servicio: number;
  origen_direccion: string;
  destino_direccion: string;
  detalles_pedido?: string;
}

/** Respuesta mínima esperada (ajústala a tu modelo si la necesitas) */
export interface DomicilioResponse {
  id: number;
  estado?: number;
  fecha?: string;
  numero_cliente: string;
  tipo_servicio: number;
  origen_direccion: string;
  destino_direccion: string;
  detalles_pedido?: string;
  // ...otros campos que devuelva el backend
}

/** ✅ Hook: registrar domicilio desde la plataforma */
export const useRegistrarDomiPlataforma = () => {
  const axiosInstance = useAxiosInstance();
  const { closeModal, setModalTitle, setModalContent } = useModal();
  const queryClient = useQueryClient();

  return useMutation<DomicilioResponse, AxiosError<ServerError>, RegistrarDomiPlataformaDto>({
    mutationFn: async (payload: RegistrarDomiPlataformaDto) => {
      const { data } = await axiosInstance.post('/domicilios/plataforma', payload);
      return data;
    },
    onSuccess: async () => {
      // Invalida listas relacionadas para que refresquen (ajusta keys a tu app)
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['domicilios'] }),
        queryClient.invalidateQueries({ queryKey: ['domicilios', 'pendientes'] }),
      ]);
      AlertService.success('Domicilio registrado', 'Se creó el domicilio correctamente.');
      closeModal();
      setModalTitle('');
      setModalContent('');
    },
    onError: (error) => {
      AlertService.error('Error al registrar', error.response?.data?.message || error.message);
    },
  });
};



/** ✅ Hook: listar SOLO domicilios de plataforma (tipo_servicio=3) con estado=3 (PROCESO) */
type Options = { pollMs?: number | false };

export const useDomiciliosPlataforma = (estado: number, opts: Options = {}) => {
  const axios = useAxiosInstance();

  return useQuery<DomicilioResponse[], AxiosError<ServerError>>({
    queryKey: ['domicilios', 'plataforma', { estado }],
    queryFn: async () => {
      const { data } = await axios.get('/domicilios/plataforma', { params: { estado } });
      return data;
    },

    // 🔥 Siempre “stale”, sin conservar en caché cuando queda inactivo
    staleTime: 0,
    gcTime: 0,

    // 🔁 Forzar refetch en todos los casos
    refetchOnMount: 'always',
    refetchOnWindowFocus: 'always',
    refetchOnReconnect: 'always',

    // ⏱️ Opcional: polling
    refetchInterval: opts.pollMs ?? false, // por ej. 5000 para cada 5s

    // (opcional) menos reintentos si falla
    retry: 1,
  });
};



// ✅ Listar por orden de disponibilidad (disponibles primero, luego turno_orden)
export const useDomiciliariosPorDisponibilidad = () => {
  const axiosInstance = useAxiosInstance();

  return useQuery<DomiciliarioType[], AxiosError<ServerError>>({
    queryKey: ['domiciliarios', 'orden', 'disponibilidad'],
    queryFn: async () => {
      const { data } = await axiosInstance.get('/domiciliarios/orden/disponibilidad');
      return data;
    },
    staleTime: 1000 * 60 * 5, // 5 min
    gcTime: 1000 * 60 * 15,
  });
};

// ✅ Ver el siguiente disponible SIN asignar (útil para UI)
export const useSiguienteDomiciliario = () => {
  const axiosInstance = useAxiosInstance();

  return useQuery<DomiciliarioType | null, AxiosError<ServerError>>({
    queryKey: ['domiciliarios', 'siguiente'],
    queryFn: async () => {
      const { data } = await axiosInstance.get('/domiciliarios/siguiente');
      return data; // puede venir null si no hay disponibles
    },
    staleTime: 1000 * 30, // 30s: suele cambiar seguido
    gcTime: 1000 * 60 * 10,
  });
};

// ♻️ Reiniciar turnos a 0 y dejar NO disponibles (POST /domiciliarios/reiniciar-a-cero)
export const useReiniciarTurnosACero = () => {
  const axiosInstance = useAxiosInstance();
  const queryClient = useQueryClient();

  return useMutation<void, AxiosError<ServerError>, void>({
    mutationFn: async () => {
      await axiosInstance.post('/domiciliarios/reiniciar-a-cero');
    },
    onSuccess: async () => {
      // Invalida listas relacionadas para refrescar la UI
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['domiciliarios'] }),
        queryClient.invalidateQueries({ queryKey: ['domiciliarios', 'resumen'] }),
        queryClient.invalidateQueries({ queryKey: ['domiciliarios', 'orden', 'disponibilidad'] }),
        queryClient.invalidateQueries({ queryKey: ['domiciliarios', 'siguiente'] }),
      ]);
      AlertService.success('Reinicio completado', 'Turnos a 0 y todos no disponibles.');
    },
    onError: (error) => {
      AlertService.error('Error al reiniciar', error.response?.data?.message || error.message);
    },
  });
};
