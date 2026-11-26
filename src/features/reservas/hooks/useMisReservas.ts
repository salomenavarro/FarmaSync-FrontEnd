import { useQuery } from "@tanstack/react-query";
import { reservasService } from "../services/reservas.service";
import { reservasKeys } from "./reservas.keys";

// Hook de consulta de reservas del usuario (incluyendo las de su grupo familiar).
export function useMisReservas() {
  return useQuery({
    queryKey: reservasKeys.mias(),
    queryFn: () => reservasService.listarMisReservas(),
  });
}