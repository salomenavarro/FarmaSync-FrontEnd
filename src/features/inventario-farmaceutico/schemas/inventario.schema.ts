import { z } from "zod";

// =========================================================
// VALIDACIÓN DEL CÓDIGO EAN-13
// =========================================================

function esEan13Valido(codigo: string): boolean {
  if (!/^\d{13}$/.test(codigo)) {
    return false;
  }

  const digitos = codigo.split("").map(Number);

  const suma = digitos
    .slice(0, 12)
    .reduce((total, digito, indice) => {
      return total + digito * (indice % 2 === 0 ? 1 : 3);
    }, 0);

  const digitoControl = (10 - (suma % 10)) % 10;

  return digitoControl === digitos[12];
}

// =========================================================
// ESQUEMA DE INGRESO DE MEDICAMENTOS
// =========================================================

export const ingresoMedicamentoSchema = z.object({
  ean: z
    .string()
    .trim()
    .min(1, "Ingresa el código EAN-13.")
    .regex(/^\d{13}$/, "El código debe contener 13 dígitos.")
    .refine(esEan13Valido, {
      message: "El código EAN-13 no es válido.",
    }),

  cantidad: z
    .number()
    .int("La cantidad debe ser un número entero.")
    .min(1, "La cantidad debe ser mayor o igual a 1.")
    .max(
      Number.MAX_SAFE_INTEGER,
      "La cantidad ingresada es demasiado grande.",
    ),
});

// =========================================================
// ESQUEMA DE ACTUALIZACIÓN DE STOCK
// =========================================================

export const actualizarStockSchema = z.object({
  sedeId: z
    .number()
    .int("La sede debe tener un identificador válido.")
    .min(1, "Selecciona una sede válida."),

  cantidad: z
    .number()
    .int("La cantidad debe ser un número entero.")
    .min(0, "El stock no puede ser negativo."),
});