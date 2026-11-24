import type { ReactNode } from "react";
import { redirect } from "next/navigation";

import { getCurrentUserServer } from "@/lib/auth/get-current-user.server";
import AdministradorShell from "@/components/layout/AdministradorShell";

export default async function AdministradorLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  const usuario = await getCurrentUserServer();

  if (!usuario) {
    redirect("/login");
  }

  // TODO: Validar el rol de administrador según
  // los identificadores definidos en el backend.

  return (
    <AdministradorShell usuario={usuario}>
      {children}
    </AdministradorShell>
  );
}