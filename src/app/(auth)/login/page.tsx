// src/app/(auth)/login/page.tsx
import Image from "next/image";
import Link from "next/link";
import { Eye, CreditCard, Lock } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#FCFBDC] p-6">
      
      {/* PATRÓN DE CÁPSULAS Y PASTILLAS */}
      <div className="absolute -left-12 -top-12 h-72 w-28 rotate-45 rounded-full border-12 border-[#00A8A8]/20 bg-[#00A8A8]/10 backdrop-blur-sm" />
      <div className="absolute top-8 left-1/4 h-36 w-14 -rotate-12 rounded-full border-4 border-[#00A8A8]/25 bg-white/40" />
      <div className="absolute top-12 right-1/3 h-16 w-16 rounded-full border-4 border-[#00A8A8]/20 bg-[#00A8A8]/15" />
      <div className="absolute -right-8 top-16 h-56 w-24 -rotate-45 rounded-full border-8 border-[#00A8A8]/20 bg-[#00A8A8]/10" />
      <div className="absolute left-6 top-1/2 h-20 w-44 -translate-y-1/2 rotate-12 rounded-full border-4 border-[#00A8A8]/20 bg-white/50" />
      <div className="absolute bottom-8 left-12 h-48 w-20 rotate-45 rounded-full border-10 border-[#00A8A8]/20 bg-[#00A8A8]/10" />
      <div className="absolute bottom-10 left-1/2 h-20 w-20 -translate-x-1/2 rounded-full border-4 border-[#00A8A8]/25 bg-white/60" />
      <div className="absolute -bottom-16 -right-10 h-80 w-36 -rotate-45 rounded-full border-16 border-[#00A8A8]/25 bg-[#00A8A8]/15" />

      {/* Halos verdes */}
      <div className="absolute left-1/4 top-1/3 h-96 w-96 rounded-full bg-[#00A8A8]/15 blur-3xl pointer-events-none" />
      <div className="absolute right-1/4 bottom-1/3 h-80 w-80 rounded-full bg-[#00A8A8]/15 blur-3xl pointer-events-none" />

      {/* CONTENEDOR PRINCIPAL */}
      <div className="relative z-10 flex w-full max-w-4xl overflow-hidden rounded-3xl bg-[#00A8A8]/10 p-4 backdrop-blur-md md:p-8 border border-[#00A8A8]/20 shadow-xl">
        
        {/* COLUMNA IZQUIERDA - BIENVENIDA */}
        <div className="hidden flex-1 flex-col justify-between p-8 md:flex">
          
          {/* LOGO MÁS GRANDE*/}
          <div className="flex items-center gap-4">
            <div className="relative flex h-20 w-20 items-center justify-center overflow-hidden rounded-full border-2 border-[#00A8A8]/40 bg-white p-1 shadow-lg">
              <Image
                src="/images/logo1.jpeg"
                alt="FarmaSync Logo"
                fill
                className="rounded-full object-cover"
              />
            </div>
            <span className="text-3xl font-black text-[#171717] tracking-tight">FarmaSync</span>
          </div>

          <div className="my-auto space-y-4 pr-6">
            <h1 className="text-5xl font-extrabold leading-tight text-[#171717]">
              Bienvenido <br />
              <span className="text-[#00A8A8]">de nuevo</span>
            </h1>
            <p className="text-sm font-medium text-[#6B7280]">
              Ingresa tu número de documento para gestionar tus reservas de medicamentos sin filas.
            </p>
          </div>

          <p className="text-xs font-semibold text-[#6B7280]">
            © 2026 FarmaSync. Todos los derechos reservados.
          </p>
        </div>

        {/* COLUMNA DERECHA - TARJETA DE LOGIN */}
        <div className="w-full rounded-2xl border-2 border-[#00A8A8]/30 bg-linear-to-b from-white via-white to-[#00A8A8]/10 p-8 shadow-2xl backdrop-blur-xl md:w-[420px]">
          
          {/* Logo móvil también más grande */}
          <div className="mb-6 flex items-center justify-center gap-3 md:hidden">
            <div className="relative h-14 w-14 overflow-hidden rounded-full border-2 border-[#00A8A8]/40 bg-white p-0.5 shadow-md">
              <Image
                src="/images/logo1.jpeg"
                alt="FarmaSync Logo"
                fill
                className="rounded-full object-cover"
              />
            </div>
            <span className="text-2xl font-extrabold text-[#171717]">FarmaSync</span>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-extrabold text-[#171717]">Iniciar Sesión</h2>
            <p className="mt-1 text-xs font-medium text-[#6B7280]">
              Ingresa tus datos para acceder a tu perfil
            </p>
          </div>

          <form className="space-y-5">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#171717]">
                Número de Cédula (CC)
              </label>
              <div className="relative mt-2">
                <input
                  type="text"
                  placeholder="Ej: 1017123456"
                  className="w-full rounded-xl border border-[#00A8A8]/20 bg-white/80 pl-11 pr-4 py-3 text-sm font-medium text-[#171717] outline-none transition-all focus:border-[#00A8A8] focus:bg-white focus:ring-2 focus:ring-[#00A8A8]/30"
                  required
                />
                <CreditCard className="absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-[#00A8A8]" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#171717]">
                Contraseña
              </label>
              <div className="relative mt-2">
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-[#00A8A8]/20 bg-white/80 pl-11 pr-11 py-3 text-sm font-medium text-[#171717] outline-none transition-all focus:border-[#00A8A8] focus:bg-white focus:ring-2 focus:ring-[#00A8A8]/30"
                  required
                />
                <Lock className="absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-[#00A8A8]" />
                <button
                  type="button"
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <Eye className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex cursor-pointer items-center gap-2 text-xs font-semibold text-[#6B7280]">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-[#00A8A8] focus:ring-[#00A8A8]"
                />
                Recordarme
              </label>
            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-[#00A8A8] py-3.5 text-sm font-bold text-white shadow-lg shadow-[#00A8A8]/30 transition-all hover:bg-[#008C8C] hover:shadow-xl active:scale-[0.98]"
            >
              INGRESAR
            </button>
          </form>

          <div className="mt-8 space-y-2 text-center text-xs">
            <p className="text-[#6B7280]">
              ¿No tienes una cuenta?{" "}
              <Link href="/registro" className="font-bold text-[#00A8A8] hover:underline">
                Regístrate
              </Link>
            </p>
            <div>
              <Link
                href="/recuperar_password"
                className="font-medium text-[#6B7280] hover:text-[#171717] hover:underline"
              >
                ¿Olvidaste tu contraseña?
              </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}