"use client";

import "./dashboard.css";

import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { Home, Search, Calendar, Bell, User, HelpCircle, LogOut, Menu, MessageCircle } from "lucide-react";
import { AuthenticatedUser } from "@/features/auth/types/user";
import { useLogout } from "@/features/auth/hooks/useLogout";
import { getRoleLabel } from "@/lib/auth/get-role-label";
import { getInitials } from "@/lib/auth/get-initials";

interface DashboardShellProps {
  usuario: AuthenticatedUser;
  children: ReactNode;
}

// Visual calcado del layout.tsx viejo de Nikoll — lo único que
// cambió es: (1) recibe `usuario` real en vez de "María González"
// hardcodeado, (2) el link de logout ahora sí cierra sesión de
// verdad (useLogout invalida la sesión en la BD), en vez de solo
// navegar a /login dejando la cookie viva.
export default function DashboardShell({ usuario, children }: DashboardShellProps) {
  const logoutMutation = useLogout();

  return (
    <div className="dashboard-container">
      {/* SIDEBAR */}
      <aside className="sidebar">
        <div className="sidebar__brand">
          <Image src="/images/logo1.jpeg" alt="FarmaSync Logo" width={32} height={32} className="sidebar__logo-img" />
          <span className="sidebar__title">FarmaSync</span>
        </div>

        <nav className="sidebar__nav">
          <span className="sidebar__section-title">MENÚ</span>

          <Link href="/dashboard" className="sidebar__link active">
            <Home size={20} />
            <span>Inicio</span>
          </Link>

          <Link href="/medicamentos" className="sidebar__link">
            <Search size={20} />
            <span>Buscar medicamentos</span>
          </Link>

          <Link href="/reservas" className="sidebar__link">
            <Calendar size={20} />
            <span>Mis reservas</span>
          </Link>

          <Link href="/notificaciones" className="sidebar__link sidebar__link--notification">
            <Bell size={20} />
            <span>Notificaciones</span>
          </Link>

          <span className="sidebar__section-title sidebar__section-title--account">CUENTA</span>

          <Link href="/perfil" className="sidebar__link">
            <User size={20} />
            <span>Mi perfil</span>
          </Link>

          <Link href="/ayuda" className="sidebar__link">
            <HelpCircle size={20} />
            <span>Ayuda</span>
          </Link>
        </nav>

        <div className="sidebar__footer">
          <button
            type="button"
            onClick={() => logoutMutation.mutate()}
            disabled={logoutMutation.isPending}
            className="sidebar__link logout"
          >
            <LogOut size={20} />
            <span>{logoutMutation.isPending ? "Cerrando..." : "Cerrar sesión"}</span>
          </button>
        </div>
      </aside>

      {/* CONTENIDO */}
      <div className="main-content">
        <header className="topbar">
          <button className="topbar__mobile-menu" aria-label="Abrir menú">
            <Menu size={23} />
          </button>

          <div className="topbar__search">
            <Search size={19} />
            <input type="text" placeholder="Buscar medicamentos..." />
          </div>

          <div className="topbar__user-zone">
            <button className="topbar__icon-button" aria-label="Mensajes">
              <MessageCircle size={21} />
            </button>

            <button className="topbar__icon-button topbar__notification" aria-label="Notificaciones">
              <Bell size={21} />
              <span className="badge-dot"></span>
            </button>

            <div className="user-profile">
              <div className="user-avatar">{getInitials(usuario.nombreCompleto)}</div>
              <div className="user-info">
                <span className="user-name">{usuario.nombreCompleto}</span>
                <span className="user-role">{getRoleLabel(usuario.roleId)}</span>
              </div>
            </div>
          </div>
        </header>

        <main className="dashboard-page">{children}</main>
      </div>
    </div>
  );
}
