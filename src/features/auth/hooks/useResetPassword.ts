"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { restablecerPassword } from "../services/auth.service";
import { ResetPasswordFormValues } from "../schemas/reset-password.schema";
import { getAuthErrorMessage } from "../utils/get-auth-error-message";

export function useResetPassword() {
  const router = useRouter();

  return useMutation({
    mutationFn: (data: ResetPasswordFormValues) =>
      restablecerPassword({
        token: data.token,
        password: data.password,
      }),
    onSuccess: () => {
      // Redirigir al usuario al login tras cambiar la contraseña exitosamente
      router.push("/login?reset=success");
    },
  });
}

export function getResetPasswordErrorMessage(error: unknown): string {
  return getAuthErrorMessage(error, "El enlace ha expirado o es inválido. Solicita uno nuevo.");
}