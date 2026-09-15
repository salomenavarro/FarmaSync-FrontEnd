"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Image from "next/image";
import Link from "next/link";
import { CreditCard, Phone, Mail, Lock, Eye, EyeOff } from "lucide-react";
import AuthLayout from "@/components/layout/AuthLayout";
import { registerSchema, RegisterFormValues } from "../schemas/register.schema";
import { useRegister, getRegisterErrorMessage } from "../hooks/useRegister";

export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  });

  const registerMutation = useRegister();

  const onSubmit = (data: RegisterFormValues) => {
    registerMutation.mutate(data);
  };

  return (
    <AuthLayout>
      <div className="relative z-10 my-auto flex w-full max-w-sm flex-col items-center overflow-hidden rounded-3xl border border-[#00A8A8]/20 bg-[#00A8A8]/10 p-2.5 shadow-xl backdrop-blur-md sm:max-w-md sm:p-4 md:max-w-4xl md:flex-row md:p-6 lg:p-8">
        {/* COLUMNA IZQUIERDA - BIENVENIDA */}
        <div className="hidden flex-1 flex-col justify-between gap-8 p-4 md:flex md:w-1/2 md:p-6 lg:w-3/5 lg:p-8">
          <div className="flex items-center gap-3 lg:gap-4">
            <div className="relative flex h-14 w-14 items-center justify-center overflow-hidden rounded-full border-2 border-[#00A8A8]/40 bg-white p-1 shadow-lg lg:h-20 lg:w-20">
              <Image src="/images/logo1.jpeg" alt="FarmaSync Logo" fill className="rounded-full object-cover" />
            </div>
            <span className="text-xl font-black tracking-tight text-[#171717] sm:text-2xl lg:text-3xl">
              FarmaSync
            </span>
          </div>

          <div className="my-auto space-y-3 pr-2 sm:space-y-4 lg:pr-6">
            <h1 className="text-3xl font-extrabold leading-tight text-[#171717] sm:text-4xl lg:text-5xl">
              Crea tu
              <br />
              <span className="text-[#00A8A8]">cuenta</span>
            </h1>
            <p className="max-w-md text-xs font-medium leading-5 text-[#6B7280] sm:text-sm sm:leading-6">
              Únete a la plataforma para consultar disponibilidad y reservar tus medicamentos a tiempo sin filas.
            </p>
          </div>

          <p className="text-xs font-semibold text-[#6B7280]">© 2026 FarmaSync. Todos los derechos reservados.</p>
        </div>

        {/* COLUMNA DERECHA - TARJETA DE REGISTRO */}
        <div className="w-full shrink-0 overflow-visible rounded-2xl border-2 border-[#00A8A8]/30 bg-gradient-to-b from-white via-white to-[#00A8A8]/10 p-4 shadow-2xl backdrop-blur-xl sm:p-5 md:max-h-[85vh] md:w-[380px] md:overflow-y-auto md:p-7 lg:w-[420px] lg:p-8">
          <div className="mb-5 flex items-center justify-center gap-3 sm:mb-6 md:hidden">
            <div className="relative h-11 w-11 overflow-hidden rounded-full border-2 border-[#00A8A8]/40 bg-white p-0.5 shadow-md sm:h-12 sm:w-12">
              <Image src="/images/logo1.jpeg" alt="FarmaSync Logo" fill className="rounded-full object-cover" />
            </div>
            <span className="text-lg font-extrabold text-[#171717] sm:text-xl">FarmaSync</span>
          </div>

          <div className="mb-5 text-left sm:mb-6">
            <h2 className="text-xl font-extrabold leading-tight text-[#171717] sm:text-2xl">Registro de Usuario</h2>
            <p className="mt-1 text-xs font-medium leading-5 text-[#6B7280]">
              Ingresa tus datos personales para crear tu perfil
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3.5 sm:space-y-4" noValidate>
            {/* NOMBRE COMPLETO */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#171717]">
                Nombre Completo
              </label>
              <div className="relative mt-1.5 sm:mt-2">
                <input
                  type="text"
                  placeholder="Ingresa tu nombre completo"
                  {...register("nombreCompleto")}
                  className="w-full rounded-xl border border-[#00A8A8]/20 bg-white/80 py-2.5 px-3 text-sm font-medium text-[#171717] outline-none transition-all focus:border-[#00A8A8] focus:bg-white focus:ring-2 focus:ring-[#00A8A8]/30 sm:py-3 sm:px-4"
                />
              </div>
              {errors.nombreCompleto && (
                <p className="mt-1 text-xs font-semibold text-red-500">{errors.nombreCompleto.message}</p>
              )}
            </div>

            {/* CÉDULA */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#171717]">
                Número de Cédula (CC)
              </label>
              <div className="relative mt-1.5 sm:mt-2">
                <input
                  type="text"
                  placeholder="Ej: 1017123456"
                  {...register("numeroDocumento")}
                  className="w-full rounded-xl border border-[#00A8A8]/20 bg-white/80 py-2.5 pl-10 pr-3 text-sm font-medium text-[#171717] outline-none transition-all focus:border-[#00A8A8] focus:bg-white focus:ring-2 focus:ring-[#00A8A8]/30 sm:py-3 sm:pl-11 sm:pr-4"
                />
                <CreditCard className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[#00A8A8] sm:left-3.5" />
              </div>
              {errors.numeroDocumento && (
                <p className="mt-1 text-xs font-semibold text-red-500">{errors.numeroDocumento.message}</p>
              )}
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
                  {...register("telefono")}
                  className="w-full rounded-xl border border-[#00A8A8]/20 bg-white/80 py-2.5 pl-10 pr-3 text-sm font-medium text-[#171717] outline-none transition-all focus:border-[#00A8A8] focus:bg-white focus:ring-2 focus:ring-[#00A8A8]/30 sm:py-3 sm:pl-11 sm:pr-4"
                />
                <Phone className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[#00A8A8] sm:left-3.5" />
              </div>
              {errors.telefono && <p className="mt-1 text-xs font-semibold text-red-500">{errors.telefono.message}</p>}
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
                  {...register("correo")}
                  className="w-full rounded-xl border border-[#00A8A8]/20 bg-white/80 py-2.5 pl-10 pr-3 text-sm font-medium text-[#171717] outline-none transition-all focus:border-[#00A8A8] focus:bg-white focus:ring-2 focus:ring-[#00A8A8]/30 sm:py-3 sm:pl-11 sm:pr-4"
                />
                <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[#00A8A8] sm:left-3.5" />
              </div>
              {errors.correo && <p className="mt-1 text-xs font-semibold text-red-500">{errors.correo.message}</p>}
            </div>

            {/* CONTRASEÑA */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#171717]">Contraseña</label>
              <div className="relative mt-1.5 sm:mt-2">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  {...register("password")}
                  className="w-full rounded-xl border border-[#00A8A8]/20 bg-white/80 py-2.5 pl-10 pr-10 text-sm font-medium text-[#171717] outline-none transition-all focus:border-[#00A8A8] focus:bg-white focus:ring-2 focus:ring-[#00A8A8]/30 sm:py-3 sm:pl-11 sm:pr-11"
                />
                <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[#00A8A8] sm:left-3.5" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 transition-colors hover:text-gray-600 sm:right-3.5"
                  aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              {errors.password && <p className="mt-1 text-xs font-semibold text-red-500">{errors.password.message}</p>}
            </div>

            {/* ERROR DEL SERVIDOR (documento/correo duplicado) */}
            {registerMutation.isError && (
              <p className="text-sm font-semibold text-red-500">{getRegisterErrorMessage(registerMutation.error)}</p>
            )}

            {/* BOTÓN REGISTRARSE */}
            <button
              type="submit"
              disabled={registerMutation.isPending}
              className="mt-2 w-full rounded-xl bg-[#00A8A8] py-3 text-sm font-bold text-white shadow-lg shadow-[#00A8A8]/30 transition-all hover:bg-[#008C8C] hover:shadow-xl active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 sm:py-3.5"
            >
              {registerMutation.isPending ? "CREANDO CUENTA..." : "CREAR CUENTA"}
            </button>
          </form>

          <div className="mt-5 text-center text-xs sm:mt-8">
            <p className="text-[#6B7280]">
              ¿Ya tienes una cuenta?{" "}
              <Link href="/login" className="font-bold text-[#00A8A8] hover:underline">
                Inicia sesión
              </Link>
            </p>
          </div>

          <div className="mt-7 border-t border-[#00A8A8]/10 pt-4 text-center md:hidden">
            <p className="text-center text-[10px] font-semibold leading-5 text-[#6B7280]">
              © 2026 FarmaSync. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
}
