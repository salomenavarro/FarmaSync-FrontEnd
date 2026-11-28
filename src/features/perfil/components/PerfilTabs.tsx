"use client";

import { UserRound, ShieldCheck } from "lucide-react";
import type { SeccionPerfil } from "../types";

interface PerfilTabsProps {
  seccionActiva: SeccionPerfil;
  onChange: (seccion: SeccionPerfil) => void;
}

const TABS = [
  {
    id: "datos-personales",
    label: "Datos personales",
    icon: UserRound,
  },
  {
    id: "seguridad",
    label: "Seguridad",
    icon: ShieldCheck,
  },
] as const;

export default function PerfilTabs({
  seccionActiva,
  onChange,
}: PerfilTabsProps) {
  return (
    <nav
      aria-label="Secciones de mi perfil"
      className="flex w-full flex-wrap items-center gap-2 rounded-[20px] border border-[#DCE4EF] bg-white p-2 shadow-sm"
    >
      {TABS.map(({ id, label, icon: Icon }) => {
        const activa = seccionActiva === id;

        return (
          <button
            key={id}
            type="button"
            aria-pressed={activa}
            onClick={() => onChange(id)}
            className={`flex min-w-0 flex-1 items-center justify-center gap-2 rounded-xl px-3 py-3 text-xs font-semibold transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0755D8] focus-visible:ring-offset-2 sm:px-5 sm:text-sm sm:flex-none ${
              activa
                ? "bg-[#EAF2FF] text-[#0755D8]"
                : "text-[#64748B] hover:bg-[#F5F9FF] hover:text-[#0755D8]"
            }`}
          >
            <Icon
              size={19}
              strokeWidth={1.8}
              className="shrink-0"
              aria-hidden="true"
            />

            <span>{label}</span>
          </button>
        );
      })}
    </nav>
  );
}