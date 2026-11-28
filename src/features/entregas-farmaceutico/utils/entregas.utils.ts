import type {
  ReservaEntrega,
  IndicadoresEntregas,
  FiltrosHistorialEntregas,
  VerificacionesEntrega,
} from "../types";

// =========================================================
// NORMALIZACIÓN DE TEXTO
// =========================================================

export function normalizarTexto(texto: string): string {
  return texto
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

// =========================================================
// BÚSQUEDA DE RESERVA POR CÓDIGO
// =========================================================

export function buscarReservaPorCodigo(
  reservas: ReservaEntrega[],
  codigo: string
): ReservaEntrega | null {
  const codigoNormalizado = codigo.trim().toUpperCase();

  if (!codigoNormalizado) {
    return null;
  }

  return (
    reservas.find(
      (reserva) =>
        reserva.codigo.trim().toUpperCase() === codigoNormalizado
    ) ?? null
  );
}

// =========================================================
// ESTADOS DE RESERVA
// =========================================================

export function esReservaPendiente(
  reserva: ReservaEntrega
): boolean {
  return (
    reserva.estado === "PENDIENTE" ||
    reserva.estado === "ACTIVA"
  );
}

export function esReservaEntregada(
  reserva: ReservaEntrega
): boolean {
  return (
    reserva.estado === "ENTREGADA" ||
    reserva.estado === "COMPLETADA"
  );
}

export function esReservaCancelada(
  reserva: ReservaEntrega
): boolean {
  return (
    reserva.estado === "CANCELADA" ||
    reserva.estado === "CANCELADA_USUARIO"
  );
}

export function esReservaVencida(
  reserva: ReservaEntrega
): boolean {
  return (
    reserva.estado === "VENCIDA" ||
    reserva.estado === "EXPIRADA"
  );
}

// =========================================================
// MENSAJE SEGÚN EL ESTADO DE LA RESERVA
// =========================================================

export function obtenerMensajeEstado(
  reserva: ReservaEntrega
): string {
  if (esReservaEntregada(reserva)) {
    return "Esta reserva ya fue entregada.";
  }

  if (esReservaCancelada(reserva)) {
    return "Esta reserva fue cancelada.";
  }

  if (esReservaVencida(reserva)) {
    return "Esta reserva se encuentra vencida.";
  }

  if (esReservaPendiente(reserva)) {
    return "Reserva pendiente. Verifica los datos antes de continuar.";
  }

  return "No se pudo determinar el estado de la reserva.";
}

// =========================================================
// VERIFICACIONES DE ENTREGA
// =========================================================

export function todasLasVerificacionesCompletas(
  verificaciones: VerificacionesEntrega
): boolean {
  return (
    verificaciones.pacienteVerificado &&
    verificaciones.ordenMedicaVerificada &&
    verificaciones.medicamentoVerificado &&
    verificaciones.cantidadVerificada
  );
}

// =========================================================
// FECHA LOCAL DE COLOMBIA
// =========================================================

export function obtenerFechaLocal(
  fecha: string | Date
): string {
  const valor =
    typeof fecha === "string" ? new Date(fecha) : fecha;

  if (Number.isNaN(valor.getTime())) {
    return "";
  }

  const partes = new Intl.DateTimeFormat("es-CO", {
    timeZone: "America/Bogota",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(valor);

  const anio = partes.find(
    (parte) => parte.type === "year"
  )?.value;

  const mes = partes.find(
    (parte) => parte.type === "month"
  )?.value;

  const dia = partes.find(
    (parte) => parte.type === "day"
  )?.value;

  if (!anio || !mes || !dia) {
    return "";
  }

  return `${anio}-${mes}-${dia}`;
}

// =========================================================
// FORMATO DE FECHA Y HORA
// =========================================================

export function formatearFechaEntrega(
  fecha?: string
): string {
  if (!fecha) {
    return "No disponible";
  }

  const valor = new Date(fecha);

  if (Number.isNaN(valor.getTime())) {
    return "Fecha no disponible";
  }

  return new Intl.DateTimeFormat("es-CO", {
    timeZone: "America/Bogota",
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  }).format(valor);
}

// =========================================================
// HISTORIAL DE ENTREGAS
// =========================================================

export function obtenerHistorialEntregas(
  reservas: ReservaEntrega[]
): ReservaEntrega[] {
  return reservas
    .filter(esReservaEntregada)
    .sort((a, b) => {
      const fechaA = Date.parse(a.fechaEntrega ?? "");
      const fechaB = Date.parse(b.fechaEntrega ?? "");

      const tiempoA = Number.isFinite(fechaA) ? fechaA : 0;
      const tiempoB = Number.isFinite(fechaB) ? fechaB : 0;

      return tiempoB - tiempoA;
    });
}

// =========================================================
// INDICADORES DE ENTREGAS
// =========================================================

export function calcularIndicadoresEntregas(
  reservas: ReservaEntrega[],
  ahora: Date
): IndicadoresEntregas {
  const hoy = obtenerFechaLocal(ahora);

  const entregadas = reservas.filter(esReservaEntregada);

  const entregasHoy = entregadas.filter(
    (reserva) =>
      hoy !== "" &&
      reserva.fechaEntrega &&
      obtenerFechaLocal(reserva.fechaEntrega) === hoy
  ).length;

  return {
    entregasHoy,
    entregasTotales: entregadas.length,
    reservasPendientes: reservas.filter(
      esReservaPendiente
    ).length,
  };
}

// =========================================================
// FILTRADO DEL HISTORIAL
// =========================================================

export function filtrarHistorialEntregas(
  reservas: ReservaEntrega[],
  filtros: FiltrosHistorialEntregas
): ReservaEntrega[] {
  const busqueda = normalizarTexto(filtros.busqueda);

  return obtenerHistorialEntregas(reservas).filter(
    (reserva) => {
      const textoReserva = normalizarTexto(
        [
          reserva.codigo,
          reserva.beneficiario.nombreCompleto,
          reserva.medicamento.nombre,
          reserva.medicamento.concentracion,
          reserva.numeroOrdenMedica ?? "",
        ].join(" ")
      );

      const coincideBusqueda =
        !busqueda || textoReserva.includes(busqueda);

      const fechaEntrega = reserva.fechaEntrega
        ? obtenerFechaLocal(reserva.fechaEntrega)
        : "";

      const coincideFechaDesde =
        !filtros.fechaDesde ||
        (fechaEntrega !== "" &&
          fechaEntrega >= filtros.fechaDesde);

      const coincideFechaHasta =
        !filtros.fechaHasta ||
        (fechaEntrega !== "" &&
          fechaEntrega <= filtros.fechaHasta);

      return (
        coincideBusqueda &&
        coincideFechaDesde &&
        coincideFechaHasta
      );
    }
  );
}