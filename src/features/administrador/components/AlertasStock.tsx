"use client";

import { useState } from "react";

import {
  TriangleAlert,
  PackageX,
  PackageMinus,
  MapPin,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
} from "lucide-react";

import type {
  AlertaStock,
  SedeFarmacia,
} from "../types";

// =========================================================
// TIPOS
// =========================================================

type AlertasStockProps = {
  alertas: AlertaStock[];
  sedes: SedeFarmacia[];
};

type FiltroAlerta = "TODAS" | "CRITICO" | "BAJO";

// =========================================================
// ALERTAS DE DESABASTECIMIENTO
// =========================================================

export default function AlertasStock({
  alertas,
  sedes,
}: AlertasStockProps) {
  const [filtro, setFiltro] =
    useState<FiltroAlerta>("TODAS");

  const [mostrarTodas, setMostrarTodas] =
    useState(false);

  // =======================================================
  // OBTENER NOMBRE DE LA SEDE
  // =======================================================

  function obtenerSede(sedeId: number) {
    return (
      sedes.find((sede) => sede.id === sedeId)?.nombre ??
      "Sede no identificada"
    );
  }

  // =======================================================
  // CLASIFICAR ALERTAS
  // =======================================================

  const alertasCriticas = alertas.filter(
    (alerta) => alerta.nivel === "CRITICO"
  ).length;

  const alertasBajas = alertas.filter(
    (alerta) => alerta.nivel === "BAJO"
  ).length;

  const alertasFiltradas = alertas
    .filter(
      (alerta) =>
        filtro === "TODAS" || alerta.nivel === filtro
    )
    .sort(
      (a, b) =>
        a.unidadesDisponibles - b.unidadesDisponibles
    );

  const alertasVisibles = mostrarTodas
    ? alertasFiltradas
    : alertasFiltradas.slice(0, 2);

  const filtros: {
    valor: FiltroAlerta;
    etiqueta: string;
    cantidad: number;
  }[] = [
    {
      valor: "TODAS",
      etiqueta: "Todas",
      cantidad: alertas.length,
    },
    {
      valor: "CRITICO",
      etiqueta: "Agotados",
      cantidad: alertasCriticas,
    },
    {
      valor: "BAJO",
      etiqueta: "Stock bajo",
      cantidad: alertasBajas,
    },
  ];

  return (
    <section className="min-w-0 rounded-[20px] border border-[#E3EBF5] bg-white p-4 shadow-[0_4px_16px_rgba(15,42,117,0.04)] sm:p-5">

      {/* ENCABEZADO */}

      <div className="flex items-center justify-between gap-3">

        <div className="flex items-center gap-3">

          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#FFF4E0] text-[#D97706]">

            <TriangleAlert
              size={22}
              aria-hidden="true"
            />

          </div>

          <div>

            <h2 className="text-base font-bold text-[#14285B]">
              Alertas de desabastecimiento
            </h2>

            <p className="mt-0.5 text-xs text-[#64748B]">
              Disponibilidad de medicamentos por sede
            </p>

          </div>

        </div>

        <span className="shrink-0 rounded-full bg-[#FFF4E0] px-2.5 py-1 text-xs font-bold text-[#B45309]">
          {alertas.length} alertas
        </span>

      </div>

      {/* FILTROS */}

      <div
        aria-label="Filtrar alertas de stock"
        className="mt-4 flex flex-wrap gap-2"
      >

        {filtros.map((opcion) => (
          <button
            key={opcion.valor}
            type="button"
            aria-pressed={filtro === opcion.valor}
            onClick={() => {
              setFiltro(opcion.valor);
              setMostrarTodas(false);
            }}
            className={`cursor-pointer rounded-lg border px-3 py-2 text-xs font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0755D8] ${
              filtro === opcion.valor
                ? "border-[#0755D8] bg-[#E8F1FF] text-[#0755D8]"
                : "border-[#E3EBF5] bg-[#F8FAFD] text-[#526582] hover:bg-[#E8F1FF]"
            }`}
          >
            {opcion.etiqueta} ({opcion.cantidad})
          </button>
        ))}

      </div>

      {/* LISTADO DE ALERTAS */}

      <div className="mt-4 space-y-3">

        {alertasVisibles.map((alerta) => {
          const critica = alerta.nivel === "CRITICO";

          const Icon = critica
            ? PackageX
            : PackageMinus;

          return (
            <article
              key={alerta.id}
              className={`rounded-xl border p-3 transition-colors ${
                critica
                  ? "border-[#FECACA] bg-[#FFF5F5]"
                  : "border-[#FDE68A] bg-[#FFFBEB]"
              }`}
            >

              <div className="flex items-center gap-3">

                {/* ICONO DE ALERTA */}

                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                    critica
                      ? "bg-[#FEE2E2] text-[#DC2626]"
                      : "bg-[#FEF3C7] text-[#B45309]"
                  }`}
                >
                  <Icon
                    size={21}
                    aria-hidden="true"
                  />
                </div>

                {/* INFORMACIÓN DEL MEDICAMENTO */}

                <div className="min-w-0 flex-1">

                  <h3 className="text-sm font-bold text-[#14285B]">
                    {alerta.medicamento}
                  </h3>

                  <div className="mt-1 flex items-center gap-1 text-xs text-[#64748B]">

                    <MapPin
                      size={13}
                      aria-hidden="true"
                    />

                    {obtenerSede(alerta.sedeId)}

                  </div>

                </div>

                {/* ESTADO DEL STOCK */}

                <div className="shrink-0 text-right">

                  <span
                    className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-bold ${
                      critica
                        ? "bg-[#FEE2E2] text-[#B91C1C]"
                        : "bg-[#FEF3C7] text-[#92400E]"
                    }`}
                  >
                    {critica
                      ? "Agotado"
                      : "Stock bajo"}
                  </span>

                  <p
                    className={`mt-1 text-xs font-semibold ${
                      critica
                        ? "text-[#B91C1C]"
                        : "text-[#92400E]"
                    }`}
                  >
                    {alerta.unidadesDisponibles}{" "}
                    {alerta.unidadesDisponibles === 1
                      ? "unidad"
                      : "unidades"}
                  </p>

                </div>

              </div>

            </article>
          );
        })}

        {/* SIN ALERTAS */}

        {alertasVisibles.length === 0 && (
          <div className="flex min-h-[150px] flex-col items-center justify-center rounded-xl bg-[#F8FAFD] p-4 text-center">

            <CheckCircle2
              size={32}
              aria-hidden="true"
              className="text-[#059669]"
            />

            <p className="mt-3 text-sm font-semibold text-[#14285B]">
              No hay alertas para este filtro
            </p>

            <p className="mt-1 text-xs text-[#64748B]">
              No se encontraron medicamentos en esta categoría.
            </p>

          </div>
        )}

      </div>

      {/* MOSTRAR MÁS ALERTAS */}

      {alertasFiltradas.length > 2 && (
        <button
          type="button"
          aria-expanded={mostrarTodas}
          onClick={() =>
            setMostrarTodas((anterior) => !anterior)
          }
          className="mt-4 flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-[#D6E6FF] bg-[#F0F6FF] px-3 py-2.5 text-xs font-semibold text-[#0755D8] transition-colors hover:bg-[#E8F1FF] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0755D8]"
        >

          {mostrarTodas ? (
            <>
              Mostrar menos alertas

              <ChevronUp
                size={16}
                aria-hidden="true"
              />
            </>
          ) : (
            <>
              Ver todas las alertas ({alertasFiltradas.length})

              <ChevronDown
                size={16}
                aria-hidden="true"
              />
            </>
          )}

        </button>
      )}

    </section>
  );
}