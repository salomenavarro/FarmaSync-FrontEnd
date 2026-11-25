"use client";

import {
  Search,
  SlidersHorizontal,
  RotateCcw,
  ChevronDown,
} from "lucide-react";

import type { FiltrosNotificaciones } from "../types";

import {
  OPCIONES_TIPO_NOTIFICACION,
} from "../schemas/notificacion.constants";

interface NotificacionesFiltersProps {
  filtros: FiltrosNotificaciones;
  onChange: (filtros: FiltrosNotificaciones) => void;
  onLimpiarFiltros: () => void;
}

export default function NotificacionesFilters({
  filtros,
  onChange,
  onLimpiarFiltros,
}: NotificacionesFiltersProps) {
  const hayFiltros =
    filtros.busqueda.trim() !== "" ||
    filtros.tipo !== "TODOS";

  return (
    <section
      aria-label="Filtros de notificaciones"
      className="flex flex-col gap-3 pt-3 xl:flex-row xl:items-end"
    >
      {/* Buscador */}
      <div className="min-w-0 flex-1">
        <label
          htmlFor="buscar-notificaciones"
          className="mb-1.5 block text-[13px] font-semibold text-[#14285B]"
        >
          Buscar notificaciones
        </label>

        <div className="relative">
          <Search
            size={19}
            strokeWidth={1.8}
            aria-hidden="true"
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#64748B]"
          />

          <input
            id="buscar-notificaciones"
            type="search"
            value={filtros.busqueda}
            onChange={(event) =>
              onChange({
                ...filtros,
                busqueda: event.target.value,
              })
            }
            placeholder="Buscar por medicamento, reserva o sede..."
            className="h-11 w-full rounded-xl border border-[#DCE4EF] bg-white pl-10 pr-3 text-sm text-[#14285B] outline-none transition-colors placeholder:text-[#64748B] hover:border-[#A9BEDB] focus:border-[#0755D8] focus:ring-2 focus:ring-[#0755D8]/10"
          />
        </div>
      </div>

      {/* Filtro por tipo de notificación */}
      <div className="min-w-0 xl:w-[270px]">
        <label
          htmlFor="tipo-notificacion"
          className="mb-1.5 block text-[13px] font-semibold text-[#14285B]"
        >
          Tipo de notificación
        </label>

        <div className="relative">
          <SlidersHorizontal
            size={18}
            strokeWidth={1.8}
            aria-hidden="true"
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#64748B]"
          />

          <select
            id="tipo-notificacion"
            value={filtros.tipo}
            onChange={(event) =>
              onChange({
                ...filtros,
                tipo: event.target
                  .value as FiltrosNotificaciones["tipo"],
              })
            }
            className="h-11 w-full appearance-none rounded-xl border border-[#DCE4EF] bg-white pl-10 pr-9 text-sm text-[#14285B] outline-none transition-colors hover:border-[#A9BEDB] focus:border-[#0755D8] focus:ring-2 focus:ring-[#0755D8]/10"
          >
            {OPCIONES_TIPO_NOTIFICACION.map((opcion) => (
              <option
                key={opcion.valor}
                value={opcion.valor}
              >
                {opcion.etiqueta}
              </option>
            ))}
          </select>

          <ChevronDown
            size={17}
            aria-hidden="true"
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#64748B]"
          />
        </div>
      </div>

      {/* Restablecer filtros */}
      <button
        type="button"
        onClick={onLimpiarFiltros}
        disabled={!hayFiltros}
        className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-xl border border-[#DCE4EF] bg-white px-4 text-[13px] font-semibold text-[#0755D8] transition-colors hover:border-[#0755D8] hover:bg-[#EAF3FF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0755D8] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-[#DCE4EF] disabled:hover:bg-white"
      >
        <RotateCcw size={17} aria-hidden="true" />

        Limpiar filtros
      </button>
    </section>
  );
}