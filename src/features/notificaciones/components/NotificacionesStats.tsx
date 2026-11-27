import {
  Bell,
  Mail,
  CircleCheck,
  TriangleAlert,
} from "lucide-react";

import type { IndicadoresNotificaciones } from "../types";

interface NotificacionesStatsProps {
  indicadores: IndicadoresNotificaciones;
}

export default function NotificacionesStats({
  indicadores,
}: NotificacionesStatsProps) {
  const tarjetas = [
    {
      titulo: "Total de notificaciones",
      valor: indicadores.total,
      descripcion: "Notificaciones recibidas",
      icono: Bell,
      color: "text-[#0755D8]",
      fondo: "bg-[#EAF3FF]",
    },
    {
      titulo: "Sin leer",
      valor: indicadores.sinLeer,
      descripcion: "Pendientes de revisar",
      icono: Mail,
      color: "text-[#0755D8]",
      fondo: "bg-[#EAF3FF]",
    },
    {
      titulo: "Leídas",
      valor: indicadores.leidas,
      descripcion: "Notificaciones revisadas",
      icono: CircleCheck,
      color: "text-[#059669]",
      fondo: "bg-[#E6F7EF]",
    },
    {
      titulo: "Incidencias",
      valor: indicadores.incidencias,
      descripcion: "Novedades del servicio",
      icono: TriangleAlert,
      color: "text-[#D97706]",
      fondo: "bg-[#FFF4DE]",
    },
  ];

  return (
    <section
      aria-label="Indicadores de notificaciones"
      className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4"
    >
      {tarjetas.map((tarjeta) => {
        const Icono = tarjeta.icono;

        return (
          <article
            key={tarjeta.titulo}
            className="flex min-w-0 items-center gap-3 rounded-[20px] border border-[#E0E8F3] bg-white p-4 shadow-sm transition-shadow duration-200 hover:shadow-md"
          >
            {/* Icono del indicador */}
            <div
              className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-[14px] ${tarjeta.fondo} ${tarjeta.color}`}
            >
              <Icono
                size={24}
                strokeWidth={1.8}
                aria-hidden="true"
              />
            </div>

            {/* Información del indicador */}
            <div className="min-w-0">
              <h2 className="text-[13px] font-semibold leading-tight text-[#64748B]">
                {tarjeta.titulo}
              </h2>

              <p className="mt-1 text-[28px] font-extrabold leading-none tracking-tight text-[#14285B]">
                {tarjeta.valor}
              </p>

              <p className="mt-1 text-[11px] leading-relaxed text-[#64748B]">
                {tarjeta.descripcion}
              </p>
            </div>
          </article>
        );
      })}
    </section>
  );
}