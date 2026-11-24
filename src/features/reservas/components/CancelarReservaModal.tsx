"use client";

import { useEffect, useRef, useState } from "react";

import {
  X,
  TriangleAlert,
  Pill,
  MapPin,
  CalendarClock,
  CircleX,
  Info,
} from "lucide-react";

import type {
  Reserva,
  CancelarReservaData,
} from "../types";

type CancelarReservaModalProps = {
  reserva: Reserva;
  ahora: number;
  onCerrar: () => void;
  onConfirmar: (datos: CancelarReservaData) => void;
};

const motivosCancelacion = [
  "No puedo asistir a la sede.",
  "Necesito cambiar la sede de farmacia.",
  "Necesito cambiar la fecha de retiro.",
  "Ya no necesito el medicamento.",
  "Realicé la reserva por error.",
  "Otro motivo",
];

export default function CancelarReservaModal({
  reserva,
  ahora,
  onCerrar,
  onConfirmar,
}: CancelarReservaModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const [motivo, setMotivo] = useState("");
  const [otroMotivo, setOtroMotivo] = useState("");
  const [error, setError] = useState("");

  const fechaRetiro = new Date(
    reserva.fechaRetiro
  ).getTime();

  const fechaVencimiento = new Date(
    reserva.fechaVencimiento
  ).getTime();

  // Validar el plazo permitido para cancelar
  const puedeCancelar =
    reserva.estado === "ACTIVA" &&
    fechaVencimiento > ahora &&
    fechaRetiro - ahora >= 60 * 60 * 1000;

  // Abrir el modal
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

  // Confirmar la cancelación
  function confirmarCancelacion() {
    setError("");

    const momentoActual = Date.now();

    // Verificar nuevamente el plazo
    if (
      reserva.estado !== "ACTIVA" ||
      fechaVencimiento <= momentoActual ||
      fechaRetiro - momentoActual < 60 * 60 * 1000
    ) {
      setError(
        "Esta reserva ya no se encuentra dentro del plazo permitido para cancelar."
      );

      return;
    }

    if (!motivo) {
      setError("Selecciona un motivo de cancelación.");
      return;
    }

    if (
      motivo === "Otro motivo" &&
      otroMotivo.trim().length < 5
    ) {
      setError(
        "Describe el motivo de cancelación con mínimo 5 caracteres."
      );

      return;
    }

    const motivoFinal =
      motivo === "Otro motivo"
        ? otroMotivo.trim()
        : motivo;

    onConfirmar({
      reservaId: reserva.id,
      motivo: motivoFinal,
    });
  }

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="titulo-cancelar-reserva"
      onCancel={(event) => {
        event.preventDefault();
        onCerrar();
      }}
      className="fixed inset-0 m-auto max-h-[90dvh] w-[calc(100%_-_2rem)] max-w-[510px] overflow-y-auto rounded-[24px] border border-[#E0E8F3] bg-white p-0 text-[#14285B] shadow-2xl backdrop:bg-[#0B1F5C]/50 backdrop:backdrop-blur-sm"
    >
      {/* ENCABEZADO */}
      <header className="sticky top-0 z-10 flex items-center justify-between gap-3 border-b border-[#E0E8F3] bg-white px-5 py-4 sm:px-6">

        <div className="flex items-center gap-3">

          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#FEECEC] text-[#DC2626]">
            <TriangleAlert
              size={23}
              aria-hidden="true"
            />
          </div>

          <div>
            <h2
              id="titulo-cancelar-reserva"
              className="text-lg font-bold text-[#14285B]"
            >
              Cancelar reserva
            </h2>

            <p className="mt-0.5 text-xs text-[#64748B]">
              Confirma esta acción
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onCerrar}
          aria-label="Cerrar ventana"
          className="cursor-pointer rounded-xl p-2 text-[#64748B] transition-colors hover:bg-[#F1F5F9] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#0755D8]"
        >
          <X size={22} aria-hidden="true" />
        </button>
      </header>

      {/* CONTENIDO */}
      <div className="space-y-5 p-5 sm:p-6">

        {/* MENSAJE PRINCIPAL */}
        <div>
          <h3 className="text-base font-bold text-[#14285B]">
            ¿Estás seguro de cancelar esta reserva?
          </h3>

          <p className="mt-2 text-sm leading-relaxed text-[#64748B]">
            Si cancelas tu reserva, perderás las unidades
            apartadas del medicamento. Esta acción no
            se puede deshacer.
          </p>
        </div>

        {/* RESUMEN DEL MEDICAMENTO */}
        <section className="rounded-2xl border border-[#D6E5FF] bg-[#F5F9FF] p-4">

          <div className="flex items-start gap-3">

            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#E8F1FF] text-[#0755D8]">
              <Pill
                size={25}
                strokeWidth={1.8}
                aria-hidden="true"
              />
            </div>

            <div className="min-w-0 flex-1">

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

              <div className="mt-3 flex items-center gap-1.5 text-xs text-[#475569]">
                <MapPin
                  size={15}
                  className="text-[#0755D8]"
                  aria-hidden="true"
                />

                {reserva.sede.nombre}
              </div>

              <p className="mt-2 text-xs font-medium text-[#0755D8]">
                Código: {reserva.codigo}
              </p>
            </div>
          </div>
        </section>

        {/* MOTIVO DE CANCELACIÓN */}
        <div>
          <label
            htmlFor="motivo-cancelacion"
            className="mb-2 block text-sm font-semibold text-[#14285B]"
          >
            Motivo de cancelación{" "}
            <span className="text-[#DC2626]">*</span>
          </label>

          <select
            id="motivo-cancelacion"
            value={motivo}
            required
            disabled={!puedeCancelar}
            aria-invalid={Boolean(error)}
            aria-describedby={
              error ? "error-cancelacion" : undefined
            }
            onChange={(event) => {
              setMotivo(event.target.value);
              setOtroMotivo("");
              setError("");
            }}
            className="h-12 w-full cursor-pointer rounded-xl border border-[#DCE4EF] bg-[#F8FAFD] px-3 text-sm text-[#14285B] outline-none transition-all focus:border-[#0755D8] focus:bg-white focus:ring-2 focus:ring-[#0755D8]/15 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <option value="">
              Selecciona un motivo
            </option>

            {motivosCancelacion.map((opcion) => (
              <option
                key={opcion}
                value={opcion}
              >
                {opcion}
              </option>
            ))}
          </select>
        </div>

        {/* OTRO MOTIVO */}
        {motivo === "Otro motivo" && (
          <div>
            <label
              htmlFor="otro-motivo"
              className="mb-2 block text-sm font-semibold text-[#14285B]"
            >
              Describe el motivo{" "}
              <span className="text-[#DC2626]">*</span>
            </label>

            <textarea
              id="otro-motivo"
              value={otroMotivo}
              required
              disabled={!puedeCancelar}
              maxLength={250}
              rows={3}
              aria-describedby="contador-motivo"
              onChange={(event) => {
                setOtroMotivo(event.target.value);
                setError("");
              }}
              placeholder="Escribe el motivo de tu cancelación..."
              className="w-full resize-none rounded-xl border border-[#DCE4EF] bg-[#F8FAFD] p-3 text-sm text-[#14285B] outline-none transition-all placeholder:text-[#94A3B8] focus:border-[#0755D8] focus:bg-white focus:ring-2 focus:ring-[#0755D8]/15"
            />

            <p
              id="contador-motivo"
              className="mt-1 text-right text-xs text-[#64748B]"
            >
              {otroMotivo.length}/250 caracteres
            </p>
          </div>
        )}

        {/* REGLA DE CANCELACIÓN */}
        <section className="flex items-start gap-3 rounded-xl border border-[#FCE7B5] bg-[#FFF4DE] p-4">

          <CalendarClock
            size={21}
            className="mt-0.5 shrink-0 text-[#B45309]"
            aria-hidden="true"
          />

          <div>
            <h3 className="text-sm font-bold text-[#B45309]">
              Política de cancelación
            </h3>

            <p className="mt-1 text-xs leading-relaxed text-[#92400E]">
              Las reservas únicamente pueden cancelarse
              con mínimo una hora de anticipación a la
              fecha y hora programadas para el retiro.
            </p>
          </div>
        </section>

        {/* PLAZO NO PERMITIDO */}
        {!puedeCancelar && (
          <div
            role="alert"
            className="rounded-xl border border-[#FADADA] bg-[#FEECEC] p-3 text-sm font-medium text-[#B91C1C]"
          >
            Esta reserva ya no puede cancelarse porque
            no se encuentra activa o el plazo permitido
            ha finalizado.
          </div>
        )}

        {/* MENSAJES DE ERROR */}
        {error && (
          <div
            id="error-cancelacion"
            role="alert"
            className="flex items-start gap-2 rounded-xl border border-[#FADADA] bg-[#FEECEC] p-3"
          >
            <CircleX
              size={18}
              className="shrink-0 text-[#DC2626]"
              aria-hidden="true"
            />

            <p className="text-xs font-medium text-[#B91C1C]">
              {error}
            </p>
          </div>
        )}

        {/* AVISO DE SIMULACIÓN */}
        <div className="flex items-start gap-2 text-xs leading-relaxed text-[#64748B]">

          <Info
            size={15}
            className="mt-0.5 shrink-0"
            aria-hidden="true"
          />

          <p>
            Esta operación es simulada y no modifica
            el inventario real de la farmacia.
          </p>
        </div>
      </div>

      {/* BOTONES */}
      <footer className="sticky bottom-0 flex flex-col-reverse gap-3 border-t border-[#E0E8F3] bg-white px-5 py-4 sm:flex-row sm:justify-end sm:px-6">

        <button
          type="button"
          onClick={onCerrar}
          className="cursor-pointer rounded-xl border border-[#DCE4EF] bg-white px-4 py-3 text-sm font-semibold text-[#475569] transition-colors hover:bg-[#F1F5F9] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#0755D8]"
        >
          Conservar reserva
        </button>

        <button
          type="button"
          disabled={!puedeCancelar}
          onClick={confirmarCancelacion}
          className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#DC2626] px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#B91C1C] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#DC2626] disabled:cursor-not-allowed disabled:bg-[#CBD5E1]"
        >
          <CircleX size={18} aria-hidden="true" />

          Confirmar cancelación
        </button>
      </footer>
    </dialog>
  );
}