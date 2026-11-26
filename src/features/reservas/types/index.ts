// Estados que puede devolver el backend o manejar la vista de reservas.
export type EstadoReserva =
  | "PENDIENTE"
  | "ENTREGADA"
  | "CANCELADA_USUARIO"
  | "EXPIRADA"
  | "ACTIVA"
  | "COMPLETADA"
  | "CANCELADA"
  | "VENCIDA";

export type TipoBeneficiario = "TITULAR" | "DEPENDIENTE";

export interface MedicamentoReserva {
  id: number;
  nombre: string;
  concentracion: string;
  presentacion: string;
  cantidad: number;
  codigo?: string;
}

export interface SedeReserva {
  id: number;
  nombre: string;
  direccion: string;
  ciudad: string;
  zona?: string;
  horario?: string;
}

export interface BeneficiarioReserva {
  id: number;
  nombreCompleto: string;
  numeroDocumento?: string;
  tipo: TipoBeneficiario;
}

export interface Reserva {
  id: number;
  codigo: string;
  codigoQr?: string;
  numeroOrdenMedica?: string;
  prorrogaSolicitada?: boolean;
  medicamento: MedicamentoReserva;
  sede: SedeReserva;
  beneficiario: BeneficiarioReserva;
  estado: EstadoReserva;
  fechaCreacion: string;
  fechaRetiro: string;
  fechaVencimiento: string;
  fechaEntrega?: string;
  fechaCancelacion?: string;
  motivoCancelacion?: string;
}

export interface IndicadoresReservas {
  total: number;
  activas: number;
  completadas: number;
  canceladas: number;
  vencidas: number;
}

export type FiltroEstadoReserva =
  | "TODAS"
  | "ACTIVA"
  | "COMPLETADA"
  | "CANCELADA"
  | "VENCIDA";

export interface FiltrosReservas {
  busqueda: string;
  estado: FiltroEstadoReserva;
}

export interface CrearReservaPayload {
  sedeId: number;
  medicamentoId: number;
  dependienteId?: number;
  numeroOrdenMedica: string;
  fechaRecogida: string;
}

export interface CancelarReservaData {
  reservaId: number;
  motivo?: string;
}