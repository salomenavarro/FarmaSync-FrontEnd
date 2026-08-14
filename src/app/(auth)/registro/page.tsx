"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  CreditCard,
  Phone,
  Mail,
  Lock,
  Calendar,
  Eye,
  EyeOff,
} from "lucide-react";

export default function RegistroPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
<div className="relative flex min-h-dvh w-full items-center justify-center overflow-x-hidden overflow-y-auto bg-[#FCFBDC] p-3 sm:p-4 md:h-dvh md:overflow-y-hidden md:p-6">
      {/* PATRÓN DE CÁPSULAS Y PASTILLAS */}
      <div className="absolute -left-10 -top-10 h-36 w-16 rotate-45 rounded-full border-6 border-[#00A8A8]/20 bg-[#00A8A8]/10 backdrop-blur-sm sm:-left-12 sm:-top-12 sm:h-48 sm:w-20 sm:border-8 md:h-72 md:w-28 md:border-[12px]" />

      <div className="absolute left-1/4 top-6 h-20 w-8 -rotate-12 rounded-full border-2 border-[#00A8A8]/25 bg-white/40 sm:top-8 sm:h-24 sm:w-10 md:h-36 md:w-14 md:border-4" />

      <div className="absolute right-1/3 top-10 h-8 w-8 rounded-full border-2 border-[#00A8A8]/20 bg-[#00A8A8]/15 sm:top-12 sm:h-10 sm:w-10 md:h-16 md:w-16 md:border-4" />

      <div className="absolute -right-6 top-12 h-32 w-12 -rotate-45 rounded-full border-4 border-[#00A8A8]/20 bg-[#00A8A8]/10 sm:-right-8 sm:top-16 sm:h-40 sm:w-16 md:h-56 md:w-24 md:border-8" />

      <div className="absolute left-0 top-1/2 h-12 w-24 -translate-y-1/2 rotate-12 rounded-full border-2 border-[#00A8A8]/20 bg-white/50 sm:left-2 sm:h-14 sm:w-28 md:left-6 md:h-20 md:w-44 md:border-4" />

      <div className="absolute bottom-6 left-4 h-28 w-12 rotate-45 rounded-full border-6 border-[#00A8A8]/20 bg-[#00A8A8]/10 sm:bottom-8 sm:left-6 sm:h-32 sm:w-14 sm:border-8 md:bottom-8 md:left-12 md:h-48 md:w-20 md:border-[10px]" />

      <div className="absolute bottom-8 left-1/2 h-12 w-12 -translate-x-1/2 rounded-full border-2 border-[#00A8A8]/25 bg-white/60 sm:h-14 sm:w-14 md:h-20 md:w-20 md:border-4" />

      <div className="absolute -bottom-12 -right-8 h-48 w-20 -rotate-45 rounded-full border-6 border-[#00A8A8]/25 bg-[#00A8A8]/15 sm:-bottom-16 sm:-right-10 sm:h-56 sm:w-24 sm:border-8 md:h-80 md:w-36 md:border-[16px]" />

      {/* HALOS VERDES */}
      <div className="pointer-events-none absolute left-1/4 top-1/3 h-48 w-48 rounded-full bg-[#00A8A8]/15 blur-3xl sm:h-64 sm:w-64 md:h-96 md:w-96" />

      <div className="pointer-events-none absolute bottom-1/3 right-1/4 h-44 w-44 rounded-full bg-[#00A8A8]/15 blur-3xl sm:h-56 sm:w-56 md:h-80 md:w-80" />

      {/* CONTENEDOR PRINCIPAL */}
      <div className="relative z-10 my-auto flex w-full max-w-sm flex-col items-center overflow-hidden rounded-3xl border border-[#00A8A8]/20 bg-[#00A8A8]/10 p-2.5 shadow-xl backdrop-blur-md sm:max-w-md sm:p-4 md:max-w-4xl md:flex-row md:p-6 lg:p-8">

        {/* COLUMNA IZQUIERDA - BIENVENIDA */}
        <div className="hidden flex-1 flex-col justify-between gap-8 p-4 md:flex md:w-1/2 md:p-6 lg:w-3/5 lg:p-8">

          {/* LOGO */}
          <div className="flex items-center gap-3 lg:gap-4">
            <div className="relative flex h-14 w-14 items-center justify-center overflow-hidden rounded-full border-2 border-[#00A8A8]/40 bg-white p-1 shadow-lg lg:h-20 lg:w-20">
              <Image
                src="/images/logo1.jpeg"
                alt="FarmaSync Logo"
                fill
                className="rounded-full object-cover"
              />
            </div>

            <span className="text-xl font-black tracking-tight text-[#171717] sm:text-2xl lg:text-3xl">
              FarmaSync
            </span>
          </div>

          <div className="my-auto space-y-3 pr-2 sm:space-y-4 lg:pr-6">
            <h1 className="text-3xl font-extrabold leading-tight text-[#171717] sm:text-4xl lg:text-5xl">
              Crea tu <br />
              <span className="text-[#00A8A8]">cuenta</span>
            </h1>

            <p className="max-w-md text-xs font-medium leading-5 text-[#6B7280] sm:text-sm sm:leading-6">
              Únete a la plataforma para consultar disponibilidad y reservar
              tus medicamentos a tiempo sin filas.
            </p>
          </div>

          <p className="text-xs font-semibold text-[#6B7280]">
            © 2026 FarmaSync. Todos los derechos reservados.
          </p>
        </div>

        {/* COLUMNA DERECHA - TARJETA DE REGISTRO */}
        <div className="w-full shrink-0 overflow-visible rounded-2xl border-2 border-[#00A8A8]/30 bg-gradient-to-b from-white via-white to-[#00A8A8]/10 p-4 shadow-2xl backdrop-blur-xl sm:p-5 md:max-h-[85vh] md:w-[380px] md:overflow-y-auto md:p-7 lg:w-[420px] lg:p-8">

          {/* LOGO MÓVIL */}
          <div className="mb-5 flex items-center justify-center gap-3 sm:mb-6 md:hidden">
            <div className="relative h-11 w-11 overflow-hidden rounded-full border-2 border-[#00A8A8]/40 bg-white p-0.5 shadow-md sm:h-12 sm:w-12">
              <Image
                src="/images/logo1.jpeg"
                alt="FarmaSync Logo"
                fill
                className="rounded-full object-cover"
              />
            </div>

            <span className="text-lg font-extrabold text-[#171717] sm:text-xl">
              FarmaSync
            </span>
          </div>

          <div className="mb-5 text-left sm:mb-6">
            <h2 className="text-xl font-extrabold leading-tight text-[#171717] sm:text-2xl">
              Registro de Usuario
            </h2>

            <p className="mt-1 text-xs font-medium leading-5 text-[#6B7280]">
              Ingresa tus datos personales para crear tu perfil
            </p>
          </div>

          <form className="space-y-3.5 sm:space-y-4">

            {/* CÉDULA */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#171717]">
                Número de Cédula (CC)
              </label>

              <div className="relative mt-1.5 sm:mt-2">
                <input
                  type="text"
                  placeholder="Ej: 1017123456"
                  className="w-full rounded-xl border border-[#00A8A8]/20 bg-white/80 py-2.5 pl-10 pr-3 text-sm font-medium text-[#171717] outline-none transition-all focus:border-[#00A8A8] focus:bg-white focus:ring-2 focus:ring-[#00A8A8]/30 sm:py-3 sm:pl-11 sm:pr-4"
                  required
                />

                <CreditCard className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[#00A8A8] sm:left-3.5" />
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
                  className="w-full rounded-xl border border-[#00A8A8]/20 bg-white/80 py-2.5 pl-10 pr-3 text-sm font-medium text-[#171717] outline-none transition-all focus:border-[#00A8A8] focus:bg-white focus:ring-2 focus:ring-[#00A8A8]/30 sm:py-3 sm:pl-11 sm:pr-4"
                  required
                />

                <Phone className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[#00A8A8] sm:left-3.5" />
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
                  className="w-full rounded-xl border border-[#00A8A8]/20 bg-white/80 py-2.5 pl-10 pr-3 text-sm font-medium text-[#171717] outline-none transition-all focus:border-[#00A8A8] focus:bg-white focus:ring-2 focus:ring-[#00A8A8]/30 sm:py-3 sm:pl-11 sm:pr-4"
                  required
                />

                <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[#00A8A8] sm:left-3.5" />
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
                  className="w-full rounded-xl border border-[#00A8A8]/20 bg-white/80 py-2.5 pl-10 pr-3 text-sm font-medium text-[#171717] outline-none transition-all focus:border-[#00A8A8] focus:bg-white focus:ring-2 focus:ring-[#00A8A8]/30 sm:py-3 sm:pl-11 sm:pr-4"
                  required
                />

                <Calendar className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[#00A8A8] sm:left-3.5" />
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
                  className="w-full rounded-xl border border-[#00A8A8]/20 bg-white/80 py-2.5 pl-10 pr-10 text-sm font-medium text-[#171717] outline-none transition-all focus:border-[#00A8A8] focus:bg-white focus:ring-2 focus:ring-[#00A8A8]/30 sm:py-3 sm:pl-11 sm:pr-11"
                  required
                />

                <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[#00A8A8] sm:left-3.5" />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 transition-colors hover:text-gray-600 sm:right-3.5"
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
          <div className="mt-5 text-center text-xs sm:mt-8">
            <p className="text-[#6B7280]">
              ¿Ya tienes una cuenta?{" "}
              <Link
                href="/login"
                className="font-bold text-[#00A8A8] hover:underline"
              >
                Inicia sesión
              </Link>
            </p>
          </div>

          {/* FOOTER MÓVIL */}
          <div className="mt-7 border-t border-[#00A8A8]/10 pt-4 text-center md:hidden">
            <p className="text-center text-[10px] font-semibold leading-5 text-[#6B7280]">
              © 2026 FarmaSync. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}