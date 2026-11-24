"use client";

import {
  Pill,
  Heart,
  MapPin,
  Search,
  Bell,
  CalendarDays,
  ArrowRight,
  CircleAlert,
  Package,
} from "lucide-react";

import type { EstadoStock } from "@/features/catalogo/types";
import type { MedicamentoGuardadoDetalle } from "../types";

// =========================================================
// PROPIEDADES
// =========================================================

interface MedicamentoGuardadoCardProps {
  detalle: MedicamentoGuardadoDetalle;

  onEliminar: (
    medicamentoId: string,
    sedeId: string
  ) => void;

  onVerDisponibilidad: (
    medicamentoId: string,
    sedeId: string
  ) => void;

  onNotificar: (
    medicamentoId: string,
    sedeId: string
  ) => void;

  notificacionActiva?: boolean;
}

// =========================================================
// ESTILOS DE DISPONIBILIDAD
// =========================================================

const ESTILOS_ESTADO: Record<EstadoStock, string> = {
  Disponible:
    "border-[#CDEDDD] bg-[#E6F7EF] text-[#047857]",

  "Disponibilidad limitada":
    "border-[#FCE7B5] bg-[#FFF4DE] text-[#B45309]",

  Agotado:
    "border-[#FADADA] bg-[#FEECEC] text-[#B91C1C]",
};

// =========================================================
// FORMATEAR FECHA
// =========================================================

function formatearFecha(fecha: string) {
  return new Intl.DateTimeFormat("es-CO", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "America/Bogota",
  }).format(new Date(fecha));
}

// =========================================================
// TARJETA DE MEDICAMENTO GUARDADO
// =========================================================

export default function MedicamentoGuardadoCard({
  detalle,
  onEliminar,
  onVerDisponibilidad,
  onNotificar,
  notificacionActiva = false,
}: MedicamentoGuardadoCardProps) {

  const {
    medicamento,
    sede,
    cantidad,
    estadoGeneral,
    fechaGuardado,
  } = detalle;

  const agotado = estadoGeneral === "Agotado";

  const disponibilidadLimitada =
    estadoGeneral === "Disponibilidad limitada";

  return (
    <article
      className="
        flex h-full min-w-0 flex-col
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

        {/* ELIMINAR FAVORITO */}

        <button
          type="button"
          onClick={() =>
            onEliminar(medicamento.id, sede.id)
          }
          aria-label={`Eliminar ${medicamento.nombreGenerico} de ${sede.nombre} de favoritos`}
          title="Eliminar de favoritos"
          className="
            flex h-9 w-9 shrink-0
            items-center justify-center
            rounded-[12px]
            bg-[#FEECEC] text-[#DC2626]
            transition-all duration-200
            hover:bg-[#FADADA]
            active:scale-95
            focus-visible:outline-2
            focus-visible:outline-offset-2
            focus-visible:outline-[#0755D8]
          "
        >
          <Heart
            size={19}
            fill="currentColor"
            strokeWidth={1.8}
            aria-hidden="true"
          />
        </button>
      </div>

      {/* ESTADO DE DISPONIBILIDAD */}

      <div className="mt-3">
        <span
          className={`
            inline-flex items-center
            rounded-full border
            px-3 py-1
            text-[11px] font-semibold
            ${ESTILOS_ESTADO[estadoGeneral]}
          `}
        >
          {estadoGeneral}
        </span>
      </div>

      {/* INFORMACIÓN DE LA SEDE GUARDADA */}

      <div
        className="
          mt-4 rounded-[14px]
          border border-[#E4EDF9]
          bg-[#F7FAFF] p-3
        "
      >
        <div className="flex items-start gap-2">
          <MapPin
            size={16}
            className="mt-0.5 shrink-0 text-[#0876E9]"
          />

          <div className="min-w-0">
            <p className="text-[12px] font-bold text-[#14285B]">
              {sede.nombre}
            </p>

            <p className="mt-1 text-[11px] text-[#71829B]">
              {sede.ciudad} · {sede.zona}
            </p>

            <p className="mt-1 text-[11px] text-[#71829B]">
              {sede.direccion}
            </p>
          </div>
        </div>

        {/* STOCK DE LA SEDE */}

        <div
          className="
            mt-3 flex items-center
            justify-between gap-2
            border-t border-[#E4EDF9] pt-3
          "
        >
          <div className="flex items-center gap-2">
            <Package
              size={15}
              className="shrink-0 text-[#0876E9]"
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

      {/* FECHA DE GUARDADO */}

      <div className="mt-3 flex items-center gap-2">
        <CalendarDays
          size={14}
          className="shrink-0 text-[#71829B]"
        />

        <span className="text-[11px] text-[#71829B]">
          Guardado el {formatearFecha(fechaGuardado)}
        </span>
      </div>

      {/* DISPONIBILIDAD LIMITADA */}

      {disponibilidadLimitada && (
        <div
          className="
            mt-3 flex items-start gap-2
            rounded-[12px] bg-[#FFF4DE] p-3
            text-[#A96508]
          "
        >
          <CircleAlert
            size={16}
            className="shrink-0"
          />

          <p className="text-[11px] font-semibold leading-relaxed">
            Quedan pocas unidades en esta sede.
            ¡Reserva pronto!
          </p>
        </div>
      )}

      {/* MEDICAMENTO AGOTADO */}

      {agotado && (
        <div
          className="
            mt-3 flex items-start gap-2
            rounded-[12px] bg-[#FEECEC] p-3
            text-[#B91C1C]
          "
        >
          <CircleAlert
            size={16}
            className="shrink-0"
          />

          <p className="text-[11px] font-semibold leading-relaxed">
            Actualmente no hay unidades disponibles
            en esta sede.
          </p>
        </div>
      )}

      {/* ACCIONES */}

      <div className="mt-auto space-y-2 pt-4">

        {/* CONSULTAR DISPONIBILIDAD */}

        <button
          type="button"
          onClick={() =>
            onVerDisponibilidad(
              medicamento.id,
              sede.id
            )
          }
          className="
            flex w-full items-center
            justify-center gap-2
            rounded-[12px]
            bg-[#0755D8] px-4 py-2.5
            text-[12px] font-bold text-white
            transition-colors
            hover:bg-[#0647B6]
            focus-visible:outline-2
            focus-visible:outline-offset-2
            focus-visible:outline-[#0755D8]
          "
        >
          <Search size={15} />

          Ver disponibilidad

          <ArrowRight size={15} />
        </button>

        {/* ALERTA DE REABASTECIMIENTO */}

        {agotado && (
          <button
            type="button"
            disabled={notificacionActiva}
            onClick={() =>
              onNotificar(
                medicamento.id,
                sede.id
              )
            }
            className="
              flex w-full items-center
              justify-center gap-2
              rounded-[12px]
              border border-[#CFE1FA]
              bg-[#EAF3FF] px-3 py-2.5
              text-[11px] font-bold text-[#0755D8]
              transition-colors
              hover:bg-[#DCEBFF]
              focus-visible:outline-2
              focus-visible:outline-offset-2
              focus-visible:outline-[#0755D8]
              disabled:cursor-not-allowed
              disabled:opacity-60
            "
          >
            <Bell size={15} className="shrink-0" />

            {notificacionActiva
              ? "Alerta solicitada"
              : "Notificarme cuando vuelva a estar disponible"}
          </button>
        )}
      </div>
    </article>
  );
}