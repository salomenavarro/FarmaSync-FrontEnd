
"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { Inter } from "next/font/google";

import {
  Bell,
  CalendarDays,
  Clock,
  Headphones,
  Home,
  LogOut,
  Pill,
  Search,
  ShieldCheck,
  User,
} from "lucide-react";

import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

// ========================================
// FUENTE
// ========================================

const titleFont = Inter({
  subsets: ["latin"],
  weight: ["700", "800"],
});

// ========================================
// TIPOS
// ========================================

type NavItem = {
  href: string;
  label: string;
  icon: LucideIcon;
};

type DashboardShellProps = {
  usuario: {
    nombreCompleto: string;
  };
  children: ReactNode;
};

// ========================================
// NAVEGACIÓN DEL PACIENTE
// ========================================

const MAIN_NAV: NavItem[] = [
  {
    href: "/dashboard",
    label: "Inicio",
    icon: Home,
  },
  {
    href: "/medicamentos",
    label: "Buscar medicamentos",
    icon: Search,
  },
  {
    href: "/reservas",
    label: "Mis reservas",
    icon: CalendarDays,
  },
  {
    href: "/reservas?vista=historial",
    label: "Historial de reservas",
    icon: Clock,
  },
  {
    href: "/medicamentos?vista=guardados",
    label: "Mis medicamentos",
    icon: Pill,
  },
  {
    href: "/notificaciones",
    label: "Recordatorios",
    icon: Bell,
  },
];

const ACCOUNT_NAV: NavItem[] = [
  {
    href: "/perfil",
    label: "Mi perfil",
    icon: User,
  },
  {
    href: "/perfil?seccion=seguridad",
    label: "Seguridad",
    icon: ShieldCheck,
  },
];

// ========================================
// ESTILOS
// ========================================

const FOCUS =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";

const NAV_LINK = `
  flex w-full items-center gap-3
  rounded-xl px-4 py-2.5
  text-[0.9375rem] font-semibold
  leading-snug transition-colors
  ${FOCUS}
`;

const ACTIVE_STYLE =
  "bg-gradient-to-r from-[#0755D8] to-[#0876E9] text-white shadow-[0_8px_20px_rgba(5,91,210,0.35)]";

const INACTIVE_STYLE =
  "text-white/90 hover:bg-white/10";

// ========================================
// LOGO
// ========================================

