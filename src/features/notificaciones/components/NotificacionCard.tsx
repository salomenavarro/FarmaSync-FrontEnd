"use client";

import Link from "next/link";

import {
  CalendarCheck,
  PackageCheck,
  Clock,
  Timer,
  CalendarPlus,
  CalendarX,
  Pill,
  Hourglass,
  TriangleAlert,
  CircleX,
  ArrowRight,
  CheckCheck,
  Mail,
  MapPin,
  type LucideIcon,
} from "lucide-react";

import type {
  Notificacion,
  TipoNotificacion,
} from "../types";

import {
  TIPOS_NOTIFICACION,
} from "../schemas/notificacion.constants";

import {
  formatearFecha,
  formatearHora,
  formatearTiempoRelativo,
} from "../utils";

interface NotificacionCardProps {
  notificacion: Notificacion;
  ahora: number;
  onMarcarComoLeida: (id: string) => void;
  onMarcarComoNoLeida: (id: string) => void;
}

interface ConfiguracionVisual {
  icono: LucideIcon;
  color: string;
  fondo: string;
}

// Configuración visual según el tipo de notificación.
const CONFIGURACION_VISUAL: Record<
  TipoNotificacion,
  ConfiguracionVisual
> = {
  CONFIRMACION_RESERVA: {
    icono: CalendarCheck,
    color: "text-[#0755D8]",
    fondo: "bg-[#EAF3FF]",
  },
  MEDICAMENTO_LISTO: {
    icono: PackageCheck,
    color: "text-[#047857]",
    fondo: "bg-[#E6F7EF]",
  },
  VENCIMIENTO_24H: {
    icono: Clock,
    color: "text-[#B45309]",
    fondo: "bg-[#FFF4DE]",
  },
  VENCIMIENTO_2H: {
    icono: Timer,
    color: "text-[#B45309]",
    fondo: "bg-[#FFF4DE]",
  },
  PRORROGA: {
    icono: CalendarPlus,
    color: "text-[#0755D8]",
    fondo: "bg-[#EAF3FF]",
  },
  EXPIRACION: {
    icono: CalendarX,
    color: "text-[#B91C1C]",
    fondo: "bg-[#FEECEC]",
  },
  REABASTECIMIENTO: {
    icono: Pill,
    color: "text-[#047857]",
    fondo: "bg-[#E6F7EF]",
  },
  RETRASO_ALISTAMIENTO: {
    icono: Hourglass,
    color: "text-[#B45309]",
    fondo: "bg-[#FFF4DE]",
  },
  INCONSISTENCIA_LOTE: {
    icono: TriangleAlert,
    color: "text-[#B91C1C]",
    fondo: "bg-[#FEECEC]",
  },
  CANCELACION_FARMACIA: {
    icono: CircleX,
    color: "text-[#B91C1C]",
    fondo: "bg-[#FEECEC]",
  },
};

// Determina la acción correspondiente a cada notificación.
function obtenerAccion(notificacion: Notificacion) {
  switch (notificacion.tipo) {
    case "REABASTECIMIENTO":
    case "EXPIRACION":
    case "INCONSISTENCIA_LOTE":
    case "CANCELACION_FARMACIA": {
      const parametros = new URLSearchParams();

      const busqueda =
        notificacion.medicamentoCodigo ||
        notificacion.medicamentoNombre;

      if (busqueda) {
        parametros.set("busqueda", busqueda);
      }

      const consulta = parametros.toString();

      return {
        etiqueta:
          notificacion.tipo === "INCONSISTENCIA_LOTE" ||
          notificacion.tipo === "CANCELACION_FARMACIA"
            ? "Buscar sedes alternativas"
            : "Consultar disponibilidad",
        href: consulta
          ? `/medicamentos?${consulta}`
          : "/medicamentos",
      };
    }

    default:
      return {
        etiqueta: "Consultar mis reservas",
        href: "/reservas",
      };
  }
}

