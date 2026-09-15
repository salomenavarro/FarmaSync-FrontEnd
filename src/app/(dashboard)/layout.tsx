import type { ReactNode } from "react";
import { redirect } from "next/navigation";
import { getCurrentUserServer } from "@/lib/auth/get-current-user.server";

// Este layout envuelve TODAS las rutas de (dashboard): medicamentos,
// reservas, notificaciones, perfil. Un solo chequeo aquí protege a
// todas — no hay que repetirlo en cada page.tsx.
export default async function DashboardLayout({ children }: Readonly<{ children: ReactNode }>) {
  const usuario = await getCurrentUserServer();

  if (!usuario) {
    redirect("/login");
  }

  return <section className="min-h-screen bg-slate-50">{children}</section>;
}
