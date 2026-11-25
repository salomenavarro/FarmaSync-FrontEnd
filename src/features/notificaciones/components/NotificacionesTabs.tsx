"use client";

import {
  Bell,
  Mail,
  TriangleAlert,
  CheckCheck,
} from "lucide-react";

import type {
  VistaNotificaciones,
  IndicadoresNotificaciones,
} from "../types";

import {
  VISTAS_NOTIFICACIONES,
} from "../schemas/notificacion.constants";

interface NotificacionesTabsProps {
  vista: VistaNotificaciones;
  indicadores: IndicadoresNotificaciones;
  onChange: (vista: VistaNotificaciones) => void;
  onMarcarTodasComoLeidas: () => void;
}

const ICONOS_VISTAS = {
  TODAS: Bell,
  SIN_LEER: Mail,
  INCIDENCIAS: TriangleAlert,
};

export default function NotificacionesTabs({
  vista,
  indicadores,
  onChange,
  onMarcarTodasComoLeidas,
}: NotificacionesTabsProps) {
  const cantidades: Record<VistaNotificaciones, number> = {
    TODAS: indicadores.total,
    SIN_LEER: indicadores.sinLeer,
    INCIDENCIAS: indicadores.incidencias,
  };

  return (
    <div className="flex flex-col gap-3 border-b border-[#E0E8F3] pb-3 xl:flex-row xl:items-center xl:justify-between">
      {/* Navegación interna */}
      <div
        role="group"
        aria-label="Filtrar notificaciones por estado"
        className="flex min-w-0 flex-wrap items-center gap-2"
      >
        {VISTAS_NOTIFICACIONES.map((opcion) => {
          const activa = vista === opcion.valor;
          const Icono = ICONOS_VISTAS[opcion.valor];

          return (
            <button
              key={opcion.valor}
              type="button"
              aria-pressed={activa}
              onClick={() => onChange(opcion.valor)}
              className={`inline-flex min-h-10 items-center justify-center gap-2 rounded-xl px-3 py-2 text-[13px] font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0755D8] focus-visible:ring-offset-2 ${
                activa
                  ? "bg-[#EAF3FF] text-[#0755D8]"
                  : "text-[#64748B] hover:bg-[#F5F9FF] hover:text-[#0755D8]"
              }`}
            >
              <Icono
                size={17}
                strokeWidth={1.8}
                aria-hidden="true"
              />

              <span>{opcion.etiqueta}</span>

              <span
                className={`rounded-full px-2 py-0.5 text-[11px] font-bold ${
                  activa
                    ? "bg-[#0755D8] text-white"
                    : "bg-[#EDF1F7] text-[#64748B]"
                }`}
              >
                {cantidades[opcion.valor]}
              </span>
            </button>
          );
        })}
      </div>

      {/* Marcar todas como leídas */}
      <button
        type="button"
        onClick={onMarcarTodasComoLeidas}
        disabled={indicadores.sinLeer === 0}
        className="inline-flex min-h-10 shrink-0 items-center justify-center gap-2 rounded-xl px-3 py-2 text-[13px] font-semibold text-[#0755D8] transition-colors hover:bg-[#EAF3FF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0755D8] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent"
      >
        <CheckCheck size={18} aria-hidden="true" />

        Marcar todas como leídas
      </button>
    </div>
  );
}