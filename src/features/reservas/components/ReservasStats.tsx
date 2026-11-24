import {
  CalendarClock,
  CircleCheck,
  CircleX,
  Clock,
} from "lucide-react";

import type { IndicadoresReservas } from "../types";

type ReservasStatsProps = {
  indicadores: IndicadoresReservas;
};

export default function ReservasStats({
  indicadores,
}: ReservasStatsProps) {
  const tarjetas = [
    {
      id: "activas",
      titulo: "Reservas activas",
      cantidad: indicadores.activas,
      descripcion: "Pendientes por reclamar",
      icono: CalendarClock,
      color: "text-[#0755D8]",
      fondo: "bg-[#E8F1FF]",
      borde: "border-[#D6E5FF]",
    },
    {
      id: "completadas",
      titulo: "Completadas",
      cantidad: indicadores.completadas,
      descripcion: "Medicamentos entregados",
      icono: CircleCheck,
      color: "text-[#059669]",
      fondo: "bg-[#E6F7EF]",
      borde: "border-[#CDEDDD]",
    },
    {
      id: "canceladas",
      titulo: "Canceladas",
      cantidad: indicadores.canceladas,
      descripcion: "Reservas anuladas",
      icono: CircleX,
      color: "text-[#DC2626]",
      fondo: "bg-[#FEECEC]",
      borde: "border-[#FADADA]",
    },
    {
      id: "vencidas",
      titulo: "Vencidas",
      cantidad: indicadores.vencidas,
      descripcion: "Plazo de retiro finalizado",
      icono: Clock,
      color: "text-[#B45309]",
      fondo: "bg-[#FFF4DE]",
      borde: "border-[#FCE7B5]",
    },
  ];

  return (
    <section
      aria-label="Resumen de reservas"
      className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4"
    >
      {tarjetas.map((tarjeta) => {
        const Icono = tarjeta.icono;

        return (
          <article
            key={tarjeta.id}
            className="rounded-[20px] border border-[#E0E8F3] bg-white p-4 shadow-[0_4px_15px_rgba(15,42,117,0.04)] transition-shadow duration-200 hover:shadow-md"
          >
            {/* Título e icono */}
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-sm font-semibold text-[#475569]">
                {tarjeta.titulo}
              </h2>

              <div
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border ${tarjeta.fondo} ${tarjeta.color} ${tarjeta.borde}`}
              >
                <Icono
                  size={22}
                  strokeWidth={1.8}
                  aria-hidden="true"
                />
              </div>
            </div>

            {/* Cantidad de reservas */}
            <p
              className={`mt-2 text-[30px] font-extrabold leading-none tracking-tight ${tarjeta.color}`}
            >
              {tarjeta.cantidad}
            </p>

            {/* Descripción */}
            <p className="mt-2 text-xs leading-relaxed text-[#64748B]">
              {tarjeta.descripcion}
            </p>
          </article>
        );
      })}
    </section>
  );
}