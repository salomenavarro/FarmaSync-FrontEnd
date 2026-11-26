import { z } from "zod";
import {
  DEPENDIENTE_LIMITS,
  PARENTESCOS,
  TIPOS_DOCUMENTO,
} from "./dependiente.constants";

// Calcula la fecha local/actual en formato YYYY-MM-DD para validar fechas de
// nacimiento sin depender de horas ni zonas horarias inconsistentes en el input date.
function getTodayIsoDate(): string {
  return new Date().toISOString().slice(0, 10);
}

// Schema de validación en el borde de la feature (formulario/entrada de usuario).
// Centraliza las reglas de forma y consistencia antes de invocar al servicio HTTP,
// evitando duplicar validaciones imperativas dentro de los componentes de UI.
export const dependienteFormSchema = z
  .object({
    nombres: z
      .string()
      .trim()
      .min(DEPENDIENTE_LIMITS.nombresMin, "Ingresa los nombres del dependiente.")
      .max(DEPENDIENTE_LIMITS.nombresMax, "Los nombres son demasiado largos."),

    apellidos: z
      .string()
      .trim()
      .min(DEPENDIENTE_LIMITS.apellidosMin, "Ingresa los apellidos del dependiente.")
      .max(DEPENDIENTE_LIMITS.apellidosMax, "Los apellidos son demasiado largos."),

    parentesco: z.enum(PARENTESCOS, {
      errorMap: () => ({ message: "Selecciona un parentesco válido." }),
    }),

    tipoDocumento: z.enum(TIPOS_DOCUMENTO, {
      errorMap: () => ({ message: "Selecciona un tipo de documento válido." }),
    }),

    numeroDocumento: z
      .string()
      .trim()
      .min(DEPENDIENTE_LIMITS.documentoMin, "Ingresa un número de documento válido.")
      .max(DEPENDIENTE_LIMITS.documentoMax, "El número de documento es demasiado largo.")
      .regex(/^\d+$/, "El número de documento solo debe contener dígitos."),

    fechaNacimiento: z
      .string()
      .trim()
      .min(1, "Selecciona la fecha de nacimiento.")
      .refine(
        (fecha) => fecha <= getTodayIsoDate(),
        "La fecha de nacimiento no puede ser futura."
      ),

    correoElectronico: z
      .string()
      .trim()
      .optional()
      .or(z.literal("")),
  })
  .superRefine((data, ctx) => {
    // Regla condicional de negocio en el formulario: cuando el dependiente tiene
    // Cédula de Ciudadanía (CC), el correo electrónico es obligatorio y válido.
    if (data.tipoDocumento === "CC") {
      const correo = (data.correoElectronico ?? "").trim();

      if (!correo) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["correoElectronico"],
          message:
            "El correo electrónico es obligatorio para Cédula de Ciudadanía.",
        });
        return;
      }

      const emailResult = z
        .string()
        .email("Ingresa un correo electrónico válido.")
        .safeParse(correo);

      if (!emailResult.success) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["correoElectronico"],
          message: "Ingresa un correo electrónico válido.",
        });
      }
    }
  })
  .transform((data) => ({
    ...data,
    // Limpia correoElectronico si el tipo de documento no es CC, para no enviar
    // datos residuales cuando el usuario cambia de tipo de documento en el form.
    correoElectronico:
      data.tipoDocumento === "CC" && data.correoElectronico
        ? data.correoElectronico.trim()
        : undefined,
  }));

export type DependienteFormSchemaInput = z.input<typeof dependienteFormSchema>;
export type DependienteFormSchemaOutput = z.output<typeof dependienteFormSchema>;