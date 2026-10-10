"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Image from "next/image";
import Link from "next/link";
import { CreditCard, ArrowLeft, CheckCircle2 } from "lucide-react";
import AuthLayout from "@/components/layout/AuthLayout";
import { forgotPasswordSchema, ForgotPasswordFormValues } from "../schemas/forgot-password.schema";
import { useForgotPassword, getForgotPasswordErrorMessage } from "../hooks/useForgotPassword";

export default function ForgotPasswordForm() {
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const forgotMutation = useForgotPassword();

  const onSubmit = (data: ForgotPasswordFormValues) => {
    forgotMutation.mutate(data, {
      onSuccess: () => setIsSuccess(true),
    });
  };

  return (
    <AuthLayout>
      <div className="relative z-10 my-auto flex w-full max-w-sm flex-col items-center overflow-hidden rounded-3xl border border-[#00A8A8]/20 bg-[#00A8A8]/10 p-2.5 shadow-xl backdrop-blur-md sm:max-w-md sm:p-4 md:max-w-md">
        <div className="w-full rounded-2xl border-2 border-[#00A8A8]/30 bg-gradient-to-b from-white via-white to-[#00A8A8]/10 p-6 shadow-2xl backdrop-blur-xl sm:p-8">
          
          <div className="mb-6 flex flex-col items-center text-center">
            <div className="relative mb-3 h-14 w-14 overflow-hidden rounded-full border-2 border-[#00A8A8]/40 bg-white p-1 shadow-md">
              <Image src="/images/logo2.jpeg" alt="FarmaSync Logo" fill className="rounded-full object-cover" sizes="56px" />
            </div>
            <h2 className="text-xl font-extrabold text-[#171717] sm:text-2xl">Recuperar Contraseña</h2>
            <p className="mt-1 text-xs font-medium text-[#6B7280]">
              Ingresa tu número de documento registrado para enviarte las instrucciones a tu correo.
            </p>
          </div>

          {isSuccess ? (
            <div className="space-y-4 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                <CheckCircle2 className="h-6 w-6" />
              </div>
              <p className="text-sm font-semibold text-[#171717]">
                ¡Instrucciones enviadas! Revisa la bandeja de entrada o spam de tu correo asociado.
              </p>
              <Link
                href="/login"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#00A8A8] py-3 text-xs font-bold text-white shadow-lg shadow-[#00A8A8]/30 transition-all hover:bg-[#008C8C]"
              >
                Volver al Inicio de Sesión
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#171717]">
                  Número de Cédula / Documento
                </label>
                <div className="relative mt-1.5">
                  <input
                    type="text"
                    placeholder="Ej: 1017123456"
                    {...register("numeroDocumento")}
                    className="w-full rounded-xl border border-[#00A8A8]/20 bg-white/80 py-2.5 pl-10 pr-3 text-sm font-medium text-[#171717] outline-none transition-all focus:border-[#00A8A8] focus:bg-white focus:ring-2 focus:ring-[#00A8A8]/30"
                  />
                  <CreditCard className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[#00A8A8]" />
                </div>
                {errors.numeroDocumento && (
                  <p className="mt-1 text-xs font-semibold text-red-500">{errors.numeroDocumento.message}</p>
                )}
              </div>

              {forgotMutation.isError && (
                <p className="text-xs font-semibold text-red-500">
                  {getForgotPasswordErrorMessage(forgotMutation.error)}
                </p>
              )}

              <button
                type="submit"
                disabled={forgotMutation.isPending}
                className="w-full rounded-xl bg-[#00A8A8] py-3 text-xs font-bold text-white shadow-lg shadow-[#00A8A8]/30 transition-all hover:bg-[#008C8C] disabled:opacity-60"
              >
                {forgotMutation.isPending ? "ENVIANDO..." : "ENVIAR INSTRUCCIONES"}
              </button>

              <div className="pt-2 text-center">
                <Link
                  href="/login"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#6B7280] hover:text-[#00A8A8]"
                >
                  <ArrowLeft className="h-4 w-4" /> Volver al Inicio de Sesión
                </Link>
              </div>
            </form>
          )}

        </div>
      </div>
    </AuthLayout>
  );
}