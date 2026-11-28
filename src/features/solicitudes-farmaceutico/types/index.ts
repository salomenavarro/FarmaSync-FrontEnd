import type { Reserva } from "@/features/reservas/types";

export type SolicitudFarmaceutico = Reserva;

export type NivelSla = "VERDE" | "AMARILLO" | "ROJO";

export type FiltroSla = "TODOS" | NivelSla;

export type FiltroEstadoSolicitud =
  | "TODAS"
  | "ACTIVA"
  | "COMPLETADA"
  | "CANCELADA"
  | "VENCIDA";

export interface FiltrosSolicitudes {
  busqueda: string;
  estado: FiltroEstadoSolicitud;
  sla: FiltroSla;
  fechaDesde: string;
  fechaHasta: string;
}

export interface IndicadoresSolicitudes {
  total: number;
  pendientes: number;
  entregadas: number;
  canceladas: number;
  vencidas: number;
}

export interface IndicadoresSla {
  verde: number;
  amarillo: number;
  rojo: number;
}