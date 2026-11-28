import type { Metadata } from "next";

import SolicitudesView from "@/features/solicitudes-farmaceutico/components/SolicitudesView";

export const metadata: Metadata = {
  title: "Solicitudes de medicamentos | FarmaSync",
  description:
    "Consulta y gestiona las solicitudes de medicamentos de la sede farmacéutica.",
};

interface SolicitudesPageProps {
  searchParams: Promise<{
    codigo?: string | string[];
  }>;
}

export default async function SolicitudesPage({
  searchParams,
}: SolicitudesPageProps) {
  const parametros = await searchParams;

  const codigoInicial =
    typeof parametros.codigo === "string"
      ? parametros.codigo.trim()
      : "";

  return (
    <SolicitudesView
      key={codigoInicial}
      codigoInicial={codigoInicial}
    />
  );
}