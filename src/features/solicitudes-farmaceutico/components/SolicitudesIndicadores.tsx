import {
  ClipboardList,
  Clock3,
  PackageCheck,
  XCircle,
  CalendarX2,
  Timer,
} from "lucide-react";

import type {
  IndicadoresSolicitudes,
  IndicadoresSla,
} from "../types";

interface SolicitudesIndicadoresProps {
  indicadores: IndicadoresSolicitudes;
  indicadoresSla: IndicadoresSla;
}

export default function SolicitudesIndicadores({
  indicadores,
  indicadoresSla,
}: SolicitudesIndicadoresProps) {
  const tarjetas = [
    {
      titulo: "Total solicitudes",
      valor: indicadores.total,
      icono: ClipboardList,
      fondo: "bg-[#E8F0FF]",
      color: "text-[#0755D8]",
    },
    {
      titulo: "Pendientes",
      valor: indicadores.pendientes,
      icono: Clock3,
      fondo: "bg-[#FFF3DC]",
      color: "text-[#A16207]",
    },
    {
      titulo: "Entregadas",
      valor: indicadores.entregadas,
      icono: PackageCheck,
      fondo: "bg-[#E4F6EC]",
      color: "text-[#15803D]",
    },
    {
      titulo: "Canceladas",
      valor: indicadores.canceladas,
      icono: XCircle,
      fondo: "bg-[#FDE8E8]",
      color: "text-[#B42318]",
    },
    {
      titulo: "Vencidas",
      valor: indicadores.vencidas,
      icono: CalendarX2,
      fondo: "bg-[#F1F5F9]",
      color: "text-[#475569]",
    },
  ];

  const nivelesSla = [
    {
      titulo: "Dentro del tiempo",
      descripcion: "Menos de 1 hora",
      valor: indicadoresSla.verde,
      fondo: "bg-[#F0FAF4]",
      borde: "border-[#CBEAD8]",
      color: "text-[#13693D]",
      punto: "bg-[#12A150]",
    },
    {
      titulo: "Requiere atención",
      descripcion: "De 1 a 2 horas",
      valor: indicadoresSla.amarillo,
      fondo: "bg-[#FFFAEB]",
      borde: "border-[#F5E3AC]",
      color: "text-[#8A5A00]",
      punto: "bg-[#F5A524]",
    },
    {
      titulo: "Atención prioritaria",
      descripcion: "Más de 2 horas",
      valor: indicadoresSla.rojo,
      fondo: "bg-[#FFF4F4]",
      borde: "border-[#F5CCCC]",
      color: "text-[#B42318]",
      punto: "bg-[#D92D20]",
    },
  ];

  return (
    <section
      aria-label="Resumen de solicitudes"
      className="space-y-4"
    >
      {/* INDICADORES GENERALES */}

      <div
        className="
          grid grid-cols-2 gap-3
          sm:grid-cols-3 xl:grid-cols-5
        "
      >
        {tarjetas.map((tarjeta) => {
          const Icono = tarjeta.icono;

          return (
            <article
              key={tarjeta.titulo}
              className="
                min-w-0 rounded-[20px]
                border border-[#DCE9F8]
                bg-white p-4
                shadow-[0_3px_12px_rgba(20,40,91,0.04)]
              "
            >
              <div className="flex items-center gap-3">
                <div
                  className={`
                    flex h-10 w-10 shrink-0
                    items-center justify-center
                    rounded-xl
                    ${tarjeta.fondo}
                    ${tarjeta.color}
                  `}
                >
                  <Icono
                    size={20}
                    strokeWidth={1.8}
                    aria-hidden="true"
                  />
                </div>

                <span
                  className="
                    text-2xl font-bold
                    tabular-nums text-[#14285B]
                  "
                >
                  {tarjeta.valor}
                </span>
              </div>

              <h2
                className="
                  mt-3 text-xs font-medium
                  leading-snug text-[#64748B]
                  sm:text-sm
                "
              >
                {tarjeta.titulo}
              </h2>
            </article>
          );
        })}
      </div>

      {/* SEMÁFORO SLA */}

      <div
        className="
          rounded-[22px] border border-[#DCE9F8]
          bg-white p-4
          shadow-[0_3px_12px_rgba(20,40,91,0.04)]
        "
      >
        <div className="mb-4 flex items-center gap-3">
          <div
            className="
              flex h-10 w-10 shrink-0
              items-center justify-center
              rounded-xl bg-[#E8F0FF]
              text-[#0755D8]
            "
          >
            <Timer size={21} aria-hidden="true" />
          </div>

          <div>
            <h2 className="text-sm font-semibold text-[#14285B]">
              Semáforo de alistamiento
            </h2>

            <p className="mt-0.5 text-xs text-[#64748B]">
              Clasificación de solicitudes pendientes
              según su tiempo de espera.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {nivelesSla.map((nivel) => (
            <article
              key={nivel.titulo}
              className={`
                flex items-center justify-between
                gap-3 rounded-2xl border p-3
                ${nivel.fondo}
                ${nivel.borde}
              `}
            >
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span
                    aria-hidden="true"
                    className={`
                      h-2.5 w-2.5 shrink-0
                      rounded-full ${nivel.punto}
                    `}
                  />

                  <h3
                    className={`
                      text-xs font-semibold
                      ${nivel.color}
                    `}
                  >
                    {nivel.titulo}
                  </h3>
                </div>

                <p
                  className={`
                    mt-1 text-xs ${nivel.color}
                  `}
                >
                  {nivel.descripcion}
                </p>
              </div>

              <span
                className={`
                  text-2xl font-bold tabular-nums
                  ${nivel.color}
                `}
              >
                {nivel.valor}
              </span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}