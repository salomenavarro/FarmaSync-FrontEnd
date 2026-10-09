// Usado por DashboardShell (topbar) y dashboard/page.tsx (círculo de
// resumen) — un solo lugar que decide cómo se sacan las iniciales.
export function getInitials(nombreCompleto: string): string {
  const palabras = nombreCompleto.trim().split(/\s+/);
  const primeras = palabras.slice(0, 2).map((p) => p[0] ?? "");
  return primeras.join("").toUpperCase() || "?";
}
