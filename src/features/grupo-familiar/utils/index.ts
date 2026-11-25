export function ocultarDocumento(documento: string) {
  return `****${documento.slice(-4)}`;
}

export function formatearFecha(fecha: string) {
  if (!fecha) return "No registrada";

  const [anio, mes, dia] = fecha.split("-").map(Number);

  return new Intl.DateTimeFormat("es-CO", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(anio, mes - 1, dia));
}
