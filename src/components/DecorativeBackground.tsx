type DecorativeBackgroundProps = {
  variant?: "hero" | "section";
};

export default function DecorativeBackground({
  variant = "hero",
}: DecorativeBackgroundProps) {
  const isHero = variant === "hero";

  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      {/* ===================================================== */}
      {/* HALOS */}
      {/* ===================================================== */}

      {isHero && (
        <>
          {/* Halo izquierdo */}
          <div className="absolute -left-24 top-20 h-56 w-56 rounded-full bg-[#00A8A8]/10 blur-3xl sm:h-80 sm:w-80" />

          {/* Halo derecho */}
          <div className="absolute -right-20 top-0 h-72 w-72 rounded-full bg-[#00A8A8]/10 blur-3xl sm:h-96 sm:w-96" />
        </>
      )}

      {/* ===================================================== */}
      {/* CÍRCULO GRANDE SUPERIOR DERECHO */}
      {/* ===================================================== */}

      <div
        className={`
          absolute
          -right-16
          -top-20
          h-56
          w-56
          rounded-full
          border-[3px]
          border-[#A8E5E8]/60
          sm:h-72
          sm:w-72
          lg:h-80
          lg:w-80
          ${isHero ? "" : "opacity-70"}
        `}
      />

      {/* ===================================================== */}
      {/* CÍRCULO GRANDE INFERIOR DERECHO / IZQUIERDO */}
      {/* ===================================================== */}

      <div
        className={`
          absolute
          ${
            isHero
              ? "-bottom-32 -right-20"
              : "-bottom-40 -left-40"
          }
          h-80
          w-80
          rounded-full
          border-[6px]
          border-[#B8E9EC]/60
          sm:h-96
          sm:w-96
          ${isHero ? "" : "opacity-60"}
        `}
      />

      {/* ===================================================== */}
      {/* CÍRCULOS PEQUEÑOS */}
      {/* ===================================================== */}

      <div
        className={`
          absolute
          left-[8%]
          ${
            isHero
              ? "top-[32%]"
              : "top-[18%]"
          }
          hidden
          h-16
          w-16
          rounded-full
          border-2
          border-[#BDECEF]
          sm:block
          ${isHero ? "" : "opacity-70"}
        `}
      />

      <div
        className="
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
      {/* PUNTOS INDIVIDUALES */}
      {/* ===================================================== */}

      <div className="absolute left-[25%] top-[18%] h-3 w-3 rounded-full bg-[#8DDDE1]/60" />

      <div className="absolute right-[28%] top-[20%] h-4 w-4 rounded-full bg-[#8DDDE1]/50" />

      <div className="absolute bottom-[20%] left-[18%] h-4 w-4 rounded-full bg-[#8DDDE1]/50" />

      <div className="absolute bottom-[18%] right-[10%] h-3 w-3 rounded-full bg-[#8DDDE1]/60" />

      {/* ===================================================== */}
      {/* GRUPO DE PUNTOS IZQUIERDO */}
      {/* ===================================================== */}

      <div
        className="
          absolute
          left-10
          top-28
          hidden
          opacity-50
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

      {/* ===================================================== */}
      {/* GRUPO DE PUNTOS DERECHO */}
      {/* ===================================================== */}

      <div
        className="
          absolute
          right-16
          top-[52%]
          hidden
          opacity-50
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

      {/* ===================================================== */}
      {/* CRUCES */}
      {/* ===================================================== */}

      <div
        className="
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

      <div
        className="
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

      <div
        className="
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

      <div
        className="
          absolute
          bottom-[12%]
          left-[42%]
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
      {/* LÍNEAS */}
      {/* ===================================================== */}

      <div
        className="
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
          absolute
          bottom-[25%]
          right-[20%]
          hidden
          h-[2px]
          w-20
          -rotate-45
          rounded-full
          bg-[#BDECEF]
          lg:block
        "
      />
    </div>
  );
}