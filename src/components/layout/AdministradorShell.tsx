"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import type { ReactNode } from "react";

import {
  LayoutDashboard,
  UsersRound,
  Building2,
  TriangleAlert,
  ChartNoAxesCombined,
  ShieldCheck,
  Menu,
  X,
  ChevronRight,
} from "lucide-react";

import type { LucideIcon } from "lucide-react";

import LogoutButton from "@/features/auth/components/LogoutButton";
import SidebarWaves from "@/components/layout/SidebarWaves";

// =========================================================
// TIPOS
// =========================================================

type NavItem = {
  href: string;
  label: string;
  icon: LucideIcon;
};

type AdministradorShellProps = {
  usuario: {
    nombreCompleto: string;
  };
  children: ReactNode;
};

// =========================================================
// NAVEGACIÓN
// =========================================================

const MAIN_NAV: NavItem[] = [
  {
    href: "/administrador/dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    href: "/administrador/farmaceuticos",
    label: "Farmacéuticos",
    icon: UsersRound,
  },
  {
    href: "/administrador/sedes",
    label: "Sedes de farmacia",
    icon: Building2,
  },
  {
    href: "/administrador/alertas",
    label: "Alertas de stock",
    icon: TriangleAlert,
  },
  {
    href: "/administrador/reportes",
    label: "Reportes e indicadores",
    icon: ChartNoAxesCombined,
  },
];

// =========================================================
// ESTILOS REUTILIZABLES
// =========================================================

const FOCUS =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";

const NAV_LINK = `
  flex w-full items-center gap-3
  rounded-xl px-4 py-3
  text-sm font-semibold
  transition-colors duration-200
  ${FOCUS}
`;

const ACTIVE_STYLE =
  "bg-gradient-to-r from-[#0755D8] to-[#0876E9] text-white shadow-[0_8px_20px_rgba(5,91,210,0.35)]";

const INACTIVE_STYLE =
  "text-white/90 hover:bg-white/10";

// =========================================================
// LOGOTIPO
// =========================================================

function Brand() {
  return (
    <Link
      href="/administrador/dashboard"
      className={`flex items-center gap-3 rounded-xl ${FOCUS}`}
    >
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white">
        <Image
          src="/images/logoficial.png"
          alt="Logo FarmaSync"
          width={35}
          height={35}
          className="object-contain"
        />
      </div>

      <span className="text-[23px] font-extrabold tracking-tight">
        FarmaSync
      </span>
    </Link>
  );
}

// =========================================================
// IDENTIFICACIÓN DEL PANEL
// =========================================================

function PanelIdentification() {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.07] p-3">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#0876E9]/30">
        <ShieldCheck
          size={22}
          aria-hidden="true"
        />
      </div>

      <div className="min-w-0">
        <p className="text-xs font-bold">
          Panel administrativo
        </p>

        <p className="mt-1 text-[11px] text-blue-200">
          Gestión y control EPS
        </p>
      </div>
    </div>
  );
}

// =========================================================
// MENÚ DE NAVEGACIÓN
// =========================================================

function Navigation({
  onNavigate,
}: {
  onNavigate?: () => void;
}) {
  const pathname = usePathname();

  return (
    <nav aria-label="Navegación del administrador">
      <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.15em] text-blue-200/80">
        Menú principal
      </p>

      <div className="space-y-1.5">
        {MAIN_NAV.map((item) => {
          const Icon = item.icon;

          const active =
            pathname === item.href ||
            pathname.startsWith(`${item.href}/`);

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              aria-current={active ? "page" : undefined}
              className={`${NAV_LINK} ${
                active ? ACTIVE_STYLE : INACTIVE_STYLE
              }`}
            >
              <Icon
                size={21}
                className="shrink-0"
                aria-hidden="true"
              />

              <span className="flex-1">
                {item.label}
              </span>

              {active && (
                <ChevronRight
                  size={16}
                  aria-hidden="true"
                />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

// =========================================================
// PERFIL DEL ADMINISTRADOR
// =========================================================

function AdminProfile({ name }: { name: string }) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.07] p-3">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#0755D8]">
        <ShieldCheck
          size={21}
          aria-hidden="true"
        />
      </div>

      <div className="min-w-0">
        <p className="truncate text-sm font-semibold">
          {name}
        </p>

        <p className="mt-0.5 text-xs text-blue-200">
          Administrador EPS
        </p>
      </div>
    </div>
  );
}

// =========================================================
// MENÚ LATERAL DE ESCRITORIO
// =========================================================

function Sidebar({ name }: { name: string }) {
  return (
    <aside
      className="
        sticky top-0 isolate hidden h-dvh
        w-[260px] shrink-0 flex-col
        overflow-hidden
        bg-gradient-to-b
        from-[#0B1F5C] to-[#0F2A75]
        px-4 pb-4 pt-5
        text-white
        lg:flex
      "
    >
      {/* ONDAS Y CÍRCULOS DECORATIVOS */}

      <SidebarWaves />

      {/* LOGOTIPO */}

      <div className="px-2">
        <Brand />
      </div>

      {/* IDENTIFICACIÓN DEL PANEL */}

      <div className="mt-7">
        <PanelIdentification />
      </div>

      {/* NAVEGACIÓN PRINCIPAL */}

      <div className="mt-7 min-h-0 flex-1 overflow-y-auto">
        <Navigation />
      </div>

      {/* PERFIL Y CIERRE DE SESIÓN */}

      <div className="mt-4 border-t border-white/10 pt-4">
        <AdminProfile name={name} />

        <LogoutButton
          iconSize={21}
          className={`${NAV_LINK} mt-3 text-white hover:bg-white/10`}
        />
      </div>
    </aside>
  );
}

// =========================================================
// MENÚ RESPONSIVE PARA MÓVILES
// =========================================================

function MobileBar({ name }: { name: string }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#0B1F5C] text-white shadow-md lg:hidden">

      {/* ENCABEZADO MÓVIL */}

      <div className="flex items-center justify-between px-4 py-3">
        <Brand />

        <button
          type="button"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
          aria-controls="admin-mobile-navigation"
          className={`rounded-xl p-2 hover:bg-white/10 ${FOCUS}`}
        >
          {open ? (
            <X size={25} />
          ) : (
            <Menu size={25} />
          )}
        </button>
      </div>

      {/* MENÚ DESPLEGABLE */}

      {open && (
        <div
          id="admin-mobile-navigation"
          className="max-h-[80dvh] space-y-5 overflow-y-auto border-t border-white/10 px-4 pb-5 pt-4"
        >
          <PanelIdentification />

          <Navigation
            onNavigate={() => setOpen(false)}
          />

          <AdminProfile name={name} />

          <LogoutButton
            iconSize={21}
            className={`${NAV_LINK} text-white hover:bg-white/10`}
          />
        </div>
      )}
    </header>
  );
}

// =========================================================
// ESTRUCTURA PRINCIPAL DEL ADMINISTRADOR
// =========================================================

export default function AdministradorShell({
  usuario,
  children,
}: AdministradorShellProps) {
  return (
    <div className="flex min-h-dvh flex-col bg-[#F5F9FF] text-[#14285B] lg:flex-row">

      {/* MENÚ MÓVIL */}

      <MobileBar name={usuario.nombreCompleto} />

      {/* MENÚ LATERAL DE ESCRITORIO */}

      <Sidebar name={usuario.nombreCompleto} />

      {/* CONTENIDO PRINCIPAL */}

      <main className="min-w-0 flex-1">
        {children}
      </main>
    </div>
  );
}