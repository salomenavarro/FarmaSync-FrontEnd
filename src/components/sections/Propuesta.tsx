"use client";

import { motion } from "framer-motion";

export default function Propuesta() {
  return (
    <section
      id="propuesta"
      className="bg-white px-6 py-20 sm:py-24 lg:py-28"
    >
      <div className="mx-auto grid max-w-[1200px] items-center gap-16 lg:grid-cols-2">

        {/* ===================================================== */}
        {/* COLUMNA IZQUIERDA */}
        {/* ===================================================== */}

        <motion.div
          className="max-w-[570px]"
          initial={{ opacity: 0, x: -45 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{
            duration: 1.1,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
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
        </motion.div>

        {/* ===================================================== */}
        {/* COLUMNA DERECHA */}
        {/* ===================================================== */}

        <div className="relative">

          {/* LÍNEA DEL TIMELINE */}

          <div
            className="
              absolute
              bottom-[40px]
              left-[30px]
              top-[40px]
              w-[2px]
              bg-[#A8E3E3]
            "
          />

          {/* ================================================= */}
          {/* PASO 1 */}
          {/* ================================================= */}

          <motion.div
            className="group relative flex gap-7 pb-20"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: 1.1,
              delay: 0.15,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {/* NÚMERO */}

            <motion.div
              className="
                relative
                z-10
                flex
                h-[62px]
                w-[62px]
                shrink-0
                items-center
                justify-center
                rounded-full
                border-2
                border-[#DCEEEE]
                bg-white
                text-[18px]
                font-bold
                text-[#00A8A8]
                shadow-sm
                transition-all
                duration-300
                group-hover:border-[#00A8A8]
                group-hover:bg-[#00A8A8]
                group-hover:text-white
                group-hover:shadow-lg
                group-hover:shadow-[#00A8A8]/15
              "
              whileHover={{ scale: 1.06 }}
              transition={{ duration: 0.25 }}
            >
              1
            </motion.div>

            {/* TARJETA */}

            <motion.div
              className="
                relative
                flex-1
                rounded-2xl
                border
                border-[#E5F1F1]
                bg-white
                p-5
                pt-4
                shadow-sm
                transition-all
                duration-300
                group-hover:-translate-y-1
                group-hover:border-[#CFE7E7]
                group-hover:shadow-md
              "
              whileHover={{ y: -3 }}
              transition={{ duration: 0.25 }}
            >
              <div className="absolute left-0 top-5 h-8 w-[3px] rounded-r-full bg-[#00A8A8]" />

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
            </motion.div>
          </motion.div>

          {/* ================================================= */}
          {/* PASO 2 */}
          {/* ================================================= */}

          <motion.div
            className="group relative flex gap-7 pb-20"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: 1.1,
              delay: 0.3,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {/* NÚMERO */}

            <motion.div
              className="
                relative
                z-10
                flex
                h-[62px]
                w-[62px]
                shrink-0
                items-center
                justify-center
                rounded-full
                border-2
                border-[#DCEEEE]
                bg-white
                text-[18px]
                font-bold
                text-[#00A8A8]
                shadow-sm
                transition-all
                duration-300
                group-hover:border-[#00A8A8]
                group-hover:bg-[#00A8A8]
                group-hover:text-white
                group-hover:shadow-lg
                group-hover:shadow-[#00A8A8]/15
              "
              whileHover={{ scale: 1.06 }}
              transition={{ duration: 0.25 }}
            >
              2
            </motion.div>

            {/* TARJETA */}

            <motion.div
              className="
                relative
                flex-1
                rounded-2xl
                border
                border-[#E5F1F1]
                bg-white
                p-5
                pt-4
                shadow-sm
                transition-all
                duration-300
                group-hover:-translate-y-1
                group-hover:border-[#CFE7E7]
                group-hover:shadow-md
              "
              whileHover={{ y: -3 }}
              transition={{ duration: 0.25 }}
            >
              <div className="absolute left-0 top-5 h-8 w-[3px] rounded-r-full bg-[#00A8A8]" />

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
            </motion.div>
          </motion.div>

          {/* ================================================= */}
          {/* PASO 3 */}
          {/* ================================================= */}

          <motion.div
            className="group relative flex gap-7"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: 1.1,
              delay: 0.45,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {/* NÚMERO */}

            <motion.div
              className="
                relative
                z-10
                flex
                h-[62px]
                w-[62px]
                shrink-0
                items-center
                justify-center
                rounded-full
                border-2
                border-[#DCEEEE]
                bg-white
                text-[18px]
                font-bold
                text-[#00A8A8]
                shadow-sm
                transition-all
                duration-300
                group-hover:border-[#00A8A8]
                group-hover:bg-[#00A8A8]
                group-hover:text-white
                group-hover:shadow-lg
                group-hover:shadow-[#00A8A8]/15
              "
              whileHover={{ scale: 1.06 }}
              transition={{ duration: 0.25 }}
            >
              3
            </motion.div>

            {/* TARJETA */}

            <motion.div
              className="
                relative
                flex-1
                rounded-2xl
                border
                border-[#E5F1F1]
                bg-white
                p-5
                pt-4
                shadow-sm
                transition-all
                duration-300
                group-hover:-translate-y-1
                group-hover:border-[#CFE7E7]
                group-hover:shadow-md
              "
              whileHover={{ y: -3 }}
              transition={{ duration: 0.25 }}
            >
              <div className="absolute left-0 top-5 h-8 w-[3px] rounded-r-full bg-[#00A8A8]" />

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
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}