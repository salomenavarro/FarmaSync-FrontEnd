"use client";

import Link from "next/link";

import {
  Heart,
  Search,
  SearchX,
  ArrowRight,
  RotateCcw,
} from "lucide-react";

// =========================================================
// TIPOS
// =========================================================

interface MisMedicamentosEmptyStateProps {
  hayFiltros: boolean;
  onLimpiarFiltros: () => void;
}

// =========================================================
// ESTADOS VACÍOS
// =========================================================

export default function MisMedicamentosEmptyState({
  hayFiltros,
  onLimpiarFiltros,
}: MisMedicamentosEmptyStateProps) {

  const Icon = hayFiltros ? SearchX : Heart;

  return (
    <section
      className="
        flex min-h-[280px] flex-col
        items-center justify-center
        rounded-[20px]
        border border-[#E0E8F3]
        bg-white px-5 py-8
        text-center
        shadow-[0_4px_15px_rgba(20,40,91,0.04)]
      "
    >
      {/* ICONO PRINCIPAL */}

      <div className="relative mb-4">
        <div
          className="
            flex h-20 w-20
            items-center justify-center
            rounded-full bg-[#E8F1FF]
            text-[#0755D8]
          "
        >
          <Icon
            size={36}
            strokeWidth={1.7}
            aria-hidden="true"
          />
        </div>

        <span
          aria-hidden="true"
          className="
            absolute -right-1 -top-1
            h-4 w-4 rounded-full
            bg-[#0876E9]/20
          "
        />

        <span
          aria-hidden="true"
          className="
            absolute -bottom-1 -left-2
            h-3 w-3 rounded-full
            bg-[#0876E9]/15
          "
        />
      </div>

      {/* TÍTULO */}

      <h2 className="text-xl font-extrabold text-[#14285B]">
        {hayFiltros
          ? "No encontramos medicamentos"
          : "Aún no tienes medicamentos guardados"}
      </h2>

      {/* DESCRIPCIÓN */}

      <p className="mt-2 max-w-md text-sm leading-relaxed text-[#64748B]">
        {hayFiltros
          ? "No hay medicamentos guardados que coincidan con tu búsqueda o los filtros seleccionados. Intenta con otros criterios."
          : "Guarda tus medicamentos favoritos desde el catálogo para consultar fácilmente su disponibilidad y acceder a ellos cuando los necesites."}
      </p>

      {/* ACCIONES */}

      <div className="mt-5">
        {hayFiltros ? (
          <button
            type="button"
            onClick={onLimpiarFiltros}
            className="
              inline-flex min-h-11
              items-center justify-center gap-2
              rounded-xl border border-[#D6E5FF]
              bg-[#E8F1FF] px-5 py-3
              text-sm font-bold text-[#0755D8]
              transition-colors
              hover:bg-[#D6E5FF]
              focus-visible:outline
              focus-visible:outline-2
              focus-visible:outline-offset-2
              focus-visible:outline-[#0755D8]
            "
          >
            <RotateCcw size={17} aria-hidden="true" />

            Limpiar filtros
          </button>
        ) : (
          <Link
            href="/medicamentos"
            className="
              group inline-flex min-h-11
              items-center justify-center gap-2
              rounded-xl bg-[#0755D8]
              px-5 py-3
              text-sm font-bold text-white
              transition-colors
              hover:bg-[#0648B8]
              focus-visible:outline
              focus-visible:outline-2
              focus-visible:outline-offset-2
              focus-visible:outline-[#0755D8]
            "
          >
            <Search size={18} aria-hidden="true" />

            Buscar medicamentos

            <ArrowRight
              size={17}
              aria-hidden="true"
              className="
                transition-transform
                group-hover:translate-x-1
              "
            />
          </Link>
        )}
      </div>
    </section>
  );
}