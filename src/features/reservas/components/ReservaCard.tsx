"use client";

import {
  Pill,
  MapPin,
  UserRound,
  CalendarDays,
  Clock,
  Eye,
  QrCode,
  CircleX,
  PackageCheck,
  Hash,
  CalendarPlus,
} from "lucide-react";

import ReservaStatusBadge from "./ReservaStatusBadge";
import type { Reserva } from "../types";

type ReservaCardProps = {
  reserva: Reserva;
  ahora: number;
  onVerDetalles: (reserva: Reserva) => void;
  onVerCodigo: (reserva: Reserva) => void;
  onSolicitarProrroga?: (reserva: Reserva) => void;
  prorrogaEnCursoId?: number | null;
  onCancelar: (reserva: Reserva) => void;
};

// Formatear fechas en español
function formatearFecha(fecha: string): string {
  return new Intl.DateTimeFormat("es-CO", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "America/Bogota",
  }).format(new Date(fecha));
}

// Calcular el tiempo restante de la reserva
function calcularTiempoRestante(
  fechaVencimiento: string,
  ahora: number
): string {
  const diferencia =
    new Date(fechaVencimiento).getTime() - ahora;

  if (diferencia <= 0) {
    return "Plazo de retiro finalizado";
  }

  const minutos = Math.floor(diferencia / 60000);
  const horas = Math.floor(minutos / 60);
  const dias = Math.floor(horas / 24);

  if (dias > 0) {
    return `Vence en ${dias} ${dias === 1 ? "día" : "días"}`;
  }

  if (horas > 0) {
    return `Vence en ${horas} ${horas === 1 ? "hora" : "horas"}`;
  }

  if (minutos > 0) {
    return `Vence en ${minutos} min`;
  }

  return "Vence en menos de un minuto";
}

