import { z } from "zod";

export const resetPasswordSchema = z
  .object({
    token: z.string().min(1, "El token de recuperación es obligatorio."),
    password: z
      .string()
      .min(8, "La contraseña debe tener mínimo 8 caracteres.")
      .regex(/[A-Z]/, "Debe tener al menos una mayúscula.")
      .regex(/[0-9]/, "Debe tener al menos un número."),
    confirmPassword: z.string().min(1, "Confirma tu nueva contraseña."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden.",
    path: ["confirmPassword"],
  });

export type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;