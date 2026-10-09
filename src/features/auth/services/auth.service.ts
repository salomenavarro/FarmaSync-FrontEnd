import { apiClient } from "@/lib/http/axios";
import { LoginFormValues } from "../schemas/login.schema";
import { RegisterFormValues } from "../schemas/register.schema";
import { AuthenticatedUser } from "../types/user";

interface LoginResponse {
  usuario: AuthenticatedUser;
}

// axios va por apiClient -> /api/v1/auth/login -> el proxy de Next
// (route.ts) -> NestJS. La cookie httpOnly la pone el backend; este
// service nunca la toca ni la guarda a mano (a diferencia del
// localStorage.setItem del authService.ts viejo).
export async function login(data: LoginFormValues): Promise<AuthenticatedUser> {
  const response = await apiClient.post<LoginResponse>("/auth/login", data);
  return response.data.usuario;
}

// El registro NO inicia sesión automáticamente (el backend no pone
// cookie en /auth/register, solo en /auth/login) — por eso el tipo
// de retorno no es AuthenticatedUser con cookie, solo confirma que
// el usuario quedó creado.
export async function registrar(data: RegisterFormValues): Promise<AuthenticatedUser> {
  const response = await apiClient.post<AuthenticatedUser>("/auth/register", data);
  return response.data;
}

export async function logout(): Promise<void> {
  await apiClient.post("/auth/logout");
}
