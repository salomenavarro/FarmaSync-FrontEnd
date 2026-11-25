// Tipos de notificaciones contemplados en los requisitos del módulo.
export type TipoNotificacion =
  | "CONFIRMACION_RESERVA"
  | "MEDICAMENTO_LISTO"
  | "VENCIMIENTO_24H"
  | "VENCIMIENTO_2H"
  | "PRORROGA"
  | "EXPIRACION"
  | "REABASTECIMIENTO"
  | "RETRASO_ALISTAMIENTO"
  | "INCONSISTENCIA_LOTE"
  | "CANCELACION_FARMACIA";

// Clasificación para diferenciar notificaciones e incidencias.
export type CategoriaNotificacion =
  | "RESERVA"
  | "MEDICAMENTO"
  | "INCIDENCIA";

// Nivel de importancia de la notificación.
export type PrioridadNotificacion =
  | "INFORMATIVA"
  | "IMPORTANTE"
  | "URGENTE";

// Modelo utilizado por la capa de presentación.
export interface Notificacion {
  id: string;
  tipo: TipoNotificacion;
  categoria: CategoriaNotificacion;
  prioridad: PrioridadNotificacion;
  titulo: string;
  mensaje: string;
  fechaCreacion: string;
  leida: boolean;
  fechaLectura?: string;
  reservaId?: string;
  codigoReserva?: string;
  medicamentoId?: string;
  medicamentoNombre?: string;
  medicamentoCodigo?: string;
  sedeId?: string;
  sedeNombre?: string;
  fechaVencimiento?: string;
}

// Opciones para las pestañas del módulo.
export type VistaNotificaciones =
  | "TODAS"
  | "SIN_LEER"
  | "INCIDENCIAS";

// Filtros de búsqueda y clasificación.
export interface FiltrosNotificaciones {
  busqueda: string;
  tipo: TipoNotificacion | "TODOS";
}

// Indicadores generales del módulo.
export interface IndicadoresNotificaciones {
  total: number;
  sinLeer: number;
  leidas: number;
  incidencias: number;
}