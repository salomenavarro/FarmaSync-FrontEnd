"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { CreditCard, Mail } from "lucide-react";
import AuthLayout from "@/components/auth/AuthLayout";

export default function RecuperarPasswordPage() {
  const [formData, setFormData] = useState({
    documento: "",
    correo: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log("Solicitud de recuperación:", formData);
  };

  return (
    <AuthLayout>

      {/* ===================================================== */}
      {/* CONTENEDOR PRINCIPAL */}

      <div className="relative z-10 my-auto flex w-full max-w-[420px] flex-col items-stretch overflow-hidden rounded-3xl border border-[#00A8A8]/20 bg-[#00A8A8]/10 p-3 shadow-xl backdrop-blur-md sm:p-4 md:max-w-3xl md:flex-row md:items-center md:p-6 lg:max-w-4xl lg:p-8">


        {/* ===================================================== */}
        {/* COLUMNA IZQUIERDA */}

        <div className="hidden flex-1 flex-col justify-between gap-6 p-4 md:flex md:w-1/2 lg:w-3/5 lg:p-6">

          {/* LOGO */}
          <div className="flex items-center gap-3 lg:gap-4">
            <div className="relative flex h-16 w-16 items-center justify-center overflow-hidden rounded-full border-2 border-[#00A8A8]/40 bg-white p-1 shadow-lg lg:h-20 lg:w-20">
              <Image
                src="/images/logo1.jpeg"
                alt="FarmaSync Logo"
                fill
                className="rounded-full object-cover"
                priority
              />
            </div>

            <span className="text-2xl font-black tracking-tight text-[#171717] lg:text-3xl">
              FarmaSync
            </span>
          </div>

          {/* TEXTO */}
          <div className="my-auto space-y-3 pr-4 lg:space-y-4">
            <h1 className="text-3xl font-extrabold leading-tight text-[#171717] md:text-4xl lg:text-5xl">
              Recupera tu
              <br />
              <span className="text-[#00A8A8]">
                contraseña
              </span>
            </h1>

            <p className="text-xs font-medium text-[#6B7280] lg:text-sm">
              No te preocupes. Ingresa tus datos y te ayudaremos a recuperar
              el acceso a tu cuenta.
            </p>
          </div>

          {/* FOOTER */}
          <p className="text-[11px] font-semibold leading-5 text-[#6B7280] sm:text-xs">
            © 2026 FarmaSync. Todos los derechos reservados.
          </p>

        </div>

        {/* ===================================================== */}
        {/* TARJETA DERECHA - RECUPERAR CONTRASEÑA */}

        <div className="w-full rounded-2xl border-2 border-[#00A8A8]/30 bg-gradient-to-b from-white via-white to-[#00A8A8]/10 p-4 shadow-2xl backdrop-blur-xl sm:p-5 md:w-[380px] md:p-6 lg:w-[420px] lg:p-8">

          {/* LOGO EN MÓVIL */}
          <div className="mb-5 flex items-center justify-center gap-2.5 sm:mb-6 md:hidden">

            <div className="relative h-12 w-12 overflow-hidden rounded-full border-2 border-[#00A8A8]/40 bg-white p-0.5 shadow-md sm:h-14 sm:w-14">
              <Image
                src="/images/logo1.jpeg"
                alt="FarmaSync Logo"
                fill
                className="rounded-full object-cover"
                priority
              />
            </div>

            <span className="text-[22px] font-extrabold text-[#171717] sm:text-2xl">
              FarmaSync
            </span>

          </div>

          {/* TÍTULO */}
          <div className="mb-5 sm:mb-6 lg:mb-8">

            <h2 className="text-[22px] font-extrabold text-[#171717] sm:text-2xl">
              ¿Olvidaste tu contraseña?
            </h2>

            <p className="mt-1 text-[11px] font-medium leading-5 text-[#6B7280] sm:text-xs">
              Ingresa tu número de cédula y correo electrónico para solicitar
              la recuperación de tu contraseña.
            </p>

          </div>

          {/* FORMULARIO */}
          <form
            onSubmit={handleSubmit}
            className="space-y-3.5 sm:space-y-4 lg:space-y-5"
          >

            {/* CÉDULA */}
            <div>

              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#171717] sm:text-xs">
                Número de Cédula (CC)
              </label>

              <div className="relative mt-1.5 lg:mt-2">

                <input
                  type="text"
                  name="documento"
                  value={formData.documento}
                  onChange={handleChange}
                  placeholder="Ej: 1017123456"
                  className="w-full rounded-xl border border-[#00A8A8]/20 bg-white/80 py-3 pl-11 pr-4 text-sm font-medium text-[#171717] outline-none transition-all focus:border-[#00A8A8] focus:bg-white focus:ring-2 focus:ring-[#00A8A8]/30"
                  required
                />

                <CreditCard className="absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-[#00A8A8]" />

              </div>

            </div>

            {/* CORREO */}
            <div>

              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#171717] sm:text-xs">
                Correo electrónico
              </label>

              <div className="relative mt-1.5 lg:mt-2">

                <input
                  type="email"
                  name="correo"
                  value={formData.correo}
                  onChange={handleChange}
                  placeholder="ejemplo@correo.com"
                  className="w-full rounded-xl border border-[#00A8A8]/20 bg-white/80 py-3 pl-11 pr-4 text-sm font-medium text-[#171717] outline-none transition-all focus:border-[#00A8A8] focus:bg-white focus:ring-2 focus:ring-[#00A8A8]/30"
                  required
                />

                <Mail className="absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-[#00A8A8]" />

              </div>

            </div>

            {/* BOTÓN */}
            <button
              type="submit"
              className="w-full rounded-xl bg-[#00A8A8] py-3 text-sm font-bold text-white shadow-lg shadow-[#00A8A8]/30 transition-all hover:bg-[#008C8C] hover:shadow-xl active:scale-[0.98] lg:py-3.5"
            >
              ENVIAR SOLICITUD
            </button>

          </form>

          {/* REGRESAR AL LOGIN */}
          <div className="mt-5 text-center text-xs sm:mt-6 lg:mt-8">

            <p className="text-[#6B7280]">
              ¿Ya recuerdas tu contraseña?{" "}

              <Link
                href="/login"
                className="font-bold text-[#00A8A8] hover:underline"
              >
                Inicia sesión
              </Link>

            </p>

          </div>

        </div>

      </div>

    </AuthLayout>
  );
}