import { z } from "zod";

export const forgotPasswordSchema = z.object({
  numeroDocumento: z.string().min(1, "El número de documento es obligatorio."),
});

export type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;