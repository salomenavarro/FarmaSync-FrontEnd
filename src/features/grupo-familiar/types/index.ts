export type TipoDocumento = "RC" | "TI" | "CC";

// Códigos estables alineados con el backend para evitar que la API dependa de
// textos con tildes o barras; las etiquetas visibles viven en presentation/constants.
export type Parentesco =
  | "HIJO"
  | "PADRE_MADRE"
  | "ABUELO"
  | "OTRO";

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
  "HIJO",
  "PADRE_MADRE",
  "ABUELO",
  "OTRO",
];