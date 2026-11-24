"use client";

import { useEffect, useRef, useState } from "react";

import {
  X,
  Pill,
  MapPin,
  UserRound,
  CalendarDays,
  CalendarClock,
  Clock,
  Copy,
  Check,
  Info,
  ClipboardList,
  Ticket,
  CircleAlert,
} from "lucide-react";

import ReservaStatusBadge from "./ReservaStatusBadge";
import type { Reserva } from "../types";

type ReservaDetalleModalProps = {
  reserva: Reserva;
  modo: "detalles" | "codigo";
  ahora: number;
  onCerrar: () => void;
};

function formatearFecha(fecha: string): string {
  return new Intl.DateTimeFormat("es-CO", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZone: "America/Bogota",
  }).format(new Date(fecha));
}

export default function ReservaDetalleModal({
  reserva,
  modo,
  ahora,
  onCerrar,
}: ReservaDetalleModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const [copiado, setCopiado] = useState(false);
  const [errorCopia, setErrorCopia] = useState(false);

  const estado =
    reserva.estado === "ACTIVA" &&
    new Date(reserva.fechaVencimiento).getTime() <= ahora
      ? "VENCIDA"
      : reserva.estado;

  const esActiva = estado === "ACTIVA";

  const mostrarCodigo = modo === "codigo" && esActiva;

  // Abrir el modal nativo
  useEffect(() => {
    const dialog = dialogRef.current;

    if (dialog && !dialog.open) {
      dialog.showModal();
    }

    return () => {
      if (dialog?.open) {
        dialog.close();
      }
    };
  }, []);

  // Restablecer el mensaje de copia
  useEffect(() => {
    if (!copiado) return;

    const temporizador = window.setTimeout(() => {
      setCopiado(false);
    }, 2500);

    return () => window.clearTimeout(temporizador);
  }, [copiado]);

  // Copiar el código de reserva
  async function copiarCodigo() {
    setErrorCopia(false);

    try {
      await navigator.clipboard.writeText(reserva.codigo);
      setCopiado(true);
    } catch {
      setErrorCopia(true);
    }
  }

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="titulo-reserva-modal"
      onCancel={(event) => {
        event.preventDefault();
        onCerrar();
      }}
      className="fixed inset-0 m-auto max-h-[90dvh] w-[calc(100%-2rem)] max-w-[580px] overflow-y-auto rounded-[24px] border border-[#E0E8F3] bg-white p-0 text-[#14285B] shadow-2xl backdrop:bg-[#0B1F5C]/50 backdrop:backdrop-blur-sm"
    >
      {/* ENCABEZADO DEL MODAL */}
      <header className="sticky top-0 z-10 flex items-center justify-between gap-3 border-b border-[#E0E8F3] bg-white px-5 py-4 sm:px-6">
        <div className="flex items-center gap-3">

          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#E8F1FF] text-[#0755D8]">
            {mostrarCodigo ? (
              <Ticket size={23} aria-hidden="true" />
            ) : (
              <ClipboardList size={23} aria-hidden="true" />
            )}
          </div>

          <div>
            <h2
              id="titulo-reserva-modal"
              className="text-lg font-bold text-[#14285B]"
            >
              {mostrarCodigo
                ? "Código de reserva"
                : "Detalles de la reserva"}
            </h2>

            <p className="mt-0.5 text-xs text-[#64748B]">
              Información de tu medicamento reservado
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onCerrar}
          aria-label="Cerrar ventana"
          className="cursor-pointer rounded-xl p-2 text-[#64748B] transition-colors hover:bg-[#E8F1FF] hover:text-[#0755D8] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#0755D8]"
        >
          <X size={22} aria-hidden="true" />
        </button>
      </header>

      {/* CONTENIDO */}
      <div className="space-y-5 p-5 sm:p-6">

        {/* INFORMACIÓN DEL MEDICAMENTO */}
        <section className="rounded-2xl border border-[#D6E5FF] bg-[#F5F9FF] p-4">
          <div className="flex flex-wrap items-start gap-3">

            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#E8F1FF] text-[#0755D8]">
              <Pill
                size={28}
                strokeWidth={1.8}
                aria-hidden="true"
              />
            </div>

            <div className="min-w-0 flex-1">
              <h3 className="break-words text-lg font-bold text-[#14285B]">
                {reserva.medicamento.nombre}{" "}
                {reserva.medicamento.concentracion}
              </h3>

              <p className="mt-1 text-sm text-[#64748B]">
                {reserva.medicamento.presentacion}
              </p>

              <p className="mt-1 text-sm font-semibold text-[#475569]">
                Cantidad: {reserva.medicamento.cantidad}
              </p>
            </div>

            <ReservaStatusBadge estado={estado} />
          </div>
        </section>

        {/* CÓDIGO DE RESERVA */}
        {esActiva && (
          <section
            className={`rounded-2xl border border-[#D6E5FF] p-5 text-center ${
              mostrarCodigo
                ? "bg-[#E8F1FF]"
                : "bg-[#F5F9FF]"
            }`}
          >
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-white text-[#0755D8] shadow-sm">
              <Ticket size={26} aria-hidden="true" />
            </div>

            <h3 className="mt-3 text-sm font-semibold text-[#475569]">
              Tu código de reserva
            </h3>

            <p className="mt-2 break-all text-2xl font-extrabold tracking-wider text-[#0755D8] sm:text-[28px]">
              {reserva.codigo}
            </p>

            <p className="mt-2 text-xs leading-relaxed text-[#64748B]">
              Código de demostración para el retiro
              del medicamento en la sede seleccionada.
            </p>

            <button
              type="button"
              onClick={copiarCodigo}
              className={`mx-auto mt-4 inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors ${
                copiado
                  ? "bg-[#E6F7EF] text-[#047857]"
                  : "bg-[#0755D8] text-white hover:bg-[#0646B3]"
              }`}
            >
              {copiado ? (
                <Check size={17} aria-hidden="true" />
              ) : (
                <Copy size={17} aria-hidden="true" />
              )}

              {copiado ? "Código copiado" : "Copiar código"}
            </button>

            <p
              role="status"
              className="sr-only"
            >
              {copiado ? "Código copiado al portapapeles" : ""}
            </p>

            {errorCopia && (
              <p
                role="alert"
                className="mt-3 text-xs font-medium text-[#B91C1C]"
              >
                No se pudo copiar el código. Puedes
                seleccionarlo y copiarlo manualmente.
              </p>
            )}
          </section>
        )}

        {/* INFORMACIÓN DE LA SEDE */}
        <section>
          <h3 className="mb-3 flex items-center gap-2 text-sm font-bold text-[#14285B]">
            <MapPin
              size={19}
              className="text-[#0755D8]"
              aria-hidden="true"
            />

            Sede de farmacia
          </h3>

          <div className="space-y-3 rounded-2xl border border-[#E0E8F3] p-4">

            <div>
              <p className="text-xs text-[#64748B]">
                Nombre de la sede
              </p>

              <p className="mt-1 text-sm font-semibold">
                {reserva.sede.nombre}
              </p>
            </div>

            <div>
              <p className="text-xs text-[#64748B]">
                Dirección
              </p>

              <p className="mt-1 text-sm font-semibold">
                {reserva.sede.direccion},{" "}
                {reserva.sede.ciudad}
              </p>
            </div>

            <div>
              <p className="text-xs text-[#64748B]">
                Horario de atención
              </p>

              <p className="mt-1 text-sm font-semibold">
                {reserva.sede.horario}
              </p>
            </div>
          </div>
        </section>

        {/* BENEFICIARIO */}
        <section>
          <h3 className="mb-3 flex items-center gap-2 text-sm font-bold text-[#14285B]">
            <UserRound
              size={19}
              className="text-[#0755D8]"
              aria-hidden="true"
            />

            Paciente beneficiario
          </h3>

          <div className="flex items-center gap-3 rounded-2xl border border-[#E0E8F3] p-4">

            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#E8F1FF] text-[#0755D8]">
              <UserRound size={22} aria-hidden="true" />
            </div>

            <div className="min-w-0">
              <p className="break-words text-sm font-semibold">
                {reserva.beneficiario.nombreCompleto}
              </p>

              <p className="mt-1 text-xs text-[#64748B]">
                {reserva.beneficiario.tipo === "TITULAR"
                  ? "Paciente titular"
                  : "Integrante del grupo familiar"}
              </p>
            </div>
          </div>
        </section>

        {/* FECHAS DE LA RESERVA */}
        <section>
          <h3 className="mb-3 flex items-center gap-2 text-sm font-bold text-[#14285B]">
            <CalendarDays
              size={19}
              className="text-[#0755D8]"
              aria-hidden="true"
            />

            Fechas de la reserva
          </h3>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">

            <div className="rounded-xl border border-[#E0E8F3] bg-[#F8FAFD] p-3">
              <p className="text-xs text-[#64748B]">
                Fecha de creación
              </p>

              <p className="mt-1.5 text-sm font-semibold">
                {formatearFecha(reserva.fechaCreacion)}
              </p>
            </div>

            <div className="rounded-xl border border-[#E0E8F3] bg-[#F8FAFD] p-3">
              <p className="text-xs text-[#64748B]">
                Fecha de retiro
              </p>

              <p className="mt-1.5 text-sm font-semibold">
                {formatearFecha(reserva.fechaRetiro)}
              </p>
            </div>

            <div className="rounded-xl border border-[#E0E8F3] bg-[#F8FAFD] p-3 sm:col-span-2">

              <div className="flex items-center gap-2">
                <Clock
                  size={16}
                  className="text-[#B45309]"
                  aria-hidden="true"
                />

                <p className="text-xs text-[#64748B]">
                  Fecha límite de retiro
                </p>
              </div>

              <p className="mt-1.5 text-sm font-semibold">
                {formatearFecha(reserva.fechaVencimiento)}
              </p>
            </div>

            {reserva.fechaEntrega && (
              <div className="rounded-xl border border-[#CDEDDD] bg-[#E6F7EF] p-3 sm:col-span-2">
                <p className="text-xs font-medium text-[#047857]">
                  Fecha de entrega
                </p>

                <p className="mt-1.5 text-sm font-semibold text-[#047857]">
                  {formatearFecha(reserva.fechaEntrega)}
                </p>
              </div>
            )}

            {reserva.fechaCancelacion && (
              <div className="rounded-xl border border-[#FADADA] bg-[#FEECEC] p-3 sm:col-span-2">
                <p className="text-xs font-medium text-[#B91C1C]">
                  Fecha de cancelación
                </p>

                <p className="mt-1.5 text-sm font-semibold text-[#B91C1C]">
                  {formatearFecha(reserva.fechaCancelacion)}
                </p>
              </div>
            )}
          </div>
        </section>

        {/* MOTIVO DE CANCELACIÓN */}
        {estado === "CANCELADA" &&
          reserva.motivoCancelacion && (
            <section className="rounded-xl border border-[#FADADA] bg-[#FEECEC] p-4">

              <div className="flex items-center gap-2">
                <CircleAlert
                  size={18}
                  className="text-[#B91C1C]"
                  aria-hidden="true"
                />

                <h3 className="text-sm font-bold text-[#B91C1C]">
                  Motivo de cancelación
                </h3>
              </div>

              <p className="mt-2 break-words text-sm leading-relaxed text-[#B91C1C]">
                {reserva.motivoCancelacion}
              </p>
            </section>
          )}

        {/* RECORDATORIO PARA RESERVAS ACTIVAS */}
        {esActiva && (
          <section className="flex items-start gap-3 rounded-xl border border-[#D6E5FF] bg-[#E8F1FF] p-4">

            <CalendarClock
              size={21}
              className="mt-0.5 shrink-0 text-[#0755D8]"
              aria-hidden="true"
            />

            <div>
              <h3 className="text-sm font-bold text-[#0755D8]">
                Recuerda reclamar tu medicamento
              </h3>

              <p className="mt-1 text-xs leading-relaxed text-[#475569]">
                Acude a la sede seleccionada antes de
                que finalice el plazo de retiro.
                Si necesitas cancelar tu reserva,
                hazlo con mínimo una hora de
                anticipación a la fecha y hora de retiro.
              </p>
            </div>
          </section>
        )}

        {/* AVISO DE SIMULACIÓN */}
        <div className="flex items-start gap-2 text-xs leading-relaxed text-[#64748B]">
          <Info
            size={15}
            className="mt-0.5 shrink-0"
            aria-hidden="true"
          />

          <p>
            Información simulada para la demostración
            del módulo de reservas de FarmaSync.
          </p>
        </div>
      </div>

      {/* PIE DEL MODAL */}
      <footer className="sticky bottom-0 flex justify-end border-t border-[#E0E8F3] bg-white px-5 py-4 sm:px-6">

        <button
          type="button"
          onClick={onCerrar}
          className="cursor-pointer rounded-xl bg-[#0755D8] px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#0646B3] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0755D8]"
        >
          Cerrar
        </button>
      </footer>
    </dialog>
  );
}