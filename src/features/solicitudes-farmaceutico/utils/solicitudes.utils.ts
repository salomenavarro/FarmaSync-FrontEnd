import type { EstadoReserva } from "@/features/reservas/types";

import type {
  SolicitudFarmaceutico,
  NivelSla,
  IndicadoresSolicitudes,
  IndicadoresSla,
} from "../types";

// =========================================================
// CONSTANTES DEL SEMÁFORO SLA
// =========================================================

const LIMITE_VERDE = 60;
const LIMITE_AMARILLO = 120;

// =========================================================
// NORMALIZAR ESTADO
// =========================================================

export function normalizarEstadoSolicitud(
  estado: EstadoReserva
): "ACTIVA" | "COMPLETADA" | "CANCELADA" | "VENCIDA" {
  switch (estado) {
    case "PENDIENTE":
    case "ACTIVA":
      return "ACTIVA";

    case "ENTREGADA":
    case "COMPLETADA":
      return "COMPLETADA";

    case "CANCELADA_USUARIO":
    case "CANCELADA":
      return "CANCELADA";

    case "EXPIRADA":
    case "VENCIDA":
      return "VENCIDA";
  }
}

// =========================================================
// VERIFICAR SOLICITUD PENDIENTE
// =========================================================

export function esSolicitudPendiente(
  solicitud: SolicitudFarmaceutico
): boolean {
  return normalizarEstadoSolicitud(solicitud.estado) === "ACTIVA";
}

// =========================================================
// CALCULAR TIEMPO DE ESPERA
// =========================================================

export function calcularMinutosEspera(
  fechaCreacion: string,
  ahora: number
): number | null {
  const fecha = new Date(fechaCreacion).getTime();

  if (!Number.isFinite(fecha) || !Number.isFinite(ahora)) {
    return null;
  }

  return Math.max(0, Math.floor((ahora - fecha) / 60000));
}

// =========================================================
// CALCULAR NIVEL SLA
// =========================================================

export function calcularNivelSla(
  solicitud: SolicitudFarmaceutico,
  ahora: number
): NivelSla | null {
  if (!esSolicitudPendiente(solicitud)) {
    return null;
  }

  const minutos = calcularMinutosEspera(
    solicitud.fechaCreacion,
    ahora
  );

  if (minutos === null) {
    return null;
  }

  if (minutos < LIMITE_VERDE) {
    return "VERDE";
  }

  if (minutos <= LIMITE_AMARILLO) {
    return "AMARILLO";
  }

  return "ROJO";
}

// =========================================================
// FORMATEAR TIEMPO DE ESPERA
// =========================================================

export function formatearTiempoEspera(
  minutos: number | null
): string {
  if (minutos === null) {
    return "No disponible";
  }

  const horas = Math.floor(minutos / 60);
  const minutosRestantes = minutos % 60;

  if (horas === 0) {
    return `${minutosRestantes} min`;
  }

  if (minutosRestantes === 0) {
    return `${horas} h`;
  }

  return `${horas} h ${minutosRestantes} min`;
}

// =========================================================
// CALCULAR INDICADORES GENERALES
// =========================================================

export function calcularIndicadoresSolicitudes(
  solicitudes: SolicitudFarmaceutico[]
): IndicadoresSolicitudes {
  const indicadores: IndicadoresSolicitudes = {
    total: solicitudes.length,
    pendientes: 0,
    entregadas: 0,
    canceladas: 0,
    vencidas: 0,
  };

  for (const solicitud of solicitudes) {
    const estado = normalizarEstadoSolicitud(solicitud.estado);

    switch (estado) {
      case "ACTIVA":
        indicadores.pendientes++;
        break;

      case "COMPLETADA":
        indicadores.entregadas++;
        break;

      case "CANCELADA":
        indicadores.canceladas++;
        break;

      case "VENCIDA":
        indicadores.vencidas++;
        break;
    }
  }

  return indicadores;
}

// =========================================================
// CALCULAR INDICADORES SLA
// =========================================================

export function calcularIndicadoresSla(
  solicitudes: SolicitudFarmaceutico[],
  ahora: number
): IndicadoresSla {
  const indicadores: IndicadoresSla = {
    verde: 0,
    amarillo: 0,
    rojo: 0,
  };

  for (const solicitud of solicitudes) {
    const nivel = calcularNivelSla(solicitud, ahora);

    switch (nivel) {
      case "VERDE":
        indicadores.verde++;
        break;

      case "AMARILLO":
        indicadores.amarillo++;
        break;

      case "ROJO":
        indicadores.rojo++;
        break;
    }
  }

  return indicadores;
}