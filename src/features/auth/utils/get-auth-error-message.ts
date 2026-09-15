import { isAxiosError } from "axios";

// Compartido entre useLogin y useRegister: ambos endpoints pasan por
// AuthDomainExceptionFilter en el backend, que siempre responde
// { message, error, statusCode }. Si el proxy de Next falla antes de
// llegar al backend, responde { success: false, error } (ver
// route.ts). Este helper cubre ambos casos.
export function getAuthErrorMessage(error: unknown, fallback: string): string {
  if (isAxiosError<{ message?: string; error?: string }>(error)) {
    const backendMessage = error.response?.data?.message ?? error.response?.data?.error;
    if (typeof backendMessage === "string") {
      return backendMessage;
    }
  }

  return fallback;
}
