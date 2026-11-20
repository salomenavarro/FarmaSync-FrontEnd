
import { ReactNode } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="relative flex min-h-dvh w-full items-center justify-center overflow-x-hidden bg-transparent">

      {/* BOTÓN VOLVER AL INICIO */}

      <Link
        href="/"
        className="absolute left-5 top-5 z-30 flex items-center gap-2 rounded-xl border border-[#C9DCF3] bg-white/95 px-4 py-2.5 text-sm font-semibold text-[#14285B] shadow-md backdrop-blur-sm transition-all hover:border-[#1769CF] hover:bg-[#F2F8FF] hover:text-[#1769CF] hover:shadow-lg sm:left-6 sm:top-6"
      >
        <ArrowLeft className="h-5 w-5" />
        <span>Volver al inicio</span>
      </Link>

      {/* CONTENIDO DE AUTENTICACIÓN */}

      {children}

    </div>
  );
}
