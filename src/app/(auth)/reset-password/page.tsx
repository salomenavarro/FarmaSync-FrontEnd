import { Suspense } from "react";
import ResetPasswordForm from "@/features/auth/components/ResetPasswordForm";

// Página a la que llega el usuario al hacer clic en el enlace de su correo (Paso 2 del flujo)
export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-sm font-medium text-gray-500">Cargando...</div>}>
      <ResetPasswordForm />
    </Suspense>
  );
}