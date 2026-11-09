"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { completeProfile } from "../services/auth.service";
import { getAuthErrorMessage } from "../utils/get-auth-error-message";
import { CompleteProfileFormValues } from "../schemas/complete-profile.schema";

export function useCompleteProfile() {
  const router = useRouter();

  return useMutation({
    mutationFn: (data: CompleteProfileFormValues) => completeProfile(data),
    onSuccess: () => {
      router.refresh();
      router.push("/dashboard");
    },
  });
}

export function getCompleteProfileErrorMessage(error: unknown): string {
  return getAuthErrorMessage(
    error,
    "No se pudo completar el perfil. Verifica los datos e inténtalo de nuevo."
  );
}