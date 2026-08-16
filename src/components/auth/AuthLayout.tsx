import { ReactNode } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import AuthBackground from "./AuthBackground";

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="relative flex min-h-dvh w-full items-center justify-center overflow-x-hidden overflow-y-auto bg-white px-3 py-6 sm:px-6 sm:py-8 md:h-dvh md:min-h-0 md:overflow-y-hidden">

      {/* ======================================== */}
      {/* FONDO DECORATIVO */}
  
      <div className="pointer-events-none absolute inset-0 z-0">
        <AuthBackground />
      </div>

      {/* ======================================== */}
      {/* BOTÓN VOLVER AL INICIO */}

      <Link
        href="/"
        className="absolute left-5 top-5 z-30 flex items-center gap-2 rounded-xl border border-[#00A8A8]/20 bg-white/90 px-4 py-2.5 text-sm font-semibold text-[#171717] shadow-md backdrop-blur-sm transition-all hover:bg-white hover:text-[#00A8A8] hover:shadow-lg sm:left-6 sm:top-6"
      >
        <ArrowLeft className="h-5 w-5" />

        <span>Volver al inicio</span>
      </Link>

      {/* ======================================== */}
      {/* CONTENIDO DE LA PÁGINA */}

      {children}

    </div>
  );
}