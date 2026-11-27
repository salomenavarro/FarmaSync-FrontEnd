"use client";

import { useMemo, useState } from "react";

import type {
  Notificacion,
  FiltrosNotificaciones,
  VistaNotificaciones,
  IndicadoresNotificaciones,
} from "../types";

import {
  FILTROS_NOTIFICACIONES_INICIALES,
  VISTA_NOTIFICACIONES_INICIAL,
  TIPOS_NOTIFICACION,
} from "../schemas/notificacion.constants";

import { obtenerGrupoFecha } from "../utils";

// Normaliza el texto para facilitar las búsquedas.
function normalizarTexto(texto: string): string {
  return texto
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

export function useNotificaciones(
  notificacionesIniciales: Notificacion[],
  fechaInicial: number
) {
  const [notificaciones, setNotificaciones] = useState<
    Notificacion[]
  >(notificacionesIniciales);

  const [vista, setVista] = useState<VistaNotificaciones>(
    VISTA_NOTIFICACIONES_INICIAL
  );

  const [filtros, setFiltros] = useState<FiltrosNotificaciones>(
    FILTROS_NOTIFICACIONES_INICIALES
  );

  // Indicadores generales del módulo.
  const indicadores = useMemo<IndicadoresNotificaciones>(() => {
    return {
      total: notificaciones.length,

      sinLeer: notificaciones.filter(
        (notificacion) => !notificacion.leida
      ).length,

      leidas: notificaciones.filter(
        (notificacion) => notificacion.leida
      ).length,

      incidencias: notificaciones.filter(
        (notificacion) =>
          notificacion.categoria === "INCIDENCIA"
      ).length,
    };
  }, [notificaciones]);

  // Aplica las pestañas, la búsqueda y el filtro por tipo.
  const notificacionesFiltradas = useMemo(() => {
    const busqueda = normalizarTexto(filtros.busqueda);

    return notificaciones
      .filter((notificacion) => {
        const coincideVista =
          vista === "TODAS" ||
          (vista === "SIN_LEER" && !notificacion.leida) ||
          (vista === "INCIDENCIAS" &&
            notificacion.categoria === "INCIDENCIA");

        const coincideTipo =
          filtros.tipo === "TODOS" ||
          notificacion.tipo === filtros.tipo;

        const contenido = normalizarTexto(
          [
            notificacion.titulo,
            notificacion.mensaje,
            notificacion.codigoReserva,
            notificacion.medicamentoNombre,
            notificacion.medicamentoCodigo,
            notificacion.sedeNombre,
            TIPOS_NOTIFICACION[notificacion.tipo],
          ]
            .filter(Boolean)
            .join(" ")
        );

        const coincideBusqueda = contenido.includes(busqueda);

        return (
          coincideVista &&
          coincideTipo &&
          coincideBusqueda
        );
      })
      .sort(
        (a, b) =>
          new Date(b.fechaCreacion).getTime() -
          new Date(a.fechaCreacion).getTime()
      );
  }, [notificaciones, vista, filtros]);

  // Agrupa las notificaciones por fecha.
  const notificacionesAgrupadas = useMemo(() => {
    const grupos: Record<string, Notificacion[]> = {};

    notificacionesFiltradas.forEach((notificacion) => {
      const grupo = obtenerGrupoFecha(
        notificacion.fechaCreacion,
        fechaInicial
      );

      if (!grupos[grupo]) {
        grupos[grupo] = [];
      }

      grupos[grupo].push(notificacion);
    });

    return Object.entries(grupos).map(
      ([fecha, notificaciones]) => ({
        fecha,
        notificaciones,
      })
    );
  }, [notificacionesFiltradas, fechaInicial]);

  // Marca una notificación individual como leída.
  function marcarComoLeida(id: string) {
    const fechaLectura = new Date().toISOString();

    setNotificaciones((anteriores) =>
      anteriores.map((notificacion) =>
        notificacion.id === id && !notificacion.leida
          ? {
              ...notificacion,
              leida: true,
              fechaLectura,
            }
          : notificacion
      )
    );
  }

  // Permite volver a marcar una notificación como no leída.
  function marcarComoNoLeida(id: string) {
    setNotificaciones((anteriores) =>
      anteriores.map((notificacion) =>
        notificacion.id === id
          ? {
              ...notificacion,
              leida: false,
              fechaLectura: undefined,
            }
          : notificacion
      )
    );
  }

  // Marca todas las notificaciones como leídas.
  function marcarTodasComoLeidas() {
    const fechaLectura = new Date().toISOString();

    setNotificaciones((anteriores) =>
      anteriores.map((notificacion) =>
        notificacion.leida
          ? notificacion
          : {
              ...notificacion,
              leida: true,
              fechaLectura,
            }
      )
    );
  }

  // Restablece los filtros de búsqueda.
  function limpiarFiltros() {
    setFiltros({
      ...FILTROS_NOTIFICACIONES_INICIALES,
    });
  }

  const hayFiltros =
    filtros.busqueda.trim() !== "" ||
    filtros.tipo !== "TODOS";

  return {
    notificaciones,
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
  };
}