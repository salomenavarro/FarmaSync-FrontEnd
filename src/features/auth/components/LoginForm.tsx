
"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Image from "next/image";
import Link from "next/link";
import { Eye, EyeOff, CreditCard, Lock } from "lucide-react";
import { motion, Variants } from "framer-motion";
import AuthLayout from "@/components/layout/AuthLayout";
import { loginSchema, LoginFormValues } from "../schemas/login.schema";
import { useLogin, getLoginErrorMessage } from "../hooks/useLogin";
import { GoogleLogin, CredentialResponse } from "@react-oauth/google";
import { loginWithGoogle } from "../services/auth.service";
import { getRedirectPathByUser } from "../utils/role-redirect";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.2 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const loginMutation = useLogin();

  const onSubmit = (data: LoginFormValues) => {
    loginMutation.mutate(data);
  };

  const handleGoogleSuccess = async (
    credentialResponse: CredentialResponse,
  ) => {
    try {
      if (!credentialResponse.credential) return;

      const usuario = await loginWithGoogle(
        credentialResponse.credential,
      );

      console.log("Sesión iniciada con éxito en backend:", usuario);

      window.location.href = getRedirectPathByUser(usuario);
    } catch (error: any) {
      console.error(
        "Error al autenticar con el backend:",
        error.response?.data || error.message,
      );
    }
  };

  return (
    <AuthLayout>
      <div className="relative isolate flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#F2F8FF] px-4 py-8 sm:px-6">

        {/* =================================================
            FONDO CON ONDAS INSPIRADAS EN EL HERO
            ================================================= */}

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
        >
          {/* Fondo base */}

          <div className="absolute inset-0 bg-gradient-to-br from-[#F7FBFF] via-[#EAF4FF] to-[#DCEBFF]" />

          {/* Halo azul superior */}

          <div className="absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-[#75B9FF]/20 blur-[100px]" />

          {/* Halo cian derecho */}

          <div className="absolute -right-40 top-20 h-[500px] w-[500px] rounded-full bg-[#76DDEB]/20 blur-[110px]" />

          {/* Ondas superiores */}

          <svg
            className="absolute left-0 top-0 h-[230px] w-full"
            viewBox="0 0 1440 300"
            preserveAspectRatio="none"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 0H1440V85C1190 190 1000 145 770 110C500 68 260 220 0 105V0Z"
              fill="#C7E2FF"
              fillOpacity="0.65"
            />

            <path
              d="M0 0H1440V45C1160 150 970 105 730 85C420 58 210 185 0 75V0Z"
              fill="#D9EDFF"
              fillOpacity="0.85"
            />

            <path
              d="M0 0H1440V20C1130 105 960 75 710 55C430 35 190 135 0 45V0Z"
              fill="#B9E5F5"
              fillOpacity="0.45"
            />
          </svg>

          {/* Ondas inferiores */}

          <svg
            className="absolute bottom-0 left-0 h-[260px] w-full"
            viewBox="0 0 1440 300"
            preserveAspectRatio="none"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 110C250 190 420 250 700 180C980 110 1190 45 1440 110V300H0V110Z"
              fill="#C5E1FF"
              fillOpacity="0.75"
            />

            <path
              d="M0 185C250 245 450 280 730 220C1010 160 1220 95 1440 160V300H0V185Z"
              fill="#D9EBFF"
              fillOpacity="0.85"
            />

            <path
              d="M0 245C300 275 490 300 760 255C1040 210 1260 160 1440 210V300H0V245Z"
              fill="#EAF5FF"
            />
          </svg>

          {/* Círculo decorativo izquierdo */}

          <div className="absolute -left-20 top-[30%] h-64 w-64 rounded-full border-[2px] border-[#69CBE4]/30" />

          {/* Círculo decorativo derecho */}

          <div className="absolute -right-24 top-[15%] h-80 w-80 rounded-full border-[2px] border-[#69CBE4]/30" />

          {/* Cruces médicas */}

          <span className="absolute left-[12%] top-[20%] text-5xl font-bold text-[#69CBE4]/40">
            +
          </span>

          <span className="absolute right-[13%] top-[36%] text-6xl font-bold text-[#0875ED]/20">
            +
          </span>

          <span className="absolute bottom-[18%] left-[25%] text-5xl font-bold text-[#69CBE4]/40">
            +
          </span>

          <span className="absolute bottom-[23%] right-[25%] text-5xl font-bold text-[#0875ED]/20">
            +
          </span>
        </div>

        {/* =================================================
            CONTENEDOR PRINCIPAL
            ================================================= */}

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.5,
            ease: [0.25, 0.1, 0.25, 1],
          }}
          className="relative z-10 flex w-full max-w-5xl flex-col overflow-hidden rounded-[28px] border border-white/70 bg-white shadow-[0_25px_70px_rgba(16,65,130,0.16)] md:min-h-[570px] md:flex-row"
        >
          {/* =================================================
              COLUMNA IZQUIERDA - BIENVENIDA
              ================================================= */}

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.6,
              delay: 0.1,
              ease: "easeOut",
            }}
            className="relative hidden flex-1 flex-col justify-between overflow-hidden bg-gradient-to-br from-[#063B80] via-[#0757B8] to-[#087CE8] p-7 md:flex md:w-1/2 lg:p-10"
          >
            {/* Decoraciones internas */}

            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full border border-white/15"
            />

            <div
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-[#09B9E9]/20 blur-3xl"
            />

            {/* Logo */}

            <div className="relative z-10 flex items-center gap-3 lg:gap-4">
              <div className="relative flex h-16 w-16 items-center justify-center overflow-hidden rounded-full border-2 border-white/80 bg-white p-1 shadow-lg lg:h-20 lg:w-20">
                <Image
                  src="/images/logoficial.png"
                  alt="FarmaSync Logo"
                  fill
                  className="rounded-full object-cover"
                  priority
                />
              </div>

              <span className="text-2xl font-black tracking-tight text-white lg:text-3xl">
                FarmaSync
              </span>
            </div>

            {/* Mensaje de bienvenida */}

            <div className="relative z-10 my-auto space-y-4 pr-2 lg:space-y-5">
              <h1 className="text-3xl font-extrabold leading-tight text-white md:text-4xl lg:text-5xl">
                Bienvenido
                <br />
                <span className="text-[#65E5F2]">
                  de nuevo
                </span>
              </h1>

              <p className="max-w-sm text-sm font-medium leading-relaxed text-white/85 lg:text-base">
                Ingresa tu número de documento para gestionar tus reservas de medicamentos sin filas.
              </p>
            </div>

            {/* Copyright */}

            <p className="relative z-10 text-[11px] font-semibold leading-5 text-white/70 sm:text-xs">
              © 2026 FarmaSync. Todos los derechos reservados.
            </p>

            {/* Ondas inferiores del panel */}

            <svg
              aria-hidden="true"
              className="pointer-events-none absolute bottom-0 left-0 w-full opacity-40"
              viewBox="0 0 600 180"
              preserveAspectRatio="none"
            >
              <path
                d="M0 90C150 160 300 150 430 80C500 40 550 55 600 20V180H0V90Z"
                fill="#08BDF2"
              />
              <path
                d="M0 130C180 190 330 170 470 110C530 80 565 90 600 65V180H0V130Z"
                fill="#39CBEA"
              />
            </svg>
          </motion.div>

          {/* =================================================
              COLUMNA DERECHA - TARJETA DE LOGIN
              ================================================= */}

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.6,
              delay: 0.15,
              ease: "easeOut",
            }}
            className="w-full bg-white p-5 sm:p-7 md:w-[420px] md:shrink-0 md:p-8 lg:w-[450px] lg:p-10"
          >
            {/* Logo móvil */}

            <div className="mb-5 flex items-center justify-center gap-2.5 md:hidden">
              <div className="relative h-12 w-12 overflow-hidden rounded-full border-2 border-[#B9D8FA] bg-white p-0.5 shadow-md">
                <Image
                  src="/images/logoficial.png"
                  alt="FarmaSync Logo"
                  fill
                  className="rounded-full object-cover"
                  priority
                />
              </div>

              <span className="text-[22px] font-extrabold text-[#103B78] sm:text-2xl">
                FarmaSync
              </span>
            </div>

            {/* Encabezado */}

            <div className="mb-5 sm:mb-6 lg:mb-8">
              <h2 className="text-[22px] font-extrabold text-[#102D59] sm:text-2xl">
                Iniciar Sesión
              </h2>

              <p className="mt-1 text-[11px] font-medium leading-5 text-[#64748B] sm:text-xs">
                Ingresa tus datos para acceder a tu perfil
              </p>
            </div>

            {/* Formulario */}

            <motion.form
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-3.5 sm:space-y-4 lg:space-y-5"
              noValidate
            >
              {/* DOCUMENTO */}

              <motion.div variants={itemVariants}>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#19345B] sm:text-xs">
                  Número de Cédula (CC)
                </label>

                <div className="relative mt-1.5 lg:mt-2">
                  <input
                    type="text"
                    placeholder="Ej: 1017123456"
                    {...register("numeroDocumento")}
                    className="w-full rounded-xl border border-[#C9DCF3] bg-[#F9FBFF] py-3 pl-11 pr-4 text-sm font-medium text-[#172B4D] outline-none transition-all placeholder:text-[#94A3B8] focus:border-[#1769CF] focus:bg-white focus:ring-2 focus:ring-[#1769CF]/20"
                  />

                  <CreditCard className="absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-[#1769CF]" />
                </div>

                {errors.numeroDocumento && (
                  <p className="mt-1 text-xs font-semibold text-red-500">
                    {errors.numeroDocumento.message}
                  </p>
                )}
              </motion.div>

              {/* CONTRASEÑA */}

              <motion.div variants={itemVariants}>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#19345B] sm:text-xs">
                  Contraseña
                </label>

                <div className="relative mt-1.5 lg:mt-2">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    {...register("password")}
                    className="w-full rounded-xl border border-[#C9DCF3] bg-[#F9FBFF] py-3 pl-11 pr-11 text-sm font-medium text-[#172B4D] outline-none transition-all placeholder:text-[#94A3B8] focus:border-[#1769CF] focus:bg-white focus:ring-2 focus:ring-[#1769CF]/20"
                  />

                  <Lock className="absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-[#1769CF]" />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#7B8DA8] transition-colors hover:text-[#1769CF] focus:outline-none"
                    aria-label={
                      showPassword
                        ? "Ocultar contraseña"
                        : "Mostrar contraseña"
                    }
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>

                {errors.password && (
                  <p className="mt-1 text-xs font-semibold text-red-500">
                    {errors.password.message}
                  </p>
                )}
              </motion.div>

              {/* ERROR DEL SERVIDOR */}

              {loginMutation.isError && (
                <motion.p
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="text-sm font-semibold text-red-500"
                >
                  {getLoginErrorMessage(loginMutation.error)}
                </motion.p>
              )}

              {/* BOTÓN INGRESAR */}

              <motion.div variants={itemVariants}>
                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={loginMutation.isPending}
                  className="w-full rounded-xl bg-gradient-to-r from-[#1557B8] to-[#087CE8] py-3 text-sm font-bold text-white shadow-lg shadow-[#0757B8]/25 transition-all hover:from-[#10499F] hover:to-[#0669CB] hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60 lg:py-3.5"
                >
                  {loginMutation.isPending ? "INGRESANDO..." : "INGRESAR"}
                </motion.button>
              </motion.div>
            </motion.form>

            {/* SEPARADOR */}

            <div className="my-5 flex items-center gap-3">
              <div className="h-px flex-1 bg-[#DCE7F5]" />

              <span className="text-xs font-medium text-gray-500">
                O continúa con
              </span>

              <div className="h-px flex-1 bg-[#DCE7F5]" />
            </div>

            {/* BOTÓN OFICIAL DE GOOGLE */}

            <div className="flex w-full justify-center">
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={() =>
                  console.error("Error al iniciar sesión en Google")
                }
                shape="pill"
                theme="outline"
                width="350"
              />
            </div>

            {/* REGISTRO Y RECUPERACIÓN */}

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.4 }}
              className="mt-5 space-y-2 text-center text-xs sm:mt-6 lg:mt-8"
            >
              <p className="text-[#64748B]">
                ¿No tienes una cuenta?{" "}
                <Link
                  href="/registro"
                  className="font-bold text-[#1265C5] transition-colors hover:text-[#084A9D] hover:underline"
                >
                  Regístrate
                </Link>
              </p>

              <div>
                <Link
                  href="/recuperar_password"
                  className="font-medium text-[#64748B] transition-colors hover:text-[#1265C5] hover:underline"
                >
                  ¿Olvidaste tu contraseña?
                </Link>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </AuthLayout>
  );
}
