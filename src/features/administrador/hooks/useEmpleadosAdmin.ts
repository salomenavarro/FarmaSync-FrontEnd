// src/features/administrador/hooks/useEmpleadosAdmin.ts
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  actualizarFarmaceutico,
  cambiarEstadoFarmaceutico,
  crearFarmaceutico,
  listarFarmaceuticos,
} from "../services/administrador.service";
import type { FarmaceuticoFormData } from "../types";
import { administradorKeys } from "./administrador.keys";

export function useFarmaceuticos() {
  return useQuery({
    queryKey: administradorKeys.empleados(),
    queryFn: listarFarmaceuticos,
    staleTime: 30_000,
  });
}

export function useGuardarFarmaceutico() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: {
      id?: number;
      datos: FarmaceuticoFormData;
    }) => {
      if (params.id !== undefined) {
        return actualizarFarmaceutico(params.id, params.datos);
      }
      return crearFarmaceutico(params.datos);
    },
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: administradorKeys.empleados(),
        }),
        queryClient.invalidateQueries({
          queryKey: administradorKeys.dashboard(),
        }),
      ]);
    },
  });
}

export function useCambiarEstadoFarmaceutico() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => cambiarEstadoFarmaceutico(id),
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: administradorKeys.empleados(),
        }),
        queryClient.invalidateQueries({
          queryKey: administradorKeys.dashboard(),
        }),
      ]);
    },
  });
}