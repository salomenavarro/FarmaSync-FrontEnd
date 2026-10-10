"use client";

import { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Image from "next/image";
import Link from "next/link";
import { Lock, Eye, EyeOff, AlertTriangle, ArrowLeft } from "lucide-react";
import AuthLayout from "@/components/layout/AuthLayout";
import { resetPasswordSchema, ResetPasswordFormValues } from "../schemas/reset-password.schema";
import { useResetPassword, getResetPasswordErrorMessage } from "../hooks/useResetPassword";

/**
 * Función utilitaria para verificar si un token JWT ha expirado en el cliente.
 */
function isTokenExpired(token: string): boolean {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return true;

    // Decodifica la parte del payload (base64url)
    const base64 = parts[1].replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );

    const payload = JSON.parse(jsonPayload);

    if (!payload.exp) return false;

    // 'exp' viene en segundos; Date.now() está en milisegundos
    return Date.now() >= payload.exp * 1000;
  } catch {
    return true; // Si el token está mal formado, se considera inválido
  }
}

export default function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token") || "";

  const [showPassword, setShowPassword] = useState(false);

  // Evalúa si el token es nulo o si ya pasaron los 15 minutos de vigencia
  const tokenExpired = useMemo(() => {
    if (!token) return true;
    return isTokenExpired(token);
  }, [token]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      token: token,
    },
  });

  const resetMutation = useResetPassword();

  const onSubmit = (data: ResetPasswordFormValues) => {
    resetMutation.mutate(data);
  };

  // VISTA DE ERROR: Si no hay token o ya expiraron los 15 minutos
  if (tokenExpired) {
    return (
      <AuthLayout>
        <div className="relative z-10 my-auto flex w-full max-w-sm flex-col items-center overflow-hidden rounded-3xl border border-red-200 bg-red-50/80 p-2.5 shadow-xl backdrop-blur-md sm:max-w-md sm:p-4">
          <div className="w-full rounded-2xl border-2 border-red-200 bg-white p-6 text-center shadow-2xl sm:p-8">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-100 text-red-600">
              <AlertTriangle className="h-7 w-7" />
            </div>

            <h2 className="text-xl font-extrabold text-[#171717]">Enlace Expirado o Inválido</h2>
            <p className="mt-2 text-xs font-medium text-gray-600 leading-relaxed">
              El enlace de recuperación ha caducado porque han transcurrido más de 15 minutos o ya fue utilizado.
            </p>

            <div className="mt-6 space-y-3">
              <Link
                href="/recuperar_password"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#00A8A8] py-3 text-xs font-bold text-white shadow-lg shadow-[#00A8A8]/30 transition-all hover:bg-[#008C8C]"
              >
                Solicitar nuevo enlace
              </Link>
              <Link
                href="/login"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-500 hover:text-[#00A8A8]"
              >
                <ArrowLeft className="h-4 w-4" /> Volver al Inicio de Sesión
              </Link>
            </div>
          </div>
        </div>
      </AuthLayout>
    );
  }

  // VISTA NORMAL: Si el token está activo
  return (
    <AuthLayout>
      <div className="relative z-10 my-auto flex w-full max-w-sm flex-col items-center overflow-hidden rounded-3xl border border-[#00A8A8]/20 bg-[#00A8A8]/10 p-2.5 shadow-xl backdrop-blur-md sm:max-w-md">
        <div className="w-full rounded-2xl border-2 border-[#00A8A8]/30 bg-gradient-to-b from-white via-white to-[#00A8A8]/10 p-6 shadow-2xl backdrop-blur-xl sm:p-8">
          <div className="mb-6 flex flex-col items-center text-center">
            <div className="relative mb-3 h-14 w-14 overflow-hidden rounded-full border-2 border-[#00A8A8]/40 bg-white p-1 shadow-md">
              <Image src="/images/logo2.jpeg" alt="FarmaSync Logo" fill className="rounded-full object-cover" sizes="56px" />
            </div>
            <h2 className="text-xl font-extrabold text-[#171717]">Nueva Contraseña</h2>
            <p className="mt-1 text-xs font-medium text-[#6B7280]">
              Ingresa y confirma tu nueva clave de acceso.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
            {/* NUEVA CONTRASEÑA */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#171717]">
                Nueva Contraseña
              </label>
              <div className="relative mt-1.5">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  {...register("password")}
                  className="w-full rounded-xl border border-[#00A8A8]/20 bg-white/80 py-2.5 pl-10 pr-10 text-sm font-medium text-[#171717] outline-none transition-all focus:border-[#00A8A8] focus:bg-white focus:ring-2 focus:ring-[#00A8A8]/30"
                />
                <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[#00A8A8]" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-xs font-semibold text-red-500">{errors.password.message}</p>
              )}
            </div>

            {/* CONFIRMAR CONTRASEÑA */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#171717]">
                Confirmar Contraseña
              </label>
              <div className="relative mt-1.5">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  {...register("confirmPassword")}
                  className="w-full rounded-xl border border-[#00A8A8]/20 bg-white/80 py-2.5 pl-10 pr-10 text-sm font-medium text-[#171717] outline-none transition-all focus:border-[#00A8A8] focus:bg-white focus:ring-2 focus:ring-[#00A8A8]/30"
                />
                <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[#00A8A8]" />
              </div>
              {errors.confirmPassword && (
                <p className="mt-1 text-xs font-semibold text-red-500">{errors.confirmPassword.message}</p>
              )}
            </div>

            {resetMutation.isError && (
              <p className="text-xs font-semibold text-red-500">
                {getResetPasswordErrorMessage(resetMutation.error)}
              </p>
            )}

            <button
              type="submit"
              disabled={resetMutation.isPending}
              className="w-full rounded-xl bg-[#00A8A8] py-3 text-xs font-bold text-white shadow-lg shadow-[#00A8A8]/30 transition-all hover:bg-[#008C8C] disabled:opacity-60"
            >
              {resetMutation.isPending ? "GUARDANDO..." : "CAMBIAR CONTRASEÑA"}
            </button>
          </form>
        </div>
      </div>
    </AuthLayout>
  );
}