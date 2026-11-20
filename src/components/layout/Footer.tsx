
import Image from "next/image";

import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaXTwitter,
  FaCircleInfo,
} from "react-icons/fa6";

const SOCIAL_LINKS = [
  {
    label: "Facebook",
    href: "#",
    icon: FaFacebookF,
  },
  {
    label: "Instagram",
    href: "#",
    icon: FaInstagram,
  },
  {
    label: "LinkedIn",
    href: "#",
    icon: FaLinkedinIn,
  },
  {
    label: "X (Twitter)",
    href: "#",
    icon: FaXTwitter,
  },
];

const SUPPORT_LINKS = [
  {
    label: "Preguntas Frecuentes (FAQ)",
    href: "#faq",
  },
  {
    label: "Reportar un Problema",
    href: "#",
  },
  {
    label: "Contacto de Soporte",
    href: "#",
  },
];

const LEGAL_LINKS = [
  {
    label: "Términos y Condiciones",
    href: "#",
  },
  {
    label: "Política de Privacidad",
    href: "#",
  },
];

const linkStyle =
  "text-sm text-[#304B75] transition-colors duration-200 hover:text-[#0875ED] hover:translate-x-0.5 inline-block";

/* =========================================================
   FOOTER FARMASYNC
   ========================================================= */

