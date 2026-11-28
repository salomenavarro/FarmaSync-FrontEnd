import type { ReactNode } from "react";
import { redirect } from "next/navigation";

import { getCurrentUserServer } from "@/lib/auth/get-current-user.server";
import {
  getRedirectPathByUser,
  isFarmaceutico,
} from "@/features/auth/utils/role-redirect";
import FarmaceuticoShell from "@/components/layout/FarmaceuticoShell";

/* Ejemplo de layout del farmacéutico. Si el tuyo ya valida el rol,
   conserva esa lógica y solo envuelve {children} con <FarmaceuticoShell>. */
export default async function FarmaceuticoLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  const usuario = await getCurrentUserServer();

  if (!usuario) {
    redirect("/login");
  }

  // Si el usuario no tiene rol farmacéutico, se redirige al panel de su rol
  if (!isFarmaceutico(usuario)) {
    redirect(getRedirectPathByUser(usuario));
  }

  return (
    <FarmaceuticoShell usuario={usuario}>
      {children}
    </FarmaceuticoShell>
  );
}