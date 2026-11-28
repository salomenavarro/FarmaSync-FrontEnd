import {
  Boxes,
  PackageCheck,
  PackageX,
  Pill,
  TriangleAlert,
} from "lucide-react";

import type { IndicadoresInventario } from "../types";
import { formatearCantidad } from "../utils/inventario.utils";

interface InventarioIndicadoresProps {
  indicadores: IndicadoresInventario;
  inventarioConsultado: boolean;
  cargando: boolean;
}

export default function InventarioIndicadores({
  indicadores,
  inventarioConsultado,
  cargando,
}: InventarioIndicadoresProps) {
  const tarjetas = [
    {
      titulo: "Medicamentos",
      valor: indicadores.totalMedicamentos,
      descripcion: "Referencias registradas",
      icono: Pill,
      estilos: "bg-[#E5F1FF] text-[#0755D8]",
    },
    {
      titulo: "Disponibles",
      valor: indicadores.disponibles,
      descripcion: "Stock disponible",
      icono: PackageCheck,
      estilos: "bg-[#DCFCE7] text-[#15803D]",
    },
    {
      titulo: "Stock bajo",
      valor: indicadores.stockBajo,
      descripcion: "Disponibilidad limitada",
      icono: TriangleAlert,
      estilos: "bg-[#FEF3C7] text-[#B45309]",
    },
    {
      titulo: "Agotados",
      valor: indicadores.agotados,
      descripcion: "Sin existencias",
      icono: PackageX,
      estilos: "bg-[#FEE2E2] text-[#DC2626]",
    },
    {
      titulo: "Total de unidades",
      valor: indicadores.totalUnidades,
      descripcion: "Unidades en inventario",
      icono: Boxes,
      estilos: "bg-[#E0E7FF] text-[#4338CA]",
    },
  ];

  return (
    <section
      aria-label="Indicadores de inventario"
      aria-busy={cargando}
      className="grid grid-cols-2 gap-3 sm:grid-cols-3 2xl:grid-cols-5"
    >
      {tarjetas.map((tarjeta, indice) => {
        const Icono = tarjeta.icono;

        return (
          <article
            key={tarjeta.titulo}
            className={`min-w-0 rounded-[20px] border border-[#DCE9F8] bg-white p-4 shadow-[0_4px_14px_rgba(20,40,91,0.04)] ${
              indice === 4
                ? "col-span-2 sm:col-span-1"
                : ""
            }`}
          >
            {/* Icono y título */}
            <div className="flex flex-wrap items-center gap-2.5">
              <div
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${tarjeta.estilos}`}
              >
                <Icono
                  size={21}
                  strokeWidth={2}
                  aria-hidden="true"
                />
              </div>

              <h2 className="text-sm font-semibold text-[#526580]">
                {tarjeta.titulo}
              </h2>
            </div>

            {/* Valor del indicador */}
            <div className="mt-3">
              {cargando ? (
                <div
                  role="status"
                  className="h-8 w-16 animate-pulse rounded-lg bg-[#E5EDF8] motion-reduce:animate-none"
                >
                  <span className="sr-only">
                    Cargando indicador
                  </span>
                </div>
              ) : (
                <p className="break-words text-[28px] font-extrabold leading-tight tracking-tight text-[#14285B] tabular-nums">
                  {inventarioConsultado
                    ? formatearCantidad(tarjeta.valor)
                    : "—"}
                </p>
              )}

              <p className="mt-1 text-xs leading-relaxed text-[#64748B]">
                {tarjeta.descripcion}
              </p>
            </div>
          </article>
        );
      })}
    </section>
  );
}