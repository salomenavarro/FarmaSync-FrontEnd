"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { registrar } from "../services/auth.service";
import { RegisterFormValues } from "../schemas/register.schema";
import { getAuthErrorMessage } from "../utils/get-auth-error-message";

export function useRegister() {
  const router = useRouter();

  return useMutation({
    mutationFn: (data: RegisterFormValues) => registrar(data),
    // No hay sesión que abrir (el backend no pone cookie en
    // /auth/register), así que se manda al usuario a /login a
    // autenticarse con lo que acaba de crear.
    onSuccess: () => {
      router.push("/login");
    },
  });
}

export function getRegisterErrorMessage(error: unknown): string {
  return getAuthErrorMessage(error, "No se pudo completar el registro. Intenta de nuevo.");
}
