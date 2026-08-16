export default function AuthBackground() {
  return (
    <>
      {/* CÍRCULO SUPERIOR DERECHO */}
      <div className="pointer-events-none absolute -right-10 top-8 h-36 w-36 rounded-full border-[5px] border-[#00A8A8]/30 sm:h-44 sm:w-44 md:h-52 md:w-52" />

      {/* CÍRCULO IZQUIERDO */}
      <div className="pointer-events-none absolute -left-12 top-[30%] h-32 w-32 rounded-full border-[5px] border-[#00A8A8]/25 sm:h-40 sm:w-40 md:h-48 md:w-48" />

      {/* CÍRCULO INFERIOR DERECHO */}
      <div className="pointer-events-none absolute -right-8 bottom-5 h-40 w-40 rounded-full border-[6px] border-[#00A8A8]/30 sm:h-48 sm:w-48 md:h-56 md:w-56" />

      {/* CÍRCULO PEQUEÑO */}
      <div className="pointer-events-none absolute bottom-16 left-[28%] h-12 w-12 rounded-full border-2 border-[#00A8A8]/25 sm:h-16 sm:w-16" />

      {/* CRUZ SUPERIOR IZQUIERDA */}
      <div className="pointer-events-none absolute left-[16%] top-[12%] text-5xl font-black text-[#00A8A8]/30 sm:text-6xl">
        +
      </div>

      {/* CRUZ SUPERIOR CENTRAL */}
      <div className="pointer-events-none absolute left-[48%] top-[7%] text-6xl font-black text-[#00A8A8]/30 sm:text-7xl">
        +
      </div>

      {/* CRUZ DERECHA */}
      <div className="pointer-events-none absolute right-[17%] top-[28%] text-5xl font-black text-[#00A8A8]/30 sm:text-6xl">
        +
      </div>

      {/* CRUZ IZQUIERDA CENTRAL */}
      <div className="pointer-events-none absolute left-[14%] top-[55%] text-6xl font-black text-[#00A8A8]/30 sm:text-7xl">
        +
      </div>

      {/* CRUZ INFERIOR DERECHA */}
      <div className="pointer-events-none absolute right-[18%] bottom-[15%] text-5xl font-black text-[#00A8A8]/30 sm:text-6xl">
        +
      </div>

      {/* CRUZ INFERIOR IZQUIERDA */}
      <div className="pointer-events-none absolute left-[5%] bottom-[8%] text-4xl font-black text-[#00A8A8]/25 sm:text-5xl">
        +
      </div>

      {/* PUNTOS DECORATIVOS */}
      <div className="pointer-events-none absolute left-[8%] top-[18%] h-4 w-4 rounded-full bg-[#00A8A8]/35" />
      <div className="pointer-events-none absolute left-[33%] top-[13%] h-3 w-3 rounded-full bg-[#00A8A8]/30" />
      <div className="pointer-events-none absolute right-[27%] top-[8%] h-5 w-5 rounded-full bg-[#00A8A8]/30" />
      <div className="pointer-events-none absolute right-[8%] top-[52%] h-4 w-4 rounded-full bg-[#00A8A8]/30" />
      <div className="pointer-events-none absolute left-[20%] bottom-[25%] h-5 w-5 rounded-full bg-[#00A8A8]/25" />
      <div className="pointer-events-none absolute right-[31%] bottom-[10%] h-4 w-4 rounded-full bg-[#00A8A8]/30" />
      <div className="pointer-events-none absolute left-[39%] bottom-[8%] h-3 w-3 rounded-full bg-[#00A8A8]/30" />

      {/* LÍNEAS DECORATIVAS */}
      <div className="pointer-events-none absolute left-[23%] top-[20%] h-[2px] w-20 rotate-45 rounded-full bg-[#00A8A8]/25 sm:w-28" />
      <div className="pointer-events-none absolute right-[25%] top-[18%] h-[2px] w-20 -rotate-45 rounded-full bg-[#00A8A8]/25 sm:w-28" />
      <div className="pointer-events-none absolute left-[7%] bottom-[20%] h-[2px] w-20 -rotate-45 rounded-full bg-[#00A8A8]/25 sm:w-28" />
      <div className="pointer-events-none absolute right-[8%] bottom-[30%] h-[2px] w-20 rotate-45 rounded-full bg-[#00A8A8]/25 sm:w-28" />
      <div className="pointer-events-none absolute right-[38%] bottom-[7%] h-[2px] w-16 -rotate-45 rounded-full bg-[#00A8A8]/25 sm:w-24" />

      {/* GRUPO DE PUNTOS IZQUIERDO */}
      <div className="pointer-events-none absolute left-[10%] top-[35%] grid grid-cols-4 gap-2 opacity-50">
        {Array.from({ length: 12 }).map((_, index) => (
          <span
            key={index}
            className="h-1.5 w-1.5 rounded-full bg-[#00A8A8]"
          />
        ))}
      </div>

      {/* GRUPO DE PUNTOS DERECHO */}
      <div className="pointer-events-none absolute right-[10%] bottom-[22%] grid grid-cols-4 gap-2 opacity-50">
        {Array.from({ length: 12 }).map((_, index) => (
          <span
            key={index}
            className="h-1.5 w-1.5 rounded-full bg-[#00A8A8]"
          />
        ))}
      </div>

      {/* HALOS */}
      <div className="pointer-events-none absolute left-[15%] top-[15%] h-64 w-64 rounded-full bg-[#00A8A8]/10 blur-3xl" />

      <div className="pointer-events-none absolute right-[15%] bottom-[15%] h-64 w-64 rounded-full bg-[#00A8A8]/10 blur-3xl" />
    </>
  );
}