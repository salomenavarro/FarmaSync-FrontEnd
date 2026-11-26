// Espejo en el frontend de los valores permitidos en el backend
// (src/modules/users/presentation/http/dto/dependiente.constants.ts).
// Se mantienen aquí como constante de esquema/validación de la feature para
// evitar strings mágicos dispersos y asegurar que el payload coincida con la API.
export const TIPOS_DOCUMENTO = ["RC", "TI", "CC"] as const;
export type TipoDocumentoSchema = (typeof TIPOS_DOCUMENTO)[number];

// Códigos estables enviados al backend: la API no depende de textos con tildes
// ni barras, ya que la traducción a etiquetas visibles es de presentación.
export const PARENTESCOS = ["HIJO", "PADRE_MADRE", "ABUELO", "OTRO"] as const;
export type ParentescoCodigo = (typeof PARENTESCOS)[number];

// Etiquetas de interfaz separadas de los códigos de dominio/API para permitir
// cambiar copy o idioma en la vista sin alterar los contratos de red.
export const PARENTESCO_LABELS: Record<ParentescoCodigo, string> = {
  HIJO: "Hijo / Hija",
  PADRE_MADRE: "Padre / Madre",
  ABUELO: "Abuelo / Abuela",
  OTRO: "Otro",
};

export const TIPO_DOCUMENTO_LABELS: Record<TipoDocumentoSchema, string> = {
  RC: "Registro Civil",
  TI: "Tarjeta de Identidad",
  CC: "Cédula de Ciudadanía",
};

// Límites compartidos entre el schema de Zod y los inputs para mantener
// una única fuente de verdad en las reglas de entrada del formulario.
export const DEPENDIENTE_LIMITS = {
  nombresMin: 2,
  nombresMax: 80,
  apellidosMin: 2,
  apellidosMax: 80,
  documentoMin: 5,
  documentoMax: 20,
} as const;