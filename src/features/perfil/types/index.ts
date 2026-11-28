import type { AuthenticatedUser } from "@/features/auth/types/user";

// Información del paciente disponible en la sesión.
export type PerfilPaciente = Pick<
  AuthenticatedUser,
  "id" | "nombreCompleto" | "numeroDocumento" | "correo"
>;

// Secciones disponibles dentro del módulo de perfil.
export type SeccionPerfil = "datos-personales" | "seguridad";