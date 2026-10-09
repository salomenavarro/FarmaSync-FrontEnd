import { z } from "zod";

// Solo valida que los campos no estén vacíos. La regla de formato
// fuerte de contraseña (8+ caracteres, mayúscula, número) es de
// REGISTRO (RF-001), no de login — aquí solo se está comprobando
// una contraseña que ya existe, no creándola.
export const loginSchema = z.object({
  numeroDocumento: z.string().min(1, "El número de documento es obligatorio."),
  password: z.string().min(1, "La contraseña es obligatoria."),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
