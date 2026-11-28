import { redirect } from "next/navigation";

import { getCurrentUserServer } from "@/lib/auth/get-current-user.server";
import PerfilView from "@/features/perfil/components/PerfilView";

interface ProfilePageProps {
  searchParams: Promise<{
    seccion?: string;
  }>;
}

export default async function ProfilePage({
  searchParams,
}: ProfilePageProps) {
  const usuario = await getCurrentUserServer();

  if (!usuario) {
    redirect("/login");
  }

  const { seccion } = await searchParams;

  return (
    <PerfilView
      perfil={{
        id: usuario.id,
        nombreCompleto: usuario.nombreCompleto,
        numeroDocumento: usuario.numeroDocumento,
        correo: usuario.correo,
      }}
      seccionInicial={
        seccion === "seguridad"
          ? "seguridad"
          : "datos-personales"
      }
    />
  );
}