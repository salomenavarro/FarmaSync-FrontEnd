import type { AuthenticatedUser } from "../types/user";

// =========================================================
// RESOLVER RUTA INICIAL SEGÚN EL ROL DEL USUARIO
// =========================================================

export function getRedirectPathByUser(
  usuario: Pick<AuthenticatedUser, "roleId"> & {
    rol?: string;
    role?: { name?: string };
  },
): string {
  // Normalizamos el nombre del rol si el backend lo envía en el objeto de sesión
  const nombreRol = (
    usuario.rol ??
    usuario.role?.name ??
    ""
  )
    .trim()
    .toUpperCase();

  // ID 3 corresponde a ADMINISTRADOR_EPS en el seed oficial
  if (nombreRol === "ADMINISTRADOR_EPS" || usuario.roleId === 3) {
    return "/administrador/dashboard";
  }

  // ID 2 corresponde a FARMACEUTICO en el seed oficial
  if (nombreRol === "FARMACEUTICO" || usuario.roleId === 2) {
    return "/farmaceutico/dashboard";
  }

  // ID 1 (o cualquier otro valor por defecto) corresponde a PACIENTE
  return "/dashboard";
}

export function isAdministradorEps(
  usuario: Pick<AuthenticatedUser, "roleId"> & {
    rol?: string;
    role?: { name?: string };
  },
): boolean {
  const nombreRol = (
    usuario.rol ??
    usuario.role?.name ??
    ""
  )
    .trim()
    .toUpperCase();

  return nombreRol === "ADMINISTRADOR_EPS" || usuario.roleId === 3;
}

// Verifica si el usuario autenticado corresponde al rol FARMACEUTICO (ID 2 en seed).
export function isFarmaceutico(
  usuario: Pick<AuthenticatedUser, "roleId"> & {
    rol?: string;
    role?: { name?: string };
  },
): boolean {
  const nombreRol = (
    usuario.rol ??
    usuario.role?.name ??
    ""
  )
    .trim()
    .toUpperCase();

  return nombreRol === "FARMACEUTICO" || usuario.roleId === 2;
}