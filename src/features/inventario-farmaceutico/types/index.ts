import type {
  Medicamento,
  StockSede,
  EstadoStock,
} from "@/features/catalogo/types";

// =========================================================
// MEDICAMENTO DEL INVENTARIO
// =========================================================

export type MedicamentoInventario = Pick<
  Medicamento,
  | "id"
  | "codigo"
  | "nombreGenerico"
  | "concentracion"
  | "presentacion"
> &
  Pick<
    StockSede,
    | "sedeId"
    | "cantidad"
    | "estadoInventario"
  >;

// =========================================================
// FILTROS DEL INVENTARIO
// =========================================================

export type FiltroEstadoInventario =
  | "TODOS"
  | EstadoStock;

export interface FiltrosInventario {
  busqueda: string;
  estado: FiltroEstadoInventario;
}

// =========================================================
// INDICADORES DEL INVENTARIO
// =========================================================

export interface IndicadoresInventario {
  totalMedicamentos: number;
  disponibles: number;
  stockBajo: number;
  agotados: number;
  totalUnidades: number;
}

// =========================================================
// FORMULARIO DE INGRESO DE MEDICAMENTOS
// =========================================================

export interface IngresoMedicamentoFormData {
  ean: string;
  cantidad: number;
}

// =========================================================
// CONTRATO DE ACTUALIZACIÓN DE STOCK
// =========================================================

export interface ActualizarStockPayload {
  sedeId: number;
  cantidad: number;
}

// =========================================================
// ESTADO DE CARGA DEL INVENTARIO
// =========================================================

export type EstadoCargaInventario =
  | "INICIAL"
  | "CARGANDO"
  | "EXITOSO"
  | "ERROR";