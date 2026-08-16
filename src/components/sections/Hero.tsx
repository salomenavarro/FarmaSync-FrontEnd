import Image from "next/image";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative overflow-hidden bg-white pb-12 pt-24 sm:pb-16 sm:pt-28 lg:pb-20 lg:pt-36"
    >
      {/* ===================================================== */}
      {/* DECORACIONES DE FONDO */}
      {/* ===================================================== */}

      {/* Halo izquierdo */}
      <div className="pointer-events-none absolute -left-24 top-20 h-56 w-56 rounded-full bg-[#00A8A8]/10 blur-3xl sm:h-80 sm:w-80" />

      {/* Halo derecho */}
      <div className="pointer-events-none absolute -right-20 top-0 h-72 w-72 rounded-full bg-[#00A8A8]/10 blur-3xl sm:h-96 sm:w-96" />

      {/* Círculo superior derecho */}
      <div
        className="
          pointer-events-none
          absolute
          -right-16
          -top-20
          h-56
          w-56
          rounded-full
          border-[3px]
          border-[#A8E5E8]/70
          sm:h-72
          sm:w-72
          lg:h-80
          lg:w-80
        "
      />

      {/* Círculo inferior derecho */}
      <div
        className="
          pointer-events-none
          absolute
          -bottom-32
          -right-20
          h-80
          w-80
          rounded-full
          border-[6px]
          border-[#B8E9EC]/70
          sm:h-96
          sm:w-96
        "
      />

      {/* Círculo pequeño izquierdo */}
      <div
        className="
          pointer-events-none
          absolute
          left-[8%]
          top-[32%]
          hidden
          h-16
          w-16
          rounded-full
          border-2
          border-[#BDECEF]
          sm:block
        "
      />

      {/* Círculo pequeño superior */}
      <div
        className="
          pointer-events-none
          absolute
          left-[52%]
          top-[15%]
          hidden
          h-14
          w-14
          rounded-full
          border
          border-[#BDECEF]
          lg:block
        "
      />

      {/* ===================================================== */}
      {/* PUNTOS DECORATIVOS */}
      {/* ===================================================== */}

      {/* Grupo de puntos izquierdo */}
      <div
        className="
          pointer-events-none
          absolute
          left-10
          top-28
          hidden
          opacity-60
          sm:block
        "
      >
        <div className="grid grid-cols-4 gap-2">
          {Array.from({ length: 16 }).map((_, index) => (
            <span
              key={index}
              className="h-1 w-1 rounded-full bg-[#8DDDE1]"
            />
          ))}
        </div>
      </div>

      {/* Grupo de puntos derecho */}
      <div
        className="
          pointer-events-none
          absolute
          right-16
          top-[52%]
          hidden
          opacity-60
          lg:block
        "
      >
        <div className="grid grid-cols-4 gap-2">
          {Array.from({ length: 16 }).map((_, index) => (
            <span
              key={index}
              className="h-1 w-1 rounded-full bg-[#8DDDE1]"
            />
          ))}
        </div>
      </div>

      {/* Puntos individuales */}
      <div className="pointer-events-none absolute left-[25%] top-[18%] h-3 w-3 rounded-full bg-[#8DDDE1]/70" />

      <div className="pointer-events-none absolute right-[28%] top-[20%] h-4 w-4 rounded-full bg-[#8DDDE1]/60" />

      <div className="pointer-events-none absolute left-[18%] bottom-[20%] h-4 w-4 rounded-full bg-[#8DDDE1]/60" />

      <div className="pointer-events-none absolute right-[10%] bottom-[18%] h-3 w-3 rounded-full bg-[#8DDDE1]/70" />

      {/* ===================================================== */}
      {/* CRUCES DECORATIVAS */}
      {/* ===================================================== */}

      {/* Cruz izquierda */}
      <div
        className="
          pointer-events-none
          absolute
          left-[10%]
          top-[68%]
          hidden
          text-4xl
          font-light
          text-[#BDECEF]
          sm:block
        "
      >
        +
      </div>

      {/* Cruz superior derecha */}
      <div
        className="
          pointer-events-none
          absolute
          right-[15%]
          top-[22%]
          hidden
          text-5xl
          font-light
          text-[#C8EFF0]
          lg:block
        "
      >
        +
      </div>

      {/* Cruz pequeña derecha */}
      <div
        className="
          pointer-events-none
          absolute
          right-[7%]
          top-[38%]
          hidden
          text-2xl
          font-bold
          text-[#BDECEF]
          lg:block
        "
      >
        +
      </div>

      {/* Cruz pequeña inferior */}
      <div
        className="
          pointer-events-none
          absolute
          left-[42%]
          bottom-[12%]
          hidden
          text-3xl
          font-light
          text-[#C8EFF0]
          lg:block
        "
      >
        +
      </div>

      {/* ===================================================== */}
      {/* LÍNEAS DECORATIVAS */}
      {/* ===================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          left-[20%]
          top-[25%]
          hidden
          h-[2px]
          w-20
          rotate-45
          rounded-full
          bg-[#BDECEF]
          sm:block
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          right-[20%]
          bottom-[25%]
          hidden
          h-[2px]
          w-20
          -rotate-45
          rounded-full
          bg-[#BDECEF]
          lg:block
        "
      />

      {/* ===================================================== */}
      {/* CONTENIDO PRINCIPAL */}
      {/* ===================================================== */}

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12">

          {/* ================================================= */}
          {/* TEXTO */}
          {/* ================================================= */}

          <div className="z-10 text-center lg:col-span-7 lg:text-left">

            {/* ETIQUETA */}
            <div className="mb-4 inline-flex rounded-full border border-[#00A8A8]/20 bg-[#F0FAFA] px-3.5 py-1.5 text-xs shadow-sm sm:mb-6 sm:px-4 sm:py-2 sm:text-sm">
              <span className="font-semibold tracking-wide text-[#00A8A8]">
                Inspirados en tu salud, enfocados en tu bienestar.
              </span>
            </div>

            {/* TÍTULO */}
            <h1 className="text-3xl font-extrabold leading-tight tracking-tight text-[#171717] sm:text-4xl lg:text-5xl xl:text-6xl">
              Reserva tus medicamentos{" "}
              <br className="hidden sm:inline" />

              <span className="bg-gradient-to-r from-[#00A8A8] to-[#006666] bg-clip-text text-transparent">
                a tiempo
              </span>{" "}

              con FarmaSync
            </h1>

            {/* DESCRIPCIÓN */}
            <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-[#536078] sm:mt-6 sm:text-lg lg:mx-0">
              Evita filas, consulta la disponibilidad en tiempo real y asegura
              tus medicamentos en las farmacias más cercanas de forma rápida y
              segura.
            </p>

            {/* BOTONES */}
            <div className="mt-7 flex flex-col items-center justify-center gap-3.5 sm:mt-8 sm:flex-row sm:gap-4 lg:justify-start">

              <a
                href="#propuesta"
                className="w-full rounded-full bg-[#00A8A8] px-8 py-3.5 text-center text-sm font-bold text-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:bg-[#009494] hover:shadow-lg sm:w-auto sm:py-4 sm:text-base"
              >
                Reservar Ahora
              </a>

              <a
                href="#como_funciona"
                className="w-full rounded-full border border-[#CFE3E3] bg-white px-8 py-3.5 text-center text-sm font-semibold text-[#171717] shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#00A8A8] hover:text-[#00A8A8] sm:w-auto sm:py-4 sm:text-base"
              >
                Ver cómo funciona
              </a>

            </div>
          </div>

          {/* ================================================= */}
          {/* DOCTORA */}
          {/* ================================================= */}

          <div className="relative flex justify-center lg:col-span-5 lg:justify-end">

            {/* DESTELLO DETRÁS DE LA DOCTORA */}
            <div className="pointer-events-none absolute right-0 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-[#00A8A8]/15 blur-3xl sm:h-96 sm:w-96" />

            {/* CÍRCULO DECORATIVO */}
            <div className="pointer-events-none absolute right-4 top-1/2 h-56 w-56 -translate-y-1/2 rounded-full border-[24px] border-[#00A8A8]/5 sm:h-80 sm:w-80 sm:border-[35px]" />

            {/* IMAGEN */}
            <div className="relative z-10 w-full max-w-xs sm:max-w-md lg:max-w-lg">

              <Image
                src="/images/doc1.png"
                alt=""
                width={520}
                height={650}
                priority
                quality={100}
                sizes="(max-width: 640px) 320px, (max-width: 1024px) 450px, 520px"
                className="h-auto w-full object-contain drop-shadow-[0_20px_30px_rgba(0,168,168,0.15)]"
              />

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}