import { isAxiosError } from "axios";

interface ApiErrorPayload {
  message?: string | string[];
}

// Traduce errores HTTP de catálogo y alertas de stock a mensajes claros en español
// para mostrarlos en la interfaz sin acoplar los componentes a Axios.
export function getCatalogoErrorMessage(
  error: unknown,
  fallbackMessage = "Ocurrió un error al consultar el catálogo de medicamentos."
): string {
  if (isAxiosError<ApiErrorPayload>(error)) {
    const status = error.response?.status;
    const rawMessage = error.response?.data?.message;

    if (Array.isArray(rawMessage) && rawMessage.length > 0) {
      return rawMessage[0];
    }

    if (typeof rawMessage === "string" && rawMessage.trim().length > 0) {
      return rawMessage;
    }

    if (status === 409) {
      return "Ya tienes una alerta activa para este medicamento.";
    }

    if (status === 404) {
      return "No se encontró el medicamento solicitado.";
    }

    if (status === 401 || status === 403) {
      return "Tu sesión no está autorizada para consultar este recurso.";
    }

    if (!error.response) {
      return "No fue posible conectar con el servidor. Verifica tu conexión.";
    }
  }

  if (error instanceof Error && error.message.trim().length > 0) {
    return error.message;
  }

  return fallbackMessage;
}