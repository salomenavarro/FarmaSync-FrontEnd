"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const menuItems = [
    ["#propuesta", "Propuesta"],
    ["#beneficios", "Beneficios"],
    ["#como_funciona", "Cómo funciona"],
    ["#prueba_social", "Testimonios"],
    ["#faq", "FAQ"],
  ];

  return (
    <nav
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-transparent"
          : "bg-transparent"
      }`}
    >
      <div
        className={`flex h-16 items-center justify-between px-4 transition-all duration-300 sm:h-20 sm:px-8 lg:px-10 ${
          scrolled
            ? "mx-3 mt-2 rounded-full border border-[#E5F2F2] bg-white/95 shadow-md backdrop-blur-md sm:mx-4 sm:mt-3 lg:mx-8"
            : "mx-3 mt-2 rounded-full border border-[#E5F2F2] bg-white/90 shadow-sm backdrop-blur-md sm:mx-4 sm:mt-3 lg:mx-8"
        }`}
      >
        {/* ===================================================== */}
        {/* LOGO */}
        {/* ===================================================== */}

        <a
          href="#hero"
          className="flex shrink-0 items-center gap-2 sm:gap-3"
        >
          <Image
            src="/images/logo1.jpeg"
            alt="FarmaSync"
            width={52}
            height={52}
            className="h-9 w-9 rounded-full object-contain sm:h-12 sm:w-12"
          />

          <span className="text-lg font-bold tracking-tight text-[#171717] sm:text-[21px]">
            FarmaSync
          </span>
        </a>

        {/* ===================================================== */}
        {/* MENÚ ESCRITORIO */}
        {/* ===================================================== */}

        <div className="hidden items-center gap-6 xl:flex xl:gap-8">
          {menuItems.map(([href, text]) => (
            <a
              key={href}
              href={href}
              className="group relative py-2 text-base font-medium text-[#30343B] transition-colors duration-300 hover:text-[#00A8A8]"
            >
              {text}

              <span
                className="
                  absolute
                  bottom-0
                  left-0
                  h-[2px]
                  w-0
                  rounded-full
                  bg-[#00A8A8]
                  transition-all
                  duration-300
                  group-hover:w-full
                "
              />
            </a>
          ))}
        </div>

        {/* ===================================================== */}
        {/* BOTONES ESCRITORIO */}
        {/* ===================================================== */}

        <div className="hidden shrink-0 items-center gap-3 xl:flex xl:gap-5">
          <Link
            href="/login"
            className="
              rounded-full
              px-4
              py-2.5
              text-sm
              font-semibold
              text-[#30343B]
              transition-all
              duration-300
              hover:bg-[#F0FAFA]
              hover:text-[#00A8A8]
            "
          >
            Iniciar Sesión
          </Link>

          <Link
            href="/registro"
            className="
              rounded-full
              bg-[#00A8A8]
              px-5
              py-2.5
              text-sm
              font-semibold
              text-white
              shadow-sm
              shadow-[#00A8A8]/20
              transition-all
              duration-300
              hover:-translate-y-0.5
              hover:bg-[#009999]
              hover:shadow-md
            "
          >
            Registrarse
          </Link>
        </div>

        {/* ===================================================== */}
        {/* BOTÓN HAMBURGUESA */}
        {/* ===================================================== */}

        <div className="flex items-center xl:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="
              rounded-full
              p-2
              text-[#30343B]
              transition-all
              duration-300
              hover:bg-[#F0FAFA]
              hover:text-[#00A8A8]
              focus:outline-none
            "
            aria-label="Abrir menú"
          >
            {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* ===================================================== */}
      {/* MENÚ MÓVIL */}
      {/* ===================================================== */}

      {mobileMenuOpen && (
        <div
          className="
            mx-3
            mt-2
            rounded-3xl
            border
            border-[#E5F2F2]
            bg-white/95
            px-6
            py-6
            shadow-lg
            backdrop-blur-md
            animate-in
            slide-in-from-top
            duration-200
            sm:mx-4
            xl:hidden
          "
        >
          <div className="flex flex-col gap-4">
            {menuItems.map(([href, text]) => (
              <a
                key={href}
                href={href}
                onClick={() => setMobileMenuOpen(false)}
                className="
                  rounded-xl
                  px-3
                  py-2
                  text-base
                  font-medium
                  text-[#30343B]
                  transition-colors
                  duration-300
                  hover:bg-[#F0FAFA]
                  hover:text-[#00A8A8]
                "
              >
                {text}
              </a>
            ))}

            <hr className="my-1 border-[#E5F2F2]" />

            <div className="flex flex-col gap-2.5">
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="
                  w-full
                  rounded-full
                  border
                  border-[#E5F2F2]
                  bg-white
                  py-2.5
                  text-center
                  text-sm
                  font-semibold
                  text-[#30343B]
                  transition-all
                  duration-300
                  hover:border-[#00A8A8]
                  hover:text-[#00A8A8]
                "
              >
                Iniciar Sesión
              </Link>

              <Link
                href="/registro"
                onClick={() => setMobileMenuOpen(false)}
                className="
                  w-full
                  rounded-full
                  bg-[#00A8A8]
                  py-2.5
                  text-center
                  text-sm
                  font-semibold
                  text-white
                  shadow-sm
                  transition-all
                  duration-300
                  hover:bg-[#009999]
                "
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