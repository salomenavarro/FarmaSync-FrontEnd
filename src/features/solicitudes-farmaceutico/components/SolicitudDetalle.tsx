"use client";

import { useEffect, useRef } from "react";

import {
  X,
  ClipboardList,
  UserRound,
  Pill,
  CalendarDays,
  MapPin,
  FileText,
  Info,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import type { SolicitudFarmaceutico } from "../types";

import {
  normalizarEstadoSolicitud,
} from "../utils/solicitudes.utils";

interface SolicitudDetalleProps {
  solicitud: SolicitudFarmaceutico;
  cerrarDetalle: () => void;
}

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
// FORMATEAR FECHAS
// =========================================================

function formatearFecha(fecha?: string): string {
  if (!fecha) {
    return "No disponible";
  }

  const valor = new Date(fecha);

  if (Number.isNaN(valor.getTime())) {
    return "No disponible";
  }

  return new Intl.DateTimeFormat("es-CO", {
    timeZone: "America/Bogota",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(valor);
}

// =========================================================
// COMPONENTE PARA MOSTRAR INFORMACIÓN
// =========================================================

interface CampoDetalleProps {
  etiqueta: string;
  valor: string | number;
}

function CampoDetalle({
  etiqueta,
  valor,
}: CampoDetalleProps) {
  return (
    <div className="min-w-0">
      <dt className="text-xs font-medium text-[#64748B]">
        {etiqueta}
      </dt>

      <dd
        className="
          mt-1 break-words text-sm
          font-medium text-[#14285B]
        "
      >
        {valor}
      </dd>
    </div>
  );
}

// =========================================================
// COMPONENTE PRINCIPAL
// =========================================================

export default function SolicitudDetalle({
  solicitud,
  cerrarDetalle,
}: SolicitudDetalleProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const estado = normalizarEstadoSolicitud(
    solicitud.estado
  );

  const estiloEstado = estilosEstado[estado];

  // Abrir el diálogo y gestionar el foco.
  useEffect(() => {
    const dialogo = dialogRef.current;

    if (dialogo && !dialogo.open) {
      dialogo.showModal();
    }

    return () => {
      if (dialogo?.open) {
        dialogo.close();
      }
    };
  }, []);

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="titulo-detalle-solicitud"
      onCancel={(event) => {
        event.preventDefault();
        cerrarDetalle();
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          cerrarDetalle();
        }
      }}
      className="
        fixed inset-0 m-auto
        max-h-[90dvh] w-[calc(100%-24px)]
        max-w-[720px] overflow-hidden
        rounded-[24px] border-0 bg-white p-0
        text-[#14285B]
        shadow-[0_24px_80px_rgba(11,31,92,0.25)]
        backdrop:bg-[#0B1F5C]/45
        backdrop:backdrop-blur-sm
      "
    >
      <div className="flex max-h-[90dvh] flex-col">

        {/* ENCABEZADO */}

        <header
          className="
            flex shrink-0 items-start
            justify-between gap-3
            bg-gradient-to-r from-[#0B1F5C]
            via-[#0755D8] to-[#0876E9]
            p-5 text-white sm:p-6
          "
        >
          <div className="flex min-w-0 items-center gap-3">
            <div
              className="
                flex h-12 w-12 shrink-0
                items-center justify-center
                rounded-2xl border border-white/20
                bg-white/10
              "
            >
              <ClipboardList
                size={25}
                aria-hidden="true"
              />
            </div>

            <div className="min-w-0">
              <p className="text-xs text-blue-100">
                Gestión de solicitudes
              </p>

              <h2
                id="titulo-detalle-solicitud"
                className="mt-1 text-lg font-bold sm:text-xl"
              >
                Detalle de solicitud
              </h2>

              <p className="mt-1 break-words text-sm text-blue-50">
                {solicitud.codigo}
              </p>
            </div>
          </div>

          <Button
            type="button"
            variant="outline"
            onClick={cerrarDetalle}
            aria-label="Cerrar detalle"
            autoFocus
            className="
              h-9 w-9 shrink-0 rounded-xl
              border-white/20 bg-white/10 p-0
              text-white hover:bg-white/20
              focus-visible:ring-white
            "
          >
            <X size={20} aria-hidden="true" />
          </Button>
        </header>

        {/* CONTENIDO */}

        <div
          className="
            min-h-0 flex-1 space-y-4
            overflow-y-auto p-4 sm:p-6
          "
        >
          {/* ESTADO DE LA SOLICITUD */}

          <div
            className="
              flex flex-wrap items-center
              justify-between gap-3
              rounded-2xl border border-[#DCE9F8]
              bg-[#F5F9FF] p-4
            "
          >
            <div>
              <p className="text-xs text-[#64748B]">
                Código de reserva
              </p>

              <p className="mt-1 font-bold text-[#0755D8]">
                {solicitud.codigo}
              </p>
            </div>

            <span
              className={`
                rounded-full px-3 py-1.5
                text-xs font-semibold
                ${estiloEstado.clase}
              `}
            >
              {estiloEstado.texto}
            </span>
          </div>

          {/* INFORMACIÓN DEL PACIENTE */}

          <section
            className="
              rounded-2xl border border-[#DCE9F8]
              p-4
            "
          >
            <div className="mb-4 flex items-center gap-2">
              <UserRound
                size={20}
                className="text-[#0755D8]"
                aria-hidden="true"
              />

              <h3 className="text-sm font-semibold">
                Información del paciente
              </h3>
            </div>

            <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <CampoDetalle
                etiqueta="Nombre completo"
                valor={solicitud.beneficiario.nombreCompleto}
              />

              <CampoDetalle
                etiqueta="Tipo de beneficiario"
                valor={
                  solicitud.beneficiario.tipo === "TITULAR"
                    ? "Titular"
                    : "Dependiente"
                }
              />

              <CampoDetalle
                etiqueta="Número de documento"
                valor={
                  solicitud.beneficiario.numeroDocumento ||
                  "No disponible"
                }
              />
            </dl>
          </section>

          {/* INFORMACIÓN DEL MEDICAMENTO */}

          <section
            className="
              rounded-2xl border border-[#DCE9F8]
              p-4
            "
          >
            <div className="mb-4 flex items-center gap-2">
              <Pill
                size={20}
                className="text-[#0755D8]"
                aria-hidden="true"
              />

              <h3 className="text-sm font-semibold">
                Medicamento solicitado
              </h3>
            </div>

            <dl className="grid grid-cols-2 gap-4">
              <CampoDetalle
                etiqueta="Medicamento"
                valor={solicitud.medicamento.nombre}
              />

              <CampoDetalle
                etiqueta="Concentración"
                valor={
                  solicitud.medicamento.concentracion ||
                  "No disponible"
                }
              />

              <CampoDetalle
                etiqueta="Presentación"
                valor={
                  solicitud.medicamento.presentacion ||
                  "No disponible"
                }
              />

              <CampoDetalle
                etiqueta="Cantidad solicitada"
                valor={solicitud.medicamento.cantidad}
              />
            </dl>
          </section>

          {/* ORDEN MÉDICA */}

          <section
            className="
              rounded-2xl border border-[#DCE9F8]
              p-4
            "
          >
            <div className="mb-4 flex items-center gap-2">
              <FileText
                size={20}
                className="text-[#0755D8]"
                aria-hidden="true"
              />

              <h3 className="text-sm font-semibold">
                Orden médica
              </h3>
            </div>

            <dl>
              <CampoDetalle
                etiqueta="Número de orden médica"
                valor={
                  solicitud.numeroOrdenMedica ||
                  "No disponible"
                }
              />
            </dl>
          </section>

          {/* FECHAS DE LA RESERVA */}

          <section
            className="
              rounded-2xl border border-[#DCE9F8]
              p-4
            "
          >
            <div className="mb-4 flex items-center gap-2">
              <CalendarDays
                size={20}
                className="text-[#0755D8]"
                aria-hidden="true"
              />

              <h3 className="text-sm font-semibold">
                Fechas de la reserva
              </h3>
            </div>

            <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <CampoDetalle
                etiqueta="Fecha de solicitud"
                valor={formatearFecha(solicitud.fechaCreacion)}
              />

              <CampoDetalle
                etiqueta="Fecha de recogida"
                valor={formatearFecha(solicitud.fechaRetiro)}
              />

              <CampoDetalle
                etiqueta="Fecha de vencimiento"
                valor={formatearFecha(solicitud.fechaVencimiento)}
              />

              {solicitud.fechaEntrega && (
                <CampoDetalle
                  etiqueta="Fecha de entrega"
                  valor={formatearFecha(solicitud.fechaEntrega)}
                />
              )}

              {solicitud.fechaCancelacion && (
                <CampoDetalle
                  etiqueta="Fecha de cancelación"
                  valor={formatearFecha(
                    solicitud.fechaCancelacion
                  )}
                />
              )}
            </dl>
          </section>

          {/* INFORMACIÓN DE LA SEDE */}

          <section
            className="
              rounded-2xl border border-[#DCE9F8]
              p-4
            "
          >
            <div className="mb-4 flex items-center gap-2">
              <MapPin
                size={20}
                className="text-[#0755D8]"
                aria-hidden="true"
              />

              <h3 className="text-sm font-semibold">
                Sede de recogida
              </h3>
            </div>

            <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <CampoDetalle
                etiqueta="Nombre de la sede"
                valor={solicitud.sede.nombre}
              />

              <CampoDetalle
                etiqueta="Ciudad"
                valor={solicitud.sede.ciudad}
              />

              <CampoDetalle
                etiqueta="Dirección"
                valor={
                  solicitud.sede.direccion ||
                  "No disponible"
                }
              />
            </dl>
          </section>

          {/* AVISO DE INTEGRACIÓN PENDIENTE */}

          {estado === "ACTIVA" && (
            <div
              className="
                flex items-start gap-3
                rounded-2xl border border-[#D6E5FF]
                bg-[#F0F6FF] p-4
              "
            >
              <Info
                size={20}
                aria-hidden="true"
                className="shrink-0 text-[#0755D8]"
              />

              <div>
                <p className="text-sm font-semibold text-[#0755D8]">
                  Alistamiento de medicamentos
                </p>

                <p
                  className="
                    mt-1 text-xs leading-relaxed
                    text-[#475569]
                  "
                >
                  La operación de alistamiento estará
                  disponible cuando se complete la
                  integración con el backend.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* PIE DEL DIÁLOGO */}

        <footer
          className="
            flex shrink-0 justify-end
            border-t border-[#E8EEF6]
            bg-white p-4 sm:px-6
          "
        >
          <Button
            type="button"
            onClick={cerrarDetalle}
            className="
              w-full rounded-xl bg-[#0755D8]
              px-6 py-2.5 text-white
              hover:bg-[#0647B5] sm:w-auto
            "
          >
            Cerrar detalle
          </Button>
        </footer>
      </div>
    </dialog>
  );
}