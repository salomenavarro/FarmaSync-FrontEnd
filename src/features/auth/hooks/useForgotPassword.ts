"use client";

import { useMutation } from "@tanstack/react-query";
import { solicitarRecuperacion } from "../services/auth.service";
import { ForgotPasswordFormValues } from "../schemas/forgot-password.schema";
import { getAuthErrorMessage } from "../utils/get-auth-error-message";

export function useForgotPassword() {
  return useMutation({
    mutationFn: (data: ForgotPasswordFormValues) => solicitarRecuperacion(data),
  });
}

export function getForgotPasswordErrorMessage(error: unknown): string {
  return getAuthErrorMessage(error, "No se pudo enviar el correo de recuperación. Intenta nuevamente.");
}