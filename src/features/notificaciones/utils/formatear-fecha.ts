const ZONA_HORARIA = "America/Bogota";

// Formatea una fecha completa para mostrarla al paciente.
export function formatearFecha(fecha: string): string {
  const fechaNotificacion = new Date(fecha);

  if (Number.isNaN(fechaNotificacion.getTime())) {
    return "Fecha no disponible";
  }

  return new Intl.DateTimeFormat("es-CO", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: ZONA_HORARIA,
  }).format(fechaNotificacion);
}

// Formatea la hora de creación de una notificación.
export function formatearHora(fecha: string): string {
  const fechaNotificacion = new Date(fecha);

  if (Number.isNaN(fechaNotificacion.getTime())) {
    return "Hora no disponible";
  }

  return new Intl.DateTimeFormat("es-CO", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZone: ZONA_HORARIA,
  }).format(fechaNotificacion);
}

// Calcula el tiempo transcurrido desde la notificación.
export function formatearTiempoRelativo(
  fecha: string,
  ahora: number = Date.now()
): string {
  const fechaNotificacion = new Date(fecha).getTime();

  if (Number.isNaN(fechaNotificacion)) {
    return "Fecha no disponible";
  }

  const diferencia = ahora - fechaNotificacion;

  if (diferencia < 0) {
    return formatearFecha(fecha);
  }

  const minutos = Math.floor(diferencia / 60000);
  const horas = Math.floor(minutos / 60);
  const dias = Math.floor(horas / 24);

  if (minutos < 1) {
    return "Ahora mismo";
  }

  if (minutos < 60) {
    return `Hace ${minutos} ${minutos === 1 ? "minuto" : "minutos"}`;
  }

  if (horas < 24) {
    return `Hace ${horas} ${horas === 1 ? "hora" : "horas"}`;
  }

  if (dias < 7) {
    return `Hace ${dias} ${dias === 1 ? "día" : "días"}`;
  }

  return formatearFecha(fecha);
}

// Agrupa las notificaciones según su fecha de creación.
export function obtenerGrupoFecha(
  fecha: string,
  ahora: number = Date.now()
): string {
  const fechaNotificacion = new Date(fecha);

  if (Number.isNaN(fechaNotificacion.getTime())) {
    return "Sin fecha";
  }

  const formateador = new Intl.DateTimeFormat("en-CA", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    timeZone: ZONA_HORARIA,
  });

  const fechaActual = formateador.format(new Date(ahora));

  const fechaAyer = formateador.format(
    new Date(ahora - 86400000)
  );

  const fechaRegistro = formateador.format(fechaNotificacion);

  if (fechaRegistro === fechaActual) {
    return "Hoy";
  }

  if (fechaRegistro === fechaAyer) {
    return "Ayer";
  }

  return formatearFecha(fecha);
}