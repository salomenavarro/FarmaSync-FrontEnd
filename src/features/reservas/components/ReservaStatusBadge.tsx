import {
  CalendarClock,
  CircleCheck,
  CircleX,
  Clock,
} from "lucide-react";

import type { EstadoReserva } from "../types";

type ReservaStatusBadgeProps = {
  estado: EstadoReserva;
};

const configuracionEstados = {
  ACTIVA: {
    etiqueta: "Activa",
    icono: CalendarClock,
    estilos:
      "border-[#CDEDDD] bg-[#E6F7EF] text-[#047857]",
  },

  COMPLETADA: {
    etiqueta: "Completada",
    icono: CircleCheck,
    estilos:
      "border-[#D6E5FF] bg-[#E8F1FF] text-[#0755D8]",
  },

  CANCELADA: {
    etiqueta: "Cancelada",
    icono: CircleX,
    estilos:
      "border-[#FADADA] bg-[#FEECEC] text-[#B91C1C]",
  },

  VENCIDA: {
    etiqueta: "Vencida",
    icono: Clock,
    estilos:
      "border-[#FCE7B5] bg-[#FFF4DE] text-[#B45309]",
  },
};

export default function ReservaStatusBadge({
  estado,
}: ReservaStatusBadgeProps) {
  const configuracion = configuracionEstados[estado];

  const Icono = configuracion.icono;

  return (
    <span
      className={`inline-flex w-fit shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full border px-3 py-1.5 text-xs font-semibold ${configuracion.estilos}`}
    >
      <Icono
        size={14}
        strokeWidth={2}
        aria-hidden="true"
      />

      {configuracion.etiqueta}
    </span>
  );
}