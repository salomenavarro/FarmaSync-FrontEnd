
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
  { href: "/dashboard", label: "Inicio", icon: Home },
  { href: "/medicamentos", label: "Buscar medicamentos", icon: Search },
  { href: "/reservas", label: "Mis reservas", icon: CalendarDays },
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
  { href: "/perfil", label: "Mi perfil", icon: User },
  {
    href: "/perfil?seccion=seguridad",
    label: "Seguridad",
    icon: ShieldCheck,
  },
];

// =========================================================
// ESTILOS
// =========================================================

const FOCUS =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0646DC]";

const NAV_LINK = `
  flex w-full items-center gap-3
  rounded-xl px-3 py-2
  text-[0.9375rem] font-semibold
  leading-snug transition-colors
  ${FOCUS}
`;

// =========================================================
// SIDEBAR
// =========================================================

function Sidebar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentQuery = searchParams.toString();

  const currentUrl = currentQuery
    ? `${pathname}?${currentQuery}`
    : pathname;

  const isActive = (href: string) => {
    const [targetPath, targetQuery] = href.split("?");

    if (targetQuery) {
      return currentUrl === href;
    }

    if (targetPath === "/dashboard") {
      return pathname === "/dashboard";
    }

    const hasSpecificActiveLink = [
      ...MAIN_NAV,
      ...ACCOUNT_NAV,
    ].some((item) => {
      return item.href.startsWith(`${targetPath}?`) &&
        currentUrl === item.href;
    });

    return (
      !hasSpecificActiveLink &&
      (pathname === targetPath ||
        pathname.startsWith(`${targetPath}/`))
    );
  };

  const renderItem = ({
    href,
    label,
    icon: Icon,
  }: NavItem) => {
    const active = isActive(href);

    return (
      <li key={href}>
        <Link
          href={href}
          aria-current={active ? "page" : undefined}
          className={`${NAV_LINK} ${
            active
              ? "bg-gradient-to-r from-[#0646DC] to-[#0869EF] text-white shadow-[0_8px_20px_rgba(10,70,200,0.18)]"
              : "text-[#14285B] hover:bg-[#E5F1FF] hover:text-[#0646DC]"
          }`}
        >
          <Icon
            size={19}
            className="shrink-0"
            aria-hidden="true"
          />

          <span>{label}</span>
        </Link>
      </li>
    );
  };

  return (
    <aside
      className="
        sticky top-0
        hidden h-dvh w-[250px]
        shrink-0 flex-col
        overflow-hidden
        border-r border-[#DCE9F8]
        bg-white px-4
        pt-4 pb-3
        lg:flex
      "
    >
      {/* LOGO */}

      <Link
        href="/"
        className={`
          mb-3 flex shrink-0 items-center gap-2.5
          rounded-full px-2 py-1
          ${FOCUS}
        `}
      >
        <Image
          src="/images/logoficial.png"
          alt="FarmaSync"
          width={40}
          height={40}
          className="h-10 w-10 rounded-full object-contain"
        />

        <span
          className={`${titleFont.className} text-xl font-extrabold text-[#14285B]`}
        >
          FarmaSync
        </span>
      </Link>

      {/* MENÚ: SOLO ESTA ZONA PUEDE HACER SCROLL */}

      <nav
        aria-label="Navegación del dashboard"
        className="
          min-h-0 flex-1
          overflow-y-auto
          overscroll-contain
          pr-1
          [scrollbar-width:thin]
          [scrollbar-color:#C8DDF8_transparent]
        "
      >
        <ul className="flex flex-col gap-0.5">
          {MAIN_NAV.map(renderItem)}
        </ul>

        {/* CUENTA */}

        <p
          className="
            mb-2 mt-4
            flex items-center gap-3
            px-3 text-xs font-bold
            text-[#4A5B78]
          "
        >
          Cuenta

          <span
            aria-hidden="true"
            className="h-px flex-1 bg-[#DCE9F8]"
          />
        </p>

        <ul className="flex flex-col gap-0.5">
          {ACCOUNT_NAV.map(renderItem)}
        </ul>
      </nav>

      {/* SECCIÓN INFERIOR FIJA */}

      <div
        className="
          mt-3 shrink-0
          border-t border-[#E5EDF8]
          pt-3
        "
      >
        {/* TARJETA DE AYUDA */}

        <div
          className="
            rounded-[22px]
            bg-gradient-to-br
            from-[#E5F2FF]
            via-[#DCEBFF]
            to-[#C7E1FF]
            px-3 py-4
            text-center
            shadow-[0_6px_18px_rgba(25,90,170,0.07)]
          "
        >
          <span
            aria-hidden="true"
            className="
              mx-auto flex h-11 w-11
              items-center justify-center
              rounded-full bg-white
              text-[#0869EF]
              shadow-[0_5px_15px_rgba(10,70,200,0.1)]
            "
          >
            <Headphones size={23} />
          </span>

          <p
            className={`
              ${titleFont.className}
              mt-2 text-[15px]
              font-extrabold text-[#14285B]
            `}
          >
            ¿Necesitas ayuda?
          </p>

          <p className="mt-1 text-[13px] font-medium leading-5 text-[#334B70]">
            Estamos aquí para ayudarte.
          </p>

          <Link
            href="/soporte"
            className={`
              mt-3 flex w-full
              items-center justify-center
              rounded-full
              bg-gradient-to-r
              from-[#0646DC]
              to-[#0869EF]
              px-3 py-2.5
              text-center text-[13px]
              font-bold text-white
              shadow-[0_6px_14px_rgba(10,70,200,0.18)]
              transition hover:brightness-95
              ${FOCUS}
            `}
          >
            Contactar soporte
          </Link>
        </div>

        {/* CERRAR SESIÓN */}

        <button
          type="button"
          className={`
            ${NAV_LINK}
            mt-3
            text-[#14285B]
            hover:bg-[#E5F1FF]
          `}
        >
          <LogOut
            size={19}
            className="shrink-0"
            aria-hidden="true"
          />

          <span>Cerrar sesión</span>
        </button>
      </div>
    </aside>
  );
}

// =========================================================
// DASHBOARD SHELL
// =========================================================

export default function DashboardShell({
  children,
}: {
  usuario: {
    nombreCompleto: string;
  };
  children: ReactNode;
}) {
  return (
    <div className="flex min-h-dvh bg-[#F4F8FF] text-[#14285B]">
      <Sidebar />

      <main className="min-w-0 flex-1">
        {children}
      </main>
    </div>
  );
}
