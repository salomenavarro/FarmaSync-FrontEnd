import { z } from "zod";

export const completeProfileSchema = z.object({
  numeroDocumento: z
    .string()
    .min(5, "El número de documento debe tener al menos 5 dígitos")
    .max(15, "El número de documento no puede superar los 15 dígitos")
    .regex(/^[0-9]+$/, "El número de documento solo debe contener números"),
  telefono: z
    .string()
    .min(7, "El teléfono debe tener al menos 7 dígitos")
    .max(12, "El teléfono no puede superar los 12 dígitos")
    .regex(/^[0-9]+$/, "El teléfono solo debe contener números"),
});

export type CompleteProfileFormValues = z.infer<typeof completeProfileSchema>;