"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

import {
  Search,
  CalendarCheck,
  Bell,
  Clock,
  Pill,
  ShieldCheck,
  MapPin,
  Plus,
  Menu,
  X,
} from "lucide-react";

import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaXTwitter,
} from "react-icons/fa6";

const faqs = [
  {
    question: "¿Qué es FarmaSync?",
    answer:
      "FarmaSync es una plataforma que permite anticipar y gestionar reservas de medicamentos en farmacias EPS.",
  },
  {
    question: "¿Necesito desplazarme para consultar disponibilidad?",
    answer:
      "No. Puedes consultar previamente la disponibilidad antes de acercarte.",
  },
  {
    question: "¿La reserva tiene vencimiento?",
    answer:
      "Sí, cada reserva tendrá un tiempo límite definido por el sistema.",
  },
  {
    question: "¿Puedo cancelar una reserva?",
    answer:
      "Sí, el usuario podrá cancelar antes de que expire.",
  },
  {
    question: "¿Cómo recibiré confirmación?",
    answer:
      "El sistema mostrará el estado y confirmación de la reserva.",
  },
];

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
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

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#FCFBDC] text-[#374151]">

      {/* =====================================================
          NAVBAR
      ===================================================== */}

      <nav
        className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-transparent"
            : "border-t-[3px] border-[#3F4150] bg-white"
        }`}
      >
        <div
          className={`flex h-16 items-center justify-between px-4 sm:h-20 sm:px-8 lg:px-10 ${
            scrolled
              ? "mx-3 mt-2 rounded-full bg-white shadow-md sm:mx-4 sm:mt-3 lg:mx-8"
              : "w-full"
          }`}
        >

          {/* LOGO */}

          <a
            href="#hero"
            className="flex shrink-0 items-center gap-2 sm:gap-3"
          >
            <Image
              src="/images/logo1.jpeg"
              alt="FarmaSync"
              width={52}
              height={52}
              className="h-9 w-9 object-contain sm:h-12 sm:w-12"
            />

            <span className="text-lg font-bold text-[#171717] sm:text-[21px]">
              FarmaSync
            </span>
          </a>


          {/* =================================================
              MENÚ ESCRITORIO
              
              CAMBIO:
              xl:flex en lugar de lg:flex.
              Así tablets también usan hamburguesa.
          ================================================= */}

          <div className="hidden items-center gap-6 xl:flex xl:gap-8">

            {[
              ["#propuesta", "Propuesta"],
              ["#beneficios", "Beneficios"],
              ["#como_funciona", "Cómo funciona"],
              ["#prueba_social", "Testimonios"],
              ["#faq", "FAQ"],
            ].map(([href, text]) => (
              <a
                key={href}
                href={href}
                className="group relative py-2 text-base font-medium text-[#171717] transition-colors hover:text-[#00A8A8]"
              >
                {text}

                {/* LÍNEA AL PASAR EL MOUSE */}

                <span
                  className="
                    absolute
                    bottom-0
                    left-0
                    h-[2px]
                    w-0
                    bg-[#00A8A8]
                    transition-all
                    duration-300
                    group-hover:w-full
                  "
                />
              </a>
            ))}

          </div>


          {/* =================================================
              BOTONES ESCRITORIO

              CAMBIO:
              También pasan a xl:flex.
              Por lo tanto NO aparecen en tablets.
          ================================================= */}

          <div className="hidden shrink-0 items-center gap-3 xl:flex xl:gap-6">

            <Link
              href="/login"
              className="rounded-full bg-[#f5f5f5] px-3.5 py-2 text-sm font-medium text-[#171717] transition-shadow duration-300 hover:shadow-md"
            >
              Iniciar Sesión
            </Link>

            <Link
              href="/registro"
              className="rounded-full bg-[#00A8A8] px-4 py-2 text-sm font-semibold text-white transition-colors duration-300 hover:bg-[#009999]"
            >
              Registrarse
            </Link>

          </div>


          {/* =================================================
              BOTÓN HAMBURGUESA

              CAMBIO:
              xl:hidden.
              Así aparece tanto en celulares como en tablets.
          ================================================= */}

          <div className="flex items-center xl:hidden">

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 text-[#171717] focus:outline-none"
              aria-label="Abrir menú"
            >
              {mobileMenuOpen ? (
                <X size={26} />
              ) : (
                <Menu size={26} />
              )}
            </button>

          </div>

        </div>


        {/* =================================================
            MENÚ MÓVIL / TABLET
        ================================================= */}

        {mobileMenuOpen && (
          <div className="animate-in slide-in-from-top border-b border-[#E5E7EB] bg-white px-6 py-6 shadow-lg duration-200 xl:hidden">

            <div className="flex flex-col gap-4">

              <a
                href="#propuesta"
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-medium text-[#171717] transition-colors hover:text-[#00A8A8]"
              >
                Propuesta
              </a>

              <a
                href="#beneficios"
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-medium text-[#171717] transition-colors hover:text-[#00A8A8]"
              >
                Beneficios
              </a>

              <a
                href="#como_funciona"
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-medium text-[#171717] transition-colors hover:text-[#00A8A8]"
              >
                Cómo funciona
              </a>

              <a
                href="#prueba_social"
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-medium text-[#171717] transition-colors hover:text-[#00A8A8]"
              >
                Testimonios
              </a>

              <a
                href="#faq"
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-medium text-[#171717] transition-colors hover:text-[#00A8A8]"
              >
                FAQ
              </a>

              <hr className="my-1 border-gray-100" />

              <div className="flex flex-col gap-2.5">

                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full rounded-full bg-[#f5f5f5] py-2.5 text-center text-sm font-medium text-[#171717]"
                >
                  Iniciar Sesión
                </Link>

                <Link
                  href="/registro"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full rounded-full bg-[#00A8A8] py-2.5 text-center text-sm font-semibold text-white"
                >
                  Registrarse
                </Link>

              </div>

            </div>

          </div>
        )}

      </nav>


      {/* =====================================================
          HERO
      ===================================================== */}

      <section
        id="hero"
        className="relative overflow-hidden bg-[#FCFBDC] pb-12 pt-24 sm:pb-16 sm:pt-28 lg:pb-20 lg:pt-36"
      >

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12">

            {/* TEXTO */}

            <div className="z-10 text-center lg:col-span-7 lg:text-left">

              <div className="mb-4 inline-flex rounded-full border border-[rgba(0,168,168,0.2)] bg-[rgba(0,168,168,0.08)] px-3.5 py-1.5 text-xs sm:mb-6 sm:px-4 sm:py-2 sm:text-sm">

                <span className="font-semibold tracking-wide text-[#00A8A8]">
                  Inspirados en tu salud, enfocados en tu bienestar.
                </span>

              </div>

              {/* CAMBIO:
                  Hero un poco más pequeño */}
              <h1 className="text-2xl font-extrabold leading-tight tracking-tight text-[#171717] sm:text-4xl lg:text-5xl">

                Reserva tus medicamentos{" "}

                <br className="hidden sm:inline" />

                <span className="bg-gradient-to-r from-[#00A8A8] to-[#006666] bg-clip-text text-transparent">
                  a tiempo
                </span>{" "}

                con FarmaSync

              </h1>

              <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-[#555] sm:mt-6 sm:text-lg lg:mx-0">
                Evita filas, consulta la disponibilidad en tiempo real y asegura
                tus medicamentos en las farmacias más cercanas de forma rápida y segura.
              </p>

              <div className="mt-6 flex flex-col items-center justify-center gap-3.5 sm:mt-8 sm:flex-row sm:gap-4 lg:justify-start">

                <a
                  href="#propuesta"
                  className="w-full rounded-full bg-[#00A8A8] px-8 py-3.5 text-center text-sm font-bold text-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:bg-[#009494] hover:shadow-lg sm:w-auto sm:py-4 sm:text-base"
                >
                  Reservar Ahora
                </a>

                <a
                  href="#como_funciona"
                  className="w-full rounded-full border border-gray-300 bg-white/80 px-8 py-3.5 text-center text-sm font-semibold text-[#171717] shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:bg-white sm:w-auto sm:py-4 sm:text-base"
                >
                  Ver cómo funciona
                </a>

              </div>

            </div>


            {/* DOCTORA */}

            <div className="relative flex justify-center lg:col-span-5 lg:justify-end">

              <div className="relative w-full max-w-xs sm:max-w-md lg:max-w-none">

                <div className="pointer-events-none absolute -right-5 top-5 h-48 w-48 rounded-full bg-[#DDF5D6] opacity-80 blur-3xl sm:h-96 sm:w-96" />

                <div className="pointer-events-none absolute -bottom-10 right-10 h-36 w-36 rounded-full bg-[#FFF2B8] opacity-60 blur-3xl sm:h-72 sm:w-72" />

                <div className="relative z-10 w-full animate-[float_5s_ease-in-out_infinite]">

                  <Image
  src="/images/doc1.png"
  alt="Profesional de salud de FarmaSync"
  width={520}
  height={650}
  priority
  quality={75}
  className="relative z-10 h-auto max-h-[380px] w-full object-contain mix-blend-multiply drop-shadow-[0_20px_30px_rgba(26,22,18,0.1)] sm:max-h-[500px] lg:max-h-[600px]"
/>

                </div>

              </div>

            </div>

          </div>

        </div>

        <style jsx>{`
          @keyframes float {
            0%, 100% {
              transform: translateY(0px);
            }

            50% {
              transform: translateY(-12px);
            }
          }
        `}</style>

      </section>


      {/* =====================================================
          PROPUESTA
      ===================================================== */}

      <section
        id="propuesta"
        className="bg-white px-6 py-20 sm:py-24 lg:py-28"
      >

        <div className="mx-auto grid max-w-[1200px] items-center gap-16 lg:grid-cols-2">

          {/* COLUMNA IZQUIERDA */}

          <div className="max-w-[570px]">

            <span className="text-[13px] font-bold uppercase tracking-[1px] text-[#00A8A8]">
              El efecto FarmaSync
            </span>

            {/* CAMBIO: mismo tamaño que títulos principales */}

            <h2 className="mt-6 text-2xl font-extrabold leading-tight tracking-tight text-[#171717] sm:text-4xl lg:text-5xl">
  Tu tratamiento no debería depender de la suerte
</h2>

            <p className="mt-7 text-[16px] leading-[1.8] text-[#6B625B]">
              Miles de pacientes en Colombia se desplazan a su farmacia EPS
              sin saber si el medicamento que necesitan está disponible.
              FarmaSync elimina esa incertidumbre y las barreras entre tú y
              tus medicamentos, una experiencia diseñada desde la empatía,
              la claridad y el respeto por tu tiempo.
            </p>

          </div>


          {/* COLUMNA DERECHA */}

          <div className="relative">

            <div className="absolute bottom-[40px] left-[30px] top-[40px] w-[2px] bg-[#A8E3E3]" />


            {/* PASO 1 */}

            <div className="group relative flex gap-7 pb-20">

              <div
                className="
                  relative z-10
                  flex h-[62px] w-[62px] shrink-0
                  items-center justify-center
                  rounded-full
                  border-2 border-[#E5E7EB]
                  bg-white
                  text-[18px] font-bold text-[#8A8A8A]
                  shadow-sm
                  transition-all duration-300
                  group-hover:border-[#00A8A8]
                  group-hover:bg-[#00A8A8]
                  group-hover:text-white
                "
              >
                1
              </div>

              <div
                className="
                  pt-2
                  transition-transform duration-300
                  group-hover:translate-x-2
                "
              >

                <span className="text-[13px] font-bold uppercase tracking-[1px] text-[#00A8A8]">
                  Sin desplazamientos en vano
                </span>

                <h3 className="mt-3 text-[23px] font-bold leading-tight text-[#171717]">
                  Consulta antes de salir
                </h3>

                <p className="mt-3 max-w-[560px] text-[16px] leading-[1.75] text-[#6B625B]">
                  Verifica en tiempo real si tu medicamento está disponible
                  en las farmacias asociadas a tu EPS. Sin llamadas, sin filas,
                  sin viajes innecesarios.
                </p>

              </div>

            </div>


            {/* PASO 2 */}

            <div className="group relative flex gap-7 pb-20">

              <div
                className="
                  relative z-10
                  flex h-[62px] w-[62px] shrink-0
                  items-center justify-center
                  rounded-full
                  border-2 border-[#E5E7EB]
                  bg-white
                  text-[18px] font-bold text-[#8A8A8A]
                  shadow-sm
                  transition-all duration-300
                  group-hover:border-[#00A8A8]
                  group-hover:bg-[#00A8A8]
                  group-hover:text-white
                "
              >
                2
              </div>

              <div
                className="
                  pt-2
                  transition-transform duration-300
                  group-hover:translate-x-2
                "
              >

                <span className="text-[13px] font-bold uppercase tracking-[1px] text-[#00A8A8]">
                  Para pacientes crónicos y cuidadores
                </span>

                <h3 className="mt-3 text-[23px] font-bold leading-tight text-[#171717]">
                  Reserva con hasta 5 días de anticipación
                </h3>

                <p className="mt-3 max-w-[560px] text-[16px] leading-[1.75] text-[#6B625B]">
                  Aparta tu medicamento antes de que se agote. Si eres cuidador,
                  puedes hacer la reserva en nombre del paciente a tu cargo sin
                  necesitar que esté presente.
                </p>

              </div>

            </div>


            {/* PASO 3 */}

            <div className="group relative flex gap-7">

              <div
                className="
                  relative z-10
                  flex h-[62px] w-[62px] shrink-0
                  items-center justify-center
                  rounded-full
                  border-2 border-[#E5E7EB]
                  bg-white
                  text-[18px] font-bold text-[#8A8A8A]
                  shadow-sm
                  transition-all duration-300
                  group-hover:border-[#00A8A8]
                  group-hover:bg-[#00A8A8]
                  group-hover:text-white
                "
              >
                3
              </div>

              <div
                className="
                  pt-2
                  transition-transform duration-300
                  group-hover:translate-x-2
                "
              >

                <span className="text-[13px] font-bold uppercase tracking-[1px] text-[#00A8A8]">
                  Tranquilidad garantizada
                </span>

                <h3 className="mt-3 text-[23px] font-bold leading-tight text-[#171717]">
                  Tu código, tu medicamento
                </h3>

                <p className="mt-3 max-w-[560px] text-[16px] leading-[1.75] text-[#6B625B]">
                  Al confirmar tu reserva recibes un código único. Llévalo a
                  mostrar en la farmacia y retira sin filas. Tu tratamiento
                  continúa sin interrupciones.
                </p>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          BENEFICIOS
      ===================================================== */}

      <section
        id="beneficios"
        className="bg-[#FCFBDC] px-4 py-12 sm:px-6 sm:py-24 lg:px-8"
      >

        <div className="mx-auto max-w-7xl">

          <div className="mb-12 text-center sm:mb-16">

            {/* TÍTULO DE REFERENCIA */}

            <h2 className="text-2xl font-extrabold tracking-tight text-[#171717] sm:text-4xl lg:text-5xl">
              Beneficios de FarmaSync
            </h2>

            <div className="mx-auto mt-3 h-1 w-12 rounded-full bg-[#00A8A8] sm:mt-4 sm:w-16" />

            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-[#6B7280] sm:mt-6 sm:text-lg">
              Facilitamos el acceso a tus medicamentos y servicios de salud de
              manera eficiente y segura.
            </p>

          </div>


          <div className="grid grid-cols-1 gap-10 pt-4 sm:grid-cols-2 sm:gap-8 sm:pt-6 lg:grid-cols-3">

            <BenefitCard
              icon={<Search className="h-6 w-6 sm:h-8 sm:w-8" strokeWidth={2.5} />}
              title="Consulta en tiempo real"
              text="Olvídate de recorrer múltiples farmacias a ciegas. Nuestra plataforma te permite verificar la disponibilidad exacta de tus medicamentos en tiempo real desde cualquier dispositivo."
            />

            <BenefitCard
              icon={<CalendarCheck className="h-6 w-6 sm:h-8 sm:w-8" strokeWidth={2.5} />}
              title="Reserva anticipada"
              text="Con tan solo unos pocos clics, puedes apartar los fármacos que necesitas de manera inmediata."
            />

            <BenefitCard
              icon={<Bell className="h-6 w-6 sm:h-8 sm:w-8" strokeWidth={2.5} />}
              title="Notificaciones"
              text="Mantente siempre informado. Recibe avisos automáticos directamente en tu dispositivo sobre el estado de tus reservas y si un medicamento de alta demanda vuelve a estar disponible."
            />

            <BenefitCard
              icon={<Clock className="h-6 w-6 sm:h-8 sm:w-8" strokeWidth={2.5} />}
              title="Menos espera"
              text="Reduce el tiempo de búsqueda y evita filas innecesarias para obtener tus medicamentos de manera más rápida y eficiente."
            />

            <BenefitCard
              icon={<Pill className="h-6 w-6 sm:h-8 sm:w-8" strokeWidth={2.5} />}
              title="Acceso oportuno"
              text="Mejora la continuidad de tus tratamientos médicos teniendo tus medicamentos disponibles cuando realmente los necesitas."
            />

            <BenefitCard
              icon={<ShieldCheck className="h-6 w-6 sm:h-8 sm:w-8" strokeWidth={2.5} />}
              title="Seguridad"
              text="Protegemos tu información personal y médica mediante un proceso diseñado para ofrecerte confianza y tranquilidad."
            />

          </div>

        </div>

      </section>


      {/* =====================================================
          CÓMO FUNCIONA
      ===================================================== */}

      <section
        id="como_funciona"
        className="bg-white px-4 py-12 sm:px-6 sm:py-24 lg:px-8"
      >

        <div className="mx-auto max-w-7xl">

          <div className="mb-12 text-center sm:mb-16">

            <span className="mb-2 inline-block rounded-full bg-[#00A8A8]/10 px-3.5 py-1 text-xs font-semibold text-[#00A8A8] sm:mb-3 sm:px-4 sm:py-1.5 sm:text-sm">
              ¿Cómo funciona?
            </span>

            {/* CAMBIO */}

            <h2 className="mb-3 text-2xl font-extrabold tracking-tight text-[#374151] sm:mb-4 sm:text-4xl lg:text-5xl">
              Tu medicamento en solo 5 pasos
            </h2>

            <p className="mx-auto max-w-xl text-sm text-gray-600 sm:text-base">
              Consulta disponibilidad, reserva y recibe notificaciones desde
              una sola plataforma.
            </p>

          </div>


          <div className="grid grid-cols-1 items-center gap-8 sm:gap-12 lg:grid-cols-2">

            {/* TELÉFONO */}

            <div className="flex justify-center">

              <div className="w-full max-w-xs rounded-3xl border border-[#E5E7EB] bg-white p-5 shadow-xl sm:max-w-sm sm:p-8">

                <div className="mb-5 text-center text-lg font-bold text-[#171717] sm:mb-6 sm:text-xl">
                  FarmaSync
                </div>

                <div className="mb-3.5 flex items-center gap-3 rounded-xl bg-[#FCFBDC] p-3.5 sm:mb-4 sm:p-4">

                  <Search
                    size={18}
                    className="shrink-0 text-[#00A8A8]"
                  />

                  <span className="text-xs font-medium sm:text-sm">
                    Paracetamol
                  </span>

                </div>

                <div className="mb-3.5 rounded-xl border border-[#E5E7EB] p-3.5 sm:mb-4 sm:p-4">

                  <h4 className="text-sm font-bold sm:text-base">
                    Disponible
                  </h4>

                  <p className="mt-0.5 text-xs text-gray-500">
                    Farmacia Central
                  </p>

                  <span className="mt-2 block text-xs font-semibold text-green-600">
                    ✓ En stock
                  </span>

                </div>

                <div className="rounded-xl border border-[#E5E7EB] p-3.5 sm:p-4">

                  <h4 className="text-sm font-bold sm:text-base">
                    Reserva creada
                  </h4>

                  <p className="mt-0.5 text-xs text-gray-500">
                    Código: FS-2481
                  </p>

                </div>

              </div>

            </div>


            {/* PASOS */}

            <div className="flex flex-col gap-3.5 sm:gap-4">

              <Step
                number="01"
                title="Busca tu medicamento"
                text="Consulta la disponibilidad exacta en tiempo real antes de salir de tu hogar."
              />

              <Step
                number="02"
                title="Encuentra una farmacia"
                text="Visualiza los puntos de distribución de tu EPS que cuentan con el stock necesario."
              />

              <Step
                number="03"
                title="Realiza tu reserva"
                text="Aparta tus fármacos de forma digital con un solo toque de manera inmediata."
              />

              <Step
                number="04"
                title="Recibe confirmación"
                text="Obtén un código QR único de reserva y alertas automáticas sobre su estado."
              />

              <Step
                number="05"
                title="Recoge tu medicamento"
                text="Presenta tu comprobante digital en la ventanilla rápida y retira sin filas."
              />

            </div>

          </div>


          {/* BENEFICIOS */}

          <div className="mt-10 flex flex-wrap justify-center gap-2.5 sm:mt-12 sm:gap-5">

            <WorkflowBenefit
              icon={<Clock size={16} />}
              text="Ahorra tiempo"
            />

            <WorkflowBenefit
              icon={<MapPin size={16} />}
              text="Menos desplazamientos"
            />

            <WorkflowBenefit
              icon={<Bell size={16} />}
              text="Notificaciones automáticas"
            />

            <WorkflowBenefit
              icon={<ShieldCheck size={16} />}
              text="Proceso seguro"
            />

          </div>

        </div>

      </section>


      {/* =====================================================
          PRUEBA SOCIAL
      ===================================================== */}

      <section
        id="prueba_social"
        className="bg-[#FCFBDC] px-4 py-12 sm:px-6 sm:py-24 lg:px-8"
      >

        <div className="mx-auto max-w-7xl">

          <div className="mb-10 text-center sm:mb-12">

            <span className="inline-block rounded-full bg-[#00A8A8]/10 px-3.5 py-1 text-xs font-semibold text-[#00A8A8] sm:px-4 sm:py-1.5 sm:text-sm">
              PRUEBA SOCIAL
            </span>

            {/* CAMBIO */}

            <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-[#171717] sm:mt-4 sm:text-4xl lg:text-5xl">
              Confianza respaldada por resultados
            </h2>

            <div className="mx-auto mt-3 h-1 w-12 rounded-full bg-[#00A8A8] sm:mt-4" />

          </div>


          <div className="mx-auto max-w-4xl rounded-2xl bg-white p-5 shadow-sm md:rounded-full sm:p-6">

            <div className="grid grid-cols-1 divide-y divide-[#E5E7EB] md:grid-cols-3 md:divide-x md:divide-y-0">

              <div className="pt-2 text-center md:pt-0">

                <div className="text-2xl font-extrabold text-[#00A8A8] sm:text-4xl">
                  +1,000
                </div>

                <p className="mt-1 text-[10px] font-bold uppercase tracking-wider text-[#6B7280] sm:text-xs">
                  Usuarios Satisfechos
                </p>

              </div>

              <div className="pt-4 text-center md:pt-0">

                <div className="text-2xl font-extrabold text-[#00A8A8] sm:text-4xl">
                  98%
                </div>

                <p className="mt-1 text-[10px] font-bold uppercase tracking-wider text-[#6B7280] sm:text-xs">
                  Menos Filas
                </p>

              </div>

              <div className="pt-4 text-center md:pt-0">

                <div className="text-2xl font-extrabold text-[#00A8A8] sm:text-4xl">
                  24/7
                </div>

                <p className="mt-1 text-[10px] font-bold uppercase tracking-wider text-[#6B7280] sm:text-xs">
                  Consultas Disponibles
                </p>

              </div>

            </div>

          </div>


          <p className="mx-auto mt-8 max-w-2xl text-center text-sm leading-relaxed text-[#6B7280] sm:mt-10 sm:text-lg">
            Lee las experiencias reales de pacientes y profesionales de la salud
            que ya transformaron su acceso a medicamentos con FarmaSync.
          </p>


          <div className="mt-10 grid grid-cols-1 items-stretch gap-5 sm:mt-12 sm:gap-6 md:grid-cols-3">

            <Testimonial
              text="Excelente plataforma. Antes perdía horas haciendo filas en la farmacia solo para que me dijeran que no había stock. Ahora reservo desde casa."
              name="Carlos Mendoza"
              role="Paciente EPS"
            />

            <Testimonial
              text="Como regente de farmacia, FarmaSync nos ha ayudado a organizar mejor el inventario y reducir las aglomeraciones. El flujo de trabajo mejoró un 100%."
              name="Diana Restrepo"
              role="Regente de Farmacia"
            />

            <Testimonial
              text="Me encanta la sección de notificaciones. Me avisa exactamente cuándo puedo ir a recoger mis medicamentos crónicos sin contratiempos."
              name="Andrés Felipe G."
              role="Usuario Frecuente"
            />

          </div>

        </div>

      </section>


      {/* =====================================================
          FAQ
      ===================================================== */}

      <section
        id="faq"
        className="bg-white px-4 py-12 sm:px-6 sm:py-24 lg:px-8"
      >

        <div className="mx-auto max-w-3xl">

          <div className="mb-10 text-center sm:mb-12">

            <span className="inline-block rounded-full bg-[#00A8A8]/10 px-3.5 py-1 text-xs font-semibold text-[#00A8A8] sm:px-4 sm:py-1.5 sm:text-sm">
              FAQ
            </span>

            {/* CAMBIO */}

            <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-[#171717] sm:mt-4 sm:text-4xl lg:text-5xl">
              Resolvemos tus dudas
            </h2>

            <p className="mx-auto mt-3 max-w-xl text-sm text-[#6B7280] sm:mt-4 sm:text-base">
              Consulta las preguntas más frecuentes sobre reservas y
              disponibilidad de medicamentos.
            </p>

          </div>


          <div className="flex flex-col gap-3 sm:gap-4">

            {faqs.map((faq, index) => {

              const active = openFaq === index;

              return (
                <article
                  key={index}
                  className="overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white transition duration-300 hover:shadow-md"
                >

                  <button
                    type="button"
                    onClick={() =>
                      setOpenFaq(active ? null : index)
                    }
                    className="flex w-full items-center justify-between p-4 text-left focus:outline-none sm:p-6"
                  >

                    <span className="pr-3 text-sm font-semibold text-[#171717] sm:text-lg">
                      {faq.question}
                    </span>

                    <span
                      className={`shrink-0 text-[#00A8A8] transition-transform duration-300 ${
                        active ? "rotate-45" : ""
                      }`}
                    >
                      <Plus size={20} className="sm:hidden" />
                      <Plus size={24} className="hidden sm:block" />
                    </span>

                  </button>


                  <div
                    className={`grid transition-all duration-300 ${
                      active
                        ? "grid-rows-[1fr]"
                        : "grid-rows-[0fr]"
                    }`}
                  >

                    <div className="overflow-hidden">

                      <p className="p-4 pt-0 text-xs leading-relaxed text-[#6B7280] sm:p-6 sm:pt-0 sm:text-base">
                        {faq.answer}
                      </p>

                    </div>

                  </div>

                </article>
              );
            })}

          </div>

        </div>

      </section>


      {/* =====================================================
          FOOTER
      ===================================================== */}

      <footer
        id="footer"
        className="border-t border-[#E5E7EB] bg-[#FCFBDC] px-4 pb-8 pt-12 sm:px-6 sm:pt-16 lg:px-8"
      >

        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 text-center sm:grid-cols-2 sm:text-left lg:grid-cols-4">

          {/* BRAND */}

          <div className="flex flex-col items-center sm:items-start">

            <Image
              src="/images/logo2.jpeg"
              alt="FarmaSync Logo"
              width={180}
              height={180}
              className="mb-3 h-20 w-20 object-contain sm:mb-4 sm:h-24 sm:w-24"
            />

            <p className="text-xs italic leading-relaxed text-[#6B7280] sm:text-sm">
              "Inspirados en tu salud,
              <br />
              enfocados en tu bienestar."
            </p>

          </div>


          {/* REDES */}

          <div>

            <h3 className="mb-3 text-sm font-semibold text-[#171717] sm:mb-4 sm:text-base">
              Síguenos
            </h3>

            <ul className="space-y-2.5 sm:space-y-3">

              <li>
                <a
                  href="#"
                  className="flex items-center justify-center gap-2.5 text-xs text-[#536078] transition-colors hover:text-[#00A8A8] sm:justify-start sm:text-sm"
                >
                  <FaFacebookF size={15} className="text-[#00A8A8]" />
                  Facebook
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="flex items-center justify-center gap-2.5 text-xs text-[#536078] transition-colors hover:text-[#00A8A8] sm:justify-start sm:text-sm"
                >
                  <FaInstagram size={15} className="text-[#00A8A8]" />
                  Instagram
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="flex items-center justify-center gap-2.5 text-xs text-[#536078] transition-colors hover:text-[#00A8A8] sm:justify-start sm:text-sm"
                >
                  <FaLinkedinIn size={15} className="text-[#00A8A8]" />
                  LinkedIn
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="flex items-center justify-center gap-2.5 text-xs text-[#536078] transition-colors hover:text-[#00A8A8] sm:justify-start sm:text-sm"
                >
                  <FaXTwitter size={15} className="text-[#00A8A8]" />
                  X (Twitter)
                </a>
              </li>

            </ul>

          </div>


          {/* SOPORTE */}

          <div>

            <h3 className="mb-3 text-sm font-semibold text-[#171717] sm:mb-4 sm:text-base">
              Soporte y Ayuda
            </h3>

            <ul className="space-y-2.5 text-xs text-[#536078] sm:space-y-3 sm:text-sm">

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

            <h3 className="mb-3 text-sm font-semibold text-[#171717] sm:mb-4 sm:text-base">
              Legal
            </h3>

            <ul className="space-y-2.5 text-xs text-[#536078] sm:space-y-3 sm:text-sm">

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

            <div className="mt-5 rounded-xl border border-[#E5E7EB] bg-white/60 p-3.5 text-center sm:mt-6 sm:p-4 sm:text-left">

              <p className="text-[11px] leading-relaxed text-[#9AA3B5] sm:text-xs">
                FarmaSync es una plataforma informativa y de reserva.
                La entrega final está sujeta a validación en el punto físico.
              </p>

            </div>

          </div>

        </div>


        {/* COPYRIGHT */}

        <div className="mx-auto mt-10 max-w-7xl border-t border-[#E5E7EB] pt-6 text-center text-xs text-[#6B7280] sm:mt-12">

          <p>
            © 2026 FarmaSync. Todos los derechos reservados.
          </p>

          <p className="mt-1 text-[11px]">
            Hecho con ♥ para optimizar tu bienestar.
          </p>

        </div>

      </footer>

    </main>
  );
}


/* =====================================================
   BENEFICIO
===================================================== */

function BenefitCard({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <article
      className="
        relative
        rounded-2xl
        border
        border-[#E7E7E7]
        border-t-4
        border-t-[#00A8A8]
        bg-white
        px-5
        pb-6
        pt-10
        text-center
        shadow-sm
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-md
        sm:px-6
        sm:pb-8
        sm:pt-12
      "
    >

      <div
        className="
          absolute
          left-1/2
          top-0
          z-10
          flex
          h-12
          w-12
          -translate-x-1/2
          -translate-y-1/2
          items-center
          justify-center
          rounded-full
          bg-[#00A8A8]
          text-white
          shadow-md
          sm:h-16
          sm:w-16
        "
      >
        {icon}
      </div>

      <h3 className="text-lg font-bold text-[#171717] sm:text-xl">
        {title}
      </h3>

      <p className="mt-3 text-xs leading-relaxed text-[#70798B] sm:mt-4 sm:text-base">
        {text}
      </p>

    </article>
  );
}


/* =====================================================
   PASO
===================================================== */

function Step({
  number,
  title,
  text,
}: {
  number: string;
  title: string;
  text: string;
}) {
  return (
    <div
      className="
        group
        relative
        flex
        items-start
        gap-3.5
        overflow-hidden
        rounded-2xl
        border
        border-[#E5E7EB]
        bg-white
        p-4
        transition-all
        duration-300
        hover:border-[#00A8A8]
        hover:shadow-md
        sm:gap-6
        sm:p-6
      "
    >

      <span
        className="
          absolute
          left-0
          top-0
          h-full
          w-1
          origin-top
          scale-y-0
          bg-[#00A8A8]
          transition-transform
          duration-300
          group-hover:scale-y-100
        "
      />

      <div className="min-w-8 text-xl font-extrabold text-[#00A8A8] sm:text-3xl">
        {number}
      </div>

      <div>

        <h3 className="mb-0.5 text-sm font-bold text-[#171717] sm:mb-1 sm:text-lg">
          {title}
        </h3>

        <p className="text-xs leading-relaxed text-gray-600 sm:text-sm">
          {text}
        </p>

      </div>

    </div>
  );
}


/* =====================================================
   BENEFICIO WORKFLOW
===================================================== */

function WorkflowBenefit({
  icon,
  text,
}: {
  icon: React.ReactNode;
  text: string;
}) {
  return (
    <div className="flex items-center gap-2 rounded-full border border-[#E5E7EB] bg-white px-3.5 py-2 text-xs sm:text-sm">

      <span className="text-[#00A8A8]">
        {icon}
      </span>

      <span className="font-medium text-[#171717]">
        {text}
      </span>

    </div>
  );
}


/* =====================================================
   TESTIMONIO
===================================================== */

function Testimonial({
  text,
  name,
  role,
  image,
}: {
  text: string;
  name: string;
  role: string;
  image?: string;
}) {
  const initial = name.charAt(0).toUpperCase();

  return (
    <article
      className="
        flex
        h-full
        flex-col
        justify-between
        rounded-2xl
        border
        border-[#E5E7EB]
        bg-white
        p-5
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-md
        sm:p-6
      "
    >

      <div>

        <div className="mb-2.5 text-base tracking-widest text-[#00A8A8] sm:mb-3 sm:text-lg">
          ★★★★★
        </div>

        <p className="text-xs leading-relaxed text-[#555555] sm:text-sm">
          "{text}"
        </p>

      </div>


      <div className="mt-5 flex items-center gap-3 border-t border-[#F0F0F0] pt-3.5 sm:mt-6 sm:pt-4">

        {image ? (
          <Image
            src={image}
            alt={name}
            width={40}
            height={40}
            className="h-9 w-9 rounded-full object-cover sm:h-10 sm:w-10"
          />
        ) : (
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#00A8A8]/10 text-xs font-bold text-[#00A8A8] sm:h-10 sm:w-10 sm:text-sm">
            {initial}
          </div>
        )}

        <div>

          <h3 className="text-xs font-bold text-[#171717] sm:text-sm">
            {name}
          </h3>

          <p className="text-[11px] font-medium text-[#6B7280] sm:text-xs">
            {role}
          </p>

        </div>

      </div>

    </article>
  );
}