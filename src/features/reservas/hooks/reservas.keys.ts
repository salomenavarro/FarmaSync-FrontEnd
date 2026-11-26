// Claves centralizadas para consultas y mutaciones del módulo de reservas.
export const reservasKeys = {
  all: ["reservas"] as const,
  mias: () => [...reservasKeys.all, "mias"] as const,
};