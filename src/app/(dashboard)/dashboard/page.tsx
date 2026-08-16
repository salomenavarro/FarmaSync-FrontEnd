"use client";

import React from "react";
import {
  Search,
  Calendar,
  Bell,
  Pill,
  ArrowUpRight,
  MapPin,
  Clock3,
  Package,
  ChevronRight,
} from "lucide-react";

export default function DashboardHomePage() {
  return (
    <main className="dashboard-body">

      {/* =========================================
          HERO / BIENVENIDA
      ========================================= */}
      <section className="welcome-card">

        <div className="welcome-card__content">

          <span className="welcome-card__eyebrow">
            FARMA SYNC
          </span>

          <h1>
            Bienvenida, María <span>👋</span>
          </h1>

          <p>
            Gestiona tus medicamentos y reservas
            <br className="desktop-only" />
            de forma fácil y segura.
          </p>

          <a
            href="/medicamentos"
            className="welcome-card__button"
          >
            Buscar medicamentos
            <ArrowUpRight size={17} />
          </a>

        </div>

        <div className="welcome-card__decoration">
          <div className="pill-decoration">
            <Pill size={58} strokeWidth={1.5} />
          </div>

          <div className="decoration-circle decoration-circle--one"></div>
          <div className="decoration-circle decoration-circle--two"></div>
        </div>

      </section>


      {/* =========================================
          ESTADÍSTICAS
      ========================================= */}
      <section className="stats-grid">

        {/* Reservas */}
        <div className="stat-card">

          <div className="stat-card__icon stat-card__icon--teal">
            <Package size={22} />
          </div>

          <div className="stat-card__data">
            <strong>3</strong>

            <span>
              Reservas activas
            </span>
          </div>

          <a href="/reservas" className="stat-card__arrow">
            <ArrowUpRight size={18} />
          </a>

        </div>


        {/* Medicamentos */}
        <div className="stat-card">

          <div className="stat-card__icon stat-card__icon--purple">
            <Pill size={22} />
          </div>

          <div className="stat-card__data">
            <strong>8</strong>

            <span>
              Medicamentos consultados
            </span>
          </div>

          <a href="/medicamentos" className="stat-card__arrow">
            <ArrowUpRight size={18} />
          </a>

        </div>


        {/* Notificaciones */}
        <div className="stat-card">

          <div className="stat-card__icon stat-card__icon--orange">
            <Bell size={22} />
          </div>

          <div className="stat-card__data">
            <strong>2</strong>

            <span>
              Notificaciones nuevas
            </span>
          </div>

          <a href="/notificaciones" className="stat-card__arrow">
            <ArrowUpRight size={18} />
          </a>

        </div>

      </section>


      {/* =========================================
          CONTENIDO PRINCIPAL
      ========================================= */}
      <section className="dashboard-content-grid">

        {/* =====================================
            RESERVAS
        ===================================== */}
        <div className="reservations-section">

          <div className="section-heading">

            <div>
              <span className="section-eyebrow">
                ACTIVIDAD RECIENTE
              </span>

              <h2>
                Mis reservas
              </h2>
            </div>

            <a href="/reservas">
              Ver todas
            </a>

          </div>


          <div className="reservations-card">

            {/* Reserva 1 */}
            <div className="reservation-item">

              <div className="reservation-icon reservation-icon--teal">
                <Pill size={25} />
              </div>

              <div className="reservation-info">

                <h3>
                  Acetaminofén 500 mg
                </h3>

                <div className="reservation-details">

                  <span>
                    <MapPin size={15} />
                    Farmacia Sanitas
                  </span>

                  <span>
                    <Clock3 size={15} />
                    Hoy, 3:00 PM
                  </span>

                </div>

              </div>

              <span className="reservation-status active">
                Activa
              </span>

            </div>


            {/* Reserva 2 */}
            <div className="reservation-item">

              <div className="reservation-icon reservation-icon--blue">
                <Pill size={25} />
              </div>

              <div className="reservation-info">

                <h3>
                  Loratadina 10 mg
                </h3>

                <div className="reservation-details">

                  <span>
                    <MapPin size={15} />
                    Farmacia Cruz Verde
                  </span>

                  <span>
                    <Clock3 size={15} />
                    Mañana, 10:00 AM
                  </span>

                </div>

              </div>

              <span className="reservation-status active">
                Activa
              </span>

            </div>


            {/* Reserva 3 */}
            <div className="reservation-item">

              <div className="reservation-icon reservation-icon--purple">
                <Pill size={25} />
              </div>

              <div className="reservation-info">

                <h3>
                  Ibuprofeno 400 mg
                </h3>

                <div className="reservation-details">

                  <span>
                    <MapPin size={15} />
                    Farmacia Colsubsidio
                  </span>

                  <span>
                    <Clock3 size={15} />
                    18 Ago, 2:30 PM
                  </span>

                </div>

              </div>

              <span className="reservation-status completed">
                Completada
              </span>

            </div>

          </div>


          {/* =====================================
              ACCESO RÁPIDO
          ===================================== */}
          <div className="quick-access">

            <div className="quick-access__icon">
              <Search size={27} />
            </div>

            <div className="quick-access__content">

              <span>
                ACCESO RÁPIDO
              </span>

              <h3>
                ¿Necesitas un medicamento?
              </h3>

              <p>
                Consulta su disponibilidad en las farmacias
                asociadas a FarmaSync.
              </p>

            </div>

            <a
              href="/medicamentos"
              className="quick-access__button"
            >
              Buscar
              <ArrowUpRight size={17} />
            </a>

          </div>

        </div>


        {/* =====================================
            RESUMEN
        ===================================== */}
        <aside className="summary-section">

          <div className="summary-card">

            <div className="summary-card__header">

              <h2>
                Resumen
              </h2>

              <button aria-label="Opciones">
                <ChevronRight size={19} />
              </button>

            </div>


            <div className="summary-circle">

              <div className="summary-circle__inner">
                <strong>
                  75%
                </strong>

                <span>
                  MG
                </span>
              </div>

            </div>


            <div className="summary-message">

              <h3>
                ¡Buen trabajo, María! 🌟
              </h3>

              <p>
                Continúa gestionando tus medicamentos
                y reservas.
              </p>

            </div>


            <div className="summary-divider"></div>


            <div className="summary-bars">

              <div className="summary-bar-item">

                <div
                  className="summary-bar"
                  style={{ height: "42px" }}
                ></div>

                <span>
                  Sem 1
                </span>

              </div>


              <div className="summary-bar-item">

                <div
                  className="summary-bar"
                  style={{ height: "62px" }}
                ></div>

                <span>
                  Sem 2
                </span>

              </div>


              <div className="summary-bar-item">

                <div
                  className="summary-bar summary-bar--active"
                  style={{ height: "82px" }}
                ></div>

                <span>
                  Sem 3
                </span>

              </div>


              <div className="summary-bar-item">

                <div
                  className="summary-bar"
                  style={{ height: "62px" }}
                ></div>

                <span>
                  Sem 4
                </span>

              </div>

            </div>

          </div>

        </aside>

      </section>

    </main>
  );
}