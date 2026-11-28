import type { Metadata } from "next";

import InventarioView from "@/features/inventario-farmaceutico/components/InventarioView";

export const metadata: Metadata = {
  title: "Inventario de medicamentos | FarmaSync",
  description:
    "Consulta las existencias, identifica medicamentos con stock bajo y gestiona el inventario de la sede farmacéutica.",
};

export default function InventarioPage() {
  return <InventarioView />;
}