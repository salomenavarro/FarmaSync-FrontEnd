import { useMutation, useQueryClient } from "@tanstack/react-query";
import { grupoFamiliarService } from "../services/grupo-familiar.service";
import { grupoFamiliarKeys } from "./grupo-familiar.keys";

// Hook de mutación para eliminar o desactivar un dependiente.
// Refresca la consulta de la lista una vez resuelta la operación en el backend.
export function useEliminarDependiente() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => grupoFamiliarService.eliminar(id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: grupoFamiliarKeys.lists(),
      });
    },
  });
}