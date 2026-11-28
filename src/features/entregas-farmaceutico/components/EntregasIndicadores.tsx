import {
  CalendarCheck,
  PackageCheck,
  Clock3,
} from "lucide-react";

import type { IndicadoresEntregas } from "../types";

// =========================================================
// PROPIEDADES DEL COMPONENTE
// =========================================================

interface EntregasIndicadoresProps {
  indicadores: IndicadoresEntregas;
}

// =========================================================
// COMPONENTE PRINCIPAL
// =========================================================

export default function EntregasIndicadores({
  indicadores,
}: EntregasIndicadoresProps) {
  const tarjetas = [
    {
      titulo: "Entregas de hoy",
      valor: indicadores.entregasHoy,
      descripcion: "Medicamentos entregados hoy",
      icono: CalendarCheck,
      fondo: "bg-[#E8F1FF]",
      color: "text-[#0755D8]",
    },
    {
      titulo: "Entregas totales",
      valor: indicadores.entregasTotales,
      descripcion: "Reservas entregadas",
      icono: PackageCheck,
      fondo: "bg-[#E4F6EC]",
      color: "text-[#15803D]",
    },
    {
      titulo: "Reservas pendientes",
      valor: indicadores.reservasPendientes,
      descripcion: "Reservas aún no entregadas",
      icono: Clock3,
      fondo: "bg-[#FFF3D6]",
      color: "text-[#A16207]",
    },
  ];

  return (
    <section
      aria-label="Indicadores de entregas"
      className="grid grid-cols-1 gap-3 sm:grid-cols-3"
    >
      {tarjetas.map((tarjeta) => {
        const Icono = tarjeta.icono;

        return (
          <article
            key={tarjeta.titulo}
            className="min-w-0 rounded-[20px] border border-[#DCE9F8] bg-white p-4 shadow-[0_3px_12px_rgba(20,40,91,0.04)] transition-shadow hover:shadow-md"
          >
            {/* ENCABEZADO DE LA TARJETA */}

            <div className="flex items-start justify-between gap-3">
              <h2 className="text-sm font-semibold leading-snug text-[#475569]">
                {tarjeta.titulo}
              </h2>

              <div
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${tarjeta.fondo} ${tarjeta.color}`}
              >
                <Icono
                  size={22}
                  strokeWidth={1.8}
                  aria-hidden="true"
                />
              </div>
            </div>

            {/* VALOR DEL INDICADOR */}

            <p className="mt-1 text-[32px] font-bold leading-none tracking-tight text-[#14285B] tabular-nums">
              {tarjeta.valor}
            </p>

            {/* DESCRIPCIÓN */}

            <p className="mt-2 text-xs leading-relaxed text-[#64748B]">
              {tarjeta.descripcion}
            </p>
          </article>
        );
      })}
    </section>
  );
}