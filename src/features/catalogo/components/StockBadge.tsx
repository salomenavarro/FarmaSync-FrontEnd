import { AlertTriangle, CheckCircle2, XCircle } from "lucide-react";
import { obtenerEstadoStock } from "../types";

interface StockBadgeProps {
  cantidad: number;
}

export default function StockBadge({ cantidad }: StockBadgeProps) {
  const estado = obtenerEstadoStock(cantidad);

  const configuracion = {
    Disponible: {
      estilos: "bg-[#E7F8EF] text-[#16834A] border-[#BCE8CE]",
      Icono: CheckCircle2,
    },
    "Disponibilidad limitada": {
      estilos: "bg-[#FFF5DF] text-[#A96508] border-[#F7D99B]",
      Icono: AlertTriangle,
    },
    Agotado: {
      estilos: "bg-[#FDEBEC] text-[#D13438] border-[#F5C2C5]",
      Icono: XCircle,
    },
  };

  const { estilos, Icono } = configuracion[estado];

  return (
    <span
      className={`
        inline-flex w-fit items-center gap-1.5
        rounded-full border px-3 py-1.5
        text-[11px] font-bold
        ${estilos}
      `}
    >
      <Icono size={14} aria-hidden="true" />
      {estado}
    </span>
  );
}