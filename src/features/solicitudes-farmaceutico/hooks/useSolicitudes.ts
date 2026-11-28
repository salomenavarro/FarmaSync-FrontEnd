"use client";

import { useEffect, useMemo, useState } from "react";

import { solicitudesMock } from "../data/solicitudesMock";

import type {
  FiltrosSolicitudes,
  SolicitudFarmaceutico,
} from "../types";

import {
  calcularIndicadoresSolicitudes,
  calcularIndicadoresSla,
  calcularNivelSla,
  calcularMinutosEspera,
  formatearTiempoEspera,
  normalizarEstadoSolicitud,
  esSolicitudPendiente,
} from "../utils/solicitudes.utils";

// =========================================================
// FILTROS INICIALES
// =========================================================

const FILTROS_INICIALES: FiltrosSolicitudes = {
  busqueda: "",
  estado: "TODAS",
  sla: "TODOS",
  fechaDesde: "",
  fechaHasta: "",
};

// =========================================================
// NORMALIZAR TEXTO PARA BÚSQUEDAS
// =========================================================

function normalizarTexto(texto: string): string {
  return texto
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

// =========================================================
// FORMATEAR FECHA PARA FILTROS
// =========================================================

function obtenerFechaLocal(fecha: string): string {
  const valor = new Date(fecha);

  if (Number.isNaN(valor.getTime())) {
    return "";
  }

  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Bogota",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(valor);
}

// =========================================================
// HOOK DE SOLICITUDES
// =========================================================

export function useSolicitudes(codigoInicial = "") {
  const [solicitudes, setSolicitudes] = useState<
    SolicitudFarmaceutico[]
  >([]);

  const [ahora, setAhora] = useState(0);

  const [filtros, setFiltros] = useState<FiltrosSolicitudes>({
    ...FILTROS_INICIALES,
    busqueda: codigoInicial,
  });

  const [solicitudSeleccionadaId, setSolicitudSeleccionadaId] =
    useState<number | null>(null);

  const [cargando, setCargando] = useState(true);

  // =======================================================
  // CARGA INICIAL DE DATOS PROVISIONALES
  // =======================================================

  useEffect(() => {
    setSolicitudes(solicitudesMock);
    setAhora(Date.now());
    setCargando(false);

    const intervalo = window.setInterval(() => {
      setAhora(Date.now());
    }, 60000);

    return () => window.clearInterval(intervalo);
  }, []);

  // =======================================================
  // ACTUALIZAR FILTROS
  // =======================================================

  function actualizarFiltro<K extends keyof FiltrosSolicitudes>(
    campo: K,
    valor: FiltrosSolicitudes[K]
  ) {
    setFiltros((anteriores) => ({
      ...anteriores,
      [campo]: valor,
    }));
  }

  function restablecerFiltros() {
    setFiltros({ ...FILTROS_INICIALES });
  }

  // =======================================================
  // INDICADORES GENERALES
  // =======================================================

  const indicadores = useMemo(
    () => calcularIndicadoresSolicitudes(solicitudes),
    [solicitudes]
  );

  const indicadoresSla = useMemo(
    () => calcularIndicadoresSla(solicitudes, ahora),
    [solicitudes, ahora]
  );

  // =======================================================
  // FILTRAR SOLICITUDES
  // =======================================================

  const solicitudesFiltradas = useMemo(() => {
    const busqueda = normalizarTexto(filtros.busqueda);

    return solicitudes
      .filter((solicitud) => {
        const estado = normalizarEstadoSolicitud(
          solicitud.estado
        );

        const nivelSla = calcularNivelSla(
          solicitud,
          ahora
        );

        const textoBusqueda = normalizarTexto(
          [
            solicitud.codigo,
            solicitud.beneficiario.nombreCompleto,
            solicitud.medicamento.nombre,
            solicitud.medicamento.concentracion,
            solicitud.numeroOrdenMedica ?? "",
          ].join(" ")
        );

        const coincideBusqueda =
          !busqueda || textoBusqueda.includes(busqueda);

        const coincideEstado =
          filtros.estado === "TODAS" ||
          estado === filtros.estado;

        const coincideSla =
          filtros.sla === "TODOS" ||
          nivelSla === filtros.sla;

        const fecha = obtenerFechaLocal(
          solicitud.fechaCreacion
        );

        const coincideFechaDesde =
          !filtros.fechaDesde ||
          (fecha !== "" && fecha >= filtros.fechaDesde);

        const coincideFechaHasta =
          !filtros.fechaHasta ||
          (fecha !== "" && fecha <= filtros.fechaHasta);

        return (
          coincideBusqueda &&
          coincideEstado &&
          coincideSla &&
          coincideFechaDesde &&
          coincideFechaHasta
        );
      })
      .sort((a, b) => {
        const pendienteA = esSolicitudPendiente(a);
        const pendienteB = esSolicitudPendiente(b);

        // Primero las solicitudes pendientes.
        if (pendienteA !== pendienteB) {
          return pendienteA ? -1 : 1;
        }

        // Las pendientes más antiguas tienen prioridad.
        if (pendienteA && pendienteB) {
          return (
            new Date(a.fechaCreacion).getTime() -
            new Date(b.fechaCreacion).getTime()
          );
        }

        // Las demás se ordenan de reciente a antigua.
        return (
          new Date(b.fechaCreacion).getTime() -
          new Date(a.fechaCreacion).getTime()
        );
      });
  }, [solicitudes, filtros, ahora]);

  // =======================================================
  // INFORMACIÓN PARA LA TABLA
  // =======================================================

  const filas = useMemo(
    () =>
      solicitudesFiltradas.map((solicitud) => ({
        solicitud,
        estado: normalizarEstadoSolicitud(solicitud.estado),
        nivelSla: calcularNivelSla(solicitud, ahora),
        tiempoEspera: esSolicitudPendiente(solicitud)
          ? formatearTiempoEspera(
              calcularMinutosEspera(
                solicitud.fechaCreacion,
                ahora
              )
            )
          : "—",
      })),
    [solicitudesFiltradas, ahora]
  );

  // =======================================================
  // SELECCIONAR SOLICITUD
  // =======================================================

  const solicitudSeleccionada = useMemo(
    () =>
      solicitudes.find(
        (solicitud) =>
          solicitud.id === solicitudSeleccionadaId
      ) ?? null,
    [solicitudes, solicitudSeleccionadaId]
  );

  function seleccionarSolicitud(id: number) {
    setSolicitudSeleccionadaId(id);
  }

  function cerrarDetalle() {
    setSolicitudSeleccionadaId(null);
  }

  // =======================================================
  // VERIFICAR FILTROS ACTIVOS
  // =======================================================

  const hayFiltrosActivos =
    filtros.busqueda.trim() !== "" ||
    filtros.estado !== "TODAS" ||
    filtros.sla !== "TODOS" ||
    filtros.fechaDesde !== "" ||
    filtros.fechaHasta !== "";

  // =======================================================
  // RETORNO DEL HOOK
  // =======================================================

  return {
    solicitudes,
    solicitudesFiltradas,
    filas,
    indicadores,
    indicadoresSla,
    filtros,
    cargando,
    hayFiltrosActivos,
    solicitudSeleccionada,
    actualizarFiltro,
    restablecerFiltros,
    seleccionarSolicitud,
    cerrarDetalle,
  };
}