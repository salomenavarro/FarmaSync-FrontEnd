"use client";

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
    <main className="min-h-screen bg-[#FCFBDC] text-[#374151] overflow-x-hidden">
      {/* =====================================================
    NAVBAR RESPONSIVE (MANTENIENDO TU DISEÑO ORIGINAL)
===================================================== */}
<nav
  className={`fixed left-0 right-0 top-0 z-50 transition-all duration-100 ${
    scrolled
      ? "bg-transparent"
      : "border-t-[3px] border-[#3F4150] bg-white"
  }`}
>
  <div
    className={`flex h-19.5 items-center justify-between px-4 sm:px-8 lg:px-10 ${
      scrolled
        ? "mx-3 sm:mx-4 mt-3 rounded-full bg-white shadow-md lg:mx-8"
        : "w-full"
    }`}
  >
    {/* LOGO */}
    <a href="#hero" className="flex shrink-0 items-center gap-3">
      <Image
        src="/images/logo1.jpeg"
        alt="FarmaSync"
        width={52}
        height={52}
        className="h-10 w-10 sm:h-13 sm:w-13 object-contain"
      />
      <span className="text-[19px] sm:text-[21px] font-bold text-[#171717]">
        FarmaSync
      </span>
    </a>

    {/* MENÚ ESCRITORIO (TU DISEÑO ORIGINAL) */}
    <div className="hidden items-center gap-6 xl:gap-8 lg:flex">
      <a
        href="#propuesta"
        className="nav-link text-[16px] font-medium text-[#171717] transition-colors hover:text-[#00A8A8]"
      >
        Propuesta
      </a>
      <a
        href="#beneficios"
        className="nav-link text-[16px] font-medium text-[#171717] transition-colors hover:text-[#00A8A8]"
      >
        Beneficios
      </a>
      <a
        href="#como_funciona"
        className="nav-link text-[16px] font-medium text-[#171717] transition-colors hover:text-[#00A8A8]"
      >
        Cómo funciona
      </a>
      <a
        href="#prueba_social"
        className="nav-link text-[16px] font-medium text-[#171717] transition-colors hover:text-[#00A8A8]"
      >
        Testimonios
      </a>
      <a
        href="#faq"
        className="nav-link text-[16px] font-medium text-[#171717] transition-colors hover:text-[#00A8A8]"
      >
        FAQ
      </a>
    </div>

    {/* BOTONES ESCRITORIO (TU DISEÑO ORIGINAL) */}
    <div className="hidden shrink-0 items-center gap-4 sm:gap-6 md:flex">
      {/* Iniciar Sesión */}
      <a
        href="#"
        className="rounded-full bg-[#f5f5f5] px-3.5 py-2 text-[14px] font-medium text-[#171717] transition-shadow duration-300 hover:shadow-md"
      >
        Iniciar Sesión
      </a>
      {/* Registrarse */}
      <a
        href="#"
        className="rounded-full bg-[#00A8A8] px-4 py-2 text-[14px] font-semibold text-white transition-colors duration-300 hover:bg-[#009999]"
      >
        Registrarse
      </a>
    </div>

    {/* BOTÓN MÓVIL TOGGLE (Para que no se amontone en celulares) */}
    <div className="flex items-center lg:hidden">
      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="p-2 text-[#171717] focus:outline-none"
        aria-label="Abrir menú"
      >
        {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
      </button>
    </div>
  </div>

  {/* DESPLEGABLE MÓVIL (Mantiene exactamente tus colores y enlaces) */}
  {mobileMenuOpen && (
    <div className="bg-white border-b border-[#E5E7EB] px-6 py-6 lg:hidden shadow-lg">
      <div className="flex flex-col gap-4">
        <a
          href="#propuesta"
          onClick={() => setMobileMenuOpen(false)}
          className="text-[16px] font-medium text-[#171717] hover:text-[#00A8A8]"
        >
          Propuesta
        </a>
        <a
          href="#beneficios"
          onClick={() => setMobileMenuOpen(false)}
          className="text-[16px] font-medium text-[#171717] hover:text-[#00A8A8]"
        >
          Beneficios
        </a>
        <a
          href="#como_funciona"
          onClick={() => setMobileMenuOpen(false)}
          className="text-[16px] font-medium text-[#171717] hover:text-[#00A8A8]"
        >
          Cómo funciona
        </a>
        <a
          href="#prueba_social"
          onClick={() => setMobileMenuOpen(false)}
          className="text-[16px] font-medium text-[#171717] hover:text-[#00A8A8]"
        >
          Testimonios
        </a>
        <a
          href="#faq"
          onClick={() => setMobileMenuOpen(false)}
          className="text-[16px] font-medium text-[#171717] hover:text-[#00A8A8]"
        >
          FAQ
        </a>
        <hr className="my-2 border-gray-100" />
        <div className="flex flex-col gap-3">
          <a
            href="#"
            className="w-full text-center rounded-full bg-[#f5f5f5] py-2 text-[14px] font-medium text-[#171717]"
          >
            Iniciar Sesión
          </a>
          <a
            href="#"
            className="w-full text-center rounded-full bg-[#00A8A8] py-2 text-[14px] font-semibold text-white"
          >
            Registrarse
          </a>
        </div>
      </div>
    </div>
  )}
</nav>

     {/* =====================================================
    HERO SECTION
===================================================== */}
<section id="hero" className="relative overflow-hidden bg-[#FCFBDC] pt-28 lg:pt-36 pb-16">
  <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
      
      {/* COLUMNA IZQUIERDA: TEXTO Y ACCIONES */}
      <div className="z-10 text-center lg:text-left lg:col-span-7">
        {/* Badge */}
        <div className="mb-6 inline-flex rounded-full border border-[rgba(0,168,168,0.2)] bg-[rgba(0,168,168,0.08)] px-4 py-2 text-xs sm:text-sm">
          <span className="font-semibold text-[#00A8A8] tracking-wide">
            Inspirados en tu salud, enfocados en tu bienestar.
          </span>
        </div>

        {/* Título Principal */}
        <h1 className="text-3xl font-extrabold leading-tight tracking-tight text-[#171717] sm:text-5xl lg:text-6xl">
          Reserva tus medicamentos{" "}
          <br className="hidden sm:inline" />
          <span className="bg-gradient-to-r from-[#00A8A8] to-[#006666] bg-clip-text text-transparent">
            a tiempo
          </span>{" "}
          con FarmaSync
        </h1>

        {/* Subtítulo */}
        <p className="mt-6 text-base sm:text-lg leading-relaxed text-[#555] max-w-2xl mx-auto lg:mx-0">
          Evita filas, consulta la disponibilidad en tiempo real y asegura
          tus medicamentos en las farmacias más cercanas de forma rápida y segura.
        </p>

        {/* Botones de Acción */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
          <a
            href="#"
            className="w-full sm:w-auto text-center rounded-full bg-[#00A8A8] px-8 py-4 text-base font-bold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-[#009494] shadow-sm hover:shadow-lg"
          >
            Reservar Ahora
          </a>
          <a
            href="#como_funciona"
            className="w-full sm:w-auto text-center rounded-full border border-gray-300 bg-white/80 backdrop-blur-sm px-8 py-4 text-base font-semibold text-[#171717] transition-all duration-300 hover:-translate-y-1 hover:bg-white shadow-sm"
          >
            Ver cómo funciona
          </a>
        </div>
      </div>

      {/* COLUMNA DERECHA: DOCTORA Y ANIMACIÓN */}
      <div className="relative flex justify-center lg:col-span-5 lg:justify-end">
        <div className="relative w-full max-w-md lg:max-w-none">
          {/* Luces de fondo (Glows) */}
          <div className="absolute -right-5 top-5 h-64 w-64 sm:h-96 sm:w-96 rounded-full bg-[#DDF5D6] opacity-80 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-10 right-10 h-48 w-48 sm:h-72 sm:w-72 rounded-full bg-[#FFF2B8] opacity-60 blur-3xl pointer-events-none" />
          
          {/* Imagen Flotante de la Doctora */}
          <div className="relative z-10 w-full animate-[float_5s_ease-in-out_infinite]">
            <Image
              src="/images/doctora.png"
              alt="Profesional de salud de FarmaSync"
              width={520}
              height={650}
              priority
              quality={100}
              className="relative z-10 h-auto w-full max-h-[500px] lg:max-h-[600px] object-contain mix-blend-multiply drop-shadow-[0_20px_30px_rgba(26,22,18,0.1)]"
            />
          </div>
        </div>
      </div>

    </div>
  </div>

  {/* Estilos para la animación de levitación */}
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
          BENEFICIOS
      ===================================================== */}
      <section id="beneficios" className="bg-[#FCFBDC] px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <h2 className="text-3xl font-extrabold tracking-tight text-[#171717] sm:text-4xl lg:text-5xl">
              Beneficios de FarmaSync
            </h2>
            <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-[#00A8A8]" />
            <p className="mx-auto mt-6 max-w-2xl text-base sm:text-lg leading-relaxed text-[#6B7280]">
              Facilitamos el acceso a tus medicamentos y servicios de salud de
              manera eficiente y segura.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 pt-6">
            <BenefitCard
              icon={<Search size={32} strokeWidth={2.5} />}
              title="Consulta en tiempo real"
              text="Olvídate de recorrer múltiples farmacias a ciegas. Nuestra plataforma te permite verificar la disponibilidad exacta de tus medicamentos en tiempo real desde cualquier dispositivo."
            />
            <BenefitCard
              icon={<CalendarCheck size={32} strokeWidth={2.5} />}
              title="Reserva anticipada"
              text="Con tan solo unos pocos clics, puedes apartar los fármacos que necesitas de manera inmediata."
            />
            <BenefitCard
              icon={<Bell size={32} strokeWidth={2.5} />}
              title="Notificaciones"
              text="Mantente siempre informado. Recibe avisos automáticos directamente en tu dispositivo sobre el estado de tus reservas y si un medicamento de alta demanda vuelve a estar disponible."
            />
            <BenefitCard
              icon={<Clock size={32} strokeWidth={2.5} />}
              title="Menos espera"
              text="Reduce el tiempo de búsqueda y evita filas innecesarias para obtener tus medicamentos de manera más rápida y eficiente."
            />
            <BenefitCard
              icon={<Pill size={32} strokeWidth={2.5} />}
              title="Acceso oportuno"
              text="Mejora la continuidad de tus tratamientos médicos teniendo tus medicamentos disponibles cuando realmente los necesitas."
            />
            <BenefitCard
              icon={<ShieldCheck size={32} strokeWidth={2.5} />}
              title="Seguridad"
              text="Protegemos tu información personal y médica mediante un proceso diseñado para ofrecerte confianza y tranquilidad."
            />
          </div>
        </div>
      </section>

      {/* =====================================================
          CÓMO FUNCIONA
      ===================================================== */}
      <section id="como_funciona" className="bg-white px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <span className="mb-3 inline-block rounded-full bg-[#00A8A8]/10 px-4 py-1.5 text-xs sm:text-sm font-semibold text-[#00A8A8]">
              ¿Cómo funciona?
            </span>
            <h2 className="mb-4 text-3xl font-extrabold text-[#374151] sm:text-4xl">
              Tu medicamento en solo 5 pasos
            </h2>
            <p className="mx-auto max-w-xl text-base text-gray-600">
              Consulta disponibilidad, reserva y recibe notificaciones desde
              una sola plataforma.
            </p>
          </div>

          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            {/* SIMULADOR TELÉFONO */}
            <div className="flex justify-center">
              <div className="w-full max-w-sm rounded-3xl border border-[#E5E7EB] bg-white p-6 sm:p-8 shadow-xl">
                <div className="mb-6 text-center text-xl font-bold text-[#171717]">
                  FarmaSync
                </div>
                <div className="mb-4 flex items-center gap-3 rounded-xl bg-[#FCFBDC] p-4">
                  <Search size={20} className="text-[#00A8A8]" />
                  <span className="text-sm font-medium">Paracetamol</span>
                </div>
                <div className="mb-4 rounded-xl border border-[#E5E7EB] p-4">
                  <h4 className="font-bold">Disponible</h4>
                  <p className="text-xs text-gray-500 mt-0.5">Farmacia Central</p>
                  <span className="mt-2 block text-xs font-semibold text-green-600">
                    ✓ En stock
                  </span>
                </div>
                <div className="rounded-xl border border-[#E5E7EB] p-4">
                  <h4 className="font-bold">Reserva creada</h4>
                  <p className="text-xs text-gray-500 mt-0.5">Código: FS-2481</p>
                </div>
              </div>
            </div>

            {/* PASOS */}
            <div className="flex flex-col gap-4">
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

          {/* BENEFICIOS DEL PROCESO */}
          <div className="mt-12 flex flex-wrap justify-center gap-3 sm:gap-5">
            <WorkflowBenefit icon={<Clock size={18} />} text="Ahorra tiempo" />
            <WorkflowBenefit icon={<MapPin size={18} />} text="Menos desplazamientos" />
            <WorkflowBenefit icon={<Bell size={18} />} text="Notificaciones automáticas" />
            <WorkflowBenefit icon={<ShieldCheck size={18} />} text="Proceso seguro" />
          </div>
        </div>
      </section>

      {/* =====================================================
          PRUEBA SOCIAL
      ===================================================== */}
      <section id="prueba_social" className="bg-[#FCFBDC] px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <span className="inline-block rounded-full bg-[#00A8A8]/10 px-4 py-1.5 text-xs sm:text-sm font-semibold text-[#00A8A8]">
              PRUEBA SOCIAL
            </span>
            <h2 className="mt-4 text-3xl font-extrabold text-[#171717] sm:text-4xl">
              Confianza respaldada por resultados
            </h2>
            <div className="mx-auto mt-4 h-1 w-12 rounded-full bg-[#00A8A8]" />
          </div>

          {/* BARRA UNIFICADA DE MÉTRICAS */}
          <div className="mx-auto max-w-4xl rounded-2xl md:rounded-full bg-white px-6 py-6 shadow-sm">
            <div className="grid grid-cols-1 gap-6 md:gap-0 divide-y md:divide-y-0 md:divide-x divide-[#E5E7EB] md:grid-cols-3">
              <div className="pt-2 md:pt-0 text-center">
                <div className="text-3xl sm:text-4xl font-extrabold text-[#00A8A8]">
                  +1,000
                </div>
                <p className="mt-1 text-xs font-bold uppercase tracking-wider text-[#6B7280]">
                  Usuarios Satisfechos
                </p>
              </div>
              <div className="pt-4 md:pt-0 text-center">
                <div className="text-3xl sm:text-4xl font-extrabold text-[#00A8A8]">
                  98%
                </div>
                <p className="mt-1 text-xs font-bold uppercase tracking-wider text-[#6B7280]">
                  Menos Filas
                </p>
              </div>
              <div className="pt-4 md:pt-0 text-center">
                <div className="text-3xl sm:text-4xl font-extrabold text-[#00A8A8]">
                  24/7
                </div>
                <p className="mt-1 text-xs font-bold uppercase tracking-wider text-[#6B7280]">
                  Consultas Disponibles
                </p>
              </div>
            </div>
          </div>

          <p className="mx-auto mt-10 max-w-2xl text-center text-base sm:text-lg leading-relaxed text-[#6B7280]">
            Lee las experiencias reales de pacientes y profesionales de la salud que ya transformaron su acceso a medicamentos con FarmaSync.
          </p>

          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3 items-stretch">
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
      <section id="faq" className="bg-white px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="mx-auto max-w-3xl">
          <div className="mb-12 text-center">
            <span className="inline-block rounded-full bg-[#00A8A8]/10 px-4 py-1.5 text-xs sm:text-sm font-semibold text-[#00A8A8]">
              FAQ
            </span>
            <h2 className="mt-4 text-3xl font-extrabold sm:text-4xl">
              Resolvemos tus dudas
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base text-[#6B7280]">
              Consulta las preguntas más frecuentes sobre reservas y
              disponibilidad de medicamentos.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            {faqs.map((faq, index) => {
              const active = openFaq === index;
              return (
                <article
                  key={index}
                  className="overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white transition duration-300 hover:shadow-md"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(active ? null : index)}
                    className="flex w-full items-center justify-between p-5 sm:p-6 text-left focus:outline-none"
                  >
                    <span className="pr-4 text-base sm:text-lg font-semibold text-[#171717]">
                      {faq.question}
                    </span>
                    <span
                      className={`shrink-0 text-[#00A8A8] transition-transform duration-300 ${
                        active ? "rotate-45" : ""
                      }`}
                    >
                      <Plus size={24} />
                    </span>
                  </button>
                  <div
                    className={`grid transition-all duration-300 ${
                      active ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="p-5 sm:p-6 pt-0 text-sm sm:text-base leading-relaxed text-[#6B7280]">
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
      <footer id="footer" className="border-t border-[#E5E7EB] bg-[#FCFBDC] px-4 sm:px-6 lg:px-8 pb-8 pt-16">
        <div className="mx-auto max-w-7xl grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* BRAND */}
          <div>
            <Image
              src="/images/logo2.jpeg"
              alt="FarmaSync Logo"
              width={180}
              height={180}
              className="mb-4 h-24 w-24 object-contain"
            />
            <p className="text-sm italic leading-relaxed text-[#6B7280]">
              "Inspirados en tu salud,
              <br />
              enfocados en tu bienestar."
            </p>
          </div>

          {/* REDES SOCIALES */}
          <div>
            <h3 className="mb-4 text-base font-semibold text-[#171717]">
              Síguenos
            </h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="flex items-center gap-3 text-sm text-[#536078] transition-colors hover:text-[#00A8A8]">
                  <FaFacebookF size={16} className="text-[#00A8A8]" />
                  Facebook
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center gap-3 text-sm text-[#536078] transition-colors hover:text-[#00A8A8]">
                  <FaInstagram size={16} className="text-[#00A8A8]" />
                  Instagram
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center gap-3 text-sm text-[#536078] transition-colors hover:text-[#00A8A8]">
                  <FaLinkedinIn size={16} className="text-[#00A8A8]" />
                  LinkedIn
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center gap-3 text-sm text-[#536078] transition-colors hover:text-[#00A8A8]">
                  <FaXTwitter size={16} className="text-[#00A8A8]" />
                  X (Twitter)
                </a>
              </li>
            </ul>
          </div>

          {/* SOPORTE */}
          <div>
            <h3 className="mb-4 text-base font-semibold text-[#171717]">
              Soporte y Ayuda
            </h3>
            <ul className="space-y-3 text-sm text-[#536078]">
              <li>
                <a href="#faq" className="hover:text-[#00A8A8] transition-colors">
                  Preguntas Frecuentes (FAQ)
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#00A8A8] transition-colors">
                  Reportar un Problema
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#00A8A8] transition-colors">
                  Contacto de Soporte
                </a>
              </li>
            </ul>
          </div>

          {/* LEGAL */}
          <div>
            <h3 className="mb-4 text-base font-semibold text-[#171717]">
              Legal
            </h3>
            <ul className="space-y-3 text-sm text-[#536078]">
              <li>
                <a href="#" className="hover:text-[#00A8A8] transition-colors">
                  Términos y Condiciones
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#00A8A8] transition-colors">
                  Política de Privacidad
                </a>
              </li>
            </ul>
            <div className="mt-6 rounded-xl border border-[#E5E7EB] bg-white/60 p-4">
              <p className="text-xs leading-relaxed text-[#9AA3B5]">
                FarmaSync es una plataforma informativa y de reserva. La entrega final
                está sujeta a validación en el punto físico.
              </p>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-12 max-w-7xl border-t border-[#E5E7EB] pt-6 text-center text-xs sm:text-sm text-[#6B7280]">
          <p>© 2026 FarmaSync. Todos los derechos reservados.</p>
          <p className="mt-1 text-xs">Hecho con ♥ para optimizar tu bienestar.</p>
        </div>
      </footer>
    </main>
  );
}

/* =====================================================
   COMPONENTE BENEFICIO
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
    <article className="relative rounded-2xl border border-[#E7E7E7] border-t-4 border-t-[#00A8A8] bg-white px-6 pb-8 pt-12 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
      <div className="absolute left-1/2 top-0 z-10 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#00A8A8] text-white shadow-md">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-[#171717]">{title}</h3>
      <p className="mt-4 text-sm sm:text-base leading-relaxed text-[#70798B]">
        {text}
      </p>
    </article>
  );
}

/* =====================================================
   COMPONENTE PASO
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
    <div className="group relative overflow-hidden flex items-start gap-4 sm:gap-6 rounded-2xl border border-[#E5E7EB] bg-white p-5 sm:p-6 transition-all duration-300 hover:border-[#00A8A8] hover:shadow-md">
      <span className="absolute left-0 top-0 h-full w-1 origin-top scale-y-0 bg-[#00A8A8] transition-transform duration-300 group-hover:scale-y-100" />
      <div className="min-w-10 text-2xl sm:text-3xl font-extrabold text-[#00A8A8]">
        {number}
      </div>
      <div>
        <h3 className="mb-1 text-base sm:text-lg font-bold text-[#171717]">{title}</h3>
        <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">{text}</p>
      </div>
    </div>
  );
}

/* =====================================================
   BENEFICIO DEL WORKFLOW
===================================================== */
function WorkflowBenefit({
  icon,
  text,
}: {
  icon: React.ReactNode;
  text: string;
}) {
  return (
    <div className="flex items-center gap-2.5 rounded-full border border-[#E5E7EB] bg-white px-4 py-2.5 text-xs sm:text-sm">
      <span className="text-[#00A8A8]">{icon}</span>
      <span className="font-medium text-[#171717]">{text}</span>
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
    <article className="flex h-full flex-col justify-between rounded-2xl border border-[#E5E7EB] bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
      <div>
        <div className="mb-3 text-lg tracking-widest text-[#00A8A8]">
          ★★★★★
        </div>
        <p className="text-sm leading-relaxed text-[#555555]">
          "{text}"
        </p>
      </div>
      <div className="mt-6 flex items-center gap-3 border-t border-[#F0F0F0] pt-4">
        {image ? (
          <Image
            src={image}
            alt={name}
            width={40}
            height={40}
            className="h-10 w-10 rounded-full object-cover"
          />
        ) : (
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#00A8A8]/10 text-sm font-bold text-[#00A8A8]">
            {initial}
          </div>
        )}
        <div>
          <h3 className="text-sm font-bold text-[#171717]">{name}</h3>
          <p className="text-xs font-medium text-[#6B7280]">{role}</p>
        </div>
      </div>
    </article>
  );
}