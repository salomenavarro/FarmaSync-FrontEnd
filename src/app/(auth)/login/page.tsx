"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Eye, EyeOff, CreditCard, Lock } from "lucide-react";
import { motion, Variants } from "framer-motion";
import AuthLayout from "@/components/auth/AuthLayout";

// Variantes tipadas con 'Variants' para evitar errores de TS
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.2,
    },
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
    <AuthLayout>
      {/* CONTENEDOR PRINCIPAL */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        className="relative z-10 my-auto flex w-full max-w-[420px] flex-col items-stretch overflow-hidden rounded-3xl border border-[#00A8A8]/20 bg-[#00A8A8]/10 p-3 shadow-xl backdrop-blur-md sm:p-4 md:max-w-3xl md:flex-row md:items-center md:p-6 lg:max-w-4xl lg:p-8"
      >
        {/* COLUMNA IZQUIERDA - BIENVENIDA */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          className="hidden flex-1 flex-col justify-between gap-6 p-4 md:flex md:w-1/2 lg:w-3/5 lg:p-6"
        >
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

          <div className="my-auto space-y-3 pr-4 lg:space-y-4">
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
        </motion.div>

        {/* COLUMNA DERECHA - TARJETA DE LOGIN */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
          className="w-full rounded-2xl border-2 border-[#00A8A8]/30 bg-gradient-to-b from-white via-white to-[#00A8A8]/10 p-4 shadow-2xl backdrop-blur-xl sm:p-5 md:w-[380px] md:p-6 lg:w-[420px] lg:p-8"
        >
          {/* LOGO MÓVIL */}
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
              Iniciar Sesión
            </h2>

            <p className="mt-1 text-[11px] font-medium leading-5 text-[#6B7280] sm:text-xs">
              Ingresa tus datos para acceder a tu perfil
            </p>
          </div>

          {/* FORMULARIO */}
          <motion.form
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            onSubmit={handleSubmit}
            className="space-y-3.5 sm:space-y-4 lg:space-y-5"
          >
            {/* DOCUMENTO */}
            <motion.div variants={itemVariants}>
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
                  className="w-full rounded-xl border border-[#00A8A8]/20 bg-white/80 py-3 pl-11 pr-4 text-sm font-medium text-[#171717] outline-none transition-all focus:border-[#00A8A8] focus:bg-white focus:ring-2 focus:ring-[#00A8A8]/30 lg:py-3"
                  required
                />

                <CreditCard className="absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-[#00A8A8]" />
              </div>
            </motion.div>

            {/* CONTRASEÑA */}
            <motion.div variants={itemVariants}>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#171717] sm:text-xs">
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
            </motion.div>

            {/* RECORDARME */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap items-center justify-between gap-3"
            >
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
            </motion.div>

            {/* BOTÓN INGRESAR */}
            <motion.div variants={itemVariants}>
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full rounded-xl bg-[#00A8A8] py-3 text-sm font-bold text-white shadow-lg shadow-[#00A8A8]/30 transition-all hover:bg-[#008C8C] hover:shadow-xl lg:py-3.5"
              >
                INGRESAR
              </motion.button>
            </motion.div>
          </motion.form>

          {/* ENLACES */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.4 }}
            className="mt-5 space-y-2 text-center text-xs sm:mt-6 lg:mt-8"
          >
            <p className="text-[#6B7280]">
              ¿No tienes una cuenta?{" "}
              <Link
                href="/registro"
                className="font-bold text-[#00A8A8] hover:underline"
              >
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
          </motion.div>
        </motion.div>
      </motion.div>
    </AuthLayout>
  );
}