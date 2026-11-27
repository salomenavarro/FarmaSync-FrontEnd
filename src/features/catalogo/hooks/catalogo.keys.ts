// Claves centralizadas para consultas y alertas de stock del feature catálogo.
// Incluir los parámetros de consulta permite que TanStack Query cachee distintas
// búsquedas o filtros sin colisionar entre sí.
export const catalogoKeys = {
  all: ["catalogo"] as const,
  medicamentos: (params?: {
    search?: string;
    sedeId?: string;
    ciudad?: string;
    zona?: string;
    lat?: number;
    lng?: number;
  }) => [...catalogoKeys.all, "medicamentos", params ?? {}] as const,
  alertas: () => [...catalogoKeys.all, "alertas"] as const,
};