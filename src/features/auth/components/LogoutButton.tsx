"use client";

import { useLogout } from "../hooks/useLogout";

// Componente mínimo a propósito: el sidebar/navbar del dashboard
// (todavía no existe) lo importa y lo estiliza a su gusto. La
// lógica de logout vive aquí, no en cada lugar donde se use el botón.
export default function LogoutButton() {
  const logoutMutation = useLogout();

  return (
    <button type="button" onClick={() => logoutMutation.mutate()} disabled={logoutMutation.isPending}>
      {logoutMutation.isPending ? "Cerrando sesión..." : "Cerrar sesión"}
    </button>
  );
}
