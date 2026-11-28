import { apiClient } from "@/lib/api";
import type {
  ColaOperacionFarmacia,
  IngresarLoteEanPayload,
  MetodoAlistamiento,
  ReservaOperacion,
  ResultadoLoteInventario,
} from "../types";

// Capa HTTP de operación en farmacia: conecta el panel farmacéutico
// con los endpoints de reservas de sede, ventanilla e ingreso de lotes.
export const farmaciaService = {
  // Obtiene el semáforo SLA, el contador de por alistar y las colas de la sede.
  async obtenerColaSede(sedeId?: number): Promise<ColaOperacionFarmacia> {
    const params = sedeId !== undefined ? { sedeId } : undefined;
    const response = await apiClient.get<ColaOperacionFarmacia>(
      "/reservations/farmacia/sede",
      { params },
    );
    return response.data;
  },

  // Busca una reserva por su código (ej. FS-8K7L) para ventanilla o consulta.
  async buscarReservaPorCodigo(codigoReserva: string): Promise<ReservaOperacion> {
    const codigoLimpio = encodeURIComponent(codigoReserva.trim().toUpperCase());
    const response = await apiClient.get<ReservaOperacion>(
      `/reservations/farmacia/codigo/${codigoLimpio}`,
    );
    return response.data;
  },

  // Marca una reserva PENDIENTE como LISTA_PARA_RETIRO indicando POS o MANUAL.
  async alistarReserva(
    codigoReserva: string,
    metodo: MetodoAlistamiento = "POS",
  ): Promise<ReservaOperacion> {
    const codigoLimpio = encodeURIComponent(codigoReserva.trim().toUpperCase());
    const response = await apiClient.patch<ReservaOperacion>(
      `/reservations/alistar/${codigoLimpio}`,
      { metodo },
    );
    return response.data;
  },

  // Confirma la entrega física en ventanilla y registra auditoría en el backend.
  async confirmarEntrega(codigoReserva: string): Promise<ReservaOperacion> {
    const codigoLimpio = encodeURIComponent(codigoReserva.trim().toUpperCase());
    const response = await apiClient.patch<ReservaOperacion>(
      `/reservations/entregar/${codigoLimpio}`,
    );
    return response.data;
  },

  // Rechaza una reserva con un motivo y devuelve la unidad al inventario de la sede.
  async rechazarReserva(
    codigoReserva: string,
    motivo: string,
  ): Promise<ReservaOperacion> {
    const codigoLimpio = encodeURIComponent(codigoReserva.trim().toUpperCase());
    const response = await apiClient.patch<ReservaOperacion>(
      `/reservations/rechazar/${codigoLimpio}`,
      { motivo: motivo.trim() },
    );
    return response.data;
  },

  // Registra o suma existencias de un lote usando código EAN-13 o código interno.
  async ingresarLoteEan(
    payload: IngresarLoteEanPayload,
  ): Promise<ResultadoLoteInventario> {
    const response = await apiClient.post<ResultadoLoteInventario>(
      "/medicines/lotes/ean",
      {
        codigo: payload.codigo.trim(),
        cantidad: payload.cantidad,
        ...(payload.sedeId !== undefined ? { sedeId: payload.sedeId } : {}),
      },
    );
    return response.data;
  },
};