"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { googleLogin } from "../services/auth.service";
import { getAuthErrorMessage } from "../utils/get-auth-error-message";

// Maneja la autenticación alternativa con Google mediante TanStack Query,
// manteniendo la lógica desacoplada del componente visual (LoginForm).
export function useGoogleLogin() {
  const router = useRouter();

  return useMutation({
    mutationFn: (data: { credentialToken: string }) => googleLogin(data),
    onSuccess: (response) => {
      // 1. Refresca el router de Next.js para sincronizar el estado de la sesión/cookies
      router.refresh();
      
      // 2. Redirección inteligente basada en si el usuario necesita completar su cédula
      if (response && response.necesitaCompletarPerfil) {
        router.push("/completar-perfil");
      } else {
        router.push("/dashboard");
      }
    },
  });
}

export function getGoogleLoginErrorMessage(error: unknown): string {
  return getAuthErrorMessage(
    error,
    "No se pudo iniciar sesión con Google. Inténtalo de nuevo."
  );
}