import { useMutation, useQueryClient } from "@tanstack/react-query";
import { reservasService } from "../services/reservas.service";
import type { CrearReservaPayload } from "../types";
import { catalogoKeys } from "@/features/catalogo/hooks/catalogo.keys";
import { reservasKeys } from "./reservas.keys";

// Hook de mutación para crear una reserva con descuento atómico de stock.
// Al completar, refresca tanto las reservas como el catálogo para ver el nuevo stock.
export function useCrearReserva() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CrearReservaPayload) =>
      reservasService.crearReserva(payload),
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: reservasKeys.all }),
        queryClient.invalidateQueries({ queryKey: catalogoKeys.all }),
      ]);
    },
  });
}