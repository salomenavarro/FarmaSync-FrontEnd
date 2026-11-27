import {
  Heart,
  CircleCheck,
  PackageX,
} from "lucide-react";

import type { IndicadoresMisMedicamentos } from "../types";

interface MisMedicamentosStatsProps {
  indicadores: IndicadoresMisMedicamentos;
}

export default function MisMedicamentosStats({
  indicadores,
}: MisMedicamentosStatsProps) {

  const tarjetas = [
    {
      titulo: "Favoritos guardados",
      valor: indicadores.totalGuardados,
      descripcion: "Medicamentos por sede",
      icono: Heart,
      color: "#0755D8",
      fondo: "#EAF3FF",
    },
    {
      titulo: "Disponibles",
      valor: indicadores.disponibles,
      descripcion: "Con stock en la sede guardada",
      icono: CircleCheck,
      color: "#059669",
      fondo: "#E6F7EF",
    },
    {
      titulo: "Sin disponibilidad",
      valor: indicadores.sinDisponibilidad,
      descripcion: "Agotados en la sede guardada",
      icono: PackageX,
      color: "#DC2626",
      fondo: "#FEECEC",
    },
  ];

  return (
    <section className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">

      {tarjetas.map((tarjeta) => {

        const Icono = tarjeta.icono;

        return (
          <article
            key={tarjeta.titulo}
            className="
              flex items-center gap-4
              rounded-[20px]
              border border-[#E0E8F3]
              bg-white p-4
              shadow-[0_4px_18px_rgba(18,56,110,0.04)]
            "
          >
            {/* ICONO */}

            <div
              className="
                flex h-12 w-12 shrink-0
                items-center justify-center
                rounded-[14px]
              "
              style={{
                backgroundColor: tarjeta.fondo,
                color: tarjeta.color,
              }}
            >
              <Icono size={24} aria-hidden="true" />
            </div>

            {/* INFORMACIÓN */}

            <div className="min-w-0 flex-1">

              <h2 className="text-[14px] font-semibold text-[#62748E]">
                {tarjeta.titulo}
              </h2>

              <p className="text-[28px] font-extrabold leading-tight text-[#14285B]">
                {tarjeta.valor}
              </p>

              <p className="mt-1 text-[12px] text-[#71829B]">
                {tarjeta.descripcion}
              </p>

            </div>
          </article>
        );
      })}
    </section>
  );
}