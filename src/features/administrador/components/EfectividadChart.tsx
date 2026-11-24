import {
  CalendarCheck,
  CheckCircle2,
  CircleX,
  ChartPie,
} from "lucide-react";

import type { EfectividadReservas } from "../types";

// =========================================================
// TIPOS
// =========================================================

type EfectividadChartProps = {
  efectividad: EfectividadReservas;
};

// =========================================================
// CONFIGURACIÓN DE LA GRÁFICA
// =========================================================

const RADIO = 70;
const CIRCUNFERENCIA = 2 * Math.PI * RADIO;

// =========================================================
// GRÁFICA DE EFECTIVIDAD DE RESERVAS
// =========================================================

export default function EfectividadChart({
  efectividad,
}: EfectividadChartProps) {
  const {
    totalReservas,
    reservasEntregadas,
    reservasNoEfectuadas,
  } = efectividad;

  // =======================================================
  // CALCULAR PORCENTAJES
  // =======================================================

  const porcentajeEntregadas =
    totalReservas > 0
      ? (reservasEntregadas / totalReservas) * 100
      : 0;

  const porcentajeNoEfectuadas =
    totalReservas > 0
      ? (reservasNoEfectuadas / totalReservas) * 100
      : 0;

  const longitudEntregadas =
    (porcentajeEntregadas / 100) * CIRCUNFERENCIA;

  const longitudNoEfectuadas =
    (porcentajeNoEfectuadas / 100) * CIRCUNFERENCIA;

  const formatoNumero = new Intl.NumberFormat("es-CO", {
    useGrouping: "always",
  });

  return (
    <section className="min-w-0 rounded-[20px] border border-[#E3EBF5] bg-white p-4 shadow-[0_4px_16px_rgba(15,42,117,0.04)] sm:p-5">

      {/* ENCABEZADO */}

      <div className="flex items-center gap-3">

        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#E8F1FF] text-[#0755D8]">

          <ChartPie
            size={22}
            aria-hidden="true"
          />

        </div>

        <div>

          <h2 className="text-base font-bold text-[#14285B]">
            Efectividad de reservas
          </h2>

          <p className="mt-0.5 text-xs text-[#64748B]">
            Seguimiento de entregas de medicamentos
          </p>

        </div>

      </div>

      {/* CONTENIDO PRINCIPAL */}

      {totalReservas > 0 ? (

        <div className="mt-5 flex flex-col items-center gap-5 sm:flex-row">

          {/* GRÁFICA CIRCULAR */}

          <div className="relative mx-auto w-[180px] shrink-0">

            <svg
              viewBox="0 0 180 180"
              role="img"
              aria-label={`Efectividad de reservas: ${Math.round(porcentajeEntregadas)} por ciento entregadas`}
              className="h-auto w-full"
            >

              {/* CÍRCULO DE FONDO */}

              <circle
                cx="90"
                cy="90"
                r={RADIO}
                fill="none"
                stroke="#EDF2F8"
                strokeWidth="17"
              />

              {/* RESERVAS NO EFECTUADAS */}

              <circle
                cx="90"
                cy="90"
                r={RADIO}
                fill="none"
                stroke="#F59E0B"
                strokeWidth="17"
                strokeDasharray={`${longitudNoEfectuadas} ${CIRCUNFERENCIA}`}
                strokeDashoffset={-longitudEntregadas}
                transform="rotate(-90 90 90)"
              />

              {/* RESERVAS ENTREGADAS */}

              <circle
                cx="90"
                cy="90"
                r={RADIO}
                fill="none"
                stroke="#0755D8"
                strokeWidth="17"
                strokeDasharray={`${longitudEntregadas} ${CIRCUNFERENCIA}`}
                transform="rotate(-90 90 90)"
              />

            </svg>

            {/* PORCENTAJE CENTRAL */}

            <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">

              <span className="text-[34px] font-extrabold leading-none tracking-tight text-[#14285B]">
                {Math.round(porcentajeEntregadas)}%
              </span>

              <span className="mt-1.5 text-xs font-medium text-[#64748B]">
                Efectividad
              </span>

            </div>

          </div>

          {/* ESTADÍSTICAS */}

          <div className="w-full min-w-0 flex-1 space-y-3">

            {/* RESERVAS ENTREGADAS */}

            <div className="flex items-center gap-3 rounded-xl border border-[#D6E6FF] bg-[#F0F6FF] p-3">

              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#E0ECFF] text-[#0755D8]">

                <CheckCircle2
                  size={19}
                  aria-hidden="true"
                />

              </div>

              <div className="min-w-0 flex-1">

                <p className="text-xs font-medium text-[#526582]">
                  Reservas entregadas
                </p>

                <p className="mt-1 text-lg font-extrabold leading-none text-[#14285B]">
                  {formatoNumero.format(
                    reservasEntregadas
                  )}
                </p>

              </div>

              <span className="text-xs font-bold text-[#0755D8]">
                {Math.round(porcentajeEntregadas)}%
              </span>

            </div>

            {/* RESERVAS NO EFECTUADAS */}

            <div className="flex items-center gap-3 rounded-xl border border-[#FDE68A] bg-[#FFFBEB] p-3">

              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#FEF3C7] text-[#B45309]">

                <CircleX
                  size={19}
                  aria-hidden="true"
                />

              </div>

              <div className="min-w-0 flex-1">

                <p className="text-xs font-medium text-[#526582]">
                  Reservas no efectuadas
                </p>

                <p className="mt-1 text-lg font-extrabold leading-none text-[#14285B]">
                  {formatoNumero.format(
                    reservasNoEfectuadas
                  )}
                </p>

              </div>

              <span className="text-xs font-bold text-[#B45309]">
                {Math.round(porcentajeNoEfectuadas)}%
              </span>

            </div>

            {/* TOTAL DE RESERVAS */}

            <div className="flex items-center justify-between gap-2 border-t border-[#E3EBF5] pt-3">

              <div className="flex items-center gap-2">

                <CalendarCheck
                  size={17}
                  aria-hidden="true"
                  className="text-[#64748B]"
                />

                <span className="text-xs font-medium text-[#64748B]">
                  Total de reservas
                </span>

              </div>

              <span className="text-sm font-extrabold text-[#14285B]">
                {formatoNumero.format(totalReservas)}
              </span>

            </div>

          </div>

        </div>

      ) : (

        /* SIN DATOS */

        <div className="flex min-h-[220px] flex-col items-center justify-center text-center">

          <ChartPie
            size={36}
            aria-hidden="true"
            className="text-[#94A3B8]"
          />

          <p className="mt-3 text-sm font-semibold text-[#14285B]">
            No hay reservas registradas
          </p>

          <p className="mt-1 text-xs text-[#64748B]">
            Los indicadores aparecerán cuando existan reservas.
          </p>

        </div>

      )}

    </section>
  );
}