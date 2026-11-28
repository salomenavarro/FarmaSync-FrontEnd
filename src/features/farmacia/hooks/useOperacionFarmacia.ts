"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { farmaciaService } from "../services/farmacia.service";
import type {
  IngresarLoteEanPayload,
  MetodoAlistamiento,
} from "../types";

// Claves centralizadas para caché y refresco automático con TanStack Query.
export const farmaciaKeys = {
  all: ["farmacia"] as const,
  colaSede: (sedeId?: number) =>
    [...farmaciaKeys.all, "cola-sede", sedeId ?? "asignada"] as const,
};

// Hook principal para consultar y operar las reservas y lotes de la farmacia.
export function useOperacionFarmacia(sedeId?: number) {
  const queryClient = useQueryClient();

  // Refresca la cola de la sede y también invalida el catálogo por si cambió stock.
  const refrescarOperacion = async () => {
    await Promise.all([
      queryClient.invalidateQueries({ queryKey: farmaciaKeys.all }),
      queryClient.invalidateQueries({ queryKey: ["medicines"] }),
    ]);
  };

  const colaQuery = useQuery({
    queryKey: farmaciaKeys.colaSede(sedeId),
    queryFn: () => farmaciaService.obtenerColaSede(sedeId),
    refetchInterval: 30000,
  });

  const alistarMutation = useMutation({
    mutationFn: ({
      codigoReserva,
      metodo,
    }: {
      codigoReserva: string;
      metodo: MetodoAlistamiento;
    }) => farmaciaService.alistarReserva(codigoReserva, metodo),
    onSuccess: refrescarOperacion,
  });

  const entregarMutation = useMutation({
    mutationFn: (codigoReserva: string) =>
      farmaciaService.confirmarEntrega(codigoReserva),
    onSuccess: refrescarOperacion,
  });

  const rechazarMutation = useMutation({
    mutationFn: ({
      codigoReserva,
      motivo,
    }: {
      codigoReserva: string;
      motivo: string;
    }) => farmaciaService.rechazarReserva(codigoReserva, motivo),
    onSuccess: refrescarOperacion,
  });

  const ingresarLoteMutation = useMutation({
    mutationFn: (payload: IngresarLoteEanPayload) =>
      farmaciaService.ingresarLoteEan(payload),
    onSuccess: refrescarOperacion,
  });

  return {
    cola: colaQuery.data,
    isLoading: colaQuery.isLoading,
    isError: colaQuery.isError,
    error: colaQuery.error,
    refetch: colaQuery.refetch,
    alistarReserva: alistarMutation.mutateAsync,
    isAlistando: alistarMutation.isPending,
    confirmarEntrega: entregarMutation.mutateAsync,
    isEntregando: entregarMutation.isPending,
    rechazarReserva: rechazarMutation.mutateAsync,
    isRechazando: rechazarMutation.isPending,
    ingresarLote: ingresarLoteMutation.mutateAsync,
    isRegistrandoLote: ingresarLoteMutation.isPending,
  };
}