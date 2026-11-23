
"use client";

import { useState } from "react";
import { Bell, BellRing, CheckCircle2 } from "lucide-react";
import type { Medicamento } from "../types";

interface AlertaReabastecimientoProps {
  medicamento: Medicamento;
}

export default function AlertaReabastecimiento({
  medicamento,
}: AlertaReabastecimientoProps) {
  const [alertaActivada, setAlertaActivada] = useState(false);

  const activarAlerta = () => {
    // Simulación local. No envía información al backend.
    setAlertaActivada(true);
  };

  return (
    <section
      className="
        rounded-[20px] border border-[#DCE8F7]
        bg-gradient-to-br from-[#F5F9FF] to-[#EAF3FF]
        p-4
      "
    >
      <div className="flex items-start gap-3">
        <div
          className="
            flex h-11 w-11 shrink-0 items-center
            justify-center rounded-[14px]
            bg-white text-[#0755D8]
            shadow-sm
          "
        >
          {alertaActivada ? (
            <CheckCircle2 size={22} />
          ) : (
            <BellRing size={22} />
          )}
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="text-[14px] font-extrabold text-[#14285B]">
            {alertaActivada
              ? "Alerta de demostración activada"
              : "¿Quieres saber cuándo vuelva a estar disponible?"}
          </h3>

          <p className="mt-2 text-[12px] leading-relaxed text-[#62748E]">
            {alertaActivada ? (
              <>
                Activaste una alerta de prueba para{" "}
                <strong>
                  {medicamento.nombreGenerico}{" "}
                  {medicamento.concentracion}
                </strong>
                . Esta acción no envía notificaciones reales.
              </>
            ) : (
              <>
                <strong>
                  {medicamento.nombreGenerico}{" "}
                  {medicamento.concentracion}
                </strong>{" "}
                está agotado en todas las sedes consultadas.
                Puedes activar una alerta de demostración.
              </>
            )}
          </p>
        </div>
      </div>

      <div className="mt-4">
        {alertaActivada ? (
          <div
            role="status"
            className="
              flex items-center justify-center gap-2
              rounded-[12px] border border-[#BCE8CE]
              bg-[#E7F8EF] px-4 py-3
              text-center text-[12px]
              font-bold text-[#16834A]
            "
          >
            <CheckCircle2 size={17} />
            Alerta de prueba activada
          </div>
        ) : (
          <button
            type="button"
            onClick={activarAlerta}
            className="
              flex w-full items-center justify-center
              gap-2 rounded-[12px]
              bg-[#0755D8] px-4 py-3
              text-[12px] font-bold text-white
              transition-colors
              hover:bg-[#0647B6]
              focus-visible:outline-2
              focus-visible:outline-offset-2
              focus-visible:outline-[#0755D8]
            "
          >
            <Bell size={17} />
            Notificarme cuando vuelva a estar disponible
          </button>
        )}
      </div>

      <p className="mt-3 text-[11px] text-[#71829B]">
        Funcionalidad en demostración. Las notificaciones
        reales estarán disponibles al integrar el backend.
      </p>
    </section>
  );
}
