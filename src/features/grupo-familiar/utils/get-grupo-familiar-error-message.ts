import { isAxiosError } from "axios";

interface ApiErrorPayload {
  message?: string | string[];
}

// Traduce errores de Axios o excepciones genéricas a un mensaje legible para el
// usuario final, desacoplando los componentes de UI del formato de error HTTP.
export function getGrupoFamiliarErrorMessage(
  error: unknown,
  fallbackMessage = "Ocurrió un error al procesar la solicitud del grupo familiar."
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
      return "Ya existe un dependiente registrado con ese número de documento.";
    }

    if (status === 404) {
      return "No se encontró el dependiente solicitado.";
    }

    if (status === 401 || status === 403) {
      return "Tu sesión no está autorizada para realizar esta acción.";
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