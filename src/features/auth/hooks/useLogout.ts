"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { logout } from "../services/auth.service";

// RF-017: cierra sesión e invalida el token en el backend (borra la
// fila de user_sessions), y redirige a la pantalla inicial.
export function useLogout() {
  const router = useRouter();

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      router.push("/");
      // router.refresh() fuerza a que el (dashboard)/layout.tsx
      // vuelva a correr su chequeo de sesión en la próxima
      // navegación, en vez de quedar con datos cacheados del cliente.
      router.refresh();
    },
  });
}
