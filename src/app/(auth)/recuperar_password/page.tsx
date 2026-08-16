"use client";


import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, CreditCard, Mail } from "lucide-react";


export default function RecuperarPasswordPage() {
  const [documento, setDocumento] = useState("");
  const [correo, setCorreo] = useState("");


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();


    console.log("Solicitud de recuperación:", {
      documento,
      correo,
    });
  };


  return (
    <div className="relative flex min-h-dvh w-full items-center justify-center overflow-hidden bg-[#FCFBDC] px-4 py-8">


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




      {/* ===================================================== */}
      {/* CONTENEDOR PRINCIPAL */}
      {/* ===================================================== */}


      <div className="relative z-10 my-auto flex w-full max-w-sm flex-col overflow-hidden rounded-3xl border border-[#00A8A8]/25 bg-[#DDF4D8]/70 p-3 shadow-xl backdrop-blur-md sm:max-w-md sm:p-4 md:max-w-4xl md:flex-row md:items-center md:p-6 lg:max-w-5xl lg:p-8">




        {/* ================================================= */}
        {/* COLUMNA IZQUIERDA */}
        {/* ================================================= */}


        <div className="hidden flex-1 flex-col justify-between gap-8 p-5 md:flex md:w-1/2 md:p-6 lg:p-8">


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


            <span className="text-2xl font-black tracking-tight text-[#171717] lg:text-3xl">
              FarmaSync
            </span>


          </div>




          {/* TEXTO */}


          <div className="my-auto space-y-4 pr-4">


            <h1 className="text-4xl font-extrabold leading-tight text-[#171717] lg:text-5xl">


              Recupera tu
              <br />


              <span className="text-[#00A8A8]">
                contraseña
              </span>


            </h1>


            <p className="max-w-md text-sm font-medium leading-6 text-[#6B7280]">


              No te preocupes. Ingresa tus datos y te
              ayudaremos a recuperar el acceso a tu
              cuenta.


            </p>


          </div>




          {/* FOOTER */}


          <p className="text-xs font-semibold text-[#6B7280]">
            © 2026 FarmaSync. Todos los derechos reservados.
          </p>


        </div>




        {/* ================================================= */}
        {/* TARJETA DERECHA */}
        {/* ================================================= */}


        <div className="w-full rounded-2xl border-2 border-[#00A8A8]/30 bg-gradient-to-b from-white via-white to-[#DDF4D8]/70 p-5 shadow-2xl backdrop-blur-xl sm:p-6 md:w-[380px] md:p-7 lg:w-[420px] lg:p-8">




          {/* LOGO MÓVIL */}


          <div className="mb-5 flex items-center justify-center gap-3 md:hidden">


            <div className="relative h-12 w-12 overflow-hidden rounded-full border-2 border-[#00A8A8]/40 bg-white p-0.5 shadow-md">


              <Image
                src="/images/logo1.jpeg"
                alt="FarmaSync Logo"
                fill
                className="rounded-full object-cover"
              />


            </div>


            <span className="text-xl font-extrabold text-[#171717]">
              FarmaSync
            </span>


          </div>




          {/* TÍTULO */}


          <div className="mb-6">


            <h2 className="text-2xl font-extrabold text-[#171717]">
              ¿Olvidaste tu contraseña?
            </h2>


            <p className="mt-2 text-xs font-medium leading-5 text-[#6B7280] sm:text-sm">


              Ingresa tu número de cédula y correo electrónico
              para solicitar la recuperación de tu contraseña.


            </p>


          </div>




          {/* FORMULARIO */}


          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >


            {/* CÉDULA */}


            <div>


              <label className="block text-xs font-bold uppercase tracking-wider text-[#171717]">
                Número de Cédula (CC)
              </label>


              <div className="relative mt-2">


                <input
                  type="text"
                  value={documento}
                  onChange={(e) => setDocumento(e.target.value)}
                  placeholder="Ej: 1017123456"
                  className="w-full rounded-xl border border-[#00A8A8]/20 bg-white/80 py-3 pl-11 pr-4 text-sm font-medium text-[#171717] outline-none transition-all focus:border-[#00A8A8] focus:bg-white focus:ring-2 focus:ring-[#00A8A8]/30"
                  required
                />


                <CreditCard className="absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-[#00A8A8]" />


              </div>


            </div>




            {/* CORREO */}


            <div>


              <label className="block text-xs font-bold uppercase tracking-wider text-[#171717]">
                Correo Electrónico
              </label>


              <div className="relative mt-2">


                <input
                  type="email"
                  value={correo}
                  onChange={(e) => setCorreo(e.target.value)}
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
              className="w-full rounded-xl bg-[#00A8A8] py-3.5 text-sm font-bold text-white shadow-lg shadow-[#00A8A8]/30 transition-all hover:bg-[#008C8C] hover:shadow-xl active:scale-[0.98]"
            >
              ENVIAR SOLICITUD
            </button>


          </form>




          {/* VOLVER AL LOGIN */}


          <div className="mt-7 text-center text-xs">


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




          {/* FOOTER MÓVIL */}


          <div className="mt-7 border-t border-[#00A8A8]/10 pt-4 text-center md:hidden">


            <p className="text-[10px] font-semibold leading-5 text-[#6B7280]">
              © 2026 FarmaSync. Todos los derechos reservados.
            </p>


          </div>


        </div>


      </div>


    </div>
  );
}