export default function ReservaCard({
  reserva,
  ahora,
  onVerDetalles,
  onVerCodigo,
  onSolicitarProrroga,
  prorrogaEnCursoId,
  onCancelar,
}: ReservaCardProps) {
  const fechaVencimiento = new Date(
    reserva.fechaVencimiento
  ).getTime();

  const estado =
    reserva.estado === "ACTIVA" &&
    fechaVencimiento <= ahora
      ? "VENCIDA"
      : reserva.estado;

  const esActiva = estado === "ACTIVA";

  // Permitir cancelar con mínimo una hora de anticipación al vencimiento del plazo
  const puedeCancelar =
    esActiva && fechaVencimiento - ahora >= 60 * 60 * 1000;

  // Permitir prórroga de 24h si está activa, no ha vencido y no se ha usado antes
  const puedeSolicitarProrroga =
    esActiva &&
    !reserva.prorrogaSolicitada &&
    fechaVencimiento > ahora &&
    Boolean(onSolicitarProrroga);

  const solicitandoProrroga = prorrogaEnCursoId === reserva.id;

  const tiempoRestante = calcularTiempoRestante(
    reserva.fechaVencimiento,
    ahora
  );

  const vencePronto =
    esActiva &&
    fechaVencimiento - ahora <= 24 * 60 * 60 * 1000;

  return (
    <article
      className="group rounded-[20px] border border-[#E0E8F3] bg-white p-4 shadow-[0_4px_15px_rgba(15,42,117,0.04)] transition-all duration-200 hover:border-[#B7D0F5] hover:shadow-[0_6px_20px_rgba(15,42,117,0.07)] sm:p-5"
    >
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-[1.2fr_1fr_1fr_auto] xl:items-center">

        {/* INFORMACIÓN DEL MEDICAMENTO */}
        <div className="flex min-w-0 items-start gap-3">

          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-[#D6E5FF] bg-[#E8F1FF] text-[#0755D8]">
            <Pill
              size={27}
              strokeWidth={1.8}
              aria-hidden="true"
            />
          </div>

          <div className="min-w-0">
            <h3 className="break-words text-base font-bold text-[#14285B]">
              {reserva.medicamento.nombre}{" "}
              {reserva.medicamento.concentracion}
            </h3>

            <p className="mt-1 text-xs text-[#64748B]">
              {reserva.medicamento.presentacion}
            </p>

            <p className="mt-1 text-xs font-semibold text-[#475569]">
              Cantidad: {reserva.medicamento.cantidad}
            </p>

            <div className="mt-2 inline-flex items-center gap-1 rounded-md bg-[#F1F5FB] px-2 py-1 text-[11px] font-medium text-[#64748B]">
              <Hash size={12} aria-hidden="true" />

              {reserva.codigo}
            </div>
          </div>
        </div>

        {/* SEDE Y BENEFICIARIO */}
        <div className="space-y-3 border-t border-[#E8EDF5] pt-3 xl:border-l xl:border-t-0 xl:pl-4 xl:pt-0">

          {/* Sede de farmacia */}
          <div className="flex items-start gap-2.5">
            <MapPin
              size={18}
              aria-hidden="true"
              className="mt-0.5 shrink-0 text-[#0755D8]"
            />

            <div className="min-w-0">
              <p className="text-sm font-semibold text-[#14285B]">
                {reserva.sede.nombre}
              </p>

              <p className="mt-0.5 text-xs text-[#64748B]">
                {reserva.sede.direccion}
              </p>
            </div>
          </div>

          {/* Paciente beneficiario */}
          <div className="flex items-start gap-2.5">
            <UserRound
              size={18}
              aria-hidden="true"
              className="mt-0.5 shrink-0 text-[#0755D8]"
            />

            <div className="min-w-0">
              <p className="break-words text-sm font-semibold text-[#14285B]">
                {reserva.beneficiario.nombreCompleto}
              </p>

              <p className="mt-0.5 text-xs text-[#64748B]">
                {reserva.beneficiario.tipo === "TITULAR"
                  ? "Paciente titular"
                  : "Integrante del grupo familiar"}
              </p>
            </div>
          </div>
        </div>

        {/* ESTADO Y FECHAS */}
        <div className="space-y-2.5 border-t border-[#E8EDF5] pt-3 xl:border-l xl:border-t-0 xl:pl-4 xl:pt-0">

          <ReservaStatusBadge estado={estado} />

          {/* Reserva activa */}
          {esActiva && (
            <>
              <div className="flex items-start gap-2">
                <CalendarDays
                  size={15}
                  aria-hidden="true"
                  className="mt-0.5 shrink-0 text-[#64748B]"
                />

                <div>
                  <p className="text-[11px] text-[#64748B]">
                    Fecha límite de retiro
                  </p>

                  <p className="text-xs font-semibold text-[#14285B]">
                    {formatearFecha(reserva.fechaVencimiento)}
                  </p>
                </div>
              </div>

              <div
                className={`flex items-center gap-1.5 text-xs font-semibold ${
                  vencePronto
                    ? "text-[#B45309]"
                    : "text-[#047857]"
                }`}
              >
                <Clock size={15} aria-hidden="true" />

                {tiempoRestante}
              </div>

              {reserva.prorrogaSolicitada && (
                <p className="text-[11px] font-semibold text-[#0755D8]">
                  Prórroga de 24h aplicada
                </p>
              )}
            </>
          )}

          {/* Reserva completada */}
          {estado === "COMPLETADA" && (
            <div className="flex items-start gap-2">
              <PackageCheck
                size={17}
                aria-hidden="true"
                className="mt-0.5 shrink-0 text-[#059669]"
              />

              <div>
                <p className="text-xs font-semibold text-[#047857]">
                  Medicamento entregado
                </p>

                {reserva.fechaEntrega && (
                  <p className="mt-1 text-xs text-[#64748B]">
                    {formatearFecha(reserva.fechaEntrega)}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Reserva cancelada */}
          {estado === "CANCELADA" && (
            <div className="flex items-start gap-2">
              <CircleX
                size={16}
                aria-hidden="true"
                className="mt-0.5 shrink-0 text-[#DC2626]"
              />

              <div>
                <p className="text-xs font-semibold text-[#B91C1C]">
                  Reserva anulada
                </p>

                {reserva.fechaCancelacion && (
                  <p className="mt-1 text-xs text-[#64748B]">
                    {formatearFecha(reserva.fechaCancelacion)}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Reserva vencida */}
          {estado === "VENCIDA" && (
            <div className="flex items-start gap-2">
              <Clock
                size={16}
                aria-hidden="true"
                className="mt-0.5 shrink-0 text-[#B45309]"
              />

              <div>
                <p className="text-xs font-semibold text-[#B45309]">
                  Plazo de retiro finalizado
                </p>

                <p className="mt-1 text-xs text-[#64748B]">
                  {formatearFecha(reserva.fechaVencimiento)}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* BOTONES DE ACCIÓN */}
        <div className="flex flex-wrap gap-2 border-t border-[#E8EDF5] pt-3 xl:min-w-[155px] xl:flex-col xl:border-t-0 xl:pt-0">

          {/* Ver código */}
          {esActiva && (
            <button
              type="button"
              onClick={() => onVerCodigo(reserva)}
              className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#0755D8] px-3.5 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-[#0646B3] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0755D8]"
            >
              <QrCode size={16} aria-hidden="true" />

              Ver código
            </button>
          )}

          {/* Solicitar prórroga (24h, máximo 1 vez) */}
          {esActiva && onSolicitarProrroga && (
            <button
              type="button"
              disabled={!puedeSolicitarProrroga || solicitandoProrroga}
              onClick={() => onSolicitarProrroga(reserva)}
              title={
                reserva.prorrogaSolicitada
                  ? "Ya utilizaste la prórroga única de 24 horas"
                  : "Extender plazo de retiro por 24 horas"
              }
              className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-[#C7DAF7] bg-[#F5F9FF] px-3.5 py-2.5 text-xs font-semibold text-[#0755D8] transition-colors hover:bg-[#E8F1FF] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0755D8] disabled:cursor-not-allowed disabled:opacity-50"
            >
              <CalendarPlus size={16} aria-hidden="true" />

              {solicitandoProrroga
                ? "Solicitando..."
                : reserva.prorrogaSolicitada
                  ? "Prórroga usada"
                  : "Solicitar prórroga"}
            </button>
          )}

          {/* Ver detalles */}
          <button
            type="button"
            onClick={() => onVerDetalles(reserva)}
            className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-[#C7DAF7] bg-white px-3.5 py-2.5 text-xs font-semibold text-[#0755D8] transition-colors hover:bg-[#E8F1FF] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0755D8]"
          >
            <Eye size={16} aria-hidden="true" />

            Ver detalles
          </button>

          {/* Cancelar reserva */}
          {esActiva && (
            <button
              type="button"
              disabled={!puedeCancelar}
              onClick={() => onCancelar(reserva)}
              title={
                puedeCancelar
                  ? "Cancelar esta reserva"
                  : "Solo puedes cancelar con mínimo una hora de anticipación al vencimiento"
              }
              className="inline-flex cursor-pointer items-center justify-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold text-[#DC2626] transition-colors hover:bg-[#FEECEC] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#DC2626] disabled:cursor-not-allowed disabled:text-[#94A3B8] disabled:hover:bg-transparent"
            >
              <CircleX size={15} aria-hidden="true" />

              Cancelar
            </button>
          )}
        </div>
      </div>
    </article>
  );
}