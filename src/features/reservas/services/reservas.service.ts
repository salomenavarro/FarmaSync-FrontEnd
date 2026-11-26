import { apiClient } from "@/lib/api";
import type {
  CrearReservaPayload,
  EstadoReserva,
  Reserva,
} from "../types";

// Estructura flexible para mapear la respuesta de GET /reservations/mias,
// POST /reservations, PATCH /reservations/:id/prorroga y :id/cancelar.
interface ReservaApiResponse {
  id: number;
  codigoReserva?: string;
  codigo?: string;
  codigoQr?: string;
  numeroOrdenMedica?: string;
  prorrogaSolicitada?: boolean;
  estado: string;
  fechaRecogida?: string;
  fechaRetiro?: string;
  fechaLimite?: string;
  fechaVencimiento?: string;
  creadoEn?: string;
  createdAt?: string;
  fechaCreacion?: string;
  actualizadoEn?: string;
  updatedAt?: string;
  dependiente?: {
    id: number;
    nombreCompleto?: string;
    nombres?: string;
    apellidos?: string;
    numeroDocumento?: string;
  } | null;
  user?: {
    id: number;
    nombreCompleto?: string;
    numeroDocumento?: string;
  } | null;
  sede?: {
    id: number;
    nombre: string;
    direccion?: string;
    ciudad?: string;
    zona?: string;
    horario?: string;
  } | null;
  medicamento?: {
    id: number;
    codigo?: string;
    nombreGenerico?: string;
    nombre?: string;
    concentracion?: string;
    presentacion?: string;
    cantidad?: number;
  } | null;
}

function normalizarEstado(estadoRaw: string): EstadoReserva {
  switch (estadoRaw) {
    case "PENDIENTE":
      return "ACTIVA";
    case "ENTREGADA":
      return "COMPLETADA";
    case "CANCELADA_USUARIO":
      return "CANCELADA";
    case "EXPIRADA":
      return "VENCIDA";
    case "ACTIVA":
    case "COMPLETADA":
    case "CANCELADA":
    case "VENCIDA":
      return estadoRaw;
    default:
      return "ACTIVA";
  }
}

export function mapearReservaDesdeApi(raw: ReservaApiResponse): Reserva {
  const nombreDependiente =
    raw.dependiente?.nombreCompleto?.trim() ||
    [raw.dependiente?.nombres, raw.dependiente?.apellidos]
      .filter(Boolean)
      .join(" ")
      .trim();

  const esDependiente = Boolean(raw.dependiente);

  const beneficiarioNombre = esDependiente
    ? nombreDependiente || "Integrante del grupo familiar"
    : raw.user?.nombreCompleto?.trim() || "Paciente titular";

  const nombreMedicamento =
    raw.medicamento?.nombreGenerico?.trim() ||
    raw.medicamento?.nombre?.trim() ||
    "Medicamento";

  const fechaCreacion =
    raw.fechaCreacion || raw.creadoEn || raw.createdAt || new Date().toISOString();

  const fechaRetiro =
    raw.fechaRetiro || raw.fechaRecogida || fechaCreacion;

  const fechaVencimiento =
    raw.fechaVencimiento || raw.fechaLimite || fechaRetiro;

  const estadoNormalizado = normalizarEstado(raw.estado);

  return {
    id: raw.id,
    codigo: raw.codigoReserva || raw.codigo || `FS-${raw.id}`,
    codigoQr: raw.codigoQr,
    numeroOrdenMedica: raw.numeroOrdenMedica,
    prorrogaSolicitada: Boolean(raw.prorrogaSolicitada),
    medicamento: {
      id: raw.medicamento?.id ?? 0,
      codigo: raw.medicamento?.codigo,
      nombre: nombreMedicamento,
      concentracion: raw.medicamento?.concentracion ?? "",
      presentacion: raw.medicamento?.presentacion ?? "",
      cantidad: raw.medicamento?.cantidad ?? 1,
    },
    sede: {
      id: raw.sede?.id ?? 0,
      nombre: raw.sede?.nombre ?? "Sede de farmacia",
      direccion: raw.sede?.direccion ?? "",
      ciudad: raw.sede?.ciudad ?? "Medellín",
      zona: raw.sede?.zona,
      horario:
        raw.sede?.horario ?? "Lunes a sábado, 8:00 a. m. - 6:00 p. m.",
    },
    beneficiario: {
      id: esDependiente
        ? raw.dependiente?.id ?? 0
        : raw.user?.id ?? 0,
      nombreCompleto: beneficiarioNombre,
      numeroDocumento: esDependiente
        ? raw.dependiente?.numeroDocumento
        : raw.user?.numeroDocumento,
      tipo: esDependiente ? "DEPENDIENTE" : "TITULAR",
    },
    estado: estadoNormalizado,
    fechaCreacion,
    fechaRetiro,
    fechaVencimiento,
    fechaEntrega:
      estadoNormalizado === "COMPLETADA"
        ? raw.actualizadoEn || raw.updatedAt
        : undefined,
    fechaCancelacion:
      estadoNormalizado === "CANCELADA"
        ? raw.actualizadoEn || raw.updatedAt
        : undefined,
  };
}

// Capa HTTP del Módulo 3: consulta reservas del usuario, crea reservas con
// descuento atómico y gestiona prórrogas (24h) o cancelaciones con liberación.
export const reservasService = {
  async listarMisReservas(): Promise<Reserva[]> {
    const response = await apiClient.get<
      ReservaApiResponse[] | { data?: ReservaApiResponse[] }
    >("/reservations/mias");

    const lista = Array.isArray(response.data)
      ? response.data
      : Array.isArray(response.data?.data)
        ? response.data.data
        : [];

    return lista.map(mapearReservaDesdeApi);
  },

  async crearReserva(payload: CrearReservaPayload): Promise<Reserva> {
    const response = await apiClient.post<ReservaApiResponse>(
      "/reservations",
      payload
    );
    return mapearReservaDesdeApi(response.data);
  },

  async solicitarProrroga(reservaId: number): Promise<Reserva> {
    const response = await apiClient.patch<ReservaApiResponse>(
      `/reservations/${reservaId}/prorroga`
    );
    return mapearReservaDesdeApi(response.data);
  },

  async cancelarReserva(reservaId: number): Promise<void> {
    await apiClient.patch(`/reservations/${reservaId}/cancelar`);
  },
};