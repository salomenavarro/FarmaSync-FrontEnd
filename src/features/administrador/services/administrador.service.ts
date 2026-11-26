import { apiClient } from "@/lib/api";
import type {
  AdminDashboardData,
  Farmaceutico,
  FarmaceuticoFormData,
} from "../types";

// =========================================================
// INTERFACES DE RESPUESTA DEL BACKEND
// =========================================================

interface EmpleadoApiResponse {
  id: number;
  nombreCompleto: string;
  numeroDocumento: string;
  correo: string;
  telefono?: string | null;
  activo?: boolean;
  sedeId?: number;
  sede?: { id: number; nombre: string } | null;
  createdAt?: string;
}

// Divide nombreCompleto en nombres y apellidos para mantener compatible la tabla y el modal
function separarNombreCompleto(nombreCompleto: string): {
  nombres: string;
  apellidos: string;
} {
  const partes = nombreCompleto.trim().split(/\s+/).filter(Boolean);

  if (partes.length <= 1) {
    return {
      nombres: partes[0] ?? "Farmacéutico",
      apellidos: "EPS",
    };
  }

  const mitad = Math.ceil(partes.length / 2);
  return {
    nombres: partes.slice(0, mitad).join(" "),
    apellidos: partes.slice(mitad).join(" "),
  };
}

function mapearFarmaceutico(item: EmpleadoApiResponse): Farmaceutico {
  const { nombres, apellidos } = separarNombreCompleto(
    item.nombreCompleto ?? "",
  );

  return {
    id: item.id,
    nombres,
    apellidos,
    numeroDocumento: item.numeroDocumento,
    correo: item.correo,
    telefono: item.telefono ?? "",
    sedeId: item.sedeId ?? item.sede?.id ?? 0,
    estado: item.activo === false ? "INACTIVO" : "ACTIVO",
    fechaCreacion: item.createdAt ?? new Date().toISOString(),
  };
}

// =========================================================
// SERVICIO DEL PANEL ADMINISTRADOR
// =========================================================

export async function obtenerDashboardEps(): Promise<AdminDashboardData> {
  const response =
    await apiClient.get<AdminDashboardData>("/reports/dashboard-eps");
  return response.data;
}

export async function listarFarmaceuticos(): Promise<Farmaceutico[]> {
  const response =
    await apiClient.get<EmpleadoApiResponse[]>("/users/empleados");
  return response.data.map(mapearFarmaceutico);
}

export async function crearFarmaceutico(
  datos: FarmaceuticoFormData,
): Promise<Farmaceutico> {
  const nombreCompleto = `${datos.nombres.trim()} ${datos.apellidos.trim()}`.trim();

  const response = await apiClient.post<EmpleadoApiResponse>(
    "/users/empleados",
    {
      nombreCompleto,
      numeroDocumento: datos.numeroDocumento.trim(),
      correo: datos.correo.trim().toLowerCase(),
      telefono: datos.telefono.trim() || undefined,
      password: datos.password,
      sedeId: Number(datos.sedeId),
    },
  );

  return mapearFarmaceutico(response.data);
}

export async function actualizarFarmaceutico(
  id: number,
  datos: FarmaceuticoFormData,
): Promise<Farmaceutico> {
  const nombreCompleto = `${datos.nombres.trim()} ${datos.apellidos.trim()}`.trim();

  const response = await apiClient.patch<EmpleadoApiResponse>(
    `/users/empleados/${id}`,
    {
      nombreCompleto,
      numeroDocumento: datos.numeroDocumento.trim(),
      correo: datos.correo.trim().toLowerCase(),
      telefono: datos.telefono.trim() || undefined,
      sedeId: Number(datos.sedeId),
      activo: datos.estado === "ACTIVO",
    },
  );

  return mapearFarmaceutico(response.data);
}

export async function cambiarEstadoFarmaceutico(
  id: number,
): Promise<Farmaceutico> {
  const response = await apiClient.patch<EmpleadoApiResponse>(
    `/users/empleados/${id}/estado`,
  );

  return mapearFarmaceutico(response.data);
}