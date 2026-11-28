import { z } from "zod";

// =========================================================
// ESQUEMA DE BÚSQUEDA DE RESERVAS
// =========================================================

export const buscarReservaSchema = z.object({
  codigo: z
    .string()
    .trim()
    .min(1, "Ingresa el código de la reserva.")
    .max(100, "El código ingresado es demasiado largo."),
});

// =========================================================
// TIPO DEL FORMULARIO DE BÚSQUEDA
// =========================================================

export type BuscarReservaFormData = z.infer<
  typeof buscarReservaSchema
>;

// =========================================================
// ESQUEMA DE VERIFICACIONES DE ENTREGA
// =========================================================

export const verificacionesEntregaSchema = z.object({
  pacienteVerificado: z.boolean(),
  ordenMedicaVerificada: z.boolean(),
  medicamentoVerificado: z.boolean(),
  cantidadVerificada: z.boolean(),
});

// =========================================================
// TIPO DEL FORMULARIO DE VERIFICACIONES
// =========================================================

export type VerificacionesEntregaFormData = z.infer<
  typeof verificacionesEntregaSchema
>;