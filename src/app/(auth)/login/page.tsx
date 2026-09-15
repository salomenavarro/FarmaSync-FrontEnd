import LoginForm from "@/features/auth/components/LoginForm";

// page.tsx queda así de simple a propósito: cero estado, cero
// lógica, cero estilos. Solo decide qué componente de feature va
// en esta ruta.
export default function LoginPage() {
  return <LoginForm />;
}
