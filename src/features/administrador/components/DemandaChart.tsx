"use client";

import { useState } from "react";
import { ChartNoAxesCombined } from "lucide-react";

import type {
  DemandaMedicamentos,
  SedeFarmacia,
} from "../types";

// =========================================================
// TIPOS
// =========================================================

type DemandaChartProps = {
  demanda: DemandaMedicamentos[];
  sedes: SedeFarmacia[];
};

// =========================================================
// CONFIGURACIÓN DE LA GRÁFICA
// =========================================================

const COLORES = [
  "#0755D8",
  "#14B8A6",
  "#8B5CF6",
  "#F59E0B",
  "#EC4899",
  "#64748B",
  "#06B6D4",
  "#84CC16",
];

const ANCHO = 520;
const ALTO = 220;

const MARGEN = {
  superior: 20,
  inferior: 35,
  izquierdo: 42,
  derecho: 20,
};

const ANCHO_GRAFICA =
  ANCHO - MARGEN.izquierdo - MARGEN.derecho;

const ALTO_GRAFICA =
  ALTO - MARGEN.superior - MARGEN.inferior;

// =========================================================
// GRÁFICA DE DEMANDA
// =========================================================

export default function DemandaChart({
  demanda,
  sedes,
}: DemandaChartProps) {
  const [sedeSeleccionada, setSedeSeleccionada] =
    useState("todas");

  const [periodo, setPeriodo] = useState("7");

  // =======================================================
  // OBTENER FECHAS DISPONIBLES
  // =======================================================

  const fechasDisponibles = [
    ...new Set(demanda.map((registro) => registro.fecha)),
  ].sort();

  const fechas = fechasDisponibles.slice(
    -Number(periodo)
  );

  // =======================================================
  // FILTRAR REGISTROS
  // =======================================================

  const datosFiltrados = demanda.filter(
    (registro) =>
      fechas.includes(registro.fecha) &&
      (
        sedeSeleccionada === "todas" ||
        registro.sedeId === Number(sedeSeleccionada)
      )
  );

  const sedesConDatos = sedes.filter((sede) =>
    demanda.some(
      (registro) => registro.sedeId === sede.id
    )
  );

  const sedesVisibles = sedesConDatos.filter(
    (sede) =>
      sedeSeleccionada === "todas" ||
      sede.id === Number(sedeSeleccionada)
  );

  // =======================================================
  // CALCULAR ESCALA
  // =======================================================

  const maximo = Math.max(
    20,
    ...datosFiltrados.map(
      (registro) => registro.cantidadSolicitudes
    )
  );

  const maximoEscala =
    Math.ceil(maximo / 20) * 20;

  const divisiones = Array.from(
    { length: 6 },
    (_, indice) => (maximoEscala / 5) * indice
  );

  function obtenerX(indice: number) {
    if (fechas.length <= 1) {
      return MARGEN.izquierdo + ANCHO_GRAFICA / 2;
    }

    return (
      MARGEN.izquierdo +
      (indice / (fechas.length - 1)) *
        ANCHO_GRAFICA
    );
  }

  function obtenerY(valor: number) {
    return (
      MARGEN.superior +
      ALTO_GRAFICA -
      (valor / maximoEscala) * ALTO_GRAFICA
    );
  }

  function obtenerColor(sedeId: number) {
    const indice = sedesConDatos.findIndex(
      (sede) => sede.id === sedeId
    );

    return COLORES[
      Math.max(0, indice) % COLORES.length
    ];
  }

  function formatearFecha(fecha: string) {
    return new Intl.DateTimeFormat("es-CO", {
      day: "numeric",
      month: "short",
      timeZone: "UTC",
    }).format(new Date(`${fecha}T00:00:00Z`));
  }

  const totalSolicitudes = datosFiltrados.reduce(
    (total, registro) =>
      total + registro.cantidadSolicitudes,
    0
  );

  return (
    <section className="min-w-0 rounded-[20px] border border-[#E3EBF5] bg-white p-4 shadow-[0_4px_16px_rgba(15,42,117,0.04)] sm:p-5">

      {/* ENCABEZADO */}

      <div className="flex items-center gap-3">

        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#E8F1FF] text-[#0755D8]">
          <ChartNoAxesCombined
            size={22}
            aria-hidden="true"
          />
        </div>

        <div>
          <h2 className="text-base font-bold text-[#14285B]">
            Demanda de medicamentos
          </h2>

          <p className="mt-0.5 text-xs text-[#64748B]">
            Solicitudes registradas por sede
          </p>
        </div>

      </div>

      {/* FILTROS */}

      <div className="mt-4 flex flex-wrap gap-2">

        <select
          aria-label="Filtrar demanda por periodo"
          value={periodo}
          onChange={(event) =>
            setPeriodo(event.target.value)
          }
          className="min-w-0 flex-1 cursor-pointer rounded-lg border border-[#E3EBF5] bg-[#F8FAFD] px-3 py-2 text-xs font-medium text-[#526582] outline-none focus:border-[#0755D8]"
        >
          <option value="7">
            Últimos 7 días registrados
          </option>

          <option value="5">
            Últimos 5 días registrados
          </option>

          <option value="3">
            Últimos 3 días registrados
          </option>
        </select>

        <select
          aria-label="Filtrar demanda por sede"
          value={sedeSeleccionada}
          onChange={(event) =>
            setSedeSeleccionada(event.target.value)
          }
          className="min-w-0 flex-1 cursor-pointer rounded-lg border border-[#E3EBF5] bg-[#F8FAFD] px-3 py-2 text-xs font-medium text-[#526582] outline-none focus:border-[#0755D8]"
        >
          <option value="todas">
            Todas las sedes
          </option>

          {sedes.map((sede) => (
            <option
              key={sede.id}
              value={sede.id}
            >
              {sede.nombre}
            </option>
          ))}
        </select>

      </div>

      {/* TOTAL DE SOLICITUDES */}

      <div className="mt-4">

        <p className="text-xs font-medium text-[#64748B]">
          Total de solicitudes
        </p>

        <p className="mt-1 text-2xl font-extrabold text-[#14285B]">
          {new Intl.NumberFormat("es-CO").format(
            totalSolicitudes
          )}
        </p>

      </div>

      {/* GRÁFICA */}

      {datosFiltrados.length > 0 ? (
        <>

          <div className="mt-2 w-full">

            <svg
              viewBox={`0 0 ${ANCHO} ${ALTO}`}
              role="img"
              aria-label={`Gráfica de demanda por sede. Total: ${totalSolicitudes} solicitudes.`}
              className="h-auto w-full overflow-visible"
            >

              {/* LÍNEAS HORIZONTALES */}

              {divisiones.map((valor) => (
                <g key={valor}>

                  <line
                    x1={MARGEN.izquierdo}
                    y1={obtenerY(valor)}
                    x2={ANCHO - MARGEN.derecho}
                    y2={obtenerY(valor)}
                    stroke="#E3EBF5"
                    strokeDasharray="4 4"
                  />

                  <text
                    x={MARGEN.izquierdo - 10}
                    y={obtenerY(valor) + 4}
                    textAnchor="end"
                    fontSize="11"
                    fill="#64748B"
                  >
                    {valor}
                  </text>

                </g>
              ))}

              {/* FECHAS DEL EJE HORIZONTAL */}

              {fechas.map((fecha, indice) => (
                <text
                  key={fecha}
                  x={obtenerX(indice)}
                  y={ALTO - 12}
                  textAnchor="middle"
                  fontSize="10"
                  fill="#64748B"
                >
                  {formatearFecha(fecha)}
                </text>
              ))}

              {/* LÍNEAS DE CADA SEDE */}

              {sedesVisibles.map((sede) => {
                const puntos = fechas.map(
                  (fecha, indice) => {
                    const registro =
                      datosFiltrados.find(
                        (dato) =>
                          dato.fecha === fecha &&
                          dato.sedeId === sede.id
                      );

                    return {
                      fecha,
                      x: obtenerX(indice),
                      valor:
                        registro?.cantidadSolicitudes ??
                        null,
                    };
                  }
                );

                const segmentos: string[] = [];
                let segmento = "";

                puntos.forEach((punto) => {
                  if (punto.valor === null) {
                    if (segmento) {
                      segmentos.push(segmento);
                    }

                    segmento = "";
                    return;
                  }

                  const comando = segmento
                    ? "L"
                    : "M";

                  segmento += `${comando} ${punto.x} ${obtenerY(punto.valor)} `;
                });

                if (segmento) {
                  segmentos.push(segmento);
                }

                const color = obtenerColor(sede.id);

                return (
                  <g key={sede.id}>

                    {segmentos.map((ruta, indice) => (
                      <path
                        key={indice}
                        d={ruta}
                        fill="none"
                        stroke={color}
                        strokeWidth="2.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    ))}

                    {/* PUNTOS DE LA GRÁFICA */}

                    {puntos.map((punto) =>
                      punto.valor !== null ? (
                        <circle
                          key={punto.fecha}
                          cx={punto.x}
                          cy={obtenerY(punto.valor)}
                          r="4"
                          fill="white"
                          stroke={color}
                          strokeWidth="2.5"
                        >
                          <title>
                            {`${sede.nombre}: ${punto.valor} solicitudes - ${formatearFecha(punto.fecha)}`}
                          </title>
                        </circle>
                      ) : null
                    )}

                  </g>
                );
              })}

            </svg>

          </div>

          {/* LEYENDA */}

          <div className="mt-2 flex flex-wrap justify-center gap-x-4 gap-y-2">

            {sedesVisibles.map((sede) => (
              <div
                key={sede.id}
                className="flex items-center gap-1.5"
              >

                <span
                  aria-hidden="true"
                  className="h-2.5 w-2.5 rounded-full"
                  style={{
                    backgroundColor:
                      obtenerColor(sede.id),
                  }}
                />

                <span className="text-[11px] font-medium text-[#526582]">
                  {sede.nombre}
                </span>

              </div>
            ))}

          </div>

        </>
      ) : (

        /* SIN DATOS */

        <div className="flex min-h-[220px] flex-col items-center justify-center text-center">

          <ChartNoAxesCombined
            size={36}
            aria-hidden="true"
            className="text-[#94A3B8]"
          />

          <p className="mt-3 text-sm font-semibold text-[#14285B]">
            No hay datos disponibles
          </p>

          <p className="mt-1 text-xs text-[#64748B]">
            No existen solicitudes para los filtros seleccionados.
          </p>

        </div>

      )}

    </section>
  );
}