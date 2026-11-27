import type {
  TipoNotificacion,
  CategoriaNotificacion,
  PrioridadNotificacion,
  VistaNotificaciones,
  FiltrosNotificaciones,
} from "../types";

// Etiquetas visibles de los tipos de notificaciones.
export const TIPOS_NOTIFICACION: Record<TipoNotificacion, string> = {
  CONFIRMACION_RESERVA: "Confirmación de reserva",
  MEDICAMENTO_LISTO: "Medicamento listo",
  VENCIMIENTO_24H: "Vencimiento en 24 horas",
  VENCIMIENTO_2H: "Vencimiento en 2 horas",
  PRORROGA: "Prórroga de reserva",
  EXPIRACION: "Reserva vencida",
  REABASTECIMIENTO: "Reabastecimiento",
  RETRASO_ALISTAMIENTO: "Retraso en alistamiento",
  INCONSISTENCIA_LOTE: "Inconsistencia de lote",
  CANCELACION_FARMACIA: "Cancelación por farmacia",
};

// Clasificación general de las notificaciones.
export const CATEGORIAS_NOTIFICACION: Record<
  CategoriaNotificacion,
  string
> = {
  RESERVA: "Reserva",
  MEDICAMENTO: "Medicamento",
  INCIDENCIA: "Incidencia",
};

// Etiquetas de los niveles de importancia.
export const PRIORIDADES_NOTIFICACION: Record<
  PrioridadNotificacion,
  string
> = {
  INFORMATIVA: "Informativa",
  IMPORTANTE: "Importante",
  URGENTE: "Urgente",
};

// Opciones de navegación interna del módulo.
export const VISTAS_NOTIFICACIONES: {
  valor: VistaNotificaciones;
  etiqueta: string;
}[] = [
  {
    valor: "TODAS",
    etiqueta: "Todas",
  },
  {
    valor: "SIN_LEER",
    etiqueta: "Sin leer",
  },
  {
    valor: "INCIDENCIAS",
    etiqueta: "Incidencias",
  },
];

// Opciones disponibles en el filtro por tipo.
export const OPCIONES_TIPO_NOTIFICACION: {
  valor: TipoNotificacion | "TODOS";
  etiqueta: string;
}[] = [
  {
    valor: "TODOS",
    etiqueta: "Todos los tipos",
  },
  ...(
    Object.entries(TIPOS_NOTIFICACION) as [
      TipoNotificacion,
      string,
    ][]
  ).map(([valor, etiqueta]) => ({
    valor,
    etiqueta,
  })),
];

// Estado inicial de los filtros.
export const FILTROS_NOTIFICACIONES_INICIALES: FiltrosNotificaciones = {
  busqueda: "",
  tipo: "TODOS",
};

// Vista seleccionada al ingresar al módulo.
export const VISTA_NOTIFICACIONES_INICIAL: VistaNotificaciones =
  "TODAS";