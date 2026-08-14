"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Eye, EyeOff, CreditCard, Lock, UserCheck } from "lucide-react";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    documento: "",
    password: "",
    remember: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Datos de inicio de sesión:", formData);
  };

  return (
    // CAMBIO: py-8 y overflow-y-auto aseguran que en PCs pequeñas con poca altura siempre se vea centrado y scrolee si hace falta
    <div className="relative flex min-h-screen items-center justify-center overflow-y-auto bg-[#FCFBDC] p-4 py-8 sm:p-6">
      
      {/* PATRÓN DE CÁPSULAS Y PASTILLAS DE FONDO */}
      <div className="absolute -left-12 -top-12 h-72 w-28 rotate-45 rounded-full border-[12px] border-[#00A8A8]/20 bg-[#00A8A8]/10 backdrop-blur-sm" />
      <div className="absolute top-8 left-1/4 h-36 w-14 -rotate-12 rounded-full border-4 border-[#00A8A8]/25 bg-white/40" />
      <div className="absolute top-12 right-1/3 h-16 w-16 rounded-full border-4 border-[#00A8A8]/20 bg-[#00A8A8]/15" />
      <div className="absolute -right-8 top-16 h-56 w-24 -rotate-45 rounded-full border-8 border-[#00A8A8]/20 bg-[#00A8A8]/10" />
      <div className="absolute left-6 top-1/2 h-20 w-44 -translate-y-1/2 rotate-12 rounded-full border-4 border-[#00A8A8]/20 bg-white/50" />
      <div className="absolute bottom-8 left-12 h-48 w-20 rotate-45 rounded-full border-[10px] border-[#00A8A8]/20 bg-[#00A8A8]/10" />
      <div className="absolute bottom-10 left-1/2 h-20 w-20 -translate-x-1/2 rounded-full border-4 border-[#00A8A8]/25 bg-white/60" />
      <div className="absolute -bottom-16 -right-10 h-80 w-36 -rotate-45 rounded-full border-[16px] border-[#00A8A8]/25 bg-[#00A8A8]/15" />

      {/* Halos verdes */}
      <div className="pointer-events-none absolute left-1/4 top-1/3 h-96 w-96 rounded-full bg-[#00A8A8]/15 blur-3xl" />
      <div className="pointer-events-none absolute bottom-1/3 right-1/4 h-80 w-80 rounded-full bg-[#00A8A8]/15 blur-3xl" />

      {/* CONTENEDOR PRINCIPAL - HERO CENTRADO */}
      {/* CAMBIO: my-auto para auto-centrado perfecto + max-w adaptativo */}
      <div className="relative z-10 my-auto flex w-full max-w-sm items-center overflow-hidden rounded-3xl border border-[#00A8A8]/20 bg-[#00A8A8]/10 p-4 shadow-xl backdrop-blur-md md:max-w-3xl md:p-6 lg:max-w-4xl lg:p-8">
        
        {/* COLUMNA IZQUIERDA - BIENVENIDA */}
        {/* CAMBIO: md:w-1/2 para balancear proporciones en pantallas de laptop pequeñas */}
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

          <div className="my-auto space-y-3 lg:space-y-4 pr-4">
            {/* CAMBIO: text-4xl en pantallas medianas para no sobrecargar visualmente */}
            <h1 className="text-3xl font-extrabold leading-tight text-[#171717] md:text-4xl lg:text-5xl">
              Bienvenido <br />
              <span className="text-[#00A8A8]">de nuevo</span>
            </h1>
            <p className="text-xs font-medium text-[#6B7280] lg:text-sm">
              Ingresa tu número de documento para gestionar tus reservas de medicamentos sin filas.
            </p>
          </div>

          <p className="text-xs font-semibold text-[#6B7280]">
            © 2026 FarmaSync. Todos los derechos reservados.
          </p>
        </div>

        {/* COLUMNA DERECHA - TARJETA DE LOGIN */}
        {/* CAMBIO: Ancho fijo ajustado en laptops para evitar solapamientos */}
        <div className="w-full rounded-2xl border-2 border-[#00A8A8]/30 bg-gradient-to-b from-white via-white to-[#00A8A8]/10 p-6 shadow-2xl backdrop-blur-xl md:w-[380px] lg:w-[420px] lg:p-8">
          
          {/* Logo móvil */}
          <div className="mb-6 flex items-center justify-center gap-3 md:hidden">
            <div className="relative h-14 w-14 overflow-hidden rounded-full border-2 border-[#00A8A8]/40 bg-white p-0.5 shadow-md">
              <Image
                src="/images/logo1.jpeg"
                alt="FarmaSync Logo"
                fill
                className="rounded-full object-cover"
                priority
              />
            </div>
            <span className="text-2xl font-extrabold text-[#171717]">FarmaSync</span>
          </div>

          <div className="mb-6 lg:mb-8">
            <h2 className="text-2xl font-extrabold text-[#171717]">Iniciar Sesión</h2>
            <p className="mt-1 text-xs font-medium text-[#6B7280]">
              Ingresa tus datos para acceder a tu perfil
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 lg:space-y-5">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#171717]">
                Número de Cédula (CC)
              </label>
              <div className="relative mt-1.5 lg:mt-2">
                <input
                  type="text"
                  name="documento"
                  value={formData.documento}
                  onChange={handleChange}
                  placeholder="Ej: 1017123456"
                  className="w-full rounded-xl border border-[#00A8A8]/20 bg-white/80 py-2.5 pl-11 pr-4 text-sm font-medium text-[#171717] outline-none transition-all focus:border-[#00A8A8] focus:bg-white focus:ring-2 focus:ring-[#00A8A8]/30 lg:py-3"
                  required
                />
                <CreditCard className="absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-[#00A8A8]" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#171717]">
                Contraseña
              </label>
              <div className="relative mt-1.5 lg:mt-2">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-[#00A8A8]/20 bg-white/80 py-2.5 pl-11 pr-11 text-sm font-medium text-[#171717] outline-none transition-all focus:border-[#00A8A8] focus:bg-white focus:ring-2 focus:ring-[#00A8A8]/30 lg:py-3"
                  required
                />
                <Lock className="absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-[#00A8A8]" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                  aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex cursor-pointer items-center gap-2 text-xs font-semibold text-[#6B7280]">
                <input
                  type="checkbox"
                  name="remember"
                  checked={formData.remember}
                  onChange={handleChange}
                  className="h-4 w-4 rounded border-gray-300 text-[#00A8A8] focus:ring-[#00A8A8]"
                />
                Recordarme
              </label>
            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-[#00A8A8] py-3 text-sm font-bold text-white shadow-lg shadow-[#00A8A8]/30 transition-all hover:bg-[#008C8C] hover:shadow-xl active:scale-[0.98] lg:py-3.5"
            >
              INGRESAR
            </button>
          </form>

          {/* OPCIÓN EMPLEADO */}
          <div className="mt-4 rounded-xl border border-[#00A8A8]/30 bg-[#00A8A8]/10 p-2.5 text-center lg:mt-5 lg:p-3">
            <p className="text-xs font-semibold text-[#171717]">
              ¿Eres empleado autorizado?
            </p>
            <Link
              href="/registro-cuidador"
              className="mt-1 inline-flex items-center gap-1.5 text-xs font-extrabold text-[#00A8A8] hover:underline"
            >
              <UserCheck className="h-4 w-4" />
              Ingresa como empleado aquí
            </Link>
          </div>

          <div className="mt-6 space-y-2 text-center text-xs lg:mt-8">
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