// Niveles del semáforo SLA para medir cuánto lleva pendiente una reserva.
export type NivelSla = "Verde" | "Amarillo" | "Rojo";

// Estados posibles de una reserva en el flujo operativo de farmacia.
export type EstadoReservaOperacion =
  | "PENDIENTE"
  | "LISTA_PARA_RETIRO"
  | "ENTREGADA"
  | "CANCELADA_USUARIO"
  | "RECHAZADA_FARMACIA"
  | "EXPIRADA";

// Métodos válidos para marcar una reserva como lista para retiro.
export type MetodoAlistamiento = "POS" | "MANUAL";

// Datos básicos del paciente o dependiente que retira el medicamento.
export interface PersonaReserva {
  id: number;
  nombreCompleto?: string;
  nombres?: string;
  apellidos?: string;
  numeroDocumento: string;
}

// Información del medicamento asociada a una reserva.
export interface MedicamentoReserva {
  id: number;
  codigo: string;
  codigoEan?: string | null;
  nombreGenerico: string;
  presentacion: string;
  concentracion?: string | null;
}

// Información de la sede donde se gestiona la reserva o el inventario.
export interface SedeReserva {
  id: number;
  nombre: string;
  ciudad: string;
  zona: string;
  direccion: string;
}

// Reserva enriquecida con el cálculo de SLA que devuelve el backend.
export interface ReservaOperacion {
  id: number;
  codigoReserva: string;
  codigoQr: string;
  numeroOrdenMedica: string;
  fechaRecogida: string;
  fechaLimite: string;
  createdAt: string;
  estado: EstadoReservaOperacion;
  metodoAlistamiento?: string | null;
  alistadoAt?: string | null;
  entregadoAt?: string | null;
  motivoRechazo?: string | null;
  minutosTranscurridos: number;
  tiempoTranscurrido: string;
  sla: NivelSla;
  user: PersonaReserva;
  dependiente?: PersonaReserva | null;
  medicamento: MedicamentoReserva;
  sede: SedeReserva;
}

// Respuesta de GET /reservations/farmacia/sede con conteos y colas.
export interface ColaOperacionFarmacia {
  sedeId: number;
  totalPorAlistar: number;
  semaforo: Record<NivelSla, number>;
  pendientesAlistamiento: ReservaOperacion[];
  listasParaRetiro: ReservaOperacion[];
}

// Datos enviados al registrar o sumar un lote por EAN-13 o código.
export interface IngresarLoteEanPayload {
  codigo: string;
  cantidad: number;
  sedeId?: number;
}

// Respuesta del backend al actualizar inventario / ingresar lote.
export interface ResultadoLoteInventario {
  id: number;
  sedeId: number;
  medicamentoId: number;
  cantidad: number;
  estadoInventario?: "ROJO" | "AMARILLO" | "VERDE";
  alertasNotificadas?: number;
  medicamento: MedicamentoReserva;
  sede: SedeReserva;
}