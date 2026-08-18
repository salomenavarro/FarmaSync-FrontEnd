"use client";

import "./dashboard.css";

import React, { useEffect, useState } from "react";

import {
  Home,
  Search,
  Calendar,
  Bell,
  User,
  HelpCircle,
  LogOut,
  Menu,
  MessageCircle,
} from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {

const [usuario, setUsuario] = useState({
  nombre_completo: "Usuario",
  role_id: 1,
});

useEffect(() => {
  const usuarioGuardado = localStorage.getItem("usuario");
  if (usuarioGuardado) {
    setUsuario(JSON.parse(usuarioGuardado));
  }
}, []);

const primerNombre = usuario.nombre_completo.trim().split(" ")[0];

const iniciales = usuario.nombre_completo
  .trim()
  .split(" ")
  .slice(0, 2)
  .map((palabra) => palabra[0])
  .join("")
  .toUpperCase();

const roles: Record<number, string> = {
  1: "Paciente",
  2: "Cuidador",
  3: "Farmacéutico",
  4: "Administrador EPS",
};

const nombreRol = roles[usuario.role_id] || "Usuario";
  
  return (
    <div className="dashboard-container">

      {/* =========================================
          SIDEBAR
      ========================================= */}
      <aside className="sidebar">

        {/* LOGO */}
        <div className="sidebar__brand">

          <img
            src="/logo-farmasync.png"
            alt="FarmaSync Logo"
            className="sidebar__logo-img"
          />

          <span className="sidebar__title">
            FarmaSync
          </span>

        </div>


        {/* NAVEGACIÓN */}
        <nav className="sidebar__nav">

          <span className="sidebar__section-title">
            MENÚ
          </span>

          <a
            href="/"
            className="sidebar__link active"
          >
            <Home size={20} />
            <span>Inicio</span>
          </a>

          <a
            href="/medicamentos"
            className="sidebar__link"
          >
            <Search size={20} />
            <span>Buscar medicamentos</span>
          </a>

          <a
            href="/reservas"
            className="sidebar__link"
          >
            <Calendar size={20} />
            <span>Mis reservas</span>
          </a>

          <a
            href="/notificaciones"
            className="sidebar__link sidebar__link--notification"
          >
            <Bell size={20} />

            <span>
              Notificaciones
            </span>

            <span className="sidebar__notification-number">
              2
            </span>
          </a>


          <span className="sidebar__section-title sidebar__section-title--account">
            CUENTA
          </span>

          <a
            href="/perfil"
            className="sidebar__link"
          >
            <User size={20} />
            <span>Mi perfil</span>
          </a>

          <a
            href="/ayuda"
            className="sidebar__link"
          >
            <HelpCircle size={20} />
            <span>Ayuda</span>
          </a>

        </nav>


        {/* FOOTER SIDEBAR */}
        <div className="sidebar__footer">

      <button
        onClick={() => {
          localStorage.removeItem("token");
          localStorage.removeItem("usuario");
          window.location.href = "/login";
        }}
        className="sidebar__link logout"
      >
        <LogOut size={20} />
        <span>Cerrar sesión</span>
      </button>

        </div>

      </aside>


      {/* =========================================
          CONTENIDO
      ========================================= */}
      <div className="main-content">


        {/* =====================================
            HEADER
        ===================================== */}
        <header className="topbar">

          {/* MENÚ MOBILE */}
          <button
            className="topbar__mobile-menu"
            aria-label="Abrir menú"
          >
            <Menu size={23} />
          </button>


          {/* BUSCADOR */}
          <div className="topbar__search">

            <Search size={19} />

            <input
              type="text"
              placeholder="Buscar medicamentos..."
            />

          </div>


          {/* USUARIO */}
          <div className="topbar__user-zone">

            <button
              className="topbar__icon-button"
              aria-label="Mensajes"
            >
              <MessageCircle size={21} />
            </button>


            <button
              className="topbar__icon-button topbar__notification"
              aria-label="Notificaciones"
            >
              <Bell size={21} />

              <span className="badge-dot"></span>
            </button>


            <div className="user-profile">

              <div className="user-avatar">
                    {iniciales}
                  </div>

                  <div className="user-info">
                    <span className="user-name">
                      {primerNombre}
                    </span>
                    <span className="user-role">
                      {nombreRol}
                    </span>


              </div>

            </div>

          </div>

        </header>


        {/* =====================================
            PAGE
        ===================================== */}
        <main className="dashboard-page">

          {children}

        </main>

      </div>

    </div>
  );
}