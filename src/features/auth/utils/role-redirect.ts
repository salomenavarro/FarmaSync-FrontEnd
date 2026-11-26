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

  if (nombreRol === "ADMINISTRADOR_EPS" || usuario.roleId === 7) {
    return "/administrador/dashboard";
  }

  if (nombreRol === "FARMACEUTICO" || usuario.roleId === 6) {
    return "/farmaceutico/dashboard";
  }

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

  return nombreRol === "ADMINISTRADOR_EPS" || usuario.roleId === 7;
}