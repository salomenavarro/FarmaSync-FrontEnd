"use client";

import {
  MapPin,
  Pill,
  ArrowRight,
  Package,
  Heart,
} from "lucide-react";

import type { Medicamento, SedeFarmacia } from "../types";
import StockBadge from "./StockBadge";

import { useMedicamentosGuardados } from "@/features/mis-medicamentos/hooks/useMedicamentosGuardados";

interface MedicamentoCardProps {
  medicamento: Medicamento;
  sede: SedeFarmacia;
  onVerDisponibilidad?: (medicamento: Medicamento) => void;
}

export default function MedicamentoCard({
  medicamento,
  sede,
  onVerDisponibilidad,
}: MedicamentoCardProps) {

  // FAVORITOS POR MEDICAMENTO Y SEDE

  const {
    estaGuardado,
    alternarMedicamento,
  } = useMedicamentosGuardados();

  const guardado = estaGuardado(
    medicamento.id,
    sede.id
  );

  // DISPONIBILIDAD DE STOCK

  const stock = medicamento.stockPorSede.find(
    (item) => item.sedeId === sede.id
  );

  const cantidad = stock?.cantidad ?? 0;

  return (
    <article
      className="
        flex h-full flex-col
        rounded-[20px] border border-[#DFE9F6]
        bg-white p-4
        shadow-[0_4px_18px_rgba(18,56,110,0.04)]
        transition-all duration-200
        hover:border-[#B5D5FC]
        hover:shadow-[0_8px_24px_rgba(18,56,110,0.09)]
      "
    >
      {/* ENCABEZADO */}

      <div className="flex items-start gap-3">
        <div
          className="
            flex h-11 w-11 shrink-0
            items-center justify-center
            rounded-[14px] bg-[#EAF3FF]
            text-[#0755D8]
          "
        >
          <Pill size={22} />
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="text-[15px] font-extrabold text-[#14285B]">
            {medicamento.nombreGenerico}{" "}
            {medicamento.concentracion}
          </h3>

          <p className="mt-1 text-[11px] text-[#71829B]">
            {medicamento.codigo} · {medicamento.presentacion}
          </p>
        </div>

        {/* BOTÓN DE FAVORITOS POR SEDE */}

        <button
          type="button"
          onClick={() =>
            alternarMedicamento(
              medicamento.id,
              sede.id
            )
          }
          aria-pressed={guardado}
          aria-label={`Favorito: ${medicamento.nombreGenerico}, ${medicamento.concentracion}, ${sede.nombre}`}
          title={
            guardado
              ? "Eliminar de favoritos"
              : "Guardar en favoritos"
          }
          className={`
            flex h-9 w-9 shrink-0
            items-center justify-center
            rounded-[12px]
            transition-all duration-200
            active:scale-95
            focus-visible:outline-2
            focus-visible:outline-offset-2
            focus-visible:outline-[#0755D8]
            ${
              guardado
                ? "bg-[#FEECEC] text-[#DC2626] hover:bg-[#FADADA]"
                : "bg-[#F5F9FF] text-[#71829B] hover:bg-[#FEECEC] hover:text-[#DC2626]"
            }
          `}
        >
          <Heart
            size={19}
            strokeWidth={1.8}
            fill={guardado ? "currentColor" : "none"}
            aria-hidden="true"
          />
        </button>
      </div>

      {/* ESTADO DE DISPONIBILIDAD */}

      <div className="mt-3">
        <StockBadge cantidad={cantidad} />
      </div>

      {/* DESCRIPCIÓN */}

      <p className="mt-3 text-[12px] leading-relaxed text-[#62748E]">
        {medicamento.descripcion}
      </p>

      {/* INFORMACIÓN DE LA SEDE */}

      <div
        className="
          mt-4 rounded-[14px]
          border border-[#E4EDF9]
          bg-[#F7FAFF] p-3
        "
      >
        <div className="flex items-center gap-2">
          <MapPin
            size={15}
            className="shrink-0 text-[#0876E9]"
          />

          <span className="text-[12px] font-bold text-[#14285B]">
            {sede.nombre}
          </span>
        </div>

        <p className="mt-1 pl-[23px] text-[11px] text-[#71829B]">
          {sede.ciudad} · {sede.zona}
        </p>

        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Package
              size={15}
              className="text-[#0876E9]"
            />

            <span className="text-[11px] text-[#62748E]">
              Stock disponible
            </span>
          </div>

          <span className="text-[12px] font-extrabold text-[#14285B]">
            {cantidad} {cantidad === 1 ? "unidad" : "unidades"}
          </span>
        </div>
      </div>

      {/* MENSAJE DE DISPONIBILIDAD LIMITADA */}

      {cantidad > 0 && cantidad <= 15 && (
        <p className="mt-3 text-[11px] font-semibold text-[#A96508]">
          Quedan pocas unidades en esta sede. ¡Reserva pronto!
        </p>
      )}

      {/* MENSAJE DE AGOTADO */}

      {cantidad === 0 && (
        <p className="mt-3 text-[11px] font-semibold text-[#D13438]">
          No hay unidades disponibles en esta sede.
        </p>
      )}

      {/* ACCIÓN */}

      <div className="mt-auto pt-4">
        <button
          type="button"
          onClick={() => onVerDisponibilidad?.(medicamento)}
          disabled={!onVerDisponibilidad}
          className="
            flex w-full items-center justify-center gap-2
            rounded-[12px]
            bg-[#0755D8] px-4 py-2.5
            text-[12px] font-bold text-white
            transition-colors
            hover:bg-[#0647B6]
            focus-visible:outline-2
            focus-visible:outline-offset-2
            focus-visible:outline-[#0755D8]
            disabled:cursor-not-allowed
            disabled:opacity-50
          "
        >
          Ver disponibilidad

          <ArrowRight size={15} />
        </button>
      </div>
    </article>
  );
}