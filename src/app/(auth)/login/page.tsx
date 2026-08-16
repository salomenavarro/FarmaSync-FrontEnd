"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Eye, EyeOff, CreditCard, Lock, UserCheck,ArrowLeft } from "lucide-react";

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
<div className="relative flex min-h-dvh w-full items-center justify-center overflow-x-hidden overflow-y-auto bg-[#FCFBDC] px-3 py-6 sm:px-6 sm:py-8 md:h-dvh md:min-h-0 md:overflow-y-hidden">      
      
       {/* ===================================================== */}
      {/* BOTÓN VOLVER AL INICIO */}
      {/* ===================================================== */}


      <Link
        href="/"
        className="absolute left-5 top-5 z-30 flex items-center gap-2 rounded-xl border border-[#00A8A8]/20 bg-white/90 px-4 py-2.5 text-sm font-semibold text-[#171717] shadow-md backdrop-blur-sm transition-all hover:bg-white hover:text-[#00A8A8] hover:shadow-lg sm:left-6 sm:top-6"
      >
        <ArrowLeft className="h-5 w-5" />
        <span>Volver al inicio</span>
      </Link>
      
      {/* ===================================================== */}
      {/* PATRÓN DE FONDO */}
      {/* ===================================================== */}


      {/* CÍRCULO SUPERIOR DERECHO */}


      <div className="pointer-events-none absolute -right-10 top-8 h-36 w-36 rounded-full border-[5px] border-[#00A8A8]/30 sm:h-44 sm:w-44 md:h-52 md:w-52" />


      {/* CÍRCULO IZQUIERDO */}


      <div className="pointer-events-none absolute -left-12 top-[30%] h-32 w-32 rounded-full border-[5px] border-[#00A8A8]/25 sm:h-40 sm:w-40 md:h-48 md:w-48" />


      {/* CÍRCULO INFERIOR DERECHO */}


      <div className="pointer-events-none absolute -right-8 bottom-5 h-40 w-40 rounded-full border-[6px] border-[#00A8A8]/30 sm:h-48 sm:w-48 md:h-56 md:w-56" />


      {/* CÍRCULO PEQUEÑO */}


      <div className="pointer-events-none absolute bottom-16 left-[28%] h-12 w-12 rounded-full border-2 border-[#00A8A8]/25 sm:h-16 sm:w-16" />


      {/* ===================================================== */}
      {/* CRUCES - SEPARADAS DE LOS CÍRCULOS */}
      {/* ===================================================== */}


      {/* Cruz superior izquierda */}


      <div className="pointer-events-none absolute left-[16%] top-[12%] text-5xl font-black text-[#00A8A8]/30 sm:text-6xl">
        +
      </div>


      {/* Cruz superior central */}


      <div className="pointer-events-none absolute left-[48%] top-[7%] text-6xl font-black text-[#00A8A8]/30 sm:text-7xl">
        +
      </div>


      {/* Cruz derecha */}


      <div className="pointer-events-none absolute right-[17%] top-[28%] text-5xl font-black text-[#00A8A8]/30 sm:text-6xl">
        +
      </div>


      {/* Cruz izquierda central */}


      <div className="pointer-events-none absolute left-[14%] top-[55%] text-6xl font-black text-[#00A8A8]/30 sm:text-7xl">
        +
      </div>


      {/* Cruz inferior derecha */}


      <div className="pointer-events-none absolute right-[18%] bottom-[15%] text-5xl font-black text-[#00A8A8]/30 sm:text-6xl">
        +
      </div>


      {/* Cruz inferior izquierda */}


      <div className="pointer-events-none absolute left-[5%] bottom-[8%] text-4xl font-black text-[#00A8A8]/25 sm:text-5xl">
        +
      </div>




      {/* ===================================================== */}
      {/* PUNTOS DECORATIVOS */}
      {/* ===================================================== */}


      <div className="pointer-events-none absolute left-[8%] top-[18%] h-4 w-4 rounded-full bg-[#00A8A8]/35" />


      <div className="pointer-events-none absolute left-[33%] top-[13%] h-3 w-3 rounded-full bg-[#00A8A8]/30" />


      <div className="pointer-events-none absolute right-[27%] top-[8%] h-5 w-5 rounded-full bg-[#00A8A8]/30" />


      <div className="pointer-events-none absolute right-[8%] top-[52%] h-4 w-4 rounded-full bg-[#00A8A8]/30" />


      <div className="pointer-events-none absolute left-[20%] bottom-[25%] h-5 w-5 rounded-full bg-[#00A8A8]/25" />


      <div className="pointer-events-none absolute right-[31%] bottom-[10%] h-4 w-4 rounded-full bg-[#00A8A8]/30" />


      <div className="pointer-events-none absolute left-[39%] bottom-[8%] h-3 w-3 rounded-full bg-[#00A8A8]/30" />




      {/* ===================================================== */}
      {/* LÍNEAS DECORATIVAS */}
      {/* ===================================================== */}


      <div className="pointer-events-none absolute left-[23%] top-[20%] h-[2px] w-20 rotate-45 rounded-full bg-[#00A8A8]/25 sm:w-28" />


      <div className="pointer-events-none absolute right-[25%] top-[18%] h-[2px] w-20 -rotate-45 rounded-full bg-[#00A8A8]/25 sm:w-28" />


      <div className="pointer-events-none absolute left-[7%] bottom-[20%] h-[2px] w-20 -rotate-45 rounded-full bg-[#00A8A8]/25 sm:w-28" />


      <div className="pointer-events-none absolute right-[8%] bottom-[30%] h-[2px] w-20 rotate-45 rounded-full bg-[#00A8A8]/25 sm:w-28" />


      <div className="pointer-events-none absolute right-[38%] bottom-[7%] h-[2px] w-16 -rotate-45 rounded-full bg-[#00A8A8]/25 sm:w-24" />




      {/* ===================================================== */}
      {/* GRUPOS DE PUNTOS */}
      {/* ===================================================== */}


      <div className="pointer-events-none absolute left-[10%] top-[35%] grid grid-cols-4 gap-2 opacity-50">
        <span className="h-1.5 w-1.5 rounded-full bg-[#00A8A8]" />
        <span className="h-1.5 w-1.5 rounded-full bg-[#00A8A8]" />
        <span className="h-1.5 w-1.5 rounded-full bg-[#00A8A8]" />
        <span className="h-1.5 w-1.5 rounded-full bg-[#00A8A8]" />


        <span className="h-1.5 w-1.5 rounded-full bg-[#00A8A8]" />
        <span className="h-1.5 w-1.5 rounded-full bg-[#00A8A8]" />
        <span className="h-1.5 w-1.5 rounded-full bg-[#00A8A8]" />
        <span className="h-1.5 w-1.5 rounded-full bg-[#00A8A8]" />


        <span className="h-1.5 w-1.5 rounded-full bg-[#00A8A8]" />
        <span className="h-1.5 w-1.5 rounded-full bg-[#00A8A8]" />
        <span className="h-1.5 w-1.5 rounded-full bg-[#00A8A8]" />
        <span className="h-1.5 w-1.5 rounded-full bg-[#00A8A8]" />
      </div>




      <div className="pointer-events-none absolute right-[10%] bottom-[22%] grid grid-cols-4 gap-2 opacity-50">
        <span className="h-1.5 w-1.5 rounded-full bg-[#00A8A8]" />
        <span className="h-1.5 w-1.5 rounded-full bg-[#00A8A8]" />
        <span className="h-1.5 w-1.5 rounded-full bg-[#00A8A8]" />
        <span className="h-1.5 w-1.5 rounded-full bg-[#00A8A8]" />


        <span className="h-1.5 w-1.5 rounded-full bg-[#00A8A8]" />
        <span className="h-1.5 w-1.5 rounded-full bg-[#00A8A8]" />
        <span className="h-1.5 w-1.5 rounded-full bg-[#00A8A8]" />
        <span className="h-1.5 w-1.5 rounded-full bg-[#00A8A8]" />


        <span className="h-1.5 w-1.5 rounded-full bg-[#00A8A8]" />
        <span className="h-1.5 w-1.5 rounded-full bg-[#00A8A8]" />
        <span className="h-1.5 w-1.5 rounded-full bg-[#00A8A8]" />
        <span className="h-1.5 w-1.5 rounded-full bg-[#00A8A8]" />
      </div>




      {/* ===================================================== */}
      {/* HALOS */}
      {/* ===================================================== */}


      <div className="pointer-events-none absolute left-[15%] top-[15%] h-64 w-64 rounded-full bg-[#00A8A8]/10 blur-3xl" />


      <div className="pointer-events-none absolute right-[15%] bottom-[15%] h-64 w-64 rounded-full bg-[#00A8A8]/10 blur-3xl" />


      {/* CONTENEDOR PRINCIPAL - HERO CENTRADO */}
      {/* CAMBIO: my-auto para auto-centrado perfecto + max-w adaptativo */}
      <div className="relative z-10 my-auto flex w-full max-w-[420px] flex-col items-stretch overflow-hidden rounded-3xl border border-[#00A8A8]/20 bg-[#00A8A8]/10 p-3 shadow-xl backdrop-blur-md sm:p-4 md:max-w-3xl md:flex-row md:items-center md:p-6 lg:max-w-4xl lg:p-8">
        
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

          <p className="text-[11px] font-semibold leading-5 text-[#6B7280] sm:text-xs">
            © 2026 FarmaSync. Todos los derechos reservados.
          </p>
        </div>

        {/* COLUMNA DERECHA - TARJETA DE LOGIN */}
        {/* CAMBIO: Ancho fijo ajustado en laptops para evitar solapamientos */}
        <div className="w-full rounded-2xl border-2 border-[#00A8A8]/30 bg-gradient-to-b from-white via-white to-[#00A8A8]/10 p-4 shadow-2xl backdrop-blur-xl sm:p-5 md:w-[380px] md:p-6 lg:w-[420px] lg:p-8">
          
          {/* Logo móvil */}
          <div className="mb-5 flex items-center justify-center gap-2.5 sm:mb-6 md:hidden">
            <div className="relative h-12 w-12 overflow-hidden rounded-full border-2 sm:h-14 sm:w-14 border-[#00A8A8]/40 bg-white p-0.5 shadow-md">
              <Image
                src="/images/logo1.jpeg"
                alt="FarmaSync Logo"
                fill
                className="rounded-full object-cover"
                priority
              />
            </div>
            <span className="text-[22px] font-extrabold text-[#171717] sm:text-2xl">FarmaSync</span>
          </div>

          <div className="mb-5 sm:mb-6 lg:mb-8">
            <h2 className="text-[22px] font-extrabold text-[#171717] sm:text-2xl">Iniciar Sesión</h2>
            <p className="mt-1 text-[11px] leading-5 font-medium text-[#6B7280] sm:text-xs">
              Ingresa tus datos para acceder a tu perfil
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3.5 sm:space-y-4 lg:space-y-5">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider sm:text-xs text-[#171717]">
                Número de Cédula (CC)
              </label>
              <div className="relative mt-1.5 lg:mt-2">
                <input
                  type="text"
                  name="documento"
                  value={formData.documento}
                  onChange={handleChange}
                  placeholder="Ej: 1017123456"
                  className="w-full rounded-xl border border-[#00A8A8]/20 bg-white/80 py-3 pl-11 pr-4 text-sm font-medium text-[#171717] outline-none transition-all focus:border-[#00A8A8] focus:bg-white focus:ring-2 focus:ring-[#00A8A8]/30 lg:py-3"
                  required
                />
                <CreditCard className="absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-[#00A8A8]" />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider sm:text-xs text-[#171717]">
                Contraseña
              </label>
              <div className="relative mt-1.5 lg:mt-2">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-[#00A8A8]/20 bg-white/80 py-3 pl-11 pr-11 text-sm font-medium text-[#171717] outline-none transition-all focus:border-[#00A8A8] focus:bg-white focus:ring-2 focus:ring-[#00A8A8]/30 lg:py-3"
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

            <div className="flex flex-wrap items-center justify-between gap-3">
              <label className="flex cursor-pointer items-center gap-2 text-[11px] font-semibold leading-5 text-[#6B7280] sm:text-xs">
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

          <div className="mt-5 space-y-2 text-center text-xs sm:mt-6 lg:mt-8">
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