"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { login } from "../services/auth.service";
import { LoginFormValues } from "../schemas/login.schema";
import { getAuthErrorMessage } from "../utils/get-auth-error-message";

// Reemplaza el useState(loading)/useState(error) + try/catch a mano
// del LoginPage viejo. TanStack Query da isPending/isError/error
// gratis, y useMutation es la herramienta correcta para una acción
// (no una lectura) como "iniciar sesión".
export function useLogin() {
  const router = useRouter();

  return useMutation({
    mutationFn: (data: LoginFormValues) => login(data),
    onSuccess: () => {
      router.push("/dashboard");
    },
  });
}

export function getLoginErrorMessage(error: unknown): string {
  return getAuthErrorMessage(error, "No se pudo iniciar sesión. Intenta de nuevo.");
}
