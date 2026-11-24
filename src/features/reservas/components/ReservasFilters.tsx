"use client";

import {
  Search,
  SlidersHorizontal,
  X,
  CalendarDays,
} from "lucide-react";

import type {
  FiltrosReservas,
  FiltroEstadoReserva,
  IndicadoresReservas,
} from "../types";

type ReservasFiltersProps = {
  filtros: FiltrosReservas;
  indicadores: IndicadoresReservas;
  onChange: (filtros: FiltrosReservas) => void;
};

export default function ReservasFilters({
  filtros,
  indicadores,
  onChange,
}: ReservasFiltersProps) {
  const opciones: {
    valor: FiltroEstadoReserva;
    etiqueta: string;
    cantidad: number;
  }[] = [
    {
      valor: "TODAS",
      etiqueta: "Todas",
      cantidad: indicadores.total,
    },
    {
      valor: "ACTIVA",
      etiqueta: "Activas",
      cantidad: indicadores.activas,
    },
    {
      valor: "COMPLETADA",
      etiqueta: "Completadas",
      cantidad: indicadores.completadas,
    },
    {
      valor: "CANCELADA",
      etiqueta: "Canceladas",
      cantidad: indicadores.canceladas,
    },
    {
      valor: "VENCIDA",
      etiqueta: "Vencidas",
      cantidad: indicadores.vencidas,
    },
  ];

  const hayFiltros =
    filtros.busqueda !== "" ||
    filtros.estado !== "TODAS";

  function limpiarFiltros() {
    onChange({
      busqueda: "",
      estado: "TODAS",
    });
  }

  return (
    <section
      aria-label="Búsqueda y filtros de reservas"
      className="rounded-[20px] border border-[#E0E8F3] bg-white p-4 shadow-[0_4px_15px_rgba(15,42,117,0.04)] sm:p-5"
    >
      {/* Encabezado y buscador */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

        {/* Título */}
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#E8F1FF] text-[#0755D8]">
            <CalendarDays
              size={22}
              aria-hidden="true"
            />
          </div>

          <div>
            <h2 className="text-lg font-bold text-[#14285B]">
              Mis reservas
            </h2>

            <p className="mt-0.5 text-xs text-[#64748B]">
              Consulta y encuentra tus reservas
            </p>
          </div>
        </div>

        {/* Buscador */}
        <div className="relative w-full lg:max-w-[340px]">
          <Search
            size={19}
            aria-hidden="true"
            className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#64748B]"
          />

          <input
            type="search"
            aria-label="Buscar por medicamento o código de reserva"
            value={filtros.busqueda}
            onChange={(event) =>
              onChange({
                ...filtros,
                busqueda: event.target.value,
              })
            }
            placeholder="Buscar medicamento o código..."
            className="h-11 w-full rounded-xl border border-[#DCE4EF] bg-[#F8FAFD] pl-11 pr-10 text-sm text-[#14285B] outline-none transition-all placeholder:text-[#64748B] focus:border-[#0755D8] focus:bg-white focus:ring-2 focus:ring-[#0755D8]/15 [&::-webkit-search-cancel-button]:appearance-none"
          />

          {filtros.busqueda && (
            <button
              type="button"
              onClick={() =>
                onChange({
                  ...filtros,
                  busqueda: "",
                })
              }
              aria-label="Limpiar búsqueda"
              className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer rounded-md p-1 text-[#64748B] transition-colors hover:bg-[#E8F1FF] hover:text-[#0755D8]"
            >
              <X size={17} aria-hidden="true" />
            </button>
          )}
        </div>
      </div>

      {/* Separador */}
      <div className="my-4 border-t border-[#E8EDF5]" />

      {/* Filtros por estado */}
      <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">

        <div className="flex flex-wrap items-center gap-2">

          <div className="mr-1 flex items-center gap-2 text-xs font-semibold text-[#64748B]">
            <SlidersHorizontal
              size={17}
              aria-hidden="true"
            />

            <span>Estado:</span>
          </div>

          {opciones.map((opcion) => {
            const seleccionado =
              filtros.estado === opcion.valor;

            return (
              <button
                key={opcion.valor}
                type="button"
                aria-pressed={seleccionado}
                onClick={() =>
                  onChange({
                    ...filtros,
                    estado: opcion.valor,
                  })
                }
                className={`inline-flex cursor-pointer items-center gap-2 rounded-xl border px-3 py-2 text-xs font-semibold transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0755D8] ${
                  seleccionado
                    ? "border-[#0755D8] bg-[#0755D8] text-white shadow-sm"
                    : "border-[#DCE4EF] bg-white text-[#475569] hover:border-[#A9C8F5] hover:bg-[#F0F6FF] hover:text-[#0755D8]"
                }`}
              >
                {opcion.etiqueta}

                <span
                  className={`flex min-w-5 items-center justify-center rounded-md px-1.5 py-0.5 text-[11px] ${
                    seleccionado
                      ? "bg-white/20 text-white"
                      : "bg-[#EDF2F8] text-[#475569]"
                  }`}
                >
                  {opcion.cantidad}
                </span>
              </button>
            );
          })}
        </div>

        {/* Limpiar todos los filtros */}
        {hayFiltros && (
          <button
            type="button"
            onClick={limpiarFiltros}
            className="inline-flex w-fit shrink-0 cursor-pointer items-center gap-1.5 rounded-lg px-2 py-2 text-xs font-semibold text-[#0755D8] transition-colors hover:bg-[#E8F1FF]"
          >
            <X size={15} aria-hidden="true" />

            Limpiar filtros
          </button>
        )}
      </div>
    </section>
  );
}