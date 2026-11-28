import type { Reserva } from "@/features/reservas/types";

// =========================================================
// RESERVA PARA ENTREGA
// =========================================================

export type ReservaEntrega = Reserva;

// =========================================================
// MÉTODO DE BÚSQUEDA
// =========================================================

export type MetodoBusquedaEntrega = "CODIGO" | "QR";

// =========================================================
// RESULTADO DE BÚSQUEDA
// =========================================================

export type EstadoBusquedaEntrega =
  | "INICIAL"
  | "BUSCANDO"
  | "ENCONTRADA"
  | "NO_ENCONTRADA"
  | "ERROR";

// =========================================================
// VERIFICACIONES PREVIAS A LA ENTREGA
// =========================================================

export interface VerificacionesEntrega {
  pacienteVerificado: boolean;
  ordenMedicaVerificada: boolean;
  medicamentoVerificado: boolean;
  cantidadVerificada: boolean;
}

// =========================================================
// INDICADORES
// =========================================================

export interface IndicadoresEntregas {
  entregasHoy: number;
  entregasTotales: number;
  reservasPendientes: number;
}

// =========================================================
// FILTROS DEL HISTORIAL
// =========================================================

export interface FiltrosHistorialEntregas {
  busqueda: string;
  fechaDesde: string;
  fechaHasta: string;
}