export default function NotificacionCard({
  notificacion,
  ahora,
  onMarcarComoLeida,
  onMarcarComoNoLeida,
}: NotificacionCardProps) {
  const configuracion =
    CONFIGURACION_VISUAL[notificacion.tipo];

  const Icono = configuracion.icono;
  const accion = obtenerAccion(notificacion);

  return (
    <article
      className={`relative min-w-0 overflow-hidden rounded-[20px] border p-4 shadow-sm transition-all duration-200 hover:shadow-md sm:p-5 ${
        notificacion.leida
          ? "border-[#E0E8F3] bg-white"
          : "border-[#C8DCF8] bg-[#F0F6FF]"
      }`}
    >
      {/* Indicador lateral de notificación sin leer */}
      {!notificacion.leida && (
        <div
          aria-hidden="true"
          className="absolute inset-y-0 left-0 w-1 bg-[#0755D8]"
        />
      )}

      <div className="flex items-start gap-3 sm:gap-4">
        {/* Icono principal */}
        <div
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-[14px] sm:h-12 sm:w-12 ${configuracion.fondo} ${configuracion.color}`}
        >
          <Icono
            size={24}
            strokeWidth={1.8}
            aria-hidden="true"
          />
        </div>

        {/* Contenido */}
        <div className="min-w-0 flex-1">
          {/* Título y fecha */}
          <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
            <div className="flex min-w-0 items-center gap-2">
              <h3 className="break-words text-[15px] font-bold leading-snug text-[#14285B]">
                {notificacion.titulo}
              </h3>

              {!notificacion.leida && (
                <span
                  aria-label="Sin leer"
                  className="h-2 w-2 shrink-0 rounded-full bg-[#0755D8]"
                />
              )}
            </div>

            <time
              dateTime={notificacion.fechaCreacion}
              title={`${formatearFecha(
                notificacion.fechaCreacion
              )} · ${formatearHora(
                notificacion.fechaCreacion
              )}`}
              className="shrink-0 text-xs text-[#64748B]"
            >
              {formatearTiempoRelativo(
                notificacion.fechaCreacion,
                ahora
              )}
            </time>
          </div>

          {/* Mensaje */}
          <p className="mt-2 break-words text-[13px] leading-relaxed text-[#475569] sm:text-sm">
            {notificacion.mensaje}
          </p>

          {/* Información complementaria */}
          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2">
            {notificacion.codigoReserva && (
              <span className="inline-flex items-center gap-1.5 text-xs text-[#64748B]">
                <CalendarCheck
                  size={14}
                  aria-hidden="true"
                />

                Reserva:

                <span className="font-semibold text-[#14285B]">
                  {notificacion.codigoReserva}
                </span>
              </span>
            )}

            {notificacion.sedeNombre && (
              <span className="inline-flex items-center gap-1.5 text-xs text-[#64748B]">
                <MapPin
                  size={14}
                  aria-hidden="true"
                />

                {notificacion.sedeNombre}
              </span>
            )}
          </div>

          {/* Fecha límite de retiro */}
          {notificacion.fechaVencimiento &&
            notificacion.tipo !== "EXPIRACION" && (
              <div className="mt-3 flex flex-wrap items-center gap-1.5 text-xs text-[#475569]">
                <Clock size={14} aria-hidden="true" />

                <span>Fecha límite de retiro:</span>

                <span className="font-semibold text-[#14285B]">
                  {formatearFecha(
                    notificacion.fechaVencimiento
                  )}
                  {" · "}
                  {formatearHora(
                    notificacion.fechaVencimiento
                  )}
                </span>
              </div>
            )}

          {/* Clasificación y estado */}
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span
              className={`inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold ${configuracion.fondo} ${configuracion.color}`}
            >
              {TIPOS_NOTIFICACION[notificacion.tipo]}
            </span>

            {notificacion.prioridad === "URGENTE" && (
              <span className="inline-flex items-center gap-1 rounded-full bg-[#FEECEC] px-2.5 py-1 text-[11px] font-semibold text-[#B91C1C]">
                <TriangleAlert
                  size={12}
                  aria-hidden="true"
                />

                Urgente
              </span>
            )}

            <span
              className={`inline-flex items-center gap-1.5 text-[11px] font-medium ${
                notificacion.leida
                  ? "text-[#64748B]"
                  : "text-[#0755D8]"
              }`}
            >
              {notificacion.leida ? (
                <CheckCheck
                  size={14}
                  aria-hidden="true"
                />
              ) : (
                <Mail size={14} aria-hidden="true" />
              )}

              {notificacion.leida ? "Leída" : "Sin leer"}
            </span>
          </div>

          {/* Acciones */}
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-[#DCE4EF] pt-3">
            <Link
              href={accion.href}
              onClick={() =>
                onMarcarComoLeida(notificacion.id)
              }
              className="inline-flex items-center gap-1.5 rounded-md text-[13px] font-semibold text-[#0755D8] transition-colors hover:text-[#0B1F5C] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0755D8] focus-visible:ring-offset-2"
            >
              {accion.etiqueta}

              <ArrowRight
                size={16}
                aria-hidden="true"
              />
            </Link>

            <button
              type="button"
              onClick={() =>
                notificacion.leida
                  ? onMarcarComoNoLeida(notificacion.id)
                  : onMarcarComoLeida(notificacion.id)
              }
              aria-label={`${
                notificacion.leida
                  ? "Marcar como no leída"
                  : "Marcar como leída"
              }: ${notificacion.titulo}`}
              className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium text-[#475569] transition-colors hover:bg-[#EAF3FF] hover:text-[#0755D8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0755D8] focus-visible:ring-offset-2"
            >
              {notificacion.leida ? (
                <Mail size={15} aria-hidden="true" />
              ) : (
                <CheckCheck
                  size={15}
                  aria-hidden="true"
                />
              )}

              {notificacion.leida
                ? "Marcar como no leída"
                : "Marcar como leída"}
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}