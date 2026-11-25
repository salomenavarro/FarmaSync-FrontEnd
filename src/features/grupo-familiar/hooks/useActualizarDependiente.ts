import { useMutation, useQueryClient } from "@tanstack/react-query";
import { grupoFamiliarService } from "../services/grupo-familiar.service";
import type { DependienteFormData } from "../types";
import { grupoFamiliarKeys } from "./grupo-familiar.keys";

export interface ActualizarDependienteInput {
  id: string;
  data: DependienteFormData;
}

// Hook de mutación para actualizar un dependiente existente.
// Centraliza la invalidación de caché de la lista y del detalle del dependiente
// tras confirmar que el servidor aceptó los cambios.
export function useActualizarDependiente() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: ActualizarDependienteInput) =>
      grupoFamiliarService.actualizar(id, data),
    onSuccess: async (_updated, variables) => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: grupoFamiliarKeys.lists(),
        }),
        queryClient.invalidateQueries({
          queryKey: grupoFamiliarKeys.detail(variables.id),
        }),
      ]);
    },
  });
}