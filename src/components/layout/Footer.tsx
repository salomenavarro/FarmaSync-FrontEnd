"use client";

import Image from "next/image";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaXTwitter,
} from "react-icons/fa6";

import DecorativeBackground from "../DecorativeBackground";

export default function Footer() {
  return (
    <footer
      id="footer"
      className="
        relative
        overflow-hidden
        border-t
        border-[#DCEEEE]
        bg-[#e8f0ec]
        px-4
        pb-8
        pt-12
        sm:px-6
        sm:pt-16
        lg:px-8
      "
    >

      {/* =================================================
          FONDO DECORATIVO DEL HERO
      ================================================= */}

      <DecorativeBackground variant="section" />

      {/* =================================================
          CONTENIDO DEL FOOTER
      ================================================= */}

      <div
        className="
          relative
          z-10
          mx-auto
          grid
          max-w-7xl
          grid-cols-1
          gap-8
          text-center
          sm:grid-cols-2
          sm:text-left
          lg:grid-cols-4
        "
      >

        {/* BRAND */}

        <div className="flex flex-col items-center sm:items-start">
          <Image
            src="/images/logo3.png"
            alt="FarmaSync Logo"
            width={180}
            height={180}
            className="
              mb-3
              h-20
              w-20
              object-contain
              sm:mb-4
              sm:h-24
              sm:w-24
            "
          />

          <p
            className="
              text-xs
              italic
              leading-relaxed
              text-[#6B7280]
              sm:text-sm
            "
          >
            "Inspirados en tu salud,
            <br />
            enfocados en tu bienestar."
          </p>
        </div>

        {/* REDES */}

        <div>
          <h3
            className="
              mb-3
              text-sm
              font-semibold
              text-[#171717]
              sm:mb-4
              sm:text-base
            "
          >
            Síguenos
          </h3>

          <ul className="space-y-2.5 sm:space-y-3">
            <li>
              <a
                href="#"
                className="
                  flex
                  items-center
                  justify-center
                  gap-2.5
                  text-xs
                  text-[#536078]
                  transition-colors
                  hover:text-[#00A8A8]
                  sm:justify-start
                  sm:text-sm
                "
              >
                <FaFacebookF
                  size={15}
                  className="text-[#00A8A8]"
                />
                Facebook
              </a>
            </li>

            <li>
              <a
                href="#"
                className="
                  flex
                  items-center
                  justify-center
                  gap-2.5
                  text-xs
                  text-[#536078]
                  transition-colors
                  hover:text-[#00A8A8]
                  sm:justify-start
                  sm:text-sm
                "
              >
                <FaInstagram
                  size={15}
                  className="text-[#00A8A8]"
                />
                Instagram
              </a>
            </li>

            <li>
              <a
                href="#"
                className="
                  flex
                  items-center
                  justify-center
                  gap-2.5
                  text-xs
                  text-[#536078]
                  transition-colors
                  hover:text-[#00A8A8]
                  sm:justify-start
                  sm:text-sm
                "
              >
                <FaLinkedinIn
                  size={15}
                  className="text-[#00A8A8]"
                />
                LinkedIn
              </a>
            </li>

            <li>
              <a
                href="#"
                className="
                  flex
                  items-center
                  justify-center
                  gap-2.5
                  text-xs
                  text-[#536078]
                  transition-colors
                  hover:text-[#00A8A8]
                  sm:justify-start
                  sm:text-sm
                "
              >
                <FaXTwitter
                  size={15}
                  className="text-[#00A8A8]"
                />
                X (Twitter)
              </a>
            </li>
          </ul>
        </div>

        {/* SOPORTE */}

        <div>
          <h3
            className="
              mb-3
              text-sm
              font-semibold
              text-[#171717]
              sm:mb-4
              sm:text-base
            "
          >
            Soporte y Ayuda
          </h3>

          <ul
            className="
              space-y-2.5
              text-xs
              text-[#536078]
              sm:space-y-3
              sm:text-sm
            "
          >
            <li>
              <a
                href="#faq"
                className="transition-colors hover:text-[#00A8A8]"
              >
                Preguntas Frecuentes (FAQ)
              </a>
            </li>

            <li>
              <a
                href="#"
                className="transition-colors hover:text-[#00A8A8]"
              >
                Reportar un Problema
              </a>
            </li>

            <li>
              <a
                href="#"
                className="transition-colors hover:text-[#00A8A8]"
              >
                Contacto de Soporte
              </a>
            </li>
          </ul>
        </div>

        {/* LEGAL */}

        <div>
          <h3
            className="
              mb-3
              text-sm
              font-semibold
              text-[#171717]
              sm:mb-4
              sm:text-base
            "
          >
            Legal
          </h3>

          <ul
            className="
              space-y-2.5
              text-xs
              text-[#536078]
              sm:space-y-3
              sm:text-sm
            "
          >
            <li>
              <a
                href="#"
                className="transition-colors hover:text-[#00A8A8]"
              >
                Términos y Condiciones
              </a>
            </li>

            <li>
              <a
                href="#"
                className="transition-colors hover:text-[#00A8A8]"
              >
                Política de Privacidad
              </a>
            </li>
          </ul>

          <div
            className="
              mt-5
              rounded-xl
              border
              border-[#DCEEEE]
              bg-[#F4FBFA]
              p-3.5
              text-center
              sm:mt-6
              sm:p-4
              sm:text-left
            "
          >
            <p
              className="
                text-[11px]
                leading-relaxed
                text-[#9AA3B5]
                sm:text-xs
              "
            >
              FarmaSync es una plataforma informativa y de reserva. La entrega
              final está sujeta a validación en el punto físico.
            </p>
          </div>
        </div>
      </div>

      {/* =================================================
          COPYRIGHT
      ================================================= */}

      <div
        className="
          relative
          z-10
          mx-auto
          mt-10
          max-w-7xl
          border-t
          border-[#DCEEEE]
          pt-6
          text-center
          text-xs
          text-[#6B7280]
          sm:mt-12
        "
      >
        <p>
          © 2026 FarmaSync. Todos los derechos reservados.
        </p>

        <p className="mt-1 text-[11px]">
          Hecho con ♥ para optimizar tu bienestar.
        </p>
      </div>
    </footer>
  );
}