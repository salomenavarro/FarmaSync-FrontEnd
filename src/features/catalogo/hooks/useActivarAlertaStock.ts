import { useMutation, useQueryClient } from "@tanstack/react-query";
import { catalogoService } from "../services/catalogo.service";
import { catalogoKeys } from "./catalogo.keys";

// Hook de mutación para activar la notificación de reabastecimiento cuando
// un medicamento está agotado (0 unidades) en todas las sedes.
export function useActivarAlertaStock() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (medicamentoId: string) =>
      catalogoService.activarAlertaStock(medicamentoId),
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: catalogoKeys.alertas(),
        }),
        queryClient.invalidateQueries({
          queryKey: catalogoKeys.all,
        }),
      ]);
    },
  });
}