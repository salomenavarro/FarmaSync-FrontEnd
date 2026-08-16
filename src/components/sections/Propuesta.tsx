export default function Propuesta() {
  return (
    <section
      id="propuesta"
      className="bg-[#F4FBFA] px-6 py-20 sm:py-24 lg:py-28"
    >
      <div className="mx-auto grid max-w-[1200px] items-center gap-16 lg:grid-cols-2">
        {/* ===================================================== */}
        {/* COLUMNA IZQUIERDA */}
        {/* ===================================================== */}

        <div className="max-w-[570px]">
          <span className="text-[13px] font-bold uppercase tracking-[1px] text-[#00A8A8]">
            El efecto FarmaSync
          </span>

          <h2 className="mt-6 text-2xl font-extrabold leading-tight tracking-tight text-[#171717] sm:text-4xl lg:text-5xl">
            Tu tratamiento no debería depender de la suerte
          </h2>

          <p className="mt-7 text-[16px] leading-[1.8] text-[#536078]">
            Miles de pacientes en Colombia se desplazan a su farmacia EPS sin
            saber si el medicamento que necesitan está disponible. FarmaSync
            elimina esa incertidumbre y las barreras entre tú y tus
            medicamentos, una experiencia diseñada desde la empatía, la
            claridad y el respeto por tu tiempo.
          </p>

          {/* DETALLE DECORATIVO */}
          <div className="mt-8 flex items-center gap-3">
            <div className="h-[2px] w-10 rounded-full bg-[#00A8A8]" />
            <div className="h-2 w-2 rounded-full bg-[#A8E3E3]" />
            <div className="h-2 w-2 rounded-full bg-[#DCEEEE]" />
          </div>
        </div>

        {/* ===================================================== */}
        {/* COLUMNA DERECHA */}
        {/* ===================================================== */}

        <div className="relative">
          {/* LÍNEA DEL TIMELINE */}
          <div className="absolute bottom-[40px] left-[30px] top-[40px] w-[2px] bg-[#A8E3E3]" />

          {/* ================================================= */}
          {/* PASO 1 */}
          {/* ================================================= */}

          <div className="group relative flex gap-7 pb-20">
            <div
              className="
                relative z-10
                flex h-[62px] w-[62px] shrink-0
                items-center justify-center
                rounded-full
                border-2 border-[#DCEEEE]
                bg-white
                text-[18px] font-bold text-[#8A8A8A]
                shadow-sm
                transition-all duration-300
                group-hover:border-[#00A8A8]
                group-hover:bg-[#00A8A8]
                group-hover:text-white
                group-hover:shadow-lg
                group-hover:shadow-[#00A8A8]/15
              "
            >
              1
            </div>

            <div
              className="
                rounded-2xl
                border border-transparent
                bg-white/60
                p-5
                pt-4
                shadow-sm
                transition-all duration-300
                group-hover:-translate-y-1
                group-hover:border-[#DCEEEE]
                group-hover:bg-white
                group-hover:shadow-md
              "
            >
              <span className="text-[13px] font-bold uppercase tracking-[1px] text-[#00A8A8]">
                Sin desplazamientos en vano
              </span>

              <h3 className="mt-3 text-[23px] font-bold leading-tight text-[#171717]">
                Consulta antes de salir
              </h3>

              <p className="mt-3 max-w-[560px] text-[16px] leading-[1.75] text-[#536078]">
                Verifica en tiempo real si tu medicamento está disponible en
                las farmacias asociadas a tu EPS. Sin llamadas, sin filas, sin
                viajes innecesarios.
              </p>
            </div>
          </div>

          {/* ================================================= */}
          {/* PASO 2 */}
          {/* ================================================= */}

          <div className="group relative flex gap-7 pb-20">
            <div
              className="
                relative z-10
                flex h-[62px] w-[62px] shrink-0
                items-center justify-center
                rounded-full
                border-2 border-[#DCEEEE]
                bg-white
                text-[18px] font-bold text-[#8A8A8A]
                shadow-sm
                transition-all duration-300
                group-hover:border-[#00A8A8]
                group-hover:bg-[#00A8A8]
                group-hover:text-white
                group-hover:shadow-lg
                group-hover:shadow-[#00A8A8]/15
              "
            >
              2
            </div>

            <div
              className="
                rounded-2xl
                border border-transparent
                bg-white/60
                p-5
                pt-4
                shadow-sm
                transition-all duration-300
                group-hover:-translate-y-1
                group-hover:border-[#DCEEEE]
                group-hover:bg-white
                group-hover:shadow-md
              "
            >
              <span className="text-[13px] font-bold uppercase tracking-[1px] text-[#00A8A8]">
                Para pacientes crónicos y cuidadores
              </span>

              <h3 className="mt-3 text-[23px] font-bold leading-tight text-[#171717]">
                Reserva con hasta 5 días de anticipación
              </h3>

              <p className="mt-3 max-w-[560px] text-[16px] leading-[1.75] text-[#536078]">
                Aparta tu medicamento antes de que se agote. Si eres cuidador,
                puedes hacer la reserva en nombre del paciente a tu cargo sin
                necesitar que esté presente.
              </p>
            </div>
          </div>

          {/* ================================================= */}
          {/* PASO 3 */}
          {/* ================================================= */}

          <div className="group relative flex gap-7">
            <div
              className="
                relative z-10
                flex h-[62px] w-[62px] shrink-0
                items-center justify-center
                rounded-full
                border-2 border-[#DCEEEE]
                bg-white
                text-[18px] font-bold text-[#8A8A8A]
                shadow-sm
                transition-all duration-300
                group-hover:border-[#00A8A8]
                group-hover:bg-[#00A8A8]
                group-hover:text-white
                group-hover:shadow-lg
                group-hover:shadow-[#00A8A8]/15
              "
            >
              3
            </div>

            <div
              className="
                rounded-2xl
                border border-transparent
                bg-white/60
                p-5
                pt-4
                shadow-sm
                transition-all duration-300
                group-hover:-translate-y-1
                group-hover:border-[#DCEEEE]
                group-hover:bg-white
                group-hover:shadow-md
              "
            >
              <span className="text-[13px] font-bold uppercase tracking-[1px] text-[#00A8A8]">
                Tranquilidad garantizada
              </span>

              <h3 className="mt-3 text-[23px] font-bold leading-tight text-[#171717]">
                Tu código, tu medicamento
              </h3>

              <p className="mt-3 max-w-[560px] text-[16px] leading-[1.75] text-[#536078]">
                Al confirmar tu reserva recibes un código único. Llévalo a
                mostrar en la farmacia y retira sin filas. Tu tratamiento
                continúa sin interrupciones.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}