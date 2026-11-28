"use client";

import {
  Filter,
  RefreshCw,
  RotateCcw,
  Search,
} from "lucide-react";

import type {
  FiltrosInventario,
  FiltroEstadoInventario,
} from "../types";

interface InventarioFiltersProps {
  filtros: FiltrosInventario;
  hayFiltrosActivos: boolean;
  totalResultados: number;
  totalMedicamentos: number;
  cargando: boolean;
  inventarioConsultado: boolean;
  sedeDisponible: boolean;

  actualizarFiltro: <K extends keyof FiltrosInventario>(
    campo: K,
    valor: FiltrosInventario[K],
  ) => void;

  restablecerFiltros: () => void;
  recargarInventario: () => void;
}

const FOCO =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0755D8]";

export default function InventarioFilters({
  filtros,
  hayFiltrosActivos,
  totalResultados,
  totalMedicamentos,
  cargando,
  inventarioConsultado,
  sedeDisponible,
  actualizarFiltro,
  restablecerFiltros,
  recargarInventario,
}: InventarioFiltersProps) {
  return (
    <section
      aria-labelledby="filtros-inventario-titulo"
      className="min-w-0 rounded-[22px] border border-[#DCE9F8] bg-white p-4 shadow-[0_4px_14px_rgba(20,40,91,0.04)] sm:p-5"
    >
      {/* Encabezado */}

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#E5F1FF] text-[#0755D8]">
            <Filter size={22} aria-hidden="true" />
          </div>

          <div>
            <h2
              id="filtros-inventario-titulo"
              className="text-base font-extrabold text-[#14285B]"
            >
              Buscar medicamentos
            </h2>

            <p className="mt-0.5 text-xs text-[#64748B]">
              Consulta y filtra las existencias.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={recargarInventario}
          disabled={!sedeDisponible || cargando}
          className={`inline-flex min-h-10 items-center justify-center gap-2 rounded-xl border border-[#DCE9F8] bg-[#F5F9FF] px-3 text-xs font-bold text-[#0755D8] transition hover:bg-[#E5F1FF] disabled:cursor-not-allowed disabled:opacity-50 ${FOCO}`}
        >
          <RefreshCw
            size={16}
            aria-hidden="true"
            className={
              cargando
                ? "animate-spin motion-reduce:animate-none"
                : ""
            }
          />

          Actualizar
        </button>
      </div>

      {/* Controles de búsqueda */}

      <div className="mt-5 grid grid-cols-1 items-end gap-3 xl:grid-cols-[minmax(0,1fr)_220px_auto]">

        {/* Buscador */}

        <div className="min-w-0">
          <label
            htmlFor="inventario-busqueda"
            className="text-sm font-semibold text-[#14285B]"
          >
            Medicamento
          </label>

          <div className="relative mt-1.5">
            <Search
              size={19}
              aria-hidden="true"
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#64748B]"
            />

            <input
              id="inventario-busqueda"
              type="search"
              value={filtros.busqueda}
              onChange={(evento) =>
                actualizarFiltro(
                  "busqueda",
                  evento.target.value,
                )
              }
              disabled={!inventarioConsultado}
              placeholder="Nombre o código del medicamento..."
              className={`h-11 w-full rounded-xl border border-[#B9C9DE] bg-white pl-10 pr-3 text-sm text-[#14285B] placeholder:text-[#64748B] disabled:cursor-not-allowed disabled:bg-slate-50 ${FOCO}`}
            />
          </div>
        </div>

        {/* Estado de disponibilidad */}

        <div>
          <label
            htmlFor="inventario-estado"
            className="text-sm font-semibold text-[#14285B]"
          >
            Disponibilidad
          </label>

          <select
            id="inventario-estado"
            value={filtros.estado}
            onChange={(evento) =>
              actualizarFiltro(
                "estado",
                evento.target.value as FiltroEstadoInventario,
              )
            }
            disabled={!inventarioConsultado}
            className={`mt-1.5 h-11 w-full rounded-xl border border-[#B9C9DE] bg-white px-3 text-sm text-[#14285B] disabled:cursor-not-allowed disabled:bg-slate-50 ${FOCO}`}
          >
            <option value="TODOS">
              Todos los estados
            </option>

            <option value="Disponible">
              Disponible
            </option>

            <option value="Disponibilidad limitada">
              Stock bajo
            </option>

            <option value="Agotado">
              Agotado
            </option>
          </select>
        </div>

        {/* Restablecer filtros */}

        <button
          type="button"
          onClick={restablecerFiltros}
          disabled={!hayFiltrosActivos}
          className={`inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-[#B9C9DE] bg-white px-4 text-sm font-semibold text-[#526580] transition hover:bg-[#F5F9FF] disabled:cursor-not-allowed disabled:opacity-50 ${FOCO}`}
        >
          <RotateCcw size={17} aria-hidden="true" />
          Restablecer
        </button>
      </div>

      {/* Resultados */}

      <div
        aria-live="polite"
        className="mt-4 border-t border-[#E5EDF8] pt-3 text-xs text-[#64748B]"
      >
        {cargando ? (
          "Consultando medicamentos..."
        ) : inventarioConsultado ? (
          <>
            Mostrando{" "}
            <span className="font-bold text-[#0755D8]">
              {totalResultados}
            </span>{" "}
            de {totalMedicamentos} medicamentos.
          </>
        ) : (
          "Inventario pendiente de consulta."
        )}
      </div>
    </section>
  );
}