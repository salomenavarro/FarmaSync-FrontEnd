"use client";

import { LogOut, LoaderCircle } from "lucide-react";
import { useLogout } from "../hooks/useLogout";

// =========================================================
// TIPOS
// =========================================================

type LogoutButtonProps = {
  className?: string;
  iconOnly?: boolean;
  iconSize?: number;
};

// =========================================================
// COMPONENTE REUTILIZABLE
// =========================================================

export default function LogoutButton({
  className = "",
  iconOnly = false,
  iconSize = 22,
}: LogoutButtonProps) {
  const logoutMutation = useLogout();

  return (
    <>
      <button
        type="button"
        onClick={() => logoutMutation.mutate()}
        disabled={logoutMutation.isPending}
        aria-label={
          logoutMutation.isPending
            ? "Cerrando sesión"
            : "Cerrar sesión"
        }
        aria-busy={logoutMutation.isPending}
        className={`
          flex items-center gap-3
          cursor-pointer
          transition-colors
          disabled:cursor-not-allowed
          disabled:opacity-50
          ${className}
        `}
      >
        {logoutMutation.isPending ? (
          <LoaderCircle
            size={iconSize}
            className="shrink-0 animate-spin"
            aria-hidden="true"
          />
        ) : (
          <LogOut
            size={iconSize}
            className="shrink-0"
            aria-hidden="true"
          />
        )}

        {!iconOnly && (
          <span>
            {logoutMutation.isPending
              ? "Cerrando sesión..."
              : "Cerrar sesión"}
          </span>
        )}
      </button>

      {logoutMutation.isError && (
        <p
          role="alert"
          className="mt-2 text-xs text-red-300"
        >
          No se pudo cerrar sesión. Intenta nuevamente.
        </p>
      )}
    </>
  );
}