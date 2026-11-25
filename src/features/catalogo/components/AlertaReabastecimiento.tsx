"use client";

import { useState } from "react";
import { Bell, BellRing, CheckCircle2 } from "lucide-react";
import { useActivarAlertaStock } from "../hooks/useActivarAlertaStock";
import type { Medicamento } from "../types";
import { getCatalogoErrorMessage } from "../utils/get-catalogo-error-message";

interface AlertaReabastecimientoProps {
  medicamento: Medicamento;
}

export default function AlertaReabastecimiento({
  medicamento,
}: AlertaReabastecimientoProps) {
  const [alertaActivada, setAlertaActivada] = useState(false);
  const [errorAlerta, setErrorAlerta] = useState<string | null>(null);

  const activarAlertaMutation = useActivarAlertaStock();

  const activarAlerta = async () => {
    if (activarAlertaMutation.isPending || alertaActivada) return;

    setErrorAlerta(null);

    try {
      await activarAlertaMutation.mutateAsync(medicamento.id);
      setAlertaActivada(true);
    } catch (error) {
      setErrorAlerta(
        getCatalogoErrorMessage(
          error,
          "No se pudo activar la alerta de reabastecimiento."
        )
      );
    }
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
              ? "Alerta de reabastecimiento activada"
              : "¿Quieres saber cuándo vuelva a estar disponible?"}
          </h3>

          <p className="mt-2 text-[12px] leading-relaxed text-[#62748E]">
            {alertaActivada ? (
              <>
                Activaste una alerta para{" "}
                <strong>
                  {medicamento.nombreGenerico}{" "}
                  {medicamento.concentracion}
                </strong>
                . Te notificaremos cuando haya unidades disponibles.
              </>
            ) : (
              <>
                <strong>
                  {medicamento.nombreGenerico}{" "}
                  {medicamento.concentracion}
                </strong>{" "}
                está agotado en todas las sedes consultadas.
                Activa una alerta para recibir aviso cuando vuelva a tener stock.
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
            Alerta activada
          </div>
        ) : (
          <button
            type="button"
            onClick={activarAlerta}
            disabled={activarAlertaMutation.isPending}
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
              disabled:cursor-not-allowed
              disabled:opacity-60
            "
          >
            <Bell size={17} />
            {activarAlertaMutation.isPending
              ? "Activando alerta..."
              : "Notificarme cuando vuelva a estar disponible"}
          </button>
        )}

        {errorAlerta && (
          <p
            role="alert"
            className="mt-2.5 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-[12px] text-red-700"
          >
            {errorAlerta}
          </p>
        )}
      </div>
    </section>
  );
}