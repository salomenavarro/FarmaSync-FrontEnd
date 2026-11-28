"use client";

import {
  UserRound,
  Pill,
  ClipboardList,
  ClipboardCheck,
  PackageCheck,
  CalendarDays,
  MapPin,
  AlertCircle,
  CheckCircle2,
  ShieldCheck,
  Info,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import type {
  ReservaEntrega,
  VerificacionesEntrega,
} from "../types";

import {
  esReservaEntregada,
  esReservaCancelada,
  esReservaVencida,
  formatearFechaEntrega,
} from "../utils/entregas.utils";

// =========================================================
// PROPIEDADES DEL COMPONENTE
// =========================================================

interface EntregaDetalleProps {
  reserva: ReservaEntrega;
  mensajeEstado: string;
  verificaciones: VerificacionesEntrega;
  verificacionesCompletas: boolean;
  permiteVerificacion: boolean;
  cantidadVerificaciones: number;
  actualizarVerificacion: (
    campo: keyof VerificacionesEntrega,
    valor: boolean
  ) => void;
}

// =========================================================
// CONFIGURACIÓN VISUAL DE LAS VERIFICACIONES
// =========================================================

const CAMPOS_VERIFICACION: {
  campo: keyof VerificacionesEntrega;
  titulo: string;
  descripcion: string;
}[] = [
  {
    campo: "pacienteVerificado",
    titulo: "Identidad del beneficiario",
    descripcion:
      "Se verificó la identidad de la persona beneficiaria.",
  },
  {
    campo: "ordenMedicaVerificada",
    titulo: "Orden médica",
    descripcion:
      "Se comprobó la fórmula médica correspondiente.",
  },
  {
    campo: "medicamentoVerificado",
    titulo: "Medicamento correcto",
    descripcion:
      "El medicamento coincide con la reserva.",
  },
  {
    campo: "cantidadVerificada",
    titulo: "Cantidad correcta",
    descripcion:
      "La cantidad coincide con la registrada en la reserva.",
  },
];

// =========================================================
// COMPONENTE AUXILIAR DE INFORMACIÓN
// =========================================================

function CampoInformacion({
  etiqueta,
  valor,
}: {
  etiqueta: string;
  valor: string | number;
}) {
  return (
    <div className="min-w-0">
      <p className="text-xs font-medium text-[#64748B]">
        {etiqueta}
      </p>

      <p className="mt-1 break-words text-sm font-semibold text-[#14285B]">
        {valor}
      </p>
    </div>
  );
}

// =========================================================
// COMPONENTE PRINCIPAL
// =========================================================

export default function EntregaDetalle({
  reserva,
  mensajeEstado,
  verificaciones,
  verificacionesCompletas,
  permiteVerificacion,
  cantidadVerificaciones,
  actualizarVerificacion,
}: EntregaDetalleProps) {
  const estadoVisual = esReservaEntregada(reserva)
    ? {
        texto: "Entregada",
        estilos: "bg-[#E4F6EC] text-[#15803D]",
      }
    : esReservaCancelada(reserva)
      ? {
          texto: "Cancelada",
          estilos: "bg-red-50 text-red-700",
        }
      : esReservaVencida(reserva)
        ? {
            texto: "Vencida",
            estilos: "bg-slate-100 text-slate-600",
          }
        : permiteVerificacion
          ? {
              texto: "Pendiente",
              estilos: "bg-[#FFF3D6] text-[#92400E]",
            }
          : {
              texto: "No disponible",
              estilos: "bg-slate-100 text-slate-600",
            };

  return (
    <section
      aria-labelledby="detalle-entrega-titulo"
      className="min-w-0 rounded-[22px] border border-[#DCE9F8] bg-white p-4 shadow-[0_3px_12px_rgba(20,40,91,0.04)] sm:p-5"
    >
      {/* ENCABEZADO */}

      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#E8F1FF] text-[#0755D8]">
            <ClipboardList
              size={23}
              aria-hidden="true"
            />
          </div>

          <div className="min-w-0">
            <h2
              id="detalle-entrega-titulo"
              className="text-base font-bold text-[#14285B] sm:text-lg"
            >
              Detalle de la reserva
            </h2>

            <p className="mt-1 text-sm text-[#64748B]">
              Código:{" "}
              <span className="font-semibold text-[#0755D8]">
                {reserva.codigo}
              </span>
            </p>
          </div>
        </div>

        <span
          className={`rounded-full px-3 py-1.5 text-xs font-semibold ${estadoVisual.estilos}`}
        >
          {estadoVisual.texto}
        </span>
      </div>

      {/* MENSAJE DE ESTADO */}

      <div
        role="status"
        className={`mt-4 flex items-start gap-2.5 rounded-xl border p-3 ${
          permiteVerificacion
            ? "border-[#FDE3B0] bg-[#FFF8E8] text-[#92400E]"
            : esReservaEntregada(reserva)
              ? "border-green-200 bg-green-50 text-green-700"
              : "border-slate-200 bg-slate-50 text-slate-600"
        }`}
      >
        {esReservaEntregada(reserva) ? (
          <CheckCircle2
            size={19}
            className="shrink-0"
            aria-hidden="true"
          />
        ) : (
          <AlertCircle
            size={19}
            className="shrink-0"
            aria-hidden="true"
          />
        )}

        <p className="text-sm leading-relaxed">
          {mensajeEstado}
        </p>
      </div>

      {/* INFORMACIÓN DE LA RESERVA */}

      <div className="mt-5 grid grid-cols-1 gap-3 xl:grid-cols-2">

        {/* INFORMACIÓN DEL BENEFICIARIO */}

        <article className="rounded-2xl border border-[#E2EAF4] bg-[#F8FAFD] p-4">
          <div className="mb-4 flex items-center gap-2">
            <UserRound
              size={19}
              className="text-[#0755D8]"
              aria-hidden="true"
            />

            <h3 className="text-sm font-bold text-[#14285B]">
              Información del beneficiario
            </h3>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <CampoInformacion
                etiqueta="Nombre completo"
                valor={reserva.beneficiario.nombreCompleto}
              />
            </div>

            <CampoInformacion
              etiqueta="Tipo de beneficiario"
              valor={
                reserva.beneficiario.tipo === "TITULAR"
                  ? "Titular"
                  : "Dependiente"
              }
            />

            <CampoInformacion
              etiqueta="Documento"
              valor={
                reserva.beneficiario.numeroDocumento
                  ? `****${reserva.beneficiario.numeroDocumento.slice(-4)}`
                  : "No disponible"
              }
            />

            <div className="sm:col-span-2">
              <CampoInformacion
                etiqueta="Número de orden médica"
                valor={
                  reserva.numeroOrdenMedica ??
                  "No disponible"
                }
              />
            </div>
          </div>
        </article>

        {/* INFORMACIÓN DEL MEDICAMENTO */}

        <article className="rounded-2xl border border-[#E2EAF4] bg-[#F8FAFD] p-4">
          <div className="mb-4 flex items-center gap-2">
            <Pill
              size={19}
              className="text-[#0755D8]"
              aria-hidden="true"
            />

            <h3 className="text-sm font-bold text-[#14285B]">
              Información del medicamento
            </h3>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <CampoInformacion
                etiqueta="Medicamento"
                valor={reserva.medicamento.nombre}
              />
            </div>

            <CampoInformacion
              etiqueta="Concentración"
              valor={reserva.medicamento.concentracion}
            />

            <CampoInformacion
              etiqueta="Presentación"
              valor={reserva.medicamento.presentacion}
            />

            <div className="sm:col-span-2">
              <div className="flex items-center justify-between rounded-xl border border-[#D6E5FF] bg-[#EDF5FF] px-4 py-3">
                <span className="text-sm font-medium text-[#0755D8]">
                  Cantidad reservada
                </span>

                <span className="text-xl font-bold text-[#0755D8]">
                  {reserva.medicamento.cantidad}
                </span>
              </div>
            </div>
          </div>
        </article>

        {/* FECHAS DE LA RESERVA */}

        <article className="rounded-2xl border border-[#E2EAF4] bg-[#F8FAFD] p-4">
          <div className="mb-4 flex items-center gap-2">
            <CalendarDays
              size={19}
              className="text-[#0755D8]"
              aria-hidden="true"
            />

            <h3 className="text-sm font-bold text-[#14285B]">
              Fechas de la reserva
            </h3>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <CampoInformacion
              etiqueta="Fecha de creación"
              valor={formatearFechaEntrega(
                reserva.fechaCreacion
              )}
            />

            <CampoInformacion
              etiqueta="Fecha de retiro"
              valor={formatearFechaEntrega(
                reserva.fechaRetiro
              )}
            />

            <CampoInformacion
              etiqueta="Fecha de vencimiento"
              valor={formatearFechaEntrega(
                reserva.fechaVencimiento
              )}
            />

            {reserva.fechaEntrega && (
              <CampoInformacion
                etiqueta="Fecha de entrega"
                valor={formatearFechaEntrega(
                  reserva.fechaEntrega
                )}
              />
            )}
          </div>
        </article>

        {/* INFORMACIÓN DE LA SEDE */}

        <article className="rounded-2xl border border-[#E2EAF4] bg-[#F8FAFD] p-4">
          <div className="mb-4 flex items-center gap-2">
            <MapPin
              size={19}
              className="text-[#0755D8]"
              aria-hidden="true"
            />

            <h3 className="text-sm font-bold text-[#14285B]">
              Sede farmacéutica
            </h3>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <CampoInformacion
                etiqueta="Nombre de la sede"
                valor={reserva.sede.nombre}
              />
            </div>

            <CampoInformacion
              etiqueta="Dirección"
              valor={reserva.sede.direccion}
            />

            <CampoInformacion
              etiqueta="Ciudad"
              valor={reserva.sede.ciudad}
            />
          </div>
        </article>
      </div>

      {/* VERIFICACIONES PREVIAS A LA ENTREGA */}

      {permiteVerificacion && (
        <div className="mt-5 rounded-2xl border border-[#DCE9F8] p-4 sm:p-5">

          {/* ENCABEZADO DE VERIFICACIONES */}

          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#E8F1FF] text-[#0755D8]">
              <ClipboardCheck
                size={22}
                aria-hidden="true"
              />
            </div>

            <div>
              <h3 className="text-base font-bold text-[#14285B]">
                Verificaciones previas a la entrega
              </h3>

              <p className="mt-1 text-xs leading-relaxed text-[#64748B]">
                Comprueba cada uno de los siguientes puntos
                antes de continuar.
              </p>
            </div>
          </div>

          {/* BARRA DE PROGRESO */}

          <div className="mt-5">
            <div className="mb-2 flex items-center justify-between gap-2">
              <span className="text-xs font-medium text-[#64748B]">
                Verificaciones completadas
              </span>

              <span className="text-sm font-bold text-[#14285B]">
                {cantidadVerificaciones}/4
              </span>
            </div>

            <div
              role="progressbar"
              aria-label="Verificaciones completadas"
              aria-valuemin={0}
              aria-valuemax={4}
              aria-valuenow={cantidadVerificaciones}
              className="h-2 overflow-hidden rounded-full bg-[#E8EEF6]"
            >
              <div
                className={`h-full rounded-full transition-all duration-300 ${
                  verificacionesCompletas
                    ? "bg-[#059669]"
                    : "bg-[#0755D8]"
                }`}
                style={{
                  width: `${(cantidadVerificaciones / 4) * 100}%`,
                }}
              />
            </div>
          </div>

          {/* CASILLAS DE VERIFICACIÓN */}

          <fieldset className="mt-4 grid grid-cols-1 gap-3 xl:grid-cols-2">
            <legend className="sr-only">
              Comprobaciones de entrega
            </legend>

            {CAMPOS_VERIFICACION.map((item) => (
              <label
                key={item.campo}
                className={`flex cursor-pointer items-start gap-3 rounded-xl border p-3 transition-colors ${
                  verificaciones[item.campo]
                    ? "border-[#A7DFC1] bg-[#F0FDF4]"
                    : "border-[#E2EAF4] bg-[#F8FAFD] hover:border-[#BFD3EF]"
                }`}
              >
                <input
                  type="checkbox"
                  checked={verificaciones[item.campo]}
                  onChange={(event) =>
                    actualizarVerificacion(
                      item.campo,
                      event.target.checked
                    )
                  }
                  className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer accent-[#0755D8] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0755D8]"
                />

                <div className="min-w-0">
                  <span className="block text-sm font-semibold text-[#14285B]">
                    {item.titulo}
                  </span>

                  <span className="mt-1 block text-xs leading-relaxed text-[#64748B]">
                    {item.descripcion}
                  </span>
                </div>
              </label>
            ))}
          </fieldset>

          {/* VERIFICACIONES COMPLETADAS */}

          {verificacionesCompletas && (
            <div
              role="status"
              className="mt-4 flex items-start gap-2 rounded-xl border border-green-200 bg-green-50 p-3 text-green-700"
            >
              <ShieldCheck
                size={19}
                className="shrink-0"
                aria-hidden="true"
              />

              <p className="text-sm font-medium">
                Todas las verificaciones fueron completadas.
              </p>
            </div>
          )}

          {/* CONFIRMACIÓN DE ENTREGA */}

          <div className="mt-5 flex flex-col gap-3 border-t border-[#E2EAF4] pt-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-2">
              <Info
                size={17}
                className="mt-0.5 shrink-0 text-[#0755D8]"
                aria-hidden="true"
              />

              <p className="max-w-[400px] text-xs leading-relaxed text-[#64748B]">
                La confirmación de entregas estará disponible
                cuando se complete la integración con el
                backend.
              </p>
            </div>

            <Button
              type="button"
              disabled
              className="h-11 shrink-0 gap-2 rounded-xl bg-[#059669] px-5 font-semibold text-white"
            >
              <PackageCheck
                size={19}
                aria-hidden="true"
              />

              Confirmar entrega
            </Button>
          </div>
        </div>
      )}
    </section>
  );
}