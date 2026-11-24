import { redirect } from "next/navigation";

import { getCurrentUserServer } from "@/lib/auth/get-current-user.server";

import AdminHeader from "@/features/administrador/components/AdminHeader";

import AdminDashboardContent from "@/features/administrador/components/AdminDashboardContent";

// =========================================================
// METADATOS
// =========================================================

export const metadata = {
  title: "Panel administrativo | FarmaSync",
  description:
    "Panel de gestión administrativa y control de farmacias EPS.",
};

// =========================================================
// DASHBOARD DEL ADMINISTRADOR
// =========================================================

export default async function AdministradorDashboardPage() {
  const usuario = await getCurrentUserServer();

  if (!usuario) {
    redirect("/login");
  }

  return (
    <div className="mx-auto w-full max-w-[1800px] space-y-4 p-4 sm:p-5 lg:p-6">

      {/* ENCABEZADO */}

      <AdminHeader nombre={usuario.nombreCompleto} />

      {/* CONTENIDO INTERACTIVO */}

      <AdminDashboardContent />

    </div>
  );
}