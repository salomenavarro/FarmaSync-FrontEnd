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
  User,
  Eye,
  EyeOff,
} from "lucide-react";
import { motion, Variants } from "framer-motion";
import AuthLayout from "@/components/auth/AuthLayout";

// Variantes de animación tipadas
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
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

export default function RegistroPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <AuthLayout>
      {/* CONTENEDOR PRINCIPAL CON ANIMACIÓN DE ENTRADA */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        className="relative z-10 my-auto flex w-full max-w-sm flex-col items-center overflow-hidden rounded-3xl border border-[#00A8A8]/20 bg-[#00A8A8]/10 p-2.5 shadow-xl backdrop-blur-md sm:max-w-md sm:p-4 md:max-w-4xl md:flex-row md:p-6 lg:p-8"
      >
        {/* COLUMNA IZQUIERDA - BIENVENIDA */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          className="hidden flex-1 flex-col justify-between gap-8 p-4 md:flex md:w-1/2 md:p-6 lg:w-3/5 lg:p-8"
        >
          {/* LOGO */}
          <div className="flex items-center gap-3 lg:gap-4">
            <div className="relative flex h-14 w-14 items-center justify-center overflow-hidden rounded-full border-2 border-[#00A8A8]/40 bg-white p-1 shadow-lg lg:h-20 lg:w-20">
              <Image
                src="/images/logo1.jpeg"
                alt="FarmaSync Logo"
                fill
                className="rounded-full object-cover"
                priority
              />
            </div>

            <span className="text-xl font-black tracking-tight text-[#171717] sm:text-2xl lg:text-3xl">
              FarmaSync
            </span>
          </div>

          {/* TEXTO */}
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

          {/* FOOTER */}
          <p className="text-xs font-semibold text-[#6B7280]">
            © 2026 FarmaSync. Todos los derechos reservados.
          </p>
        </motion.div>

        {/* COLUMNA DERECHA - TARJETA DE REGISTRO */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
          className="w-full shrink-0 overflow-visible rounded-2xl border-2 border-[#00A8A8]/30 bg-gradient-to-b from-white via-white to-[#00A8A8]/10 p-4 shadow-2xl backdrop-blur-xl sm:p-5 md:max-h-[85vh] md:w-[380px] md:overflow-y-auto md:p-7 lg:w-[420px] lg:p-8"
        >
          {/* LOGO MÓVIL */}
          <div className="mb-5 flex items-center justify-center gap-3 sm:mb-6 md:hidden">
            <div className="relative h-11 w-11 overflow-hidden rounded-full border-2 border-[#00A8A8]/40 bg-white p-0.5 shadow-md sm:h-12 sm:w-12">
              <Image
                src="/images/logo1.jpeg"
                alt="FarmaSync Logo"
                fill
                className="rounded-full object-cover"
                priority
              />
            </div>

            <span className="text-lg font-extrabold text-[#171717] sm:text-xl">
              FarmaSync
            </span>
          </div>

          {/* TÍTULO */}
          <div className="mb-5 text-left sm:mb-6">
            <h2 className="text-xl font-extrabold leading-tight text-[#171717] sm:text-2xl">
              Registro de Usuario
            </h2>

            <p className="mt-1 text-xs font-medium leading-5 text-[#6B7280]">
              Ingresa tus datos personales para crear tu perfil
            </p>
          </div>

          {/* FORMULARIO CON CASCADA DE ANIMACIÓN */}
          <motion.form
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-3.5 sm:space-y-4"
          >
            {/* NOMBRE COMPLETO */}
            <motion.div variants={itemVariants}>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#171717]">
                Nombre Completo
              </label>

              <div className="relative mt-1.5 sm:mt-2">
                <input
                  type="text"
                  placeholder="Ingresa tu nombre completo"
                  className="w-full rounded-xl border border-[#00A8A8]/20 bg-white/80 py-2.5 pl-10 pr-3 text-sm font-medium text-[#171717] outline-none transition-all focus:border-[#00A8A8] focus:bg-white focus:ring-2 focus:ring-[#00A8A8]/30 sm:py-3 sm:pl-11 sm:pr-4"
                  required
                />
                <User className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[#00A8A8] sm:left-3.5" />
              </div>
            </motion.div>

            {/* CÉDULA */}
            <motion.div variants={itemVariants}>
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
            </motion.div>

            {/* TELÉFONO */}
            <motion.div variants={itemVariants}>
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
            </motion.div>

            {/* CORREO ELECTRÓNICO */}
            <motion.div variants={itemVariants}>
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
            </motion.div>

            {/* FECHA DE NACIMIENTO */}
            <motion.div variants={itemVariants}>
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
            </motion.div>

            {/* CONTRASEÑA */}
            <motion.div variants={itemVariants}>
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
            </motion.div>

            {/* BOTÓN REGISTRARSE CON INTERACCIÓN TÁCTIL */}
            <motion.div variants={itemVariants}>
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="mt-2 w-full rounded-xl bg-[#00A8A8] py-3 text-sm font-bold text-white shadow-lg shadow-[#00A8A8]/30 transition-all hover:bg-[#008C8C] hover:shadow-xl sm:py-3.5"
              >
                CREAR CUENTA
              </motion.button>
            </motion.div>
          </motion.form>

          {/* LINK A INICIAR SESIÓN */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.4 }}
            className="mt-5 text-center text-xs sm:mt-8"
          >
            <p className="text-[#6B7280]">
              ¿Ya tienes una cuenta?{" "}
              <Link
                href="/login"
                className="font-bold text-[#00A8A8] hover:underline"
              >
                Inicia sesión
              </Link>
            </p>
          </motion.div>

          {/* FOOTER MÓVIL */}
          <div className="mt-7 border-t border-[#00A8A8]/10 pt-4 text-center md:hidden">
            <p className="text-center text-[10px] font-semibold leading-5 text-[#6B7280]">
              © 2026 FarmaSync. Todos los derechos reservados.
            </p>
          </div>
        </motion.div>
      </motion.div>
    </AuthLayout>
  );
}