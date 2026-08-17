"use client";

import { CalendarDays, LockKeyhole, MapPin } from "lucide-react";
import { motion } from "framer-motion";

function StepCard({
  number,
  label,
  title,
  text,
  icon,
  delay,
}: {
  number: string;
  label: string;
  title: string;
  text: string;
  icon: React.ReactNode;
  delay: number;
}) {
  return (
    <motion.div
      className="group relative flex gap-5 sm:gap-7"
      initial={{ opacity: 0, x: 25 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: 0.6, // Entrada de texto y tarjetas más ágil
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
    >
      {/* NÚMERO */}
      <div className="relative z-20 shrink-0">
        <div className="absolute -inset-2 rounded-full bg-[#00A8A8]/10" />

        <motion.div
          className="relative flex h-[58px] w-[58px] items-center justify-center rounded-full border-2 border-[#8DDDE1] bg-white text-[17px] font-extrabold text-[#00A8A8] shadow-sm transition-colors duration-300 group-hover:border-[#00A8A8] group-hover:bg-[#00A8A8] group-hover:text-white sm:h-[62px] sm:w-[62px] sm:text-[18px]"
          whileHover={{ scale: 1.08 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          {number}
        </motion.div>
      </div>

      {/* TARJETA */}
      <motion.div
        className="relative flex min-h-[215px] flex-1 items-center rounded-2xl border-2 border-[#27BFC2] bg-white p-5 shadow-sm transition-shadow duration-300 group-hover:shadow-lg group-hover:shadow-[#00A8A8]/10 sm:p-6"
        whileHover={{ y: -5 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      >
        <div className="min-w-0 flex-1 pr-2 sm:pr-4">
          <span className="text-[11px] font-extrabold uppercase tracking-[1px] text-[#00A8A8] sm:text-[13px]">
            {label}
          </span>

          <h3 className="mt-2.5 text-[20px] font-extrabold leading-tight text-[#171717] sm:mt-3 sm:text-[23px]">
            {title}
          </h3>

          <p className="mt-3 text-[13px] leading-[1.7] text-[#536078] sm:text-[16px] sm:leading-[1.8]">
            {text}
          </p>
        </div>

        {/* ICONO */}
        <motion.div
          className="hidden h-16 w-16 shrink-0 items-center justify-center rounded-full bg-[#EAF8F8] text-[#00A8A8] sm:flex lg:h-[72px] lg:w-[72px]"
          whileHover={{ rotate: 5, scale: 1.05 }}
        >
          {icon}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default function Propuesta() {
  return (
    <section
      id="propuesta"
      className="overflow-hidden bg-white px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-28"
    >
      <div className="mx-auto grid max-w-[1200px] items-center gap-14 lg:grid-cols-2 lg:gap-16">
        
        {/* COLUMNA IZQUIERDA */}
        <motion.div
          className="max-w-[570px]"
          initial={{ opacity: 0, x: -25 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <span className="inline-flex rounded-full bg-[#EAF8F8] px-3.5 py-1.5 text-[11px] font-extrabold uppercase tracking-[1px] text-[#00A8A8] sm:px-4 sm:py-2 sm:text-[13px]">
            El efecto FarmaSync
          </span>

          <h2 className="mt-5 text-3xl font-extrabold leading-[1.1] tracking-tight text-[#171717] sm:mt-6 sm:text-4xl lg:text-5xl">
            Tu tratamiento no debería depender de la{" "}
            <span className="relative inline-block text-[#00A8A8]">
              suerte
              <motion.span
                className="absolute -bottom-1 left-0 h-[3px] w-full rounded-full bg-[#A8E3E3] sm:-bottom-2"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                style={{ originX: 0 }}
              />
            </span>
          </h2>

          <p className="mt-6 text-[14px] leading-[1.8] text-[#536078] sm:mt-7 sm:text-[16px]">
            Miles de pacientes en Colombia se desplazan a su farmacia EPS sin
            saber si el medicamento que necesitan está disponible. FarmaSync
            elimina esa incertidumbre y las barreras entre tú y tus
            medicamentos, una experiencia diseñada desde la empatía, la
            claridad y el respeto por tu tiempo.
          </p>

          <div className="mt-7 flex items-center gap-3 sm:mt-8">
            <div className="h-[2px] w-10 rounded-full bg-[#00A8A8]" />
            <div className="h-2 w-2 rounded-full bg-[#A8E3E3]" />
            <div className="h-2 w-2 rounded-full bg-[#DCEEEE]" />
          </div>
        </motion.div>

        {/* COLUMNA DERECHA - TIMELINE */}
        <div className="relative">
          {/* LÍNEA DEL TIMELINE */}
          <motion.div
            className="pointer-events-none absolute bottom-[30px] left-[28px] top-[30px] w-[2px] origin-top bg-[repeating-linear-gradient(to_bottom,#9FE2E4_0px,#9FE2E4_7px,transparent_7px,transparent_13px)] sm:left-[30px]"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          />

          <div className="relative pb-10 sm:pb-12">
            <StepCard
              number="1"
              label="Sin desplazamientos en vano"
              title="Consulta antes de salir"
              text="Verifica en tiempo real si tu medicamento está disponible en las farmacias asociadas a tu EPS. Sin llamadas, sin filas, sin viajes innecesarios."
              icon={<MapPin className="h-7 w-7 sm:h-8 sm:w-8" strokeWidth={1.8} />}
              delay={0.1}
            />
          </div>

          <div className="relative pb-10 sm:pb-12">
            <StepCard
              number="2"
              label="Para pacientes crónicos y cuidadores"
              title="Reserva con hasta 5 días de anticipación"
              text="Aparta tu medicamento antes de que se agote. Si eres cuidador, puedes hacer la reserva en nombre del paciente a tu cargo sin necesitar que esté presente."
              icon={<CalendarDays className="h-7 w-7 sm:h-8 sm:w-8" strokeWidth={1.8} />}
              delay={0.2}
            />
          </div>

          <div className="relative">
            <StepCard
              number="3"
              label="Tranquilidad garantizada"
              title="Tu código, tu medicamento"
              text="Al confirmar tu reserva recibes un código único. Llévalo a mostrar en la farmacia y retira sin filas. Tu tratamiento continúa sin interrupciones."
              icon={<LockKeyhole className="h-7 w-7 sm:h-8 sm:w-8" strokeWidth={1.8} />}
              delay={0.3}
            />
          </div>
        </div>

      </div>
    </section>
  );
}