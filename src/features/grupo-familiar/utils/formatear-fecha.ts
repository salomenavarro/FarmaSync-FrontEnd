// Formatea fechas de nacimiento en formato YYYY-MM-DD (o ya normalizadas a 10
// caracteres) usando fecha calendario local para evitar desfases de zona horaria
// al crear un Date desde un string ISO sin hora.
export function formatearFecha(fecha: string): string {
  if (!fecha) return "No registrada";

  const fechaLimpia = fecha.slice(0, 10);
  const partes = fechaLimpia.split("-").map(Number);

  if (partes.length !== 3 || partes.some((n) => Number.isNaN(n))) {
    return "No registrada";
  }

  const [anio, mes, dia] = partes;

  return new Intl.DateTimeFormat("es-CO", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(anio, mes - 1, dia));
}