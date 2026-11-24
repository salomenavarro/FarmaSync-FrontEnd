import type {
  Medicamento,
  SedeFarmacia,
  EstadoStock,
} from "@/features/catalogo/types";

// =========================================================
// MEDICAMENTO GUARDADO
// =========================================================

export interface MedicamentoGuardado {
  medicamentoId: string;
  sedeId: string;
  fechaGuardado: string;
}

// =========================================================
// DISPONIBILIDAD DEL MEDICAMENTO
// =========================================================

export interface DisponibilidadMedicamento {
  sede: SedeFarmacia;
  cantidad: number;
  estado: EstadoStock;
}

// =========================================================
// DETALLE DEL MEDICAMENTO GUARDADO
// =========================================================

export interface MedicamentoGuardadoDetalle {
  medicamento: Medicamento;
  sede: SedeFarmacia;
  fechaGuardado: string;
  cantidad: number;
  estadoGeneral: EstadoStock;
  disponibilidad: DisponibilidadMedicamento[];
}

// =========================================================
// FILTROS
// =========================================================

export type FiltroDisponibilidad =
  | "Todos"
  | EstadoStock;

export interface FiltrosMisMedicamentos {
  busqueda: string;
  disponibilidad: FiltroDisponibilidad;
}

// =========================================================
// INDICADORES
// =========================================================

export interface IndicadoresMisMedicamentos {
  totalGuardados: number;
  disponibles: number;
  sinDisponibilidad: number;
}