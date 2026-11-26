import { isAxiosError } from "axios";

interface ApiErrorPayload {
  message?: string | string[];
}

// Traduce errores de la API de reservas (límite de 5 activas, stock agotado por
// concurrencia, prórroga ya usada o ventana de 1h para cancelar) a español claro.
export function getReservasErrorMessage(
  error: unknown,
  fallbackMessage = "Ocurrió un error al procesar la operación de reserva."
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

    if (status === 401 || status === 403) {
      return "Tu sesión no está autorizada para realizar esta acción.";
    }

    if (status === 404) {
      return "No se encontró la reserva solicitada.";
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