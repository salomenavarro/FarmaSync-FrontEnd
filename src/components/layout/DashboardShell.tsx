
"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
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

/* =========================================================
   FUENTE DE LOS TÍTULOS
   ========================================================= */

const titleFont = Inter({
  subsets: ["latin"],
  weight: ["700", "800"],
});

/* =========================================================
   TIPOS
   ========================================================= */

type NavItem = {
  href: string;
  label: string;
  icon: LucideIcon;
};

/* =========================================================
   MENÚ PRINCIPAL
   ========================================================= */

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

/* =========================================================
   MENÚ DE CUENTA
   ========================================================= */

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

/* =========================================================
   FUNCIONES AUXILIARES
   ========================================================= */

const pathOf = (href: string) => href.split("?")[0];

const matchesPath = (pathname: string, href: string) => {
  const path = pathOf(href);

  return path === "/dashboard"
    ? pathname === path
    : pathname.startsWith(path);
};

/* =========================================================
   ESTILOS REUTILIZABLES
   ========================================================= */

const FOCUS =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0646DC]";

const NAV_LINK = `
  flex items-center gap-3
  rounded-xl px-4 py-2.5
  text-[0.9375rem] font-semibold
  transition
  ${FOCUS}
`;

/* =========================================================
   BARRA LATERAL
   ========================================================= */

function Sidebar() {
  const pathname = usePathname();

  /* Identificar la opción activa */

  const activeLabel = [...MAIN_NAV, ...ACCOUNT_NAV].find((item) =>
    matchesPath(pathname, item.href),
  )?.label;

  /* Renderizar elementos del menú */

  const renderItem = ({
    href,
    label,
    icon: Icon,
  }: NavItem) => {
    const active = label === activeLabel;

    return (
      <li key={label}>
        <Link
          href={href}
          aria-current={active ? "page" : undefined}
          className={`${NAV_LINK} ${
            active
              ? "bg-gradient-to-r from-[#0646DC] to-[#0869EF] text-white shadow-[0_8px_20px_rgba(10,70,200,0.22)]"
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
        bg-white
        px-4 py-5
        lg:flex
      "
    >
      {/* =========================================
          LOGO FARMASYNC
          ========================================= */}

      <Link
        href="/"
        className={`
          mb-5 flex shrink-0
          items-center gap-2.5
          rounded-full px-2
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

      {/* =========================================
          MENÚ DE NAVEGACIÓN
          ========================================= */}

      <nav
        aria-label="Navegación del dashboard"
        className="
          min-h-0
          overflow-y-auto
          overscroll-contain
          pr-1
        "
      >
        {/* Menú principal */}

        <ul className="flex flex-col gap-1">
          {MAIN_NAV.map(renderItem)}
        </ul>

        {/* SECCIÓN CUENTA */}

        <p
          className="
            mb-2 mt-6
            flex items-center gap-3
            px-4
            text-xs font-bold
            text-[#4A5B78]
          "
        >
          Cuenta

          <span
            aria-hidden="true"
            className="h-px flex-1 bg-[#DCE9F8]"
          />
        </p>

        <ul className="flex flex-col gap-1">
          {ACCOUNT_NAV.map(renderItem)}
        </ul>
      </nav>

      {/* =========================================
          SECCIÓN INFERIOR
          Ocupa el espacio restante
          ========================================= */}

      <div
        className="
          mt-5
          flex min-h-0 flex-1
          flex-col
          border-t border-[#E5EDF8]
          pt-4
        "
      >
        {/* =========================================
            TARJETA DE AYUDA
            ========================================= */}

        <div
          className="
            shrink-0
            rounded-[24px]
            bg-gradient-to-br
            from-[#E5F2FF]
            via-[#DCEBFF]
            to-[#C7E1FF]
            px-4 py-6
            text-center
            shadow-[0_6px_18px_rgba(25,90,170,0.07)]
          "
        >
          {/* Icono */}

          <span
            aria-hidden="true"
            className="
              mx-auto flex h-14 w-14
              items-center justify-center
              rounded-full bg-white
              text-[#0869EF]
              shadow-[0_5px_15px_rgba(10,70,200,0.1)]
            "
          >
            <Headphones size={27} />
          </span>

          {/* Título */}

          <p
            className={`
              ${titleFont.className}
              mt-3 text-base
              font-extrabold
              text-[#14285B]
            `}
          >
            ¿Necesitas ayuda?
          </p>

          {/* Descripción */}

          <p className="mt-2 text-[13px] font-medium leading-5 text-[#334B70]">
            Estamos aquí para ayudarte.
          </p>

          {/* Botón de soporte */}

          <Link
            href="/soporte"
            className={`
              mt-4 flex w-full
              items-center justify-center
              rounded-full
              bg-gradient-to-r
              from-[#0646DC]
              to-[#0869EF]
              px-4 py-3
              text-center text-sm
              font-bold text-white
              shadow-[0_6px_14px_rgba(10,70,200,0.18)]
              transition
              hover:brightness-95
              ${FOCUS}
            `}
          >
            Contactar soporte
          </Link>
        </div>

        {/* =========================================
            CERRAR SESIÓN
            Alineado hacia la parte inferior
            ========================================= */}

        <button
          type="button"
          className={`
            ${NAV_LINK}
            mt-auto mb-3
            w-full shrink-0
            text-[#14285B]
            hover:bg-[#E5F1FF]
          `}
        >
          <LogOut
            size={19}
            aria-hidden="true"
          />

          <span>Cerrar sesión</span>
        </button>
      </div>
    </aside>
  );
}

/* =========================================================
   DASHBOARD SHELL
   Sin barra superior
   ========================================================= */

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

      {/* BARRA LATERAL */}

      <Sidebar />

      {/* CONTENIDO PRINCIPAL */}

      <main className="min-w-0 flex-1">
        {children}
      </main>

    </div>
  );
}
