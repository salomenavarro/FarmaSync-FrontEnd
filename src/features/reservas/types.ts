// Estados de una reserva
export type EstadoReserva =
  | "ACTIVA"
  | "COMPLETADA"
  | "CANCELADA"
  | "VENCIDA";

// Tipos de beneficiario
export type TipoBeneficiario = "TITULAR" | "DEPENDIENTE";

// Información del medicamento reservado
export interface MedicamentoReserva {
  id: number;
  nombre: string;
  concentracion: string;
  presentacion: string;
  cantidad: number;
}

// Información de la sede de farmacia
export interface SedeReserva {
  id: number;
  nombre: string;
  direccion: string;
  ciudad: string;
  horario: string;
}

// Información del paciente beneficiario
export interface BeneficiarioReserva {
  id: number;
  nombreCompleto: string;
  tipo: TipoBeneficiario;
}

// Información completa de una reserva
export interface Reserva {
  id: number;
  codigo: string;
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

// Indicadores generales de las reservas
export interface IndicadoresReservas {
  total: number;
  activas: number;
  completadas: number;
  canceladas: number;
  vencidas: number;
}

// Filtros disponibles
export type FiltroEstadoReserva = "TODAS" | EstadoReserva;

export interface FiltrosReservas {
  busqueda: string;
  estado: FiltroEstadoReserva;
}

// Información para cancelar una reserva
export interface CancelarReservaData {
  reservaId: number;
  motivo: string;
}