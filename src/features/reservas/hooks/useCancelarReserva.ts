import { useMutation, useQueryClient } from "@tanstack/react-query";
import { reservasService } from "../services/reservas.service";
import { catalogoKeys } from "@/features/catalogo/hooks/catalogo.keys";
import { reservasKeys } from "./reservas.keys";

// Hook de mutación para cancelar una reserva y devolver la unidad al stock lógico.
export function useCancelarReserva() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (reservaId: number) =>
      reservasService.cancelarReserva(reservaId),
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: reservasKeys.all }),
        queryClient.invalidateQueries({ queryKey: catalogoKeys.all }),
      ]);
    },
  });
}