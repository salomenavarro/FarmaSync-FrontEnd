"use client";

import { useState } from "react";
import { AlertTriangle, X } from "lucide-react";

const FOCO =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0755D8]";

// Motivos frecuentes para rechazar una reserva en ventanilla.
const MOTIVOS_SUGERIDOS = [
  "Fórmula vencida / Inconsistencia",
  "Documento de identidad no coincide",
  "Orden médica ilegible o incompleta",
];

interface ModalRechazoReservaProps {
  codigoReserva: string | null;
  cargando?: boolean;
  onCerrar: () => void;
  onConfirmarRechazo: (motivo: string) => Promise<void>;
}

// Permite rechazar una reserva con un motivo válido (mínimo 5 caracteres en el backend).
export default function ModalRechazoReserva({
  codigoReserva,
  cargando = false,
  onCerrar,
  onConfirmarRechazo,
}: ModalRechazoReservaProps) {
  const [motivo, setMotivo] = useState(MOTIVOS_SUGERIDOS[0]);
  const [errorLocal, setErrorLocal] = useState<string | null>(null);

  if (!codigoReserva) return null;

  const manejarEnvio = async (e: React.FormEvent) => {
    e.preventDefault();
    const limpio = motivo.trim();

    if (limpio.length < 5) {
      setErrorLocal("Escribe un motivo de al menos 5 caracteres.");
      return;
    }

    setErrorLocal(null);
    await onConfirmarRechazo(limpio);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="titulo-rechazo-reserva"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
    >
      <div className="w-full max-w-md rounded-2xl border border-[#F5BDBD] bg-white p-5 text-[#14285B] shadow-xl">
        <div className="flex items-center justify-between border-b border-[#FDE8E8] pb-3">
          <h2
            id="titulo-rechazo-reserva"
            className="flex items-center gap-2 text-base font-extrabold text-[#B42318]"
          >
            <AlertTriangle size={18} />
            Rechazar reserva {codigoReserva}
          </h2>
          <button
            type="button"
            onClick={onCerrar}
            disabled={cargando}
            aria-label="Cerrar modal de rechazo"
            className={`rounded-lg p-1.5 text-[#526783] hover:bg-[#F0F5FC] ${FOCO}`}
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={manejarEnvio} className="mt-4 space-y-3">
          <p className="text-xs text-[#526783]">
            Al rechazar la reserva, el medicamento volverá automáticamente al
            stock disponible de la sede.
          </p>

          {/* Atajos rápidos de motivos */}
          <div className="flex flex-wrap gap-1.5">
            {MOTIVOS_SUGERIDOS.map((item) => (
              <button
                key={item}
                type="button"
                disabled={cargando}
                onClick={() => {
                  setMotivo(item);
                  setErrorLocal(null);
                }}
                className={`rounded-lg border px-2.5 py-1 text-[11px] font-bold transition ${
                  motivo === item
                    ? "border-[#D92D20] bg-[#FDE8E8] text-[#B42318]"
                    : "border-[#DCE9F8] bg-[#F8FBFF] text-[#14285B] hover:bg-[#EEF4FC]"
                } ${FOCO}`}
              >
                {item}
              </button>
            ))}
          </div>

          <div>
            <label
              htmlFor="motivo-rechazo"
              className="block text-xs font-bold text-[#14285B]"
            >
              Motivo del rechazo
            </label>
            <textarea
              id="motivo-rechazo"
              rows={3}
              value={motivo}
              disabled={cargando}
              onChange={(e) => setMotivo(e.target.value)}
              className={`mt-1 w-full rounded-xl border border-[#B9C9DE] p-2.5 text-xs text-[#14285B] ${FOCO}`}
            />
          </div>

          {errorLocal && (
            <p className="text-xs font-semibold text-[#B42318]">{errorLocal}</p>
          )}

          <div className="flex justify-end gap-2 pt-1">
            <button
              type="button"
              disabled={cargando}
              onClick={onCerrar}
              className={`rounded-xl border border-[#C7D3E3] px-4 py-2 text-xs font-bold text-[#14285B] hover:bg-[#F3F6FA] ${FOCO}`}
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={cargando}
              className={`rounded-xl bg-[#D92D20] px-4 py-2 text-xs font-extrabold text-white hover:bg-[#B42318] disabled:opacity-60 ${FOCO}`}
            >
              {cargando ? "Rechazando..." : "Confirmar rechazo"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}