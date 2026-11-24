"use client";

import {
  Search,
  SlidersHorizontal,
  RotateCcw,
} from "lucide-react";

import type {
  FiltrosMisMedicamentos,
  FiltroDisponibilidad,
} from "../types";

// =========================================================
// PROPIEDADES
// =========================================================

interface MisMedicamentosFiltersProps {
  filtros: FiltrosMisMedicamentos;
  onChange: (filtros: FiltrosMisMedicamentos) => void;
}

// =========================================================
// OPCIONES DE DISPONIBILIDAD
// =========================================================

const OPCIONES_DISPONIBILIDAD: FiltroDisponibilidad[] = [
  "Todos",
  "Disponible",
  "Disponibilidad limitada",
  "Agotado",
];

// =========================================================
// COMPONENTE
// =========================================================

export default function MisMedicamentosFilters({
  filtros,
  onChange,
}: MisMedicamentosFiltersProps) {

  const hayFiltros =
    filtros.busqueda.trim() !== "" ||
    filtros.disponibilidad !== "Todos";

  function limpiarFiltros() {
    onChange({
      busqueda: "",
      disponibilidad: "Todos",
    });
  }

  return (
    <section
      className="
        rounded-[20px]
        border border-[#DFE9F6]
        bg-white p-4
      "
    >
      <div className="flex flex-col gap-3 xl:flex-row xl:items-end">

        {/* BUSCADOR */}

        <div className="min-w-0 flex-1">

          <label
            htmlFor="buscar-medicamento-guardado"
            className="
              mb-2 block text-[12px]
              font-bold text-[#14285B]
            "
          >
            Buscar medicamento o sede
          </label>

          <div className="relative">

            <Search
              size={18}
              className="
                pointer-events-none absolute
                left-3 top-1/2 -translate-y-1/2
                text-[#71829B]
              "
              aria-hidden="true"
            />

            <input
              id="buscar-medicamento-guardado"
              type="search"
              value={filtros.busqueda}
              onChange={(event) =>
                onChange({
                  ...filtros,
                  busqueda: event.target.value,
                })
              }
              placeholder="Buscar por nombre, código o sede..."
              className="
                h-11 w-full rounded-[12px]
                border border-[#DFE9F6]
                bg-[#F7FAFF]
                pl-10 pr-3
                text-[13px] text-[#14285B]
                placeholder:text-[#71829B]
                outline-none transition-colors
                focus:border-[#0755D8]
                focus:ring-2 focus:ring-[#0755D8]/10
              "
            />

          </div>
        </div>

        {/* FILTRO DE DISPONIBILIDAD */}

        <div className="w-full xl:w-[250px]">

          <label
            htmlFor="disponibilidad-guardados"
            className="
              mb-2 block text-[12px]
              font-bold text-[#14285B]
            "
          >
            Disponibilidad en la sede
          </label>

          <div className="relative">

            <SlidersHorizontal
              size={17}
              className="
                pointer-events-none absolute
                left-3 top-1/2 -translate-y-1/2
                text-[#71829B]
              "
              aria-hidden="true"
            />

            <select
              id="disponibilidad-guardados"
              value={filtros.disponibilidad}
              onChange={(event) =>
                onChange({
                  ...filtros,
                  disponibilidad:
                    event.target.value as FiltroDisponibilidad,
                })
              }
              className="
                h-11 w-full rounded-[12px]
                border border-[#DFE9F6]
                bg-[#F7FAFF]
                pl-10 pr-3
                text-[12px] font-medium
                text-[#14285B]
                outline-none transition-colors
                focus:border-[#0755D8]
                focus:ring-2 focus:ring-[#0755D8]/10
              "
            >
              {OPCIONES_DISPONIBILIDAD.map((opcion) => (
                <option key={opcion} value={opcion}>
                  {opcion === "Todos"
                    ? "Todos los estados"
                    : opcion}
                </option>
              ))}
            </select>

          </div>
        </div>

        {/* LIMPIAR FILTROS */}

        <button
          type="button"
          onClick={limpiarFiltros}
          disabled={!hayFiltros}
          className="
            flex h-11 shrink-0
            items-center justify-center gap-2
            rounded-[12px]
            border border-[#DCE8F7]
            bg-white px-4
            text-[12px] font-bold text-[#0755D8]
            transition-colors
            hover:bg-[#EAF3FF]
            focus-visible:outline-2
            focus-visible:outline-offset-2
            focus-visible:outline-[#0755D8]
            disabled:cursor-not-allowed
            disabled:opacity-50
          "
        >
          <RotateCcw size={15} />

          Limpiar filtros
        </button>

      </div>
    </section>
  );
}