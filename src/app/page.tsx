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

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);


  return (
    <main className="min-h-screen bg-[#FCFBDC] text-[#374151]">


      {/* =====================================================
    NAVBAR
===================================================== */}

<nav
  className={`fixed left-0 right-0 top-0 z-50 transition-all duration-100 ${
    scrolled
      ? "bg-transparent"
      : "border-t-[3px] border-[#3F4150] bg-white"
  }`}
>

 <div
  className={`flex h-[78px] items-center justify-between px-8 lg:px-10 ${
    scrolled
      ? "mx-4 mt-3 rounded-full bg-white shadow-md lg:mx-8"
      : "w-full"
  }`}
>

    {/* LOGO */}

    <a
      href="#hero"
      className="flex shrink-0 items-center gap-3"
    >

      <Image
        src="/images/logo1.jpeg"
        alt="FarmaSync"
        width={52}
        height={52}
        className="h-[52px] w-[52px] object-contain"
      />

      <span className="text-[21px] font-bold text-[#171717]">
        FarmaSync
      </span>

    </a>


{/* MENÚ */}

<div className="hidden items-center gap-8 lg:flex">

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


    {/* BOTONES */}

    <div className="flex shrink-0 items-center gap-6">

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

  </div>

</nav>




      {/* =====================================================
          HERO
      ===================================================== */}


      <section
  id="hero"
  className="relative overflow-hidden bg-[#FCFBDC] pt-[78px]"
>


        <div className="relative mx-auto flex min-h-[695px] max-w-[1200px] items-center px-6">


          <div className="z-10 w-full pb-16 pt-10 lg:w-[58%]">


            <div className="mb-7 inline-flex rounded-full border border-[#BFE8D4] bg-[#EDF9E9] px-4 py-2">


              <span className="font-semibold text-[#00A8A8]">
                Inspirados en tu salud, enfocados en tu bienestar.
              </span>


            </div>




            <h1 className="max-w-[720px] text-[42px] font-extrabold leading-[1.08] tracking-[-2px] text-[#171717] sm:text-[50px] lg:text-[56px]">


              Reserva tus medicamentos


              <br />


              <span className="text-[#00A8A8]">
                a tiempo
              </span>{" "}


              con FarmaSync


            </h1>




            <p className="mt-7 max-w-[650px] text-lg leading-8 text-[#555]">


              Evita filas, consulta la disponibilidad en tiempo real y asegura
              tus medicamentos en las farmacias más cercanas de forma rápida y
              segura.


            </p>




            <div className="mt-10 flex flex-wrap gap-5">


              <a
                href="#"
                className="rounded-full bg-[#00A8A8] px-8 py-4 text-[17px] font-bold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-[#009494] hover:shadow-lg"
              >
                Reservar Ahora
              </a>


              <a
                href="#como_funciona"
                className="rounded-full border bg-white px-8 py-4 text-[17px] font-semibold transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-md"
              >
                Ver cómo funciona
              </a>


            </div>


          </div>




          {/* DOCTORA */}


          <div className="pointer-events-none absolute bottom-0 right-[5%] hidden h-[650px] w-[520px] items-end justify-center lg:flex">


            <div className="absolute right-[-20px] top-[20px] h-[470px] w-[470px] rounded-full bg-[#DDF5D6] opacity-80 blur-[80px]" />


            <div className="absolute bottom-[-80px] right-[80px] h-[300px] w-[350px] rounded-full bg-[#FFF2B8] opacity-60 blur-[70px]" />


            <Image
              src="/images/doctora"
              alt="Profesional de salud"
              width={520}
              height={650}
              priority
              className="relative z-10 h-[650px] w-[520px] scale-110 object-contain object-bottom mix-blend-multiply"
            />


          </div>


        </div>


      </section>




      {/* =====================================================
    PROPUESTA DE VALOR
===================================================== */}

<section
  id="propuesta"
  className="bg-white px-6 py-24 lg:py-28"
>
  <div className="mx-auto grid max-w-[1200px] items-center gap-16 lg:grid-cols-2">

    {/* =================================================
        COLUMNA IZQUIERDA
    ================================================= */}

    <div className="max-w-[570px]">

      <span className="text-sm font-bold uppercase tracking-[1px] text-[#00A8A8]">
        El efecto FarmaSync
      </span>

      <h2 className="mt-7 text-[44px] font-extrabold leading-[1.12] tracking-[-1.5px] text-[#171717] sm:text-[50px]">
        Tu tratamiento no debería depender de la suerte
      </h2>

      <p className="mt-8 text-[18px] leading-[1.85] text-[#6B625B]">
        Miles de pacientes en Colombia se desplazan a su farmacia EPS
        sin saber si el medicamento que necesitan está disponible.
        FarmaSync elimina esa incertidumbre y las barreras entre tú y
        tus medicamentos, una experiencia diseñada desde la empatía,
        la claridad y el respeto por tu tiempo.
      </p>

    </div>


    {/* =================================================
        COLUMNA DERECHA — LÍNEA DE PASOS
    ================================================= */}

    <div className="relative">

      {/* Línea vertical */}

      <div
        className="
          absolute
          left-[33px]
          top-[40px]
          bottom-[40px]
          w-[2px]
          bg-[#A8E3E3]
        "
      />


      {/* =================================================
          PASO 1
      ================================================= */}

      <div className="group relative flex gap-8 pb-24">

        {/* Número */}

        <div
          className="
            relative z-10
            flex h-[66px] w-[66px] shrink-0
            items-center justify-center
            rounded-full
            border-2 border-[#E5E7EB]
            bg-white
            text-[20px] font-bold text-[#8A8A8A]
            shadow-sm
            transition-all duration-300
            group-hover:border-[#00A8A8]
            group-hover:bg-[#00A8A8]
            group-hover:text-white
          "
        >
          1
        </div>


        {/* Contenido */}

        <div
          className="
            pt-3
            transition-transform duration-300
            group-hover:translate-x-2
          "
        >

          <span className="text-sm font-bold uppercase tracking-[1px] text-[#00A8A8]">
            Sin desplazamientos en vano
          </span>

          <h3 className="mt-4 text-[27px] font-bold leading-tight text-[#171717]">
            Consulta antes de salir
          </h3>

          <p className="mt-4 max-w-[560px] text-[18px] leading-[1.8] text-[#6B625B]">
            Verifica en tiempo real si tu medicamento está disponible
            en las farmacias asociadas a tu EPS. Sin llamadas, sin filas,
            sin viajes innecesarios.
          </p>

        </div>

      </div>


      {/* =================================================
          PASO 2
      ================================================= */}

      <div className="group relative flex gap-8 pb-24">

        {/* Número */}

        <div
          className="
            relative z-10
            flex h-[66px] w-[66px] shrink-0
            items-center justify-center
            rounded-full
            border-2 border-[#E5E7EB]
            bg-white
            text-[20px] font-bold text-[#8A8A8A]
            shadow-sm
            transition-all duration-300
            group-hover:border-[#00A8A8]
            group-hover:bg-[#00A8A8]
            group-hover:text-white
          "
        >
          2
        </div>


        {/* Contenido */}

        <div
          className="
            pt-3
            transition-transform duration-300
            group-hover:translate-x-2
          "
        >

          <span className="text-sm font-bold uppercase tracking-[1px] text-[#00A8A8]">
            Para pacientes crónicos y cuidadores
          </span>

          <h3 className="mt-4 text-[27px] font-bold leading-tight text-[#171717]">
            Reserva con hasta 5 días de anticipación
          </h3>

          <p className="mt-4 max-w-[560px] text-[18px] leading-[1.8] text-[#6B625B]">
            Aparta tu medicamento antes de que se agote. Si eres cuidador,
            puedes hacer la reserva en nombre del paciente a tu cargo sin
            necesitar que esté presente.
          </p>

        </div>

      </div>


      {/* =================================================
          PASO 3
      ================================================= */}

      <div className="group relative flex gap-8">

        {/* Número */}

        <div
          className="
            relative z-10
            flex h-[66px] w-[66px] shrink-0
            items-center justify-center
            rounded-full
            border-2 border-[#E5E7EB]
            bg-white
            text-[20px] font-bold text-[#8A8A8A]
            shadow-sm
            transition-all duration-300
            group-hover:border-[#00A8A8]
            group-hover:bg-[#00A8A8]
            group-hover:text-white
          "
        >
          3
        </div>


        {/* Contenido */}

        <div
          className="
            pt-3
            transition-transform duration-300
            group-hover:translate-x-2
          "
        >

          <span className="text-sm font-bold uppercase tracking-[1px] text-[#00A8A8]">
            Tranquilidad garantizada
          </span>

          <h3 className="mt-4 text-[27px] font-bold leading-tight text-[#171717]">
            Tu código, tu medicamento
          </h3>

          <p className="mt-4 max-w-[560px] text-[18px] leading-[1.8] text-[#6B625B]">
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
  className="bg-[#FCFBDC] px-6 py-24"
>
  <div className="mx-auto max-w-[1200px]">


    {/* TÍTULO */}


    <div className="mb-20 text-center">


      <h2 className="text-[42px] font-extrabold tracking-[-1.5px] text-[#171717] sm:text-[48px]">
        Beneficios de FarmaSync
      </h2>


      {/* Línea turquesa */}


      <div className="mx-auto mt-8 h-[4px] w-[64px] rounded-full bg-[#00A8A8]" />


      <p className="mx-auto mt-10 max-w-[760px] text-[18px] leading-[1.8] text-[#6B7280]">
        Facilitamos el acceso a tus medicamentos y servicios de salud de
        manera eficiente y segura.
      </p>


    </div>




    {/* =================================================
        TARJETAS
    ================================================= */}


    <div className="grid grid-cols-1 gap-x-10 gap-y-16 md:grid-cols-2 lg:grid-cols-3">




      {/* =================================================
          1. CONSULTA EN TIEMPO REAL
      ================================================= */}


      <BenefitCard
        icon={<Search size={38} strokeWidth={2.5} />}
        title="Consulta en tiempo real"
        text="Olvídate de recorrer múltiples farmacias a ciegas. Nuestra plataforma te permite verificar la disponibilidad exacta de tus medicamentos en tiempo real desde cualquier dispositivo."
      />




      {/* =================================================
          2. RESERVA ANTICIPADA
      ================================================= */}


      <BenefitCard
        icon={<CalendarCheck size={38} strokeWidth={2.5} />}
        title="Reserva anticipada"
        text="Con tan solo unos pocos clics, puedes apartar los fármacos que necesitas de manera inmediata."
      />




      {/* =================================================
          3. NOTIFICACIONES
      ================================================= */}


      <BenefitCard
        icon={<Bell size={38} strokeWidth={2.5} />}
        title="Notificaciones"
        text="Mantente siempre informado. Recibe avisos automáticos directamente en tu dispositivo sobre el estado de tus reservas y si un medicamento de alta demanda vuelve a estar disponible."
      />




      {/* =================================================
          4. MENOS ESPERA
      ================================================= */}


      <BenefitCard
        icon={<Clock size={38} strokeWidth={2.5} />}
        title="Menos espera"
        text="Reduce el tiempo de búsqueda y evita filas innecesarias para obtener tus medicamentos de manera más rápida y eficiente."
      />




      {/* =================================================
          5. ACCESO OPORTUNO
      ================================================= */}


      <BenefitCard
        icon={<Pill size={38} strokeWidth={2.5} />}
        title="Acceso oportuno"
        text="Mejora la continuidad de tus tratamientos médicos teniendo tus medicamentos disponibles cuando realmente los necesitas."
      />




      {/* =================================================
          6. SEGURIDAD
      ================================================= */}


      <BenefitCard
        icon={<ShieldCheck size={38} strokeWidth={2.5} />}
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
  className="bg-white px-8 py-32"
>
  <div className="mx-auto max-w-[1200px]">


    {/* ENCABEZADO */}


    <div className="mb-20 text-center">


      <span
        className="
          mb-4
          inline-block
          rounded-full
          bg-[#00A8A8]/10
          px-4
          py-2
          font-semibold
          text-[#00A8A8]
        "
      >
        ¿Cómo funciona?
      </span>


      <h2
        className="
          mb-4
          text-4xl
          font-extrabold
          text-[#374151]
        "
      >
        Tu medicamento en solo 5 pasos
      </h2>


      <p className="mx-auto max-w-[650px]">
        Consulta disponibilidad, reserva y recibe notificaciones desde
        una sola plataforma.
      </p>


    </div>




    {/* =================================================
        TELÉFONO + PASOS
    ================================================= */}


    <div className="grid items-center gap-20 lg:grid-cols-2">


      {/* TELÉFONO */}

<div className="flex justify-center">

  <div
    className="
      w-full
      max-w-[400px]
      rounded-[32px]
      border
      border-[#E5E7EB]
      bg-white
      p-8
      shadow-[0_25px_60px_rgba(0,0,0,0.08)]
    "
  >

    <div
      className="
        mb-8
        text-center
        text-xl
        font-bold
        text-[#171717]
      "
    >
      FarmaSync
    </div>


    {/* BUSCADOR */}

    <div
      className="
        mb-5
        flex
        items-center
        gap-3
        rounded-[14px]
        bg-[#FCFBDC]
        p-5
      "
    >

      <Search
        size={22}
        className="text-[#00A8A8]"
      />

      <span className="text-base">
        Paracetamol
      </span>

    </div>


    {/* DISPONIBILIDAD */}

    <div
      className="
        mb-5
        rounded-[14px]
        border
        border-[#E5E7EB]
        p-5
      "
    >

      <h4 className="text-lg font-bold">
        Disponible
      </h4>

      <p className="mt-1">
        Farmacia Central
      </p>

      <span className="mt-3 block text-green-600">
        ✓ En stock
      </span>

    </div>


    {/* RESERVA */}

    <div
      className="
        rounded-[14px]
        border
        border-[#E5E7EB]
        p-5
      "
    >

      <h4 className="text-lg font-bold">
        Reserva creada
      </h4>

      <p className="mt-1">
        Código: FS-2481
      </p>

    </div>

  </div>

</div>




      {/* =================================================
          PASOS
      ================================================= */}


      <div className="flex flex-col gap-6">


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




    {/* =================================================
        BENEFICIOS DEL PROCESO
    ================================================= */}


    <div className="mt-16 flex flex-wrap justify-center gap-5">


      <WorkflowBenefit
        icon={<Clock size={20} />}
        text="Ahorra tiempo"
      />


      <WorkflowBenefit
        icon={<MapPin size={20} />}
        text="Menos desplazamientos"
      />


      <WorkflowBenefit
        icon={<Bell size={20} />}
        text="Notificaciones automáticas"
      />


      <WorkflowBenefit
        icon={<ShieldCheck size={20} />}
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
        className="bg-[#FCFBDC] px-6 py-24"
      >


        <div className="mx-auto max-w-[1200px]">


          <div className="mb-12 text-center">


            <span className="inline-block rounded-full bg-[#00A8A8]/10 px-4 py-2 font-semibold text-[#00A8A8]">
              Prueba Social
            </span>


            <h2 className="mt-4 text-4xl font-extrabold">
              Confianza respaldada por resultados
            </h2>


          </div>




          <div className="grid gap-5 md:grid-cols-3">


            <div className="inline-block rounded-full bg-white p-7 text-center">


              <div className="text-4xl font-extrabold text-[#00A8A8]">
                +1,000
              </div>


              <p className="mt-2 font-semibold">
                Usuarios Satisfechos
              </p>


            </div>




            <div className="inline-block rounded-full bg-white p-7 text-center">


              <div className="text-4xl font-extrabold text-[#00A8A8]">
                98%
              </div>


              <p className="mt-2 font-semibold">
                Menos Filas
              </p>


            </div>




            <div className="inline-block rounded-full bg-white p-7 text-center">


              <div className="text-4xl font-extrabold text-[#00A8A8]">
                24/7
              </div>


              <p className="mt-2 font-semibold">
                Consultas Disponibles
              </p>


            </div>


          </div>




          <p className="mx-auto mt-10 max-w-[760px] text-center leading-8 text-[#6B7280]">
            Lee las experiencias reales de pacientes y profesionales de la
            salud que ya transformaron su acceso a medicamentos con FarmaSync.
          </p>




          <div className="mt-12 grid gap-6 md:grid-cols-3">


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
        className="bg-white px-6 py-24"
      >


        <div className="mx-auto max-w-[900px]">


          <div className="mb-12 text-center">


            <span className="inline-block rounded-full bg-[#00A8A8]/10 px-4 py-2 font-semibold text-[#00A8A8]">
              FAQ
            </span>


            <h2 className="mt-4 text-[42px] font-extrabold">
              Resolvemos tus dudas
            </h2>


            <p className="mx-auto mt-4 max-w-[620px] leading-7 text-[#6B7280]">
              Consulta las preguntas más frecuentes sobre reservas y
              disponibilidad de medicamentos.
            </p>


          </div>




          <div className="flex flex-col gap-[18px]">


            {faqs.map((faq, index) => {


              const active = openFaq === index;


              return (


                <article
                  key={index}
                  className="overflow-hidden rounded-[20px] border border-[#E5E7EB] bg-white transition duration-300 hover:shadow-[0_16px_30px_rgba(0,168,168,0.10)]"
                >


                  <button
                    type="button"
                    onClick={() =>
                      setOpenFaq(active ? null : index)
                    }
                    className="flex w-full items-center justify-between px-[26px] py-7 text-left"
                  >


                    <span className="pr-5 text-[17px] font-semibold">
                      {faq.question}
                    </span>


                    <span
                      className={`text-[#00A8A8] transition-transform duration-300 ${
                        active ? "rotate-45" : ""
                      }`}
                    >
                      <Plus size={30} />
                    </span>


                  </button>




                  <div
                    className={`grid transition-all duration-400 ${
                      active
                        ? "grid-rows-[1fr]"
                        : "grid-rows-[0fr]"
                    }`}
                  >


                    <div className="overflow-hidden">


                      <p className="px-[26px] pb-[26px] leading-8 text-[#6B7280]">
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
  className="border-t border-[#E5E7EB] bg-[#FCFBDC] px-5 pb-5 pt-[60px]"
>
  <div className="mx-auto grid max-w-[1200px] gap-10 md:grid-cols-2 lg:grid-cols-4">

    {/* =================================================
        BRAND
    ================================================= */}

    <div>
      <Image
        src="/images/logo2.jpeg"
        alt="FarmaSync Logo"
        width={230}
        height={230}
        className="mb-4 h-[220px] w-[220px] object-contain"
      />

      <p className="max-w-[280px] text-[15px] italic leading-6 text-[#6B7280]">
        "Inspirados en tu salud,
        <br />
        enfocados en tu bienestar."
      </p>
    </div>


    {/* =================================================
        REDES SOCIALES
    ================================================= */}

    <div>
      <h3 className="mb-5 text-[17px] font-semibold text-[#171717]">
        Síguenos
      </h3>

      <ul className="space-y-3">

        <li>
          <a
            href="#"
            className="flex items-center gap-3 text-[15px] text-[#536078] transition-colors hover:text-[#00A8A8]"
          >
            <FaFacebookF
              size={17}
              className="text-[#00A8A8]"
            />
            Facebook
          </a>
        </li>

        <li>
          <a
            href="#"
            className="flex items-center gap-3 text-[15px] text-[#536078] transition-colors hover:text-[#00A8A8]"
          >
            <FaInstagram
              size={18}
              className="text-[#00A8A8]"
            />
            Instagram
          </a>
        </li>

        <li>
          <a
            href="#"
            className="flex items-center gap-3 text-[15px] text-[#536078] transition-colors hover:text-[#00A8A8]"
          >
            <FaLinkedinIn
              size={18}
              className="text-[#00A8A8]"
            />
            LinkedIn
          </a>
        </li>

        <li>
          <a
            href="#"
            className="flex items-center gap-3 text-[15px] text-[#536078] transition-colors hover:text-[#00A8A8]"
          >
            <FaXTwitter
              size={17}
              className="text-[#00A8A8]"
            />
            X (Twitter)
          </a>
        </li>

      </ul>
    </div>


    {/* =================================================
        SOPORTE
    ================================================= */}

    <div>
      <h3 className="mb-5 text-[17px] font-semibold text-[#171717]">
        Soporte y Ayuda
      </h3>

      <ul className="space-y-3">

        <li>
          <a
            href="#faq"
            className="text-[15px] leading-6 text-[#536078] transition-colors hover:text-[#00A8A8]"
          >
            Preguntas Frecuentes
            <br />
            (FAQ)
          </a>
        </li>

        <li>
          <a
            href="#"
            className="text-[15px] text-[#536078] transition-colors hover:text-[#00A8A8]"
          >
            Reportar un Problema
          </a>
        </li>

        <li>
          <a
            href="#"
            className="text-[15px] text-[#536078] transition-colors hover:text-[#00A8A8]"
          >
            Contacto de Soporte
          </a>
        </li>

      </ul>
    </div>


    {/* =================================================
        LEGAL
    ================================================= */}

    <div>
      <h3 className="mb-5 text-[17px] font-semibold text-[#171717]">
        Legal
      </h3>

      <ul className="space-y-3">

        <li>
          <a
            href="#"
            className="text-[15px] text-[#536078] transition-colors hover:text-[#00A8A8]"
          >
            Términos y Condiciones
          </a>
        </li>

        <li>
          <a
            href="#"
            className="text-[15px] text-[#536078] transition-colors hover:text-[#00A8A8]"
          >
            Política de Privacidad
          </a>
        </li>

      </ul>


      {/* AVISO LEGAL */}

      <div className="mt-8 rounded-[10px] border border-[#E5E7EB] bg-[#FCFBDC] px-5 py-5">
        <p className="text-xs leading-5 text-[#9AA3B5]">
          FarmaSync es una plataforma
          <br />
          informativa y de reserva. La entrega final
          está sujeta a validación en el punto físico.
        </p>
      </div>

    </div>

  </div>


  {/* =================================================
      PARTE INFERIOR
  ================================================= */}

  <div className="mx-auto mt-10 max-w-[1200px] border-t border-[#E5E7EB] pt-5 text-center text-sm text-[#6B7280]">

    <p>
      © 2026 FarmaSync. Todos los derechos reservados.
    </p>

    <p className="mt-1 text-xs">
      Hecho con ♥ para optimizar tu bienestar.
    </p>

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
    <article
      className="
        relative
        min-h-[325px]
        rounded-[20px]
        border
        border-[#E7E7E7]
        border-t-[5px]
        border-t-[#00A8A8]
        bg-white
        px-8
        pb-10
        pt-[82px]
        text-center
        shadow-[0_8px_20px_rgba(0,0,0,0.035)]
        transition-all
        duration-300
        hover:-translate-y-2
        hover:shadow-[0_15px_35px_rgba(0,168,168,0.15)]
      "
    >


      {/* CÍRCULO DEL ÍCONO */}
      <div
        className="
          absolute
          left-1/2
          top-0
          z-10
          flex
          h-[82px]
          w-[82px]
          -translate-x-1/2
          -translate-y-1/2
          items-center
          justify-center
          rounded-full
          bg-[#00A8A8]
          text-white
          shadow-[0_4px_10px_rgba(0,168,168,0.12)]
        "
      >
        {icon}
      </div>


      {/* TÍTULO */}
      <h3
        className="
          text-[25px]
          font-bold
          leading-[1.25]
          text-[#171717]
        "
      >
        {title}
      </h3>


      {/* DESCRIPCIÓN */}
      <p
        className="
          mt-6
          text-[17px]
          leading-[1.7]
          text-[#70798B]
        "
      >
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
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.3,
      }
    );

    const element = document.getElementById(`step-${number}`);

    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, [number]);

  return (
    <div
      id={`step-${number}`}
      className={`
        group
        relative
        overflow-hidden
        flex
        gap-6
        rounded-2xl
        border
        border-[#E5E7EB]
        bg-white
        p-6
        transition-all
        duration-1000
        ease-out
        hover:border-[#00A8A8]
        hover:shadow-[0_10px_25px_rgba(0,168,168,0.15)]
        ${
          isVisible
            ? "translate-x-0 opacity-100"
            : "translate-x-8 opacity-0"
        }
      `}
    >

      {/* LÍNEA TURQUESA */}

      <span
        className="
          absolute
          left-0
          top-0
          h-full
          w-[5px]
          origin-top
          scale-y-0
          bg-[#00A8A8]
          transition-transform
          duration-300
          group-hover:scale-y-100
        "
      />

      {/* NÚMERO */}

      <div
        className="
          min-w-[50px]
          text-3xl
          font-extrabold
          text-[#00A8A8]
        "
      >
        {number}
      </div>

      {/* TEXTO */}

      <div>
        <h3 className="mb-2 text-xl font-bold">
          {title}
        </h3>

        <p>
          {text}
        </p>
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
    <div className="flex items-center gap-3 rounded-full border border-[#E5E7EB] bg-white px-6 py-4">


      <span className="text-[#00A8A8]">
        {icon}
      </span>


      <span className="font-medium">
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
}: {
  text: string;
  name: string;
  role: string;
}) {
  return (
    <article className="rounded-2xl border border-[#E5E7EB] bg-white p-7 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">


      <div className="mb-5 text-3xl text-[#00A8A8]">
        ★★★★★
      </div>


      <p className="leading-7 text-[#6B7280]">
        {text}
      </p>


      <div className="mt-6 border-t border-[#E5E7EB] pt-5">


        <h3 className="font-bold">
          {name}
        </h3>


        <p className="text-sm text-[#00A8A8]">
          {role}
        </p>


      </div>


    </article>
  );
}
