
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
  distanciaKm: number;
}

export interface StockSede {
  sedeId: string;
  cantidad: number;
}

export interface Medicamento {
  id: string;
  codigo: string;
  nombreGenerico: string;
  concentracion: string;
  presentacion: string;
  descripcion: string;
  stockPorSede: StockSede[];
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
