
"use client";

import { MapPin, Navigation, RotateCcw, Store } from "lucide-react";
import type { SedeFarmacia } from "../types";

export interface FiltrosMedicamentos {
  sedeId: string;
  ubicacion: string;
  cercania: string;
}

interface MedicamentoFiltersProps {
  sedes: SedeFarmacia[];
  filtros: FiltrosMedicamentos;
  onChange: (filtros: FiltrosMedicamentos) => void;
}

export default function MedicamentoFilters({
  sedes,
  filtros,
  onChange,
}: MedicamentoFiltersProps) {
  const ubicaciones = Array.from(
    new Set(sedes.map((sede) => `${sede.ciudad} - ${sede.zona}`))
  );

  const actualizarFiltro = (
    campo: keyof FiltrosMedicamentos,
    valor: string
  ) => {
    onChange({
      ...filtros,
      [campo]: valor,
    });
  };

  const limpiarFiltros = () => {
    onChange({
      sedeId: "",
      ubicacion: "",
      cercania: "cercanas",
    });
  };

  const selectStyles = `
    h-[44px] w-full appearance-none
    rounded-[12px] border border-[#DCE8F7]
    bg-white px-3 pr-9
    text-[12px] font-medium text-[#14285B]
    outline-none transition-all
    focus:border-[#0876E9]
    focus:ring-2 focus:ring-[#0876E9]/10
  `;

  return (
    <div className="rounded-[20px] border border-[#DFE9F6] bg-white p-4">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className="text-[14px] font-extrabold text-[#14285B]">
          Filtrar resultados
        </h2>

        <button
          type="button"
          onClick={limpiarFiltros}
          className="
            inline-flex items-center gap-1.5
            text-[11px] font-bold text-[#0755D8]
            transition-colors hover:text-[#043C9E]
          "
        >
          <RotateCcw size={14} />
          Limpiar filtros
        </button>
      </div>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
        {/* FILTRO POR SEDE */}
        <div>
          <label
            htmlFor="filtro-sede"
            className="mb-2 flex items-center gap-2 text-[12px] font-bold text-[#14285B]"
          >
            <Store size={15} className="text-[#0876E9]" />
            Sede de farmacia
          </label>

          <select
            id="filtro-sede"
            value={filtros.sedeId}
            onChange={(event) =>
              actualizarFiltro("sedeId", event.target.value)
            }
            className={selectStyles}
          >
            <option value="">Todas las sedes</option>

            {sedes.map((sede) => (
              <option key={sede.id} value={sede.id}>
                {sede.nombre}
              </option>
            ))}
          </select>
        </div>

        {/* FILTRO POR CIUDAD / ZONA */}
        <div>
          <label
            htmlFor="filtro-ubicacion"
            className="mb-2 flex items-center gap-2 text-[12px] font-bold text-[#14285B]"
          >
            <MapPin size={15} className="text-[#0876E9]" />
            Ciudad / Zona
          </label>

          <select
            id="filtro-ubicacion"
            value={filtros.ubicacion}
            onChange={(event) =>
              actualizarFiltro("ubicacion", event.target.value)
            }
            className={selectStyles}
          >
            <option value="">Todas las ubicaciones</option>

            {ubicaciones.map((ubicacion) => (
              <option key={ubicacion} value={ubicacion}>
                {ubicacion}
              </option>
            ))}
          </select>
        </div>

        {/* FILTRO POR CERCANÍA */}
        <div>
          <label
            htmlFor="filtro-cercania"
            className="mb-2 flex items-center gap-2 text-[12px] font-bold text-[#14285B]"
          >
            <Navigation size={15} className="text-[#0876E9]" />
            Cercanía
          </label>

          <select
            id="filtro-cercania"
            value={filtros.cercania}
            onChange={(event) =>
              actualizarFiltro("cercania", event.target.value)
            }
            className={selectStyles}
          >
            <option value="cercanas">Más cercanas primero</option>
            <option value="lejanas">Más lejanas primero</option>
          </select>
        </div>
      </div>
    </div>
  );
}
