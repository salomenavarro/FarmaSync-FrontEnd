import {
  UsersRound,
  Building2,
  CalendarCheck,
  TriangleAlert,
} from "lucide-react";

import type { IndicadoresDashboard } from "../types";

// =========================================================
// TIPOS
// =========================================================

type AdminStatsProps = {
  indicadores: IndicadoresDashboard;
};

// =========================================================
// TARJETAS DE INDICADORES
// =========================================================

export default function AdminStats({
  indicadores,
}: AdminStatsProps) {
  const tarjetas = [
    {
      titulo: "Farmacéuticos activos",
      valor: indicadores.farmaceuticosActivos,
      descripcion: "Personal habilitado",
      icono: UsersRound,
      color: "text-[#0755D8]",
      fondo: "bg-[#E8F1FF]",
    },
    {
      titulo: "Sedes registradas",
      valor: indicadores.sedesRegistradas,
      descripcion: "Red de farmacias EPS",
      icono: Building2,
      color: "text-[#0891B2]",
      fondo: "bg-[#E6F8FC]",
    },
    {
      titulo: "Reservas totales",
      valor: indicadores.reservasTotales,
      descripcion: "Reservas registradas",
      icono: CalendarCheck,
      color: "text-[#059669]",
      fondo: "bg-[#E7F8F0]",
    },
    {
      titulo: "Medicamentos en alerta",
      valor: indicadores.medicamentosEnAlerta,
      descripcion: "Requieren atención",
      icono: TriangleAlert,
      color: "text-[#D97706]",
      fondo: "bg-[#FFF4E0]",
    },
  ];

  const formatoNumero = new Intl.NumberFormat("es-CO");

  return (
    <section
      aria-label="Indicadores generales del administrador"
      className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4"
    >
      {tarjetas.map((tarjeta) => {
        const Icon = tarjeta.icono;

        return (
          <article
            key={tarjeta.titulo}
            className="
              min-w-0 rounded-[20px]
              border border-[#E3EBF5]
              bg-white p-4
              shadow-[0_4px_16px_rgba(15,42,117,0.04)]
              transition-all duration-200
              hover:-translate-y-0.5
              hover:shadow-[0_8px_24px_rgba(15,42,117,0.08)]
            "
          >
            {/* TÍTULO E ICONO */}

            <div className="flex items-start justify-between gap-2">
              <h2 className="text-sm font-semibold leading-snug text-[#526582]">
                {tarjeta.titulo}
              </h2>

              <div
                className={`
                  flex h-11 w-11 shrink-0
                  items-center justify-center
                  rounded-xl
                  ${tarjeta.fondo}
                  ${tarjeta.color}
                `}
              >
                <Icon
                  size={23}
                  strokeWidth={1.9}
                  aria-hidden="true"
                />
              </div>
            </div>

            {/* VALOR DEL INDICADOR */}

            <p className="mt-2 text-[30px] font-extrabold leading-none tracking-tight text-[#14285B]">
              {formatoNumero.format(tarjeta.valor)}
            </p>

            {/* DESCRIPCIÓN */}

            <p className="mt-2 text-xs text-[#64748B]">
              {tarjeta.descripcion}
            </p>
          </article>
        );
      })}
    </section>
  );
}