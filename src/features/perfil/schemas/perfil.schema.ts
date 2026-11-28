import { z } from "zod";

export const perfilSchema = z.object({
  nombreCompleto: z
    .string()
    .trim()
    .min(1, "El nombre completo es obligatorio."),

  telefono: z
    .string()
    .trim()
    .min(1, "El teléfono es obligatorio."),
});

export type PerfilFormValues = z.infer<typeof perfilSchema>;