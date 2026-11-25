import { useMutation, useQueryClient } from "@tanstack/react-query";
import { grupoFamiliarService } from "../services/grupo-familiar.service";
import type { DependienteFormData } from "../types";
import { grupoFamiliarKeys } from "./grupo-familiar.keys";

// Hook de mutación para crear un dependiente en el backend.
// Invalida la lista al tener éxito para que la UI refleje el registro persistido
// y permita que el modal cierre solo cuando la petición termine bien.
export function useCrearDependiente() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: DependienteFormData) =>
      grupoFamiliarService.crear(payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: grupoFamiliarKeys.lists(),
      });
    },
  });
}