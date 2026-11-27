"use client";

import { Info } from "lucide-react";

import type { Notificacion } from "../types";

import { useNotificaciones } from "../hooks/useNotificaciones";

import NotificacionesHeader from "./NotificacionesHeader";
import NotificacionesStats from "./NotificacionesStats";
import NotificacionesTabs from "./NotificacionesTabs";
import NotificacionesFilters from "./NotificacionesFilters";
import NotificacionCard from "./NotificacionCard";
import NotificacionesEmptyState from "./NotificacionesEmptyState";

interface NotificacionesViewProps {
  notificacionesIniciales: Notificacion[];
  fechaInicial: number;
}

export default function NotificacionesView({
  notificacionesIniciales,
  fechaInicial,
}: NotificacionesViewProps) {
  const {
    notificacionesFiltradas,
    notificacionesAgrupadas,
    indicadores,
    vista,
    setVista,
    filtros,
    setFiltros,
    hayFiltros,
    limpiarFiltros,
    marcarComoLeida,
    marcarComoNoLeida,
    marcarTodasComoLeidas,
  } = useNotificaciones(
    notificacionesIniciales,
    fechaInicial
  );

  const cantidadResultados =
    notificacionesFiltradas.length;

  return (
    <div className="min-h-full min-w-0 bg-[#F5F9FF] p-3">
      <div className="mx-auto w-full space-y-3">

        {/* Encabezado principal */}
        <NotificacionesHeader />

        {/* Indicadores generales */}
        <NotificacionesStats
          indicadores={indicadores}
        />

        {/* Pestañas y filtros */}
        <section
          aria-label="Controles de notificaciones"
          className="rounded-[20px] border border-[#E0E8F3] bg-white p-4 shadow-sm"
        >
          <NotificacionesTabs
            vista={vista}
            indicadores={indicadores}
            onChange={setVista}
            onMarcarTodasComoLeidas={
              marcarTodasComoLeidas
            }
          />

          <NotificacionesFilters
            filtros={filtros}
            onChange={setFiltros}
            onLimpiarFiltros={limpiarFiltros}
          />
        </section>

        {/* Encabezado de resultados */}
        <div className="flex flex-wrap items-center justify-between gap-2 px-1">
          <h2 className="text-base font-bold text-[#14285B] sm:text-lg">
            {vista === "SIN_LEER"
              ? "Notificaciones sin leer"
              : vista === "INCIDENCIAS"
                ? "Incidencias del sistema"
                : "Todas las notificaciones"}
          </h2>

          <span
            aria-live="polite"
            className="text-[13px] text-[#64748B]"
          >
            {cantidadResultados}{" "}
            {cantidadResultados === 1
              ? "notificación"
              : "notificaciones"}
          </span>
        </div>

        {/* Listado de notificaciones */}
        {cantidadResultados > 0 ? (
          <section
            aria-label="Listado de notificaciones"
            className="space-y-4"
          >
            {notificacionesAgrupadas.map((grupo) => (
              <section
                key={grupo.fecha}
                className="space-y-3"
              >
                {/* Agrupación cronológica */}
                <div className="flex items-center gap-3 px-1">
                  <h3 className="shrink-0 text-xs font-semibold uppercase tracking-wide text-[#64748B]">
                    {grupo.fecha}
                  </h3>

                  <div
                    aria-hidden="true"
                    className="h-px flex-1 bg-[#E0E8F3]"
                  />
                </div>

                {/* Tarjetas del grupo */}
                <div className="space-y-3">
                  {grupo.notificaciones.map(
                    (notificacion) => (
                      <NotificacionCard
                        key={notificacion.id}
                        notificacion={notificacion}
                        ahora={fechaInicial}
                        onMarcarComoLeida={
                          marcarComoLeida
                        }
                        onMarcarComoNoLeida={
                          marcarComoNoLeida
                        }
                      />
                    )
                  )}
                </div>
              </section>
            ))}
          </section>
        ) : (
          <NotificacionesEmptyState
            vista={vista}
            hayFiltros={hayFiltros}
            onLimpiarFiltros={limpiarFiltros}
            onVerTodas={() => setVista("TODAS")}
          />
        )}

        {/* Aviso temporal de datos simulados */}
        <div className="flex items-start gap-3 rounded-[16px] border border-[#D5E5FC] bg-[#EAF3FF] p-4">
          <Info
            size={19}
            aria-hidden="true"
            className="mt-0.5 shrink-0 text-[#0755D8]"
          />

          <div>
            <p className="text-[13px] font-semibold text-[#14285B]">
              Información sobre las notificaciones
            </p>

            <p className="mt-1 text-xs leading-relaxed text-[#475569]">
              Actualmente se muestran datos simulados
              para la validación de la interfaz. Las
              notificaciones automáticas y su estado
              de lectura estarán disponibles de forma
              persistente cuando se realice la
              integración con el servidor.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}