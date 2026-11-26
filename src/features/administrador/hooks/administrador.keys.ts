// src/features/administrador/hooks/administrador.keys.ts
export const administradorKeys = {
  all: ["administrador"] as const,
  dashboard: () => [...administradorKeys.all, "dashboard-eps"] as const,
  empleados: () => [...administradorKeys.all, "empleados"] as const,
};