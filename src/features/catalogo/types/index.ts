export type EstadoStock =
  | "Disponible"
  | "Disponibilidad limitada"
  | "Agotado";

export interface SedeFarmacia {
  id: string;
  nombre: string;
  ciudad: string;
  zona: string;
  direccion: string;
  latitud?: number | null;
  longitud?: number | null;
  distanciaKm?: number;
}

export interface StockSede {
  sedeId: string;
  cantidad: number;
  estadoInventario?: "ROJO" | "AMARILLO" | "VERDE";
  distanciaKm?: number;
}

export interface Medicamento {
  id: string;
  codigo: string;
  nombreGenerico: string;
  concentracion: string;
  presentacion: string;
  descripcion: string;
  requiereOrden?: boolean;
  puedeActivarAlerta?: boolean;
  stockPorSede: StockSede[];
}

export interface FiltrosCatalogo {
  sedeId: string;
  ubicacion: string;
  cercania: string;
}

export function obtenerEstadoStock(cantidad: number): EstadoStock {
  if (cantidad > 15) {
    return "Disponible";
  }

  if (cantidad >= 1) {
    return "Disponibilidad limitada";
  }

  return "Agotado";
}