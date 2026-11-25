// Claves centralizadas para consultas y caché del feature grupo-familiar.
// Centralizarlas evita escribir strings sueltos en distintos hooks y facilita
// invalidar o refrescar la lista tras crear, editar o eliminar dependientes.
export const grupoFamiliarKeys = {
  all: ["grupo-familiar"] as const,
  lists: () => [...grupoFamiliarKeys.all, "list"] as const,
  detail: (id: string | number) =>
    [...grupoFamiliarKeys.all, "detail", String(id)] as const,
};