import { useMutation, useQueryClient } from "@tanstack/react-query";
import { reservasService } from "../services/reservas.service";
import { reservasKeys } from "./reservas.keys";

// Hook de mutación para solicitar la extensión de 24 horas (máximo 1 prórroga).
export function useSolicitarProrroga() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (reservaId: number) =>
      reservasService.solicitarProrroga(reservaId),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: reservasKeys.all });
    },
  });
}