export default function Footer() {
  return (
    <footer
      id="footer"
      className="
        relative isolate overflow-hidden
        border-t border-[#D4E7FC]
        bg-gradient-to-br
        from-[#EAF4FF]
        via-[#E4F0FF]
        to-[#DCEBFF]
        px-4 pb-8 pt-16
        sm:px-6 sm:pt-20
        lg:px-8 lg:pt-24
      "
    >
      {/* =================================================
          FONDO DECORATIVO
          Ondas suaves inspiradas en el Hero
          ================================================= */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute inset-0 -z-10
          overflow-hidden
        "
      >
        {/* Halo superior izquierdo */}

        <div
          className="
            absolute -left-32 -top-32
            h-80 w-80 rounded-full
            bg-[#87C5FF]/20 blur-[100px]
          "
        />

        {/* Halo superior derecho */}

        <div
          className="
            absolute -right-20 top-0
            h-96 w-96 rounded-full
            bg-[#75B9FF]/20 blur-[110px]
          "
        />

        {/* Onda superior */}

        <svg
          className="absolute left-0 top-0 h-32 w-full opacity-50"
          viewBox="0 0 1440 160"
          preserveAspectRatio="none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 70C220 150 390 10 650 55C900 100 1110 135 1440 15V0H0V70Z"
            fill="#C7E2FF"
          />

          <path
            d="M0 105C270 35 430 110 690 90C1000 65 1190 15 1440 55V0H0V105Z"
            fill="#D8EAFF"
          />
        </svg>

        {/* Onda inferior */}

        <svg
          className="
            absolute bottom-0 left-0
            h-36 w-full
          "
          viewBox="0 0 1440 180"
          preserveAspectRatio="none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 55C250 130 420 145 690 110C960 75 1170 25 1440 65V180H0V55Z"
            fill="#D1E7FF"
            fillOpacity="0.65"
          />

          <path
            d="M0 115C270 155 470 175 760 135C1040 95 1240 65 1440 105V180H0V115Z"
            fill="#F2F8FF"
            fillOpacity="0.8"
          />
        </svg>
      </div>

      {/* =================================================
          CONTENIDO PRINCIPAL
          ================================================= */}

      <div
        className="
          mx-auto grid max-w-7xl
          grid-cols-1 gap-10
          text-center
          sm:grid-cols-2 sm:text-left
          lg:grid-cols-[1.15fr_0.8fr_1.1fr_0.9fr_1.35fr]
          lg:gap-0
        "
      >
        {/* ===============================================
            MARCA
            =============================================== */}

        <div
          className="
            flex flex-col
            items-center
            sm:items-start
            lg:pr-7
          "
        >
          {/* Logo */}

          <div className="flex items-center gap-2.5">
            <Image
              src="/images/logoficial.png"
              alt="FarmaSync"
              width={54}
              height={54}
              className="h-12 w-12 object-contain"
            />

            <span
              className="
                text-[26px]
                font-extrabold
                tracking-tight
                text-[#142D60]
              "
            >
              FarmaSync
            </span>
          </div>

          {/* Eslogan */}

          <p
            className="
              mt-5 max-w-[230px]
              text-sm font-medium
              italic leading-relaxed
              text-[#304B75]
            "
          >
            "Inspirados en tu salud,
            <br />
            enfocados en tu bienestar."
          </p>
        </div>

        {/* ===============================================
            REDES SOCIALES
            =============================================== */}

        <div
          className="
            border-t border-[#BBD8FA]/70 pt-6
            sm:border-t-0 sm:pt-0
            lg:border-l lg:border-t-0
            lg:border-[#BBD8FA]
            lg:pl-7 lg:pr-5
          "
        >
          <h3
            className="
              mb-5 text-base
              font-extrabold
              text-[#142D60]
            "
          >
            Síguenos
          </h3>

          <ul className="space-y-3.5">
            {SOCIAL_LINKS.map((social) => {
              const Icon = social.icon;

              return (
                <li key={social.label}>
                  <a
                    href={social.href}
                    aria-label={social.label}
                    className="
                      inline-flex items-center
                      justify-center gap-3
                      text-sm text-[#304B75]
                      transition-all duration-200
                      hover:translate-x-1
                      hover:text-[#0875ED]
                      sm:justify-start
                    "
                  >
                    <Icon
                      size={17}
                      className="shrink-0 text-[#0869EF]"
                      aria-hidden="true"
                    />

                    {social.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>

        {/* ===============================================
            SOPORTE Y AYUDA
            =============================================== */}

        <div
          className="
            border-t border-[#BBD8FA]/70 pt-6
            sm:border-t-0 sm:pt-0
            lg:border-l lg:border-t-0
            lg:border-[#BBD8FA]
            lg:pl-7 lg:pr-5
          "
        >
          <h3
            className="
              mb-5 text-base
              font-extrabold
              text-[#142D60]
            "
          >
            Soporte y Ayuda
          </h3>

          <ul className="space-y-4">
            {SUPPORT_LINKS.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  className={linkStyle}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* ===============================================
            INFORMACIÓN LEGAL
            =============================================== */}

        <div
          className="
            border-t border-[#BBD8FA]/70 pt-6
            sm:border-t-0 sm:pt-0
            lg:border-l lg:border-t-0
            lg:border-[#BBD8FA]
            lg:pl-7 lg:pr-5
          "
        >
          <h3
            className="
              mb-5 text-base
              font-extrabold
              text-[#142D60]
            "
          >
            Legal
          </h3>

          <ul className="space-y-4">
            {LEGAL_LINKS.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  className={linkStyle}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* ===============================================
            TARJETA INFORMATIVA CON DEGRADADO
            =============================================== */}

        <div className="flex items-center sm:col-span-2 lg:col-span-1 lg:pl-6">
          <div
            className="
              relative flex w-full
              items-start gap-4
              overflow-hidden
              rounded-[24px]
              bg-gradient-to-br
              from-[#0646DC]
              via-[#0875ED]
              to-[#08BDF2]
              p-5 sm:p-6
              text-left
              shadow-[0_12px_30px_rgba(6,70,220,0.18)]
            "
          >
            {/* Decoración */}

            <div
              aria-hidden="true"
              className="
                pointer-events-none
                absolute -right-12 -top-12
                h-36 w-36 rounded-full
                border border-white/20
              "
            />

            <div
              aria-hidden="true"
              className="
                pointer-events-none
                absolute -bottom-16 -right-5
                h-32 w-32 rounded-full
                bg-white/10 blur-2xl
              "
            />

            {/* Icono informativo */}

            <span
              className="
                relative z-10 mt-0.5
                shrink-0
                text-white
              "
            >
              <FaCircleInfo size={31} />
            </span>

            {/* Mensaje */}

            <p
              className="
                relative z-10
                text-[13px]
                font-semibold
                leading-[1.8]
                text-white
              "
            >
              FarmaSync es una plataforma informativa y de reserva. La
              entrega final está sujeta a validación en el punto físico.
            </p>
          </div>
        </div>
      </div>

      {/* =================================================
          COPYRIGHT
          ================================================= */}

      <div
        className="
          mx-auto mt-12
          max-w-7xl
          border-t border-[#BBD8FA]/80
          pt-6
          text-center
        "
      >
        <p className="text-xs font-medium text-[#304B75]">
          © 2026 FarmaSync. Todos los derechos reservados.
        </p>

        <p className="mt-1.5 text-[11px] text-[#526B8C]">
          Hecho con{" "}
          <span className="font-bold text-[#0875ED]">♥</span>{" "}
          para optimizar tu bienestar.
        </p>
      </div>
    </footer>
  );
}
