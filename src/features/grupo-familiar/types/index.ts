
export type TipoDocumento = "RC" | "TI" | "CC";

export type Parentesco =
  | "Hijo / Hija"
  | "Padre / Madre"
  | "Abuelo / Abuela"
  | "Otro";

export type EstadoDependiente = "Activo" | "Inactivo";

export interface Dependiente {
  id: string;
  nombres: string;
  apellidos: string;
  parentesco: Parentesco;
  tipoDocumento: TipoDocumento;
  numeroDocumento: string;
  fechaNacimiento: string;
  correoElectronico?: string;
  estado: EstadoDependiente;
}

export type DependienteFormData = Omit<
  Dependiente,
  "id" | "estado"
>;

export const TIPOS_DOCUMENTO: {
  value: TipoDocumento;
  label: string;
}[] = [
  {
    value: "RC",
    label: "Registro Civil",
  },
  {
    value: "TI",
    label: "Tarjeta de Identidad",
  },
  {
    value: "CC",
    label: "Cédula de Ciudadanía",
  },
];

export const PARENTESCOS: Parentesco[] = [
  "Hijo / Hija",
  "Padre / Madre",
  "Abuelo / Abuela",
  "Otro",
];
