import { z } from "zod";

// RF-001: nombre, documento, correo, teléfono y contraseña
// (mín. 8 caracteres, una mayúscula y un número). Mismas reglas que
// el RegisterDto del backend — si el backend cambia, este archivo
// tiene que cambiar junto con él.
export const registerSchema = z.object({
  nombreCompleto: z.string().min(1, "El nombre completo es obligatorio."),
  numeroDocumento: z.string().min(1, "El número de documento es obligatorio."),
  telefono: z.string().min(1, "El teléfono es obligatorio."),
  correo: z.string().email("Ingresa un correo válido."),
  password: z
    .string()
    .min(8, "La contraseña debe tener mínimo 8 caracteres.")
    .regex(/[A-Z]/, "Debe tener al menos una mayúscula.")
    .regex(/[0-9]/, "Debe tener al menos un número."),
});

export type RegisterFormValues = z.infer<typeof registerSchema>;
