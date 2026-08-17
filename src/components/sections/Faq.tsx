"use client";

import { useEffect, useRef, useState } from "react";
import { Plus } from "lucide-react";

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

export default function Faq() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.25,
        rootMargin: "0px 0px -80px 0px",
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="faq"
      className="bg-white px-4 py-12 sm:px-6 sm:py-24 lg:px-8"
    >
      <div className="mx-auto max-w-3xl">
        {/* ENCABEZADO */}
        <div
          className={`mb-10 text-center transition-all duration-1000 ease-in-out sm:mb-12 ${
            isVisible
              ? "translate-y-0 opacity-100"
              : "translate-y-12 opacity-0"
          }`}
        >
          <span className="inline-block rounded-full bg-[#00A8A8]/10 px-3.5 py-1 text-xs font-semibold text-[#00A8A8] sm:px-4 sm:py-1.5 sm:text-sm">
            FAQ
          </span>

          <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-[#171717] sm:mt-4 sm:text-4xl lg:text-5xl">
            Resolvemos tus dudas
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-sm text-[#6B7280] sm:mt-4 sm:text-base">
            Consulta las preguntas más frecuentes sobre reservas y
            disponibilidad de medicamentos.
          </p>
        </div>

        {/* LISTA DE PREGUNTAS EN CASCADA MÁS LENTA */}
        <div className="flex flex-col gap-3 sm:gap-4">
          {faqs.map((faq, index) => {
            const active = openFaq === index;

            return (
              <article
                key={index}
                style={{
                  transitionDelay: `${200 + index * 250}ms`,
                }}
                className={`overflow-hidden rounded-2xl border border-[#DCEEEE] bg-[#e8f0ec] transition-all duration-900 ease-out hover:shadow-md ${
                  isVisible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-12 opacity-0"
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(active ? null : index)}
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

                {/* DESPLEGABLE */}
                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    active ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
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
  );
}