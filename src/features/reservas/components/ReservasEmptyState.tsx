"use client";

import Link from "next/link";

import {
  CalendarDays,
  SearchX,
  Search,
  ArrowRight,
  RotateCcw,
} from "lucide-react";

type ReservasEmptyStateProps = {
  hayFiltros: boolean;
  esHistorial?: boolean;
  onLimpiarFiltros: () => void;
};

export default function ReservasEmptyState({
  hayFiltros,
  esHistorial = false,
  onLimpiarFiltros,
}: ReservasEmptyStateProps) {
  const Icono = hayFiltros ? SearchX : CalendarDays;

  const titulo = hayFiltros
    ? "No encontramos reservas"
    : esHistorial
      ? "Aún no tienes historial de reservas"
      : "Aún no tienes reservas";

  const descripcion = hayFiltros
    ? "No encontramos reservas que coincidan con tu búsqueda. Intenta utilizar otro nombre, código o estado."
    : esHistorial
      ? "Aquí podrás consultar tus reservas completadas, canceladas y vencidas."
      : "Encuentra los medicamentos que necesitas, consulta su disponibilidad y realiza tu primera reserva en FarmaSync.";

  return (
    <section
      aria-label="Estado de las reservas"
      className="relative isolate overflow-hidden rounded-[24px] border border-[#E0E8F3] bg-white px-5 py-10 text-center shadow-[0_4px_15px_rgba(15,42,117,0.04)] sm:py-12"
    >
      {/* DECORACIONES DE FONDO */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 -top-24 -z-10 h-64 w-64 rounded-full bg-[#E8F1FF]/60 blur-3xl"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 -left-20 -z-10 h-64 w-64 rounded-full bg-[#DCEBFF]/50 blur-3xl"
      />

      <div className="mx-auto flex max-w-md flex-col items-center">

        {/* ICONO PRINCIPAL */}
        <div className="relative mb-5">

          <div
            aria-hidden="true"
            className="absolute inset-0 scale-125 rounded-full bg-[#E8F1FF]/60"
          />

          <div className="relative flex h-20 w-20 items-center justify-center rounded-[26px] border border-[#D6E5FF] bg-gradient-to-br from-[#F5F9FF] to-[#E8F1FF] text-[#0755D8] shadow-sm">

            <Icono
              size={38}
              strokeWidth={1.6}
              aria-hidden="true"
            />
          </div>
        </div>

        {/* TÍTULO */}
        <h2 className="text-xl font-extrabold tracking-tight text-[#14285B]">
          {titulo}
        </h2>

        {/* DESCRIPCIÓN */}
        <p className="mt-3 text-sm leading-relaxed text-[#64748B]">
          {descripcion}
        </p>

        {/* BOTONES DE ACCIÓN */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">

          {hayFiltros ? (
            <button
              type="button"
              onClick={onLimpiarFiltros}
              className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#0755D8] px-5 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#0646B3] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0755D8]"
            >
              <RotateCcw
                size={17}
                aria-hidden="true"
              />

              Limpiar filtros
            </button>
          ) : esHistorial ? (
            <Link
              href="/reservas"
              className="group inline-flex items-center justify-center gap-2 rounded-xl bg-[#0755D8] px-5 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#0646B3] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0755D8]"
            >
              <CalendarDays
                size={18}
                aria-hidden="true"
              />

              Ver mis reservas

              <ArrowRight
                size={17}
                aria-hidden="true"
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
          ) : (
            <Link
              href="/medicamentos"
              className="group inline-flex items-center justify-center gap-2 rounded-xl bg-[#0755D8] px-5 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#0646B3] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0755D8]"
            >
              <Search
                size={18}
                aria-hidden="true"
              />

              Buscar medicamentos

              <ArrowRight
                size={17}
                aria-hidden="true"
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}