function Logo() {
  return (
    <>
      <span
        className="
          flex h-10 w-10 shrink-0
          items-center justify-center
          rounded-full bg-white
        "
      >
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

// ========================================
// IDENTIFICAR LA RUTA ACTIVA
// ========================================

function useActiveNavigation() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const isActive = (href: string) => {
    const [targetPath, targetQuery] = href.split("?");

    if (targetQuery) {
      const targetParams = new URLSearchParams(targetQuery);

      if (pathname !== targetPath) {
        return false;
      }

      return Array.from(targetParams.entries()).every(
        ([key, value]) => searchParams.get(key) === value
      );
    }

    if (targetPath === "/dashboard") {
      return pathname === targetPath;
    }

    const hasSpecificActiveLink = [
      ...MAIN_NAV,
      ...ACCOUNT_NAV,
    ].some((item) => {
      if (!item.href.startsWith(`${targetPath}?`)) {
        return false;
      }

      const query = item.href.split("?")[1];
      const params = new URLSearchParams(query);

      return (
        pathname === targetPath &&
        Array.from(params.entries()).every(
          ([key, value]) => searchParams.get(key) === value
        )
      );
    });

    return (
      !hasSpecificActiveLink &&
      (pathname === targetPath ||
        pathname.startsWith(`${targetPath}/`))
    );
  };

  return { isActive };
}

// ========================================
// ELEMENTOS DEL MENÚ
// ========================================

function NavigationItems({
  items,
}: {
  items: NavItem[];
}) {
  const { isActive } = useActiveNavigation();

  return (
    <ul className="flex flex-col gap-1">
      {items.map(({ href, label, icon: Icon }) => {
        const active = isActive(href);

        return (
          <li key={href}>
            <Link
              href={href}
              aria-current={active ? "page" : undefined}
              className={`${NAV_LINK} ${
                active ? ACTIVE_STYLE : INACTIVE_STYLE
              }`}
            >
              <Icon
                size={20}
                className="shrink-0"
                aria-hidden="true"
              />

              <span>{label}</span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

// ========================================
// TARJETA DE AYUDA
// ========================================

function HelpCard() {
  return (
    <div
      className="
        rounded-[20px]
        border border-white/15
        bg-white/10 px-3 py-3
        text-center
      "
    >
      <span
        aria-hidden="true"
        className="
          mx-auto flex h-10 w-10
          items-center justify-center
          rounded-full bg-white/15
          text-white
        "
      >
        <Headphones size={21} />
      </span>

      <p
        className={`${titleFont.className} mt-2 text-sm font-extrabold text-white`}
      >
        ¿Necesitas ayuda?
      </p>

      <p className="mt-1 text-xs text-[#C3D4F7]">
        Estamos aquí para ayudarte.
      </p>

      <Link
        href="/soporte"
        className={`
          mt-3 flex w-full
          items-center justify-center
          rounded-full
          bg-white px-3 py-2
          text-xs font-bold
          text-[#0755D8]
          transition hover:bg-[#E5F1FF]
          ${FOCUS}
        `}
      >
        Contactar soporte
      </Link>
    </div>
  );
}

// ========================================
// SIDEBAR ESCRITORIO
// ========================================

function Sidebar({ name }: { name: string }) {
  return (
    <aside
      className="
        sticky top-0
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
      {/* LOGO */}

      <Link
        href="/dashboard"
        className={`mb-4 flex shrink-0 items-center gap-3 rounded-full px-1 py-1 ${FOCUS}`}
      >
        <Logo />
      </Link>

      {/* IDENTIFICACIÓN */}

      <div className="mb-4 shrink-0 rounded-2xl border border-white/10 bg-white/10 px-4 py-3">
        <p
          className={`${titleFont.className} text-base font-extrabold`}
        >
          Panel del paciente
        </p>

        <p className="mt-0.5 text-sm text-[#C3D4F7]">
          Gestión de medicamentos
        </p>
      </div>

      {/* NAVEGACIÓN */}

      <nav
        aria-label="Navegación del paciente"
        className="
          min-h-0 flex-1
          overflow-y-auto
          overscroll-contain
          pr-1
          [scrollbar-width:thin]
          [scrollbar-color:#2A4A9A_transparent]
        "
      >
        <NavigationItems items={MAIN_NAV} />

        {/* CUENTA */}

        <p className="mb-2 mt-4 flex items-center gap-3 px-4 text-xs font-bold text-[#C3D4F7]">
          Cuenta

          <span
            aria-hidden="true"
            className="h-px flex-1 bg-white/20"
          />
        </p>

        <NavigationItems items={ACCOUNT_NAV} />
      </nav>

      {/* SECCIÓN INFERIOR */}

      <div className="mt-3 shrink-0 border-t border-white/15 pt-3">
        <HelpCard />

        {/* USUARIO */}

        <div className="mt-3 flex items-center gap-3 px-2">
          <span
            aria-hidden="true"
            className="
              flex h-10 w-10 shrink-0
              items-center justify-center
              rounded-full bg-[#0876E9]
            "
          >
            <User size={21} />
          </span>

          <span className="min-w-0 leading-tight">
            <span className="block truncate text-sm font-extrabold">
              {name}
            </span>

            <span className="block text-xs text-[#C3D4F7]">
              Paciente
            </span>
          </span>
        </div>

        {/* CERRAR SESIÓN */}

        <button
          type="button"
          className={`${NAV_LINK} mt-2 text-white hover:bg-white/10`}
        >
          <LogOut
            size={20}
            className="shrink-0"
            aria-hidden="true"
          />

          <span>Cerrar sesión</span>
        </button>
      </div>
    </aside>
  );
}

// ========================================
// BARRA MÓVIL
// ========================================

function MobileBar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentUrl = searchParams.toString()
    ? `${pathname}?${searchParams.toString()}`
    : pathname;

  return (
    <header
      className="
        shrink-0
        bg-gradient-to-b
        from-[#0B1F5C] to-[#0F2A75]
        px-4 pb-3 pt-3
        text-white
        lg:hidden
      "
    >
      <div className="flex items-center justify-between gap-3">
        <Link
          href="/dashboard"
          className={`flex items-center gap-3 rounded-full ${FOCUS}`}
        >
          <Logo />
        </Link>

        <span className="text-xs font-semibold text-[#C3D4F7]">
          Paciente
        </span>
      </div>

      <nav
        aria-label="Navegación móvil del paciente"
        className="mt-3"
      >
        <ul className="flex gap-2 overflow-x-auto pb-1">
          {[...MAIN_NAV, ...ACCOUNT_NAV].map(
            ({ href, label, icon: Icon }) => {
              const active = currentUrl === href;

              return (
                <li key={href} className="shrink-0">
                  <Link
                    href={href}
                    aria-current={active ? "page" : undefined}
                    className={`
                      flex items-center gap-2
                      rounded-xl px-3 py-2
                      text-sm font-semibold
                      transition-colors
                      ${FOCUS}
                      ${
                        active
                          ? ACTIVE_STYLE
                          : INACTIVE_STYLE
                      }
                    `}
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
            }
          )}
        </ul>
      </nav>
    </header>
  );
}

// ========================================
// DASHBOARD SHELL
// ========================================

export default function DashboardShell({
  usuario,
  children,
}: DashboardShellProps) {
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
