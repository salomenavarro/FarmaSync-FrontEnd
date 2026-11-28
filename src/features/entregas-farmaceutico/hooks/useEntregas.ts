"use client";

import { useEffect, useMemo, useState } from "react";

import { entregasMock } from "../data/entregasMock";

import type {
  ReservaEntrega,
  EstadoBusquedaEntrega,
  VerificacionesEntrega,
  FiltrosHistorialEntregas,
} from "../types";

import {
  buscarReservaPorCodigo,
  esReservaPendiente,
  obtenerMensajeEstado,
  todasLasVerificacionesCompletas,
  calcularIndicadoresEntregas,
  filtrarHistorialEntregas,
} from "../utils/entregas.utils";

// =========================================================
// VALORES INICIALES
// =========================================================

const VERIFICACIONES_INICIALES: VerificacionesEntrega = {
  pacienteVerificado: false,
  ordenMedicaVerificada: false,
  medicamentoVerificado: false,
  cantidadVerificada: false,
};

const FILTROS_INICIALES: FiltrosHistorialEntregas = {
  busqueda: "",
  fechaDesde: "",
  fechaHasta: "",
};

// =========================================================
// HOOK PRINCIPAL
// =========================================================

export function useEntregas(codigoInicial = "") {
  const [reservas, setReservas] = useState<ReservaEntrega[]>([]);

  const [cargando, setCargando] = useState(true);

  const [ahora, setAhora] = useState<Date | null>(null);

  const [reservaSeleccionada, setReservaSeleccionada] =
    useState<ReservaEntrega | null>(null);

  const [estadoBusqueda, setEstadoBusqueda] =
    useState<EstadoBusquedaEntrega>("INICIAL");

  const [codigoBuscado, setCodigoBuscado] = useState("");

  const [verificaciones, setVerificaciones] =
    useState<VerificacionesEntrega>(VERIFICACIONES_INICIALES);

  const [filtrosHistorial, setFiltrosHistorial] =
    useState<FiltrosHistorialEntregas>(FILTROS_INICIALES);

  // =========================================================
  // CARGA INICIAL DE DATOS
  // =========================================================

  useEffect(() => {
    setReservas(entregasMock);
    setAhora(new Date());
    setCargando(false);

    const codigo = codigoInicial.trim();

    setVerificaciones(VERIFICACIONES_INICIALES);
    setCodigoBuscado(codigo);

    if (codigo) {
      const reserva = buscarReservaPorCodigo(
        entregasMock,
        codigo
      );

      setReservaSeleccionada(reserva);

      setEstadoBusqueda(
        reserva ? "ENCONTRADA" : "NO_ENCONTRADA"
      );
    } else {
      setReservaSeleccionada(null);
      setEstadoBusqueda("INICIAL");
    }

    const intervalo = window.setInterval(() => {
      setAhora(new Date());
    }, 60000);

    return () => {
      window.clearInterval(intervalo);
    };
  }, [codigoInicial]);

  // =========================================================
  // BUSCAR RESERVA
  // =========================================================

  function buscarReserva(codigo: string) {
    const codigoLimpio = codigo.trim();

    setCodigoBuscado(codigoLimpio);
    setVerificaciones(VERIFICACIONES_INICIALES);

    if (!codigoLimpio) {
      setReservaSeleccionada(null);
      setEstadoBusqueda("INICIAL");
      return;
    }

    const reserva = buscarReservaPorCodigo(
      reservas,
      codigoLimpio
    );

    setReservaSeleccionada(reserva);

    setEstadoBusqueda(
      reserva ? "ENCONTRADA" : "NO_ENCONTRADA"
    );
  }

  // =========================================================
  // LIMPIAR BÚSQUEDA
  // =========================================================

  function limpiarBusqueda() {
    setReservaSeleccionada(null);
    setEstadoBusqueda("INICIAL");
    setCodigoBuscado("");
    setVerificaciones(VERIFICACIONES_INICIALES);
  }

  // =========================================================
  // ACTUALIZAR VERIFICACIONES
  // =========================================================

  function actualizarVerificacion(
    campo: keyof VerificacionesEntrega,
    valor: boolean
  ) {
    if (
      !reservaSeleccionada ||
      !esReservaPendiente(reservaSeleccionada)
    ) {
      return;
    }

    setVerificaciones((anteriores) => ({
      ...anteriores,
      [campo]: valor,
    }));
  }

  // =========================================================
  // ESTADO DE LAS VERIFICACIONES
  // =========================================================

  const verificacionesCompletas = useMemo(() => {
    return todasLasVerificacionesCompletas(verificaciones);
  }, [verificaciones]);

  const permiteVerificacion = useMemo(() => {
    return (
      reservaSeleccionada !== null &&
      esReservaPendiente(reservaSeleccionada)
    );
  }, [reservaSeleccionada]);

  const cantidadVerificaciones = useMemo(() => {
    return Object.values(verificaciones).filter(Boolean).length;
  }, [verificaciones]);

  // =========================================================
  // MENSAJE DE ESTADO
  // =========================================================

  const mensajeEstado = useMemo(() => {
    if (!reservaSeleccionada) {
      return "";
    }

    return obtenerMensajeEstado(reservaSeleccionada);
  }, [reservaSeleccionada]);

  // =========================================================
  // INDICADORES
  // =========================================================

  const indicadores = useMemo(() => {
    if (!ahora) {
      return {
        entregasHoy: 0,
        entregasTotales: 0,
        reservasPendientes: 0,
      };
    }

    return calcularIndicadoresEntregas(reservas, ahora);
  }, [reservas, ahora]);

  // =========================================================
  // HISTORIAL DE ENTREGAS
  // =========================================================

  const historial = useMemo(() => {
    return filtrarHistorialEntregas(
      reservas,
      filtrosHistorial
    );
  }, [reservas, filtrosHistorial]);

  // =========================================================
  // ACTUALIZAR FILTROS DEL HISTORIAL
  // =========================================================

  function actualizarFiltroHistorial<
    K extends keyof FiltrosHistorialEntregas
  >(
    campo: K,
    valor: FiltrosHistorialEntregas[K]
  ) {
    setFiltrosHistorial((anteriores) => ({
      ...anteriores,
      [campo]: valor,
    }));
  }

  // =========================================================
  // RESTABLECER FILTROS
  // =========================================================

  function restablecerFiltrosHistorial() {
    setFiltrosHistorial(FILTROS_INICIALES);
  }

  const hayFiltrosActivos = useMemo(() => {
    return (
      filtrosHistorial.busqueda.trim() !== "" ||
      filtrosHistorial.fechaDesde !== "" ||
      filtrosHistorial.fechaHasta !== ""
    );
  }, [filtrosHistorial]);

  // =========================================================
  // VALORES Y FUNCIONES DISPONIBLES
  // =========================================================

  return {
    cargando,
    reservaSeleccionada,
    estadoBusqueda,
    codigoBuscado,
    mensajeEstado,

    verificaciones,
    verificacionesCompletas,
    permiteVerificacion,
    cantidadVerificaciones,

    indicadores,
    historial,
    filtrosHistorial,
    hayFiltrosActivos,

    buscarReserva,
    limpiarBusqueda,
    actualizarVerificacion,
    actualizarFiltroHistorial,
    restablecerFiltrosHistorial,
  };
}