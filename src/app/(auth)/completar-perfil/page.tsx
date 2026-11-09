"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Image from "next/image";
import { CreditCard, Phone, ShieldCheck } from "lucide-react";
import { motion, Variants } from "framer-motion";
import AuthLayout from "@/components/layout/AuthLayout";
import {
  completeProfileSchema,
  CompleteProfileFormValues,
} from "@/features/auth/schemas/complete-profile.schema";
import {
  useCompleteProfile,
  getCompleteProfileErrorMessage,
} from "@/features/auth/hooks/useCompleteProfile";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.2 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

export default function CompleteProfilePage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CompleteProfileFormValues>({
    resolver: zodResolver(completeProfileSchema),
  });

  const completeProfileMutation = useCompleteProfile();

  const onSubmit = (data: CompleteProfileFormValues) => {
    completeProfileMutation.mutate(data);
  };

  return (
    <AuthLayout>
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        className="relative z-10 my-auto flex w-full max-w-[420px] flex-col items-stretch overflow-hidden rounded-3xl border border-[#00A8A8]/20 bg-[#00A8A8]/10 p-3 shadow-xl backdrop-blur-md sm:p-4 md:max-w-3xl md:flex-row md:items-center md:p-6 lg:max-w-4xl lg:p-8"
      >
        {/* COLUMNA IZQUIERDA - INFORMACIÓN DE EPS */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          className="hidden flex-1 flex-col justify-between gap-6 p-4 md:flex md:w-1/2 lg:w-3/5 lg:p-6"
        >
          <div className="flex items-center gap-3 lg:gap-4">
            <div className="relative flex h-16 w-16 items-center justify-center overflow-hidden rounded-full border-2 border-[#00A8A8]/40 bg-white p-1 shadow-lg lg:h-20 lg:w-20">
              <Image
                src="/images/logo1.jpeg"
                alt="FarmaSync Logo"
                fill
                className="rounded-full object-cover"
                priority
                sizes="80px"
              />
            </div>
            <span className="text-2xl font-black tracking-tight text-[#171717] lg:text-3xl">
              FarmaSync
            </span>
          </div>

          <div className="my-auto space-y-3 pr-4 lg:space-y-4">
            <h1 className="text-3xl font-extrabold leading-tight text-[#171717] md:text-4xl lg:text-5xl">
              Un último <br />
              <span className="text-[#00A8A8]">paso</span>
            </h1>
            <p className="text-xs font-medium text-[#6B7280] lg:text-sm">
              Para validar tus fórmulas médicas de la EPS y permitir el reclamo de medicamentos, necesitamos verificar tu documento de identidad real.
            </p>
            <div className="flex items-center gap-2 text-xs font-semibold text-[#00A8A8]">
              <ShieldCheck className="h-4 w-4" />
              <span>Tus datos están protegidos bajo la normativa vigente.</span>
            </div>
          </div>

          <p className="text-[11px] font-semibold leading-5 text-[#6B7280] sm:text-xs">
            © 2026 FarmaSync. Todos los derechos reservados.
          </p>
        </motion.div>

        {/* COLUMNA DERECHA - FORMULARIO */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
          className="w-full rounded-2xl border-2 border-[#00A8A8]/30 bg-gradient-to-b from-white via-white to-[#00A8A8]/10 p-4 shadow-2xl backdrop-blur-xl sm:p-5 md:w-[380px] md:p-6 lg:w-[420px] lg:p-8"
        >
          <div className="mb-5 flex items-center justify-center gap-2.5 sm:mb-6 md:hidden">
            <div className="relative h-12 w-12 overflow-hidden rounded-full border-2 border-[#00A8A8]/40 bg-white p-0.5 shadow-md sm:h-14 sm:w-14">
              <Image
                src="/images/logo1.jpeg"
                alt="FarmaSync Logo"
                fill
                className="rounded-full object-cover"
                priority
                sizes="56px"
              />
            </div>
            <span className="text-[22px] font-extrabold text-[#171717] sm:text-2xl">
              FarmaSync
            </span>
          </div>

          <div className="mb-5 sm:mb-6 lg:mb-8">
            <h2 className="text-[22px] font-extrabold text-[#171717] sm:text-2xl">
              Completar Perfil
            </h2>
            <p className="mt-1 text-[11px] font-medium leading-5 text-[#6B7280] sm:text-xs">
              Vincular cédula y teléfono a tu cuenta de Google
            </p>
          </div>

          <motion.form
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-3.5 sm:space-y-4 lg:space-y-5"
            noValidate
          >
            {/* CÉDULA REAL */}
            <motion.div variants={itemVariants}>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#171717] sm:text-xs">
                Número de Cédula (CC)
              </label>
              <div className="relative mt-1.5 lg:mt-2">
                <input
                  type="text"
                  placeholder="Ej: 1017123456"
                  {...register("numeroDocumento")}
                  className="w-full rounded-xl border border-[#00A8A8]/20 bg-white/80 py-3 pl-11 pr-4 text-sm font-medium text-[#171717] outline-none transition-all focus:border-[#00A8A8] focus:bg-white focus:ring-2 focus:ring-[#00A8A8]/30 lg:py-3"
                />
                <CreditCard className="absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-[#00A8A8]" />
              </div>
              {errors.numeroDocumento && (
                <p className="mt-1 text-xs font-semibold text-red-500">
                  {errors.numeroDocumento.message}
                </p>
              )}
            </motion.div>

            {/* TELÉFONO */}
            <motion.div variants={itemVariants}>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#171717] sm:text-xs">
                Teléfono de Contacto
              </label>
              <div className="relative mt-1.5 lg:mt-2">
                <input
                  type="text"
                  placeholder="Ej: 3001234567"
                  {...register("telefono")}
                  className="w-full rounded-xl border border-[#00A8A8]/20 bg-white/80 py-3 pl-11 pr-4 text-sm font-medium text-[#171717] outline-none transition-all focus:border-[#00A8A8] focus:bg-white focus:ring-2 focus:ring-[#00A8A8]/30 lg:py-3"
                />
                <Phone className="absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-[#00A8A8]" />
              </div>
              {errors.telefono && (
                <p className="mt-1 text-xs font-semibold text-red-500">
                  {errors.telefono.message}
                </p>
              )}
            </motion.div>

            {/* MENSAJE DE ERROR DEL SERVIDOR */}
            {completeProfileMutation.isError && (
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="text-sm font-semibold text-red-500"
              >
                {getCompleteProfileErrorMessage(completeProfileMutation.error)}
              </motion.p>
            )}

            {/* BOTÓN FINALIZAR */}
            <motion.div variants={itemVariants}>
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={completeProfileMutation.isPending}
                className="w-full rounded-xl bg-[#00A8A8] py-3 text-sm font-bold text-white shadow-lg shadow-[#00A8A8]/30 transition-all hover:bg-[#008C8C] hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60 lg:py-3.5"
              >
                {completeProfileMutation.isPending
                  ? "GUARDANDO DATOS..."
                  : "FINALIZAR REGISTRO"}
              </motion.button>
            </motion.div>
          </motion.form>
        </motion.div>
      </motion.div>
    </AuthLayout>
  );
}