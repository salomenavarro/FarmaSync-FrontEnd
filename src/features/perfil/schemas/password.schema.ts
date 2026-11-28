import { z } from "zod";

export const passwordSchema = z
  .object({
    passwordActual: z
      .string()
      .min(1, "Ingresa tu contraseña actual."),

    passwordNueva: z
      .string()
      .min(8, "La contraseña debe tener mínimo 8 caracteres.")
      .regex(/[A-Z]/, "Debe tener al menos una mayúscula.")
      .regex(/[0-9]/, "Debe tener al menos un número."),

    confirmarPassword: z
      .string()
      .min(1, "Confirma tu nueva contraseña."),
  })
  .refine(
    (data) => data.passwordNueva === data.confirmarPassword,
    {
      message: "Las contraseñas no coinciden.",
      path: ["confirmarPassword"],
    }
  )
  .refine(
    (data) => data.passwordActual !== data.passwordNueva,
    {
      message: "La nueva contraseña debe ser diferente a la actual.",
      path: ["passwordNueva"],
    }
  );

export type PasswordFormValues = z.infer<typeof passwordSchema>;