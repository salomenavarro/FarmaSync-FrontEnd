"use client";

import { Printer, X } from "lucide-react";
import type { ReservaOperacion } from "../types";

// Estilo de foco accesible para botones del modal.
const FOCO =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0755D8]";

interface ModalTirillaPosProps {
  reserva: ReservaOperacion | null;
  onCerrar: () => void;
}

// Muestra la tirilla de reserva (método POS) lista para imprimir y pegar al paquete.
export default function ModalTirillaPos({
  reserva,
  onCerrar,
}: ModalTirillaPosProps) {
  if (!reserva) return null;

  // Si la reserva fue solicitada para un dependiente, mostramos ese nombre; si no, el del titular.
  const nombreRetira = reserva.dependiente
    ? `${reserva.dependiente.nombres ?? ""} ${reserva.dependiente.apellidos ?? ""}`.trim()
    : reserva.user.nombreCompleto ?? "Paciente";

  const documentoRetira = reserva.dependiente
    ? reserva.dependiente.numeroDocumento
    : reserva.user.numeroDocumento;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="titulo-tirilla-pos"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
    >
      <div className="w-full max-w-md rounded-2xl border border-[#DCE9F8] bg-white p-5 text-[#14285B] shadow-xl">
        {/* Encabezado del modal */}
        <div className="flex items-center justify-between border-b border-[#E5EDF8] pb-3">
          <h2 id="titulo-tirilla-pos" className="text-base font-extrabold">
            Tirilla de Reserva · Impresora POS
          </h2>
          <button
            type="button"
            onClick={onCerrar}
            aria-label="Cerrar tirilla"
            className={`rounded-lg p-1.5 text-[#526783] hover:bg-[#F0F5FC] ${FOCO}`}
          >
            <X size={18} />
          </button>
        </div>

        {/* Cuerpo de la tirilla con los datos requeridos para etiquetar la caja */}
        <div className="mt-4 rounded-xl border-2 border-dashed border-[#9CCBFF] bg-[#F8FBFF] p-4 text-xs">
          <div className="flex items-center justify-between border-b border-[#DCE9F8] pb-2">
            <span className="font-bold text-[#0755D8]">FARMASYNC · SEDE</span>
            <span className="rounded-md bg-[#0755D8] px-2.5 py-1 text-sm font-extrabold tracking-wider text-white">
              {reserva.codigoReserva}
            </span>
          </div>

          <dl className="mt-3 space-y-1.5">
            <div className="flex justify-between gap-2">
              <dt className="font-semibold text-[#526783]">Sede:</dt>
              <dd className="text-right font-bold">{reserva.sede.nombre}</dd>
            </div>
            <div className="flex justify-between gap-2">
              <dt className="font-semibold text-[#526783]">Paciente:</dt>
              <dd className="text-right font-bold">{nombreRetira}</dd>
            </div>
            <div className="flex justify-between gap-2">
              <dt className="font-semibold text-[#526783]">Documento:</dt>
              <dd className="text-right font-semibold">{documentoRetira}</dd>
            </div>
            <div className="flex justify-between gap-2">
              <dt className="font-semibold text-[#526783]">Medicamento:</dt>
              <dd className="text-right font-bold">
                {reserva.medicamento.nombreGenerico}{" "}
                {reserva.medicamento.concentracion ?? ""}
              </dd>
            </div>
            <div className="flex justify-between gap-2">
              <dt className="font-semibold text-[#526783]">Orden médica:</dt>
              <dd className="text-right font-semibold">
                {reserva.numeroOrdenMedica}
              </dd>
            </div>
            <div className="flex justify-between gap-2">
              <dt className="font-semibold text-[#526783]">Referencia QR:</dt>
              <dd className="truncate text-right font-mono text-[11px]">
                {reserva.codigoQr}
              </dd>
            </div>
          </dl>
        </div>

        {/* Acciones de impresión o cierre */}
        <div className="mt-4 flex justify-end gap-2">
          <button
            type="button"
            onClick={onCerrar}
            className={`rounded-xl border border-[#C7D3E3] px-4 py-2 text-xs font-bold text-[#14285B] hover:bg-[#F3F6FA] ${FOCO}`}
          >
            Cerrar
          </button>
          <button
            type="button"
            onClick={() => window.print()}
            className={`inline-flex items-center gap-1.5 rounded-xl bg-[#0755D8] px-4 py-2 text-xs font-extrabold text-white hover:bg-[#0646DC] ${FOCO}`}
          >
            <Printer size={15} />
            Imprimir tirilla
          </button>
        </div>
      </div>
    </div>
  );
}