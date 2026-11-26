import { isAxiosError } from "axios";

// =========================================================
// TRADUCCIÓN DE ERRORES DEL MÓDULO ADMINISTRADOR
// =========================================================

export function getAdminErrorMessage(
  error: unknown,
  fallback = "Ocurrió un error al procesar la solicitud administrativa.",
): string {
  if (isAxiosError(error)) {
    const mensajeBackend = error.response?.data?.message;

    if (Array.isArray(mensajeBackend) && mensajeBackend.length > 0) {
      return String(mensajeBackend[0]);
    }

    if (typeof mensajeBackend === "string" && mensajeBackend.trim()) {
      return mensajeBackend;
    }

    if (error.response?.status === 401) {
      return "Tu sesión expiró. Inicia sesión nuevamente.";
    }

    if (error.response?.status === 403) {
      return "No tienes permisos de Administrador EPS para realizar esta acción.";
    }

    if (error.response?.status === 409) {
      return "Ya existe un empleado registrado con ese documento o correo.";
    }
  }

  if (error instanceof Error && error.message.trim()) {
    return error.message;
  }

  return fallback;
}