"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

/* =========================================
   DATOS
========================================= */

const MENU_ITEMS = [
  ["#propuesta", "Propuesta"],
  ["#beneficios", "Beneficios"],
  ["#como_funciona", "Cómo funciona"],
  ["#prueba_social", "Testimonios"],
  ["#faq", "FAQ"],
] as const;

/* =========================================
   ESTILOS REUTILIZABLES
========================================= */

/* Botón secundario: borde azul y fondo claro */
const BTN_SECONDARY =
  "rounded-full border-2 border-[#2465D8] bg-white/85 text-[0.9375rem] font-bold text-[#1746B3] transition-colors duration-300 hover:bg-[#E5F1FF] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1746B3]";

/* Botón principal: degradado azul (igual que el del hero) */
const BTN_PRIMARY =
  "rounded-full border-2 border-transparent bg-gradient-to-r from-[#0646DC] to-[#0869EF] bg-origin-border text-[0.9375rem] font-bold text-white shadow-[0_8px_20px_rgba(10,70,200,0.25)] transition-all duration-300 hover:-translate-y-0.5 hover:brightness-95 hover:shadow-[0_12px_26px_rgba(10,70,200,0.32)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0646DC] motion-reduce:transform-none";

/* Enlaces: foco visible para navegación con teclado */
const FOCUS_LINK =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0646DC]";

/* Texto de los enlaces del menú: azul oscuro del hero y un contorno
   fino del mismo color (currentColor) para engrosar la letra un poco.
   Sube 0.4px a 0.5px si quieres más grosor. */
const LINK_TEXT =
  "text-base font-medium text-[#14285B] [-webkit-text-stroke:0.4px_currentColor]";

/* Barra: base común a los dos estados.
   La transición anima margen, radio, altura, fondo y sombra. */
const BAR_BASE =
  "flex items-center justify-between border px-4 backdrop-blur-md transition-all duration-300 ease-out motion-reduce:transition-none sm:px-8 lg:px-10";

/* Estado 1 (arriba del todo): pegada, ancho completo, sin esquinas */
const BAR_ATTACHED =
  "mx-0 mt-0 h-16 rounded-none border-transparent border-b-[#C4DDF5]/70 bg-white/70 shadow-none sm:h-20";

/* Estado 2 (con scroll): flotante, en pastilla, con sombra.
   El radio de 2rem es mayor que la mitad de la altura,
   así que se ve como pastilla completa. */
const BAR_FLOATING =
  "mx-3 mt-2 h-14 rounded-[2rem] border-[#C4DDF5] bg-white/95 shadow-[0_10px_30px_rgba(25,70,150,0.14)] sm:mx-4 sm:mt-3 sm:h-[4.5rem] lg:mx-8";

/* =========================================
   NAVBAR
========================================= */

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  /* Detecta el scroll para pasar de "pegada" a "flotante".
     También se ejecuta al montar, por si la página se recarga
     con el scroll ya avanzado. */
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      aria-label="Principal"
      className="fixed left-0 right-0 top-0 z-50 bg-transparent"
    >
      {/* =====================================================
          BARRA PRINCIPAL (pegada arriba → flotante al hacer scroll)
      ===================================================== */}
      <div className={`${BAR_BASE} ${scrolled ? BAR_FLOATING : BAR_ATTACHED}`}>
        {/* =================================================
            LOGO
        ================================================= */}
        <a
          href="#hero"
          className={`flex shrink-0 items-center gap-2 rounded-full sm:gap-3 ${FOCUS_LINK}`}
        >
          <Image
            src="/images/logoficial.png"
            alt="FarmaSync"
            width={52}
            height={52}
            className="h-9 w-9 rounded-full object-contain sm:h-12 sm:w-12"
          />

          <span className="text-lg font-bold tracking-tight text-[#14285B] sm:text-[21px]">
            FarmaSync
          </span>
        </a>

        {/* =================================================
            MENÚ ESCRITORIO
        ================================================= */}
        <div className="hidden items-center gap-6 xl:flex 2xl:gap-8">
          {MENU_ITEMS.map(([href, text]) => (
            <a
              key={href}
              href={href}
              className={`group relative py-2 ${LINK_TEXT} transition-colors duration-300 hover:text-[#0646DC] ${FOCUS_LINK}`}
            >
              {text}

              {/* Subrayado animado con degradado azul */}
              <span
                aria-hidden="true"
                className="absolute bottom-0 left-0 h-[2px] w-0 rounded-full bg-gradient-to-r from-[#0646DC] to-[#2D9BF0] transition-all duration-300 group-hover:w-full"
              />
            </a>
          ))}
        </div>

        {/* =================================================
            BOTONES ESCRITORIO
        ================================================= */}
        <div className="hidden shrink-0 items-center gap-3 xl:flex">
          <Link href="/login" className={`${BTN_SECONDARY} px-5 py-2.5`}>
            Iniciar sesión
          </Link>

          <Link href="/registro" className={`${BTN_PRIMARY} px-6 py-2.5`}>
            Registrarse
          </Link>
        </div>

        {/* =================================================
            BOTÓN HAMBURGUESA (móvil y tablet)
        ================================================= */}
        <div className="flex items-center xl:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen((open) => !open)}
            aria-label={mobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={mobileMenuOpen}
            aria-controls="menu-movil"
            className="rounded-full p-2 text-[#14285B] transition-all duration-300 hover:bg-[#E5F1FF] hover:text-[#0646DC] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0646DC]"
          >
            {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* =====================================================
          MENÚ MÓVIL
          Pegado a la barra cuando está arriba;
          flotante y separado cuando hay scroll.
      ===================================================== */}
      {mobileMenuOpen && (
        <div
          id="menu-movil"
          className={`border-[#C4DDF5] bg-white/95 px-6 py-6 backdrop-blur-md animate-in slide-in-from-top duration-200 xl:hidden ${
            scrolled
              ? "mx-3 mt-2 rounded-3xl border shadow-[0_14px_34px_rgba(25,70,150,0.16)] sm:mx-4"
              : "mx-0 mt-0 rounded-b-3xl border-b shadow-[0_14px_34px_rgba(25,70,150,0.12)]"
          }`}
        >
          <div className="flex flex-col gap-4">
            {/* Enlaces */}
            {MENU_ITEMS.map(([href, text]) => (
              <a
                key={href}
                href={href}
                onClick={() => setMobileMenuOpen(false)}
                className={`rounded-xl px-3 py-2 ${LINK_TEXT} transition-colors duration-300 hover:bg-[#E5F1FF] hover:text-[#0646DC] ${FOCUS_LINK}`}
              >
                {text}
              </a>
            ))}

            <hr className="my-1 border-[#C4DDF5]" />

            {/* Botones */}
            <div className="flex flex-col gap-2.5">
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className={`${BTN_SECONDARY} w-full py-3 text-center`}
              >
                Iniciar sesión
              </Link>

              <Link
                href="/registro"
                onClick={() => setMobileMenuOpen(false)}
                className={`${BTN_PRIMARY} w-full py-3 text-center`}
              >
                Registrarse
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}