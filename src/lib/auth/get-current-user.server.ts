import { cookies } from "next/headers";
import { AuthenticatedUser } from "@/features/auth/types/user";

const backendBaseUrl = () => process.env.BACKEND_INTERNAL_URL ?? "http://localhost:3001/api/v1";

// Solo usable en Server Components (usa cookies() de next/headers).
// Habla DIRECTO con el backend, no por el proxy de /api/v1/[...path]
// — no hace falta el proxy porque esto ya corre en el servidor de
// Next, no en el navegador.
export async function getCurrentUserServer(): Promise<AuthenticatedUser | null> {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;

  if (!accessToken) {
    return null;
  }

  // Pasamos el token tanto como cookie tradicional como Bearer token
  const response = await fetch(`${backendBaseUrl()}/auth/me`, {
    headers: { 
      cookie: `access_token=${accessToken}`,
      authorization: `Bearer ${accessToken}`
    },
    cache: "no-store",
  });

  if (!response.ok) {
    return null;
  }

  const data = (await response.json()) as { usuario: AuthenticatedUser };
  return data.usuario;
}