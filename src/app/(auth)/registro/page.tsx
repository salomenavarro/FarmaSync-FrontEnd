"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { CreditCard, Phone, Mail, Lock, Calendar, Eye, EyeOff } from "lucide-react";

export default function RegistroPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-x-hidden bg-[#FCFBDC] p-4 sm:p-6">
     
      {/* PATRÓN DE CÁPSULAS Y PASTILLAS (Ajustado para no generar overflow en móvil) */}
      <div className="absolute -left-12 -top-12 h-48 w-20 rotate-45 rounded-full border-8 border-[#00A8A8]/20 bg-[#00A8A8]/10 backdrop-blur-sm sm:h-72 sm:w-28 sm:border-12" />
      <div className="absolute top-8 left-1/4 h-24 w-10 -rotate-12 rounded-full border-2 border-[#00A8A8]/25 bg-white/40 sm:h-36 sm:w-14 sm:border-4" />
      <div className="absolute top-12 right-1/3 h-10 w-10 rounded-full border-2 border-[#00A8A8]/20 bg-[#00A8A8]/15 sm:h-16 sm:w-16 sm:border-4" />
      <div className="absolute -right-8 top-16 h-40 w-16 -rotate-45 rounded-full border-4 border-[#00A8A8]/20 bg-[#00A8A8]/10 sm:h-56 sm:w-24 sm:border-8" />
      <div className="absolute left-2 top-1/2 h-14 w-28 -translate-y-1/2 rotate-12 rounded-full border-2 border-[#00A8A8]/20 bg-white/50 sm:left-6 sm:h-20 sm:w-44 sm:border-4" />
      <div className="absolute bottom-8 left-6 h-32 w-14 rotate-45 rounded-full border-8 border-[#00A8A8]/20 bg-[#00A8A8]/10 sm:left-12 sm:h-48 sm:w-20 sm:border-10" />
      <div className="absolute bottom-10 left-1/2 h-14 w-14 -translate-x-1/2 rounded-full border-2 border-[#00A8A8]/25 bg-white/60 sm:h-20 sm:w-20 sm:border-4" />
      <div className="absolute -bottom-16 -right-10 h-56 w-24 -rotate-45 rounded-full border-8 border-[#00A8A8]/25 bg-[#00A8A8]/15 sm:h-80 sm:w-36 sm:border-16" />
      
      {/* Halos verdes */}
      <div className="absolute left-1/4 top-1/3 h-64 w-64 rounded-full bg-[#00A8A8]/15 blur-3xl pointer-events-none sm:h-96 sm:w-96" />
      <div className="absolute right-1/4 bottom-1/3 h-56 w-56 rounded-full bg-[#00A8A8]/15 blur-3xl pointer-events-none sm:h-80 sm:w-80" />

      {/* CONTENEDOR PRINCIPAL */}
      <div className="relative z-10 flex w-full max-w-4xl flex-col items-center overflow-hidden rounded-3xl border border-[#00A8A8]/20 bg-[#00A8A8]/10 p-3 shadow-xl backdrop-blur-md sm:p-6 md:flex-row md:p-8">
       
        {/* COLUMNA IZQUIERDA - BIENVENIDA (Oculta en móvil, visible desde escritorio - md) */}
        <div className="hidden flex-1 flex-col justify-between p-6 md:flex md:p-8">
          {/* LOGO */}
          <div className="flex items-center gap-4">
            <div className="relative flex h-16 w-16 items-center justify-center overflow-hidden rounded-full border-2 border-[#00A8A8]/40 bg-white p-1 shadow-lg lg:h-20 lg:w-20">
              <Image
                src="/images/logo1.jpeg"
                alt="FarmaSync Logo"
                fill
                className="rounded-full object-cover"
              />
            </div>
            <span className="text-2xl font-black tracking-tight text-[#171717] lg:text-3xl">FarmaSync</span>
          </div>

          <div className="my-auto space-y-4 pr-4 lg:pr-6">
            <h1 className="text-3xl font-extrabold leading-tight text-[#171717] lg:text-5xl">
              Crea tu <br />
              <span className="text-[#00A8A8]">cuenta</span>
            </h1>
            <p className="text-xs font-medium text-[#6B7280] lg:text-sm">
              Únete a la plataforma para consultar disponibilidad y reservar tus medicamentos a tiempo sin filas.
            </p>
          </div>

          <p className="text-xs font-semibold text-[#6B7280]">
            © 2026 FarmaSync. Todos los derechos reservados.
          </p>
        </div>

        {/* COLUMNA DERECHA - TARJETA DE REGISTRO */}
        <div className="w-full max-h-[85vh] shrink-0 overflow-y-auto rounded-2xl border-2 border-[#00A8A8]/30 bg-gradient-to-b from-white via-white to-[#00A8A8]/10 p-5 shadow-2xl backdrop-blur-xl scrollbar-thin scrollbar-thumb-[#00A8A8]/30 sm:p-6 md:w-[420px] md:p-8">
         
          {/* Logo móvil (Solo visible en pantallas pequeñas) */}
          <div className="mb-6 flex items-center justify-center gap-3 md:hidden">
            <div className="relative h-12 w-12 overflow-hidden rounded-full border-2 border-[#00A8A8]/40 bg-white p-0.5 shadow-md">
              <Image
                src="/images/logo1.jpeg"
                alt="FarmaSync Logo"
                fill
                className="rounded-full object-cover"
              />
            </div>
            <span className="text-xl font-extrabold text-[#171717]">FarmaSync</span>
          </div>

          <div className="mb-6 text-left">
            <h2 className="text-xl font-extrabold text-[#171717] sm:text-2xl">Registro de Usuario</h2>
            <p className="mt-1 text-xs font-medium text-[#6B7280]">
              Ingresa tus datos personales para crear tu perfil
            </p>
          </div>

          <form className="space-y-4">
            {/* CÉDULA DE CIUDADANÍA (CC) */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#171717]">
                Número de Cédula (CC)
              </label>
              <div className="relative mt-1.5 sm:mt-2">
                <input
                  type="text"
                  placeholder="Ej: 1017123456"
                  className="w-full rounded-xl border border-[#00A8A8]/20 bg-white/80 py-2.5 pl-11 pr-4 text-sm font-medium text-[#171717] outline-none transition-all focus:border-[#00A8A8] focus:bg-white focus:ring-2 focus:ring-[#00A8A8]/30 sm:py-3"
                  required
                />
                <CreditCard className="absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-[#00A8A8]" />
              </div>
            </div>

            {/* TELÉFONO */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#171717]">
                Teléfono / Celular
              </label>
              <div className="relative mt-1.5 sm:mt-2">
                <input
                  type="tel"
                  placeholder="300 123 4567"
                  className="w-full rounded-xl border border-[#00A8A8]/20 bg-white/80 py-2.5 pl-11 pr-4 text-sm font-medium text-[#171717] outline-none transition-all focus:border-[#00A8A8] focus:bg-white focus:ring-2 focus:ring-[#00A8A8]/30 sm:py-3"
                  required
                />
                <Phone className="absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-[#00A8A8]" />
              </div>
            </div>

            {/* CORREO ELECTRÓNICO */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#171717]">
                Correo Electrónico
              </label>
              <div className="relative mt-1.5 sm:mt-2">
                <input
                  type="email"
                  placeholder="ejemplo@correo.com"
                  className="w-full rounded-xl border border-[#00A8A8]/20 bg-white/80 py-2.5 pl-11 pr-4 text-sm font-medium text-[#171717] outline-none transition-all focus:border-[#00A8A8] focus:bg-white focus:ring-2 focus:ring-[#00A8A8]/30 sm:py-3"
                  required
                />
                <Mail className="absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-[#00A8A8]" />
              </div>
            </div>

            {/* FECHA DE NACIMIENTO */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#171717]">
                Fecha de Nacimiento
              </label>
              <div className="relative mt-1.5 sm:mt-2">
                <input
                  type="date"
                  className="w-full rounded-xl border border-[#00A8A8]/20 bg-white/80 py-2.5 pl-11 pr-4 text-sm font-medium text-[#171717] outline-none transition-all focus:border-[#00A8A8] focus:bg-white focus:ring-2 focus:ring-[#00A8A8]/30 sm:py-3"
                  required
                />
                <Calendar className="absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-[#00A8A8]" />
              </div>
            </div>

            {/* CONTRASEÑA */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#171717]">
                Contraseña
              </label>
              <div className="relative mt-1.5 sm:mt-2">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-[#00A8A8]/20 bg-white/80 py-2.5 pl-11 pr-11 text-sm font-medium text-[#171717] outline-none transition-all focus:border-[#00A8A8] focus:bg-white focus:ring-2 focus:ring-[#00A8A8]/30 sm:py-3"
                  required
                />
                <Lock className="absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-[#00A8A8]" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 transition-colors hover:text-gray-600"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            {/* BOTÓN REGISTRARSE */}
            <button
              type="submit"
              className="mt-2 w-full rounded-xl bg-[#00A8A8] py-3 text-sm font-bold text-white shadow-lg shadow-[#00A8A8]/30 transition-all hover:bg-[#008C8C] hover:shadow-xl active:scale-[0.98] sm:py-3.5"
            >
              CREAR CUENTA
            </button>
          </form>

          {/* LINK A INICIAR SESIÓN */}
          <div className="mt-6 text-center text-xs sm:mt-8">
            <p className="text-[#6B7280]">
              ¿Ya tienes una cuenta?{" "}
              <Link href="/login" className="font-bold text-[#00A8A8] hover:underline">
                Inicia sesión
              </Link>
            </p>
          </div>

          {/* FOOTER PARA PANTALLAS PEQUEÑAS (Alineado a la izquierda) */}
          <div className="mt-8 border-t border-[#00A8A8]/10 pt-4 text-left md:hidden">
            <p className="text-[10px] font-semibold text-[#6B7280]">
              © 2026 FarmaSync. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}