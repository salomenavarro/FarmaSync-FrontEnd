// Calcado de lo que AuthController.login() devuelve (ver
// presentation/http/auth.controller.ts del backend). Si el backend
// cambia esta forma, este es el único archivo del frontend que hay
// que tocar.
export interface AuthenticatedUser {
  id: number;
  nombreCompleto: string;
  numeroDocumento: string;
  correo: string;
  roleId: number;
}
