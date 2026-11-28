"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Inter } from "next/font/google";

import {
  Boxes,
  ClipboardList,
  Home,
  Package,
  User,
} from "lucide-react";

import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

import LogoutButton from "@/features/auth/components/LogoutButton";
import SidebarWaves from "@/components/layout/SidebarWaves";

// =========================================================
// FUENTE
// =========================================================

const titleFont = Inter({
  subsets: ["latin"],
  weight: ["700", "800"],
});

// =========================================================
// TIPOS
// =========================================================

type NavItem = {
  href: string;
  label: string;
  icon: LucideIcon;
};

// =========================================================
// NAVEGACIÓN
// =========================================================

const MAIN_NAV: NavItem[] = [
  {
    href: "/farmaceutico/dashboard",
    label: "Inicio",
    icon: Home,
  },
  {
    href: "/farmaceutico/solicitudes",
    label: "Solicitudes",
    icon: ClipboardList,
  },
  {
    href: "/farmaceutico/entregas",
    label: "Entregas",
    icon: Package,
  },
  {
    href: "/farmaceutico/inventario",
    label: "Inventario",
    icon: Boxes,
  },
];

// =========================================================
// ESTILOS
// =========================================================

const FOCUS =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";

const NAV_LINK = `flex w-full items-center gap-3 rounded-xl px-4 py-3 text-base font-semibold leading-snug transition-colors ${FOCUS}`;

const isActive = (pathname: string, href: string) =>
  href === "/farmaceutico/dashboard"
    ? pathname === href
    : pathname === href || pathname.startsWith(`${href}/`);

const classesItem = (active: boolean) =>
  active
    ? "bg-gradient-to-r from-[#0755D8] to-[#0876E9] text-white shadow-[0_8px_20px_rgba(5,91,210,0.35)]"
    : "text-white/90 hover:bg-white/10";

// =========================================================
// LOGO
// =========================================================

function Logo() {
  return (
    <>
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white">
        <Image
          src="/images/logoficial.png"
          alt=""
          width={40}
          height={40}
          className="h-9 w-9 rounded-full object-contain"
        />
      </span>

      <span
        className={`${titleFont.className} text-2xl font-extrabold text-white`}
      >
        FarmaSync
      </span>
    </>
  );
}

// =========================================================
// SIDEBAR (ESCRITORIO)
// =========================================================

function Sidebar({ name }: { name: string }) {
  const pathname = usePathname();

  return (
    <aside
      className="
        sticky top-0 isolate
        hidden h-dvh w-[260px]
        shrink-0 flex-col
        overflow-hidden
        bg-gradient-to-b
        from-[#0B1F5C] to-[#0F2A75]
        px-4 pb-3 pt-4
        text-white
        lg:flex
      "
    >
      {/* ONDAS Y CÍRCULOS DECORATIVOS */}

      <SidebarWaves />

      {/* LOGO */}

      <Link
        href="/farmaceutico/dashboard"
        className={`mb-4 flex shrink-0 items-center gap-3 rounded-full px-1 py-1 ${FOCUS}`}
      >
        <Logo />
      </Link>

      {/* IDENTIFICACIÓN DEL PANEL */}

      <div className="mb-4 shrink-0 rounded-2xl border border-white/10 bg-white/10 px-4 py-3">
        <p
          className={`${titleFont.className} text-base font-extrabold`}
        >
          Panel farmacéutico
        </p>

        <p className="mt-0.5 text-sm text-[#C3D4F7]">
          Gestión de farmacia
        </p>
      </div>

      {/* MENÚ DE NAVEGACIÓN */}

      <nav
        aria-label="Panel farmacéutico"
        className="
          min-h-0 flex-1
          overflow-y-auto
          overscroll-contain
          pr-1
          [scrollbar-width:thin]
          [scrollbar-color:#2A4A9A_transparent]
        "
      >
        <ul className="flex flex-col gap-1">
          {MAIN_NAV.map(({ href, label, icon: Icon }) => {
            const active = isActive(pathname, href);

            return (
              <li key={href}>
                <Link
                  href={href}
                  aria-current={active ? "page" : undefined}
                  className={`${NAV_LINK} ${classesItem(active)}`}
                >
                  <Icon
                    size={22}
                    className="shrink-0"
                    aria-hidden="true"
                  />

                  <span>{label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* SECCIÓN INFERIOR */}

      <div className="mt-3 shrink-0 border-t border-white/15 pt-3">
        <div className="flex items-center gap-3 px-2">
          <span
            aria-hidden="true"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#0876E9]"
          >
            <User size={22} />
          </span>

          <span className="min-w-0 leading-tight">
            <span className="block truncate text-base font-extrabold">
              {name}
            </span>

            <span className="block text-sm text-[#C3D4F7]">
              Farmacéutico
            </span>
          </span>
        </div>

        {/* COMPONENTE REUTILIZABLE DE CIERRE DE SESIÓN */}

        <LogoutButton
          iconSize={22}
          className={`${NAV_LINK} mt-2 text-white hover:bg-white/10`}
        />
      </div>
    </aside>
  );
}

// =========================================================
// BARRA SUPERIOR (CELULAR Y TABLET)
// =========================================================

function MobileBar() {
  const pathname = usePathname();

  return (
    <header className="shrink-0 bg-gradient-to-b from-[#0B1F5C] to-[#0F2A75] px-4 pb-3 pt-3 text-white lg:hidden">
      <div className="flex items-center justify-between gap-3">
        <Link
          href="/farmaceutico/dashboard"
          className={`flex items-center gap-3 rounded-full ${FOCUS}`}
        >
          <Logo />
        </Link>

        {/* COMPONENTE REUTILIZABLE DE CIERRE DE SESIÓN */}

        <LogoutButton
          iconOnly
          iconSize={22}
          className={`rounded-full p-2 text-white hover:bg-white/10 ${FOCUS}`}
        />
      </div>

      {/* NAVEGACIÓN MÓVIL */}

      <nav
        aria-label="Panel farmacéutico"
        className="mt-3"
      >
        <ul className="flex gap-2 overflow-x-auto pb-1">
          {MAIN_NAV.map(({ href, label, icon: Icon }) => {
            const active = isActive(pathname, href);

            return (
              <li key={href} className="shrink-0">
                <Link
                  href={href}
                  aria-current={active ? "page" : undefined}
                  className={`flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold transition-colors ${FOCUS} ${classesItem(active)}`}
                >
                  <Icon
                    size={18}
                    className="shrink-0"
                    aria-hidden="true"
                  />

                  <span>{label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}

// =========================================================
// FARMACEUTICO SHELL
// =========================================================

export default function FarmaceuticoShell({
  usuario,
  children,
}: {
  usuario: {
    nombreCompleto: string;
  };
  children: ReactNode;
}) {
  return (
    <div className="flex min-h-dvh flex-col bg-[#F5F9FF] text-[#14285B] lg:flex-row">
      <MobileBar />

      <Sidebar name={usuario.nombreCompleto} />

      <main className="min-w-0 flex-1">
        {children}
      </main>
    </div>
  );
}