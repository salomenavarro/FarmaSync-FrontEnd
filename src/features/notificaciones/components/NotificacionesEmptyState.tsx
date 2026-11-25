"use client";

import {
  BellOff,
  MailCheck,
  ShieldCheck,
  SearchX,
  RotateCcw,
  ArrowLeft,
} from "lucide-react";

import type { VistaNotificaciones } from "../types";

interface NotificacionesEmptyStateProps {
  vista: VistaNotificaciones;
  hayFiltros: boolean;
  onLimpiarFiltros: () => void;
  onVerTodas: () => void;
}

export default function NotificacionesEmptyState({
  vista,
  hayFiltros,
  onLimpiarFiltros,
  onVerTodas,
}: NotificacionesEmptyStateProps) {
  const configuracion = hayFiltros
    ? {
        icono: SearchX,
        titulo: "No encontramos notificaciones",
        descripcion:
          "No hay notificaciones que coincidan con los filtros seleccionados. Intenta realizar otra búsqueda.",
        color: "text-[#0755D8]",
        fondo: "bg-[#EAF3FF]",
      }
    : vista === "SIN_LEER"
      ? {
          icono: MailCheck,
          titulo: "¡Estás al día!",
          descripcion:
            "Has leído todas tus notificaciones. Las nuevas novedades aparecerán en esta sección.",
          color: "text-[#047857]",
          fondo: "bg-[#E6F7EF]",
        }
      : vista === "INCIDENCIAS"
        ? {
            icono: ShieldCheck,
            titulo: "No tienes incidencias registradas",
            descripcion:
              "Actualmente no tienes notificaciones de incidencias relacionadas con el servicio farmacéutico.",
            color: "text-[#047857]",
            fondo: "bg-[#E6F7EF]",
          }
        : {
            icono: BellOff,
            titulo: "Aún no tienes notificaciones",
            descripcion:
              "Aquí recibirás novedades sobre tus reservas, disponibilidad de medicamentos y actualizaciones del servicio farmacéutico.",
            color: "text-[#0755D8]",
            fondo: "bg-[#EAF3FF]",
          };

  const Icono = configuracion.icono;

  return (
    <section
      role="status"
      className="flex min-h-[280px] flex-col items-center justify-center rounded-[20px] border border-[#E0E8F3] bg-white px-5 py-8 text-center shadow-sm sm:px-8"
    >
      {/* Icono del estado vacío */}
      <div
        className={`mb-4 flex h-20 w-20 items-center justify-center rounded-[24px] ${configuracion.fondo} ${configuracion.color}`}
      >
        <Icono
          size={36}
          strokeWidth={1.6}
          aria-hidden="true"
        />
      </div>

      {/* Título */}
      <h3 className="text-lg font-bold tracking-tight text-[#14285B] sm:text-xl">
        {configuracion.titulo}
      </h3>

      {/* Descripción */}
      <p className="mt-2 max-w-md text-[13px] leading-relaxed text-[#64748B] sm:text-sm">
        {configuracion.descripcion}
      </p>

      {/* Acción según el estado */}
      {hayFiltros ? (
        <button
          type="button"
          onClick={onLimpiarFiltros}
          className="mt-5 inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[#0755D8] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#0B1F5C] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0755D8] focus-visible:ring-offset-2"
        >
          <RotateCcw size={17} aria-hidden="true" />

          Limpiar filtros
        </button>
      ) : vista !== "TODAS" ? (
        <button
          type="button"
          onClick={onVerTodas}
          className="mt-5 inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-[#DCE4EF] bg-white px-5 py-2.5 text-sm font-semibold text-[#0755D8] transition-colors hover:border-[#0755D8] hover:bg-[#EAF3FF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0755D8] focus-visible:ring-offset-2"
        >
          <ArrowLeft size={17} aria-hidden="true" />

          Ver todas las notificaciones
        </button>
      ) : null}
    </section>
  );
}