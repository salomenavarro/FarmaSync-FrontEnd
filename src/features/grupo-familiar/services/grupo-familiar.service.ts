import { apiClient } from "@/lib/api";
import type {
  Dependiente,
  DependienteFormData,
  Parentesco,
  TipoDocumento,
} from "../types";

// Representa la forma que devuelve o espera el endpoint de grupo familiar en el backend.
// Tener este tipo intermedio en el service aísla los componentes de UI si algún campo
// cambia en la API o si el backend devuelve fechas ISO o `activo` booleano.
interface DependienteApiResponse {
  id: number | string;
  nombres: string;
  apellidos: string;
  parentesco: Parentesco | string;
  tipoDocumento: TipoDocumento | string;
  numeroDocumento: string;
  fechaNacimiento: string;
  correoElectronico?: string | null;
  activo?: boolean;
  estado?: "Activo" | "Inactivo";
}

interface DependienteApiPayload {
  nombres: string;
  apellidos: string;
  parentesco: Parentesco;
  tipoDocumento: TipoDocumento;
  numeroDocumento: string;
  fechaNacimiento: string;
  correoElectronico?: string;
}

const ENDPOINT = "/users/grupo-familiar";

// Normaliza la fecha a YYYY-MM-DD para que los helpers y formularios no fallen
// cuando el backend envía una fecha ISO completa (por ejemplo, "2018-05-12T00:00:00.000Z").
function normalizarFechaIso(fecha: string): string {
  if (!fecha) return "";
  return fecha.slice(0, 10);
}

// Convierte el registro del backend al modelo que consume la capa de presentación.
function mapearDependienteDesdeApi(raw: DependienteApiResponse): Dependiente {
  const estaActivo =
    typeof raw.activo === "boolean"
      ? raw.activo
      : raw.estado
        ? raw.estado === "Activo"
        : true;

  return {
    id: String(raw.id),
    nombres: raw.nombres,
    apellidos: raw.apellidos,
    parentesco: raw.parentesco as Parentesco,
    tipoDocumento: raw.tipoDocumento as TipoDocumento,
    numeroDocumento: raw.numeroDocumento,
    fechaNacimiento: normalizarFechaIso(raw.fechaNacimiento),
    correoElectronico: raw.correoElectronico ?? undefined,
    estado: estaActivo ? "Activo" : "Inactivo",
  };
}

// Prepara el payload del formulario para enviarlo al backend sin campos extra
// ni correo residual cuando el documento no es CC.
function mapearPayloadParaApi(data: DependienteFormData): DependienteApiPayload {
  const esCC = data.tipoDocumento === "CC";
  const correoLimpio = data.correoElectronico?.trim();

  return {
    nombres: data.nombres.trim(),
    apellidos: data.apellidos.trim(),
    parentesco: data.parentesco,
    tipoDocumento: data.tipoDocumento,
    numeroDocumento: data.numeroDocumento.trim(),
    fechaNacimiento: normalizarFechaIso(data.fechaNacimiento),
    ...(esCC && correoLimpio ? { correoElectronico: correoLimpio } : {}),
  };
}

// Capa de acceso a datos HTTP del feature grupo-familiar: encapsula las rutas
// y transformaciones para que hooks y componentes no conozcan detalles de Axios.
export const grupoFamiliarService = {
  async listar(): Promise<Dependiente[]> {
    const response = await apiClient.get<DependienteApiResponse[]>(ENDPOINT);
    const items = Array.isArray(response.data) ? response.data : [];
    return items.map(mapearDependienteDesdeApi);
  },

  async crear(payload: DependienteFormData): Promise<Dependiente> {
    const body = mapearPayloadParaApi(payload);
    const response = await apiClient.post<DependienteApiResponse>(ENDPOINT, body);
    return mapearDependienteDesdeApi(response.data);
  },

  async actualizar(
    id: string,
    payload: DependienteFormData
  ): Promise<Dependiente> {
    const body = mapearPayloadParaApi(payload);
    const response = await apiClient.patch<DependienteApiResponse>(
      `${ENDPOINT}/${id}`,
      body
    );
    return mapearDependienteDesdeApi(response.data);
  },

  async eliminar(id: string): Promise<void> {
    await apiClient.delete(`${ENDPOINT}/${id}`);
  },
};