import type { ReactNode } from "react";
import { redirect } from "next/navigation";

import { getCurrentUserServer } from "@/lib/auth/get-current-user.server";
import { isAdministradorEps } from "@/features/auth/utils/role-redirect";
import AdministradorShell from "@/components/layout/AdministradorShell";

// =========================================================
// LAYOUT PROTEGIDO DEL ADMINISTRADOR EPS
// =========================================================

export default async function AdministradorLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  const usuario = await getCurrentUserServer();

  if (!usuario) {
    redirect("/login");
  }

  // Si el usuario autenticado no es ADMINISTRADOR_EPS, se envía a su vista correspondiente
  if (!isAdministradorEps(usuario)) {
    redirect("/dashboard");
  }

  return (
    <AdministradorShell usuario={usuario}>
      {children}
    </AdministradorShell>
  );
}