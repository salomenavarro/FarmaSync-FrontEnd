import type { ReactNode } from "react";
import { redirect } from "next/navigation";
import { getCurrentUserServer } from "@/lib/auth/get-current-user.server";
import { isAdministradorEps } from "@/features/auth/utils/role-redirect";
import DashboardShell from "@/components/layout/DashboardShell";

// Este layout envuelve TODAS las rutas de (dashboard): /dashboard,
// medicamentos, reservas, notificaciones, perfil. Un solo chequeo
// aquí protege a todas — no hay que repetirlo en cada page.tsx.
export default async function DashboardLayout({ children }: Readonly<{ children: ReactNode }>) {
  const usuario = await getCurrentUserServer();

  if (!usuario) {
    redirect("/login");
  }

  // Evita que un usuario ADMINISTRADOR_EPS quede en el panel de paciente
  if (isAdministradorEps(usuario)) {
    redirect("/administrador/dashboard");
  }

  return <DashboardShell usuario={usuario}>{children}</DashboardShell>;
}