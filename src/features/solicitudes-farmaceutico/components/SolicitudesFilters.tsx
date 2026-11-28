"use client";

import {
  Search,
  SlidersHorizontal,
  RotateCcw,
  CalendarDays,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import type {
  FiltrosSolicitudes,
  FiltroEstadoSolicitud,
  FiltroSla,
} from "../types";

interface SolicitudesFiltersProps {
  filtros: FiltrosSolicitudes;
  hayFiltrosActivos: boolean;
  totalResultados: number;
  actualizarFiltro: <K extends keyof FiltrosSolicitudes>(
    campo: K,
    valor: FiltrosSolicitudes[K]
  ) => void;
  restablecerFiltros: () => void;
}

const estilosCampo = `
  h-10 w-full min-w-0 rounded-xl
  border border-[#DCE4EF] bg-white
  px-3 text-sm text-[#14285B]
  outline-none transition-colors
  focus:border-[#0755D8]
  focus:ring-2 focus:ring-[#0755D8]/10
`;

const estilosLabel = `
  mb-1.5 block text-xs font-medium
  text-[#475569]
`;

export default function SolicitudesFilters({
  filtros,
  hayFiltrosActivos,
  totalResultados,
  actualizarFiltro,
  restablecerFiltros,
}: SolicitudesFiltersProps) {
  return (
    <section
      aria-labelledby="titulo-filtros"
      className="
        rounded-[22px] border border-[#DCE9F8]
        bg-white p-4 sm:p-5
        shadow-[0_3px_12px_rgba(20,40,91,0.04)]
      "
    >
      {/* ENCABEZADO */}

      <div
        className="
          mb-4 flex flex-wrap items-center
          justify-between gap-3
        "
      >
        <div className="flex items-center gap-3">
          <div
            className="
              flex h-10 w-10 shrink-0
              items-center justify-center
              rounded-xl bg-[#E8F0FF]
              text-[#0755D8]
            "
          >
            <SlidersHorizontal
              size={20}
              aria-hidden="true"
            />
          </div>

          <div>
            <h2
              id="titulo-filtros"
              className="text-sm font-semibold text-[#14285B]"
            >
              Buscar y filtrar solicitudes
            </h2>

            <p className="mt-0.5 text-xs text-[#64748B]">
              Encuentra rápidamente las reservas de tu sede.
            </p>
          </div>
        </div>

        <Button
          type="button"
          variant="outline"
          onClick={restablecerFiltros}
          disabled={!hayFiltrosActivos}
          className="
            gap-2 rounded-xl border-[#DCE4EF]
            text-xs text-[#0755D8]
            hover:bg-[#F0F6FF]
          "
        >
          <RotateCcw size={14} aria-hidden="true" />
          Limpiar filtros
        </Button>
      </div>

      {/* BUSCADOR Y FILTROS PRINCIPALES */}

      <div
        className="
          grid grid-cols-1 gap-3
          sm:grid-cols-2
          xl:grid-cols-[2fr_1fr_1fr]
        "
      >
        {/* BUSCADOR */}

        <div className="min-w-0 sm:col-span-2 xl:col-span-1">
          <label
            htmlFor="buscar-solicitud"
            className={estilosLabel}
          >
            Buscar solicitud
          </label>

          <div className="relative">
            <Search
              size={17}
              aria-hidden="true"
              className="
                pointer-events-none absolute left-3
                top-1/2 -translate-y-1/2
                text-[#64748B]
              "
            />

            <input
              id="buscar-solicitud"
              type="search"
              value={filtros.busqueda}
              onChange={(event) =>
                actualizarFiltro(
                  "busqueda",
                  event.target.value
                )
              }
              placeholder="Código, paciente o medicamento..."
              className={`
                ${estilosCampo}
                pl-10 placeholder:text-[#94A3B8]
              `}
            />
          </div>
        </div>

        {/* FILTRO POR ESTADO */}

        <div className="min-w-0">
          <label
            htmlFor="estado-solicitud"
            className={estilosLabel}
          >
            Estado de la solicitud
          </label>

          <select
            id="estado-solicitud"
            value={filtros.estado}
            onChange={(event) =>
              actualizarFiltro(
                "estado",
                event.target.value as FiltroEstadoSolicitud
              )
            }
            className={estilosCampo}
          >
            <option value="TODAS">Todos los estados</option>
            <option value="ACTIVA">Pendientes</option>
            <option value="COMPLETADA">Entregadas</option>
            <option value="CANCELADA">Canceladas</option>
            <option value="VENCIDA">Vencidas</option>
          </select>
        </div>

        {/* FILTRO POR SEMÁFORO */}

        <div className="min-w-0">
          <label
            htmlFor="sla-solicitud"
            className={estilosLabel}
          >
            Prioridad de alistamiento
          </label>

          <select
            id="sla-solicitud"
            value={filtros.sla}
            onChange={(event) =>
              actualizarFiltro(
                "sla",
                event.target.value as FiltroSla
              )
            }
            className={estilosCampo}
          >
            <option value="TODOS">Todas las prioridades</option>
            <option value="VERDE">Verde · Dentro del tiempo</option>
            <option value="AMARILLO">Amarillo · Requiere atención</option>
            <option value="ROJO">Rojo · Atención prioritaria</option>
          </select>
        </div>
      </div>

      {/* FILTROS POR FECHA */}

      <div
        className="
          mt-3 grid grid-cols-1 items-end gap-3
          sm:grid-cols-2
          xl:grid-cols-[1fr_1fr_2fr]
        "
      >
        <div className="min-w-0">
          <label
            htmlFor="solicitudes-desde"
            className={estilosLabel}
          >
            Fecha de creación desde
          </label>

          <input
            id="solicitudes-desde"
            type="date"
            value={filtros.fechaDesde}
            max={filtros.fechaHasta || undefined}
            onChange={(event) =>
              actualizarFiltro(
                "fechaDesde",
                event.target.value
              )
            }
            className={estilosCampo}
          />
        </div>

        <div className="min-w-0">
          <label
            htmlFor="solicitudes-hasta"
            className={estilosLabel}
          >
            Fecha de creación hasta
          </label>

          <input
            id="solicitudes-hasta"
            type="date"
            value={filtros.fechaHasta}
            min={filtros.fechaDesde || undefined}
            onChange={(event) =>
              actualizarFiltro(
                "fechaHasta",
                event.target.value
              )
            }
            className={estilosCampo}
          />
        </div>

        <div
          className="
            flex min-h-10 items-center gap-2
            rounded-xl bg-[#F5F9FF] px-3 py-2
            text-xs leading-relaxed text-[#64748B]
            sm:col-span-2 xl:col-span-1
          "
        >
          <CalendarDays
            size={16}
            aria-hidden="true"
            className="shrink-0 text-[#0755D8]"
          />

          Filtra según la fecha en que se realizó la reserva.
        </div>
      </div>

      {/* CANTIDAD DE RESULTADOS */}

      <div
        className="
          mt-4 flex flex-wrap items-center
          justify-between gap-2
          border-t border-[#E8EEF6] pt-3
        "
      >
        <p
          role="status"
          className="text-xs text-[#64748B]"
        >
          Se encontraron{" "}
          <span className="font-semibold text-[#14285B]">
            {totalResultados}
          </span>{" "}
          {totalResultados === 1
            ? "solicitud"
            : "solicitudes"}
        </p>

        {hayFiltrosActivos && (
          <span
            className="
              rounded-full bg-[#E8F0FF]
              px-3 py-1 text-xs font-medium
              text-[#0755D8]
            "
          >
            Filtros activos
          </span>
        )}
      </div>
    </section>
  );
}