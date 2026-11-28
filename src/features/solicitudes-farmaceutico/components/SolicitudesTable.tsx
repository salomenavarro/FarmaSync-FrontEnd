"use client";

import {
  ClipboardList,
  Eye,
  PackageOpen,
  SearchX,
  LoaderCircle,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import type {
  SolicitudFarmaceutico,
  NivelSla,
} from "../types";

interface FilaSolicitud {
  solicitud: SolicitudFarmaceutico;
  estado: "ACTIVA" | "COMPLETADA" | "CANCELADA" | "VENCIDA";
  nivelSla: NivelSla | null;
  tiempoEspera: string;
}

interface SolicitudesTableProps {
  filas: FilaSolicitud[];
  cargando: boolean;
  hayFiltrosActivos: boolean;
  seleccionarSolicitud: (id: number) => void;
  restablecerFiltros: () => void;
}

// =========================================================
// ESTILOS DE LOS ESTADOS
// =========================================================

const estilosEstado = {
  ACTIVA: {
    texto: "Pendiente",
    clase: "bg-[#FFF3DC] text-[#8A5A00]",
  },
  COMPLETADA: {
    texto: "Entregada",
    clase: "bg-[#E4F6EC] text-[#13693D]",
  },
  CANCELADA: {
    texto: "Cancelada",
    clase: "bg-[#FDE8E8] text-[#B42318]",
  },
  VENCIDA: {
    texto: "Vencida",
    clase: "bg-[#F1F5F9] text-[#475569]",
  },
};

// =========================================================
// ESTILOS DEL SEMÁFORO
// =========================================================

const estilosSla = {
  VERDE: {
    texto: "Verde",
    clase: "bg-[#DDF5E7] text-[#13693D]",
    punto: "bg-[#12A150]",
  },
  AMARILLO: {
    texto: "Amarillo",
    clase: "bg-[#FFF0C7] text-[#8A5A00]",
    punto: "bg-[#F5A524]",
  },
  ROJO: {
    texto: "Rojo",
    clase: "bg-[#FDE0E0] text-[#B42318]",
    punto: "bg-[#D92D20]",
  },
};

const estilosTh = `
  whitespace-nowrap px-4 py-3
  text-left text-xs font-semibold
  text-[#475569]
`;

const estilosTd = `
  px-4 py-3.5 align-middle
  text-sm text-[#14285B]
`;

// =========================================================
// COMPONENTE PRINCIPAL
// =========================================================

export default function SolicitudesTable({
  filas,
  cargando,
  hayFiltrosActivos,
  seleccionarSolicitud,
  restablecerFiltros,
}: SolicitudesTableProps) {
  return (
    <section
      aria-labelledby="titulo-tabla-solicitudes"
      aria-busy={cargando}
      className="
        min-w-0 overflow-hidden rounded-[22px]
        border border-[#DCE9F8] bg-white
        shadow-[0_3px_12px_rgba(20,40,91,0.04)]
      "
    >
      {/* ENCABEZADO */}

      <div
        className="
          flex flex-wrap items-center
          justify-between gap-3
          border-b border-[#E8EEF6] p-4 sm:p-5
        "
      >
        <div className="flex items-center gap-3">
          <div
            className="
              flex h-10 w-10 shrink-0
              items-center justify-center
              rounded-xl bg-[#E8F0FF]
              text-[#0755D8]
            "
          >
            <ClipboardList
              size={21}
              aria-hidden="true"
            />
          </div>

          <div>
            <h2
              id="titulo-tabla-solicitudes"
              className="text-sm font-semibold text-[#14285B]"
            >
              Listado de solicitudes
            </h2>

            <p className="mt-0.5 text-xs text-[#64748B]">
              Consulta y revisa las reservas registradas.
            </p>
          </div>
        </div>

        <span
          className="
            rounded-full bg-[#E8F0FF]
            px-3 py-1.5 text-xs font-semibold
            text-[#0755D8]
          "
        >
          {filas.length} solicitudes
        </span>
      </div>

      {/* ESTADO DE CARGA */}

      {cargando ? (
        <div
          role="status"
          className="
            flex min-h-[240px] flex-col
            items-center justify-center gap-3 p-6
          "
        >
          <LoaderCircle
            size={30}
            aria-hidden="true"
            className="
              animate-spin text-[#0755D8]
              motion-reduce:animate-none
            "
          />

          <p className="text-sm text-[#64748B]">
            Cargando solicitudes...
          </p>
        </div>
      ) : filas.length === 0 ? (

        /* ESTADO VACÍO */

        <div
          className="
            flex min-h-[240px] flex-col
            items-center justify-center p-6
            text-center
          "
        >
          <div
            className="
              mb-4 flex h-16 w-16 items-center
              justify-center rounded-2xl
              bg-[#E8F0FF] text-[#0755D8]
            "
          >
            {hayFiltrosActivos ? (
              <SearchX size={30} aria-hidden="true" />
            ) : (
              <PackageOpen size={30} aria-hidden="true" />
            )}
          </div>

          <h3 className="font-semibold text-[#14285B]">
            {hayFiltrosActivos
              ? "No se encontraron resultados"
              : "No hay solicitudes registradas"}
          </h3>

          <p
            className="
              mt-2 max-w-sm text-sm
              leading-relaxed text-[#64748B]
            "
          >
            {hayFiltrosActivos
              ? "Intenta modificar los filtros para encontrar la solicitud que buscas."
              : "Las solicitudes aparecerán aquí cuando estén disponibles."}
          </p>

          {hayFiltrosActivos && (
            <Button
              type="button"
              variant="outline"
              onClick={restablecerFiltros}
              className="
                mt-4 rounded-xl
                border-[#DCE4EF]
                text-[#0755D8]
                hover:bg-[#F0F6FF]
              "
            >
              Limpiar filtros
            </Button>
          )}
        </div>
      ) : (

        /* TABLA DE SOLICITUDES */

        <div
          role="region"
          aria-label="Tabla desplazable de solicitudes"
          tabIndex={0}
          className="
            w-full overflow-x-auto
            focus-visible:outline-none
            focus-visible:ring-2
            focus-visible:ring-inset
            focus-visible:ring-[#0755D8]
          "
        >
          <table
            className="
              w-full min-w-[1050px]
              border-collapse
            "
          >
            <caption className="sr-only">
              Solicitudes de medicamentos del farmacéutico
            </caption>

            <thead className="bg-[#F5F9FF]">
              <tr>
                <th scope="col" className={estilosTh}>
                  Código
                </th>

                <th scope="col" className={estilosTh}>
                  Paciente
                </th>

                <th scope="col" className={estilosTh}>
                  Medicamento
                </th>

                <th scope="col" className={estilosTh}>
                  Cantidad
                </th>

                <th scope="col" className={estilosTh}>
                  Tiempo de espera
                </th>

                <th scope="col" className={estilosTh}>
                  SLA
                </th>

                <th scope="col" className={estilosTh}>
                  Estado
                </th>

                <th scope="col" className={estilosTh}>
                  Acciones
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-[#E8EEF6]">
              {filas.map((fila) => {
                const {
                  solicitud,
                  estado,
                  nivelSla,
                  tiempoEspera,
                } = fila;

                const estiloEstado = estilosEstado[estado];

                const estiloSla = nivelSla
                  ? estilosSla[nivelSla]
                  : null;

                return (
                  <tr
                    key={solicitud.id}
                    className="
                      transition-colors
                      hover:bg-[#F8FBFF]
                    "
                  >
                    {/* CÓDIGO */}

                    <td className={estilosTd}>
                      <span
                        className="
                          whitespace-nowrap
                          font-semibold text-[#0755D8]
                        "
                      >
                        {solicitud.codigo}
                      </span>
                    </td>

                    {/* PACIENTE */}

                    <td className={estilosTd}>
                      <p className="font-medium">
                        {solicitud.beneficiario.nombreCompleto}
                      </p>

                      <p className="mt-1 text-xs text-[#64748B]">
                        {solicitud.beneficiario.tipo === "TITULAR"
                          ? "Titular"
                          : "Dependiente"}
                      </p>
                    </td>

                    {/* MEDICAMENTO */}

                    <td className={estilosTd}>
                      <p className="font-medium">
                        {solicitud.medicamento.nombre}{" "}
                        {solicitud.medicamento.concentracion}
                      </p>

                      <p className="mt-1 text-xs text-[#64748B]">
                        {solicitud.medicamento.presentacion}
                      </p>
                    </td>

                    {/* CANTIDAD */}

                    <td className={estilosTd}>
                      <span className="font-medium tabular-nums">
                        {solicitud.medicamento.cantidad}
                      </span>
                    </td>

                    {/* TIEMPO DE ESPERA */}

                    <td className={estilosTd}>
                      <span
                        className="
                          whitespace-nowrap
                          font-medium tabular-nums
                        "
                      >
                        {tiempoEspera}
                      </span>
                    </td>

                    {/* SEMÁFORO SLA */}

                    <td className={estilosTd}>
                      {estiloSla ? (
                        <span
                          className={`
                            inline-flex items-center gap-1.5
                            whitespace-nowrap rounded-full
                            px-2.5 py-1 text-xs font-medium
                            ${estiloSla.clase}
                          `}
                        >
                          <span
                            aria-hidden="true"
                            className={`
                              h-2 w-2 rounded-full
                              ${estiloSla.punto}
                            `}
                          />

                          {estiloSla.texto}
                        </span>
                      ) : (
                        <span className="text-[#64748B]">
                          —
                        </span>
                      )}
                    </td>

                    {/* ESTADO */}

                    <td className={estilosTd}>
                      <span
                        className={`
                          inline-flex whitespace-nowrap
                          rounded-full px-2.5 py-1
                          text-xs font-medium
                          ${estiloEstado.clase}
                        `}
                      >
                        {estiloEstado.texto}
                      </span>
                    </td>

                    {/* ACCIONES */}

                    <td className={estilosTd}>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() =>
                          seleccionarSolicitud(solicitud.id)
                        }
                        aria-label={`Ver detalle de ${solicitud.codigo}`}
                        className="
                          gap-1.5 whitespace-nowrap
                          rounded-lg border-[#CFE0FA]
                          px-3 py-2 text-xs
                          text-[#0755D8]
                          hover:bg-[#E8F0FF]
                        "
                      >
                        <Eye size={15} aria-hidden="true" />

                        Ver detalle
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* PIE DE TABLA */}

      {!cargando && filas.length > 0 && (
        <div
          className="
            flex flex-wrap items-center
            justify-between gap-2
            border-t border-[#E8EEF6]
            px-4 py-3 sm:px-5
          "
        >
          <p className="text-xs text-[#64748B]">
            Mostrando {filas.length} de las solicitudes filtradas.
          </p>

          <p className="text-xs text-[#64748B]">
            Solicitudes pendientes ordenadas por antigüedad.
          </p>
        </div>
      )}
    </section>
  );
}