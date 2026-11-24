// =========================================================
// DECORACIONES REUTILIZABLES DEL MENÚ LATERAL
// =========================================================

export default function SidebarWaves() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 260 320"
      preserveAspectRatio="none"
      className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-80 w-full"
    >
      {/* PRIMERA ONDA AZUL */}

      <path
        d="M0 140C80 80 160 240 260 120V320H0Z"
        fill="#0876E9"
        fillOpacity=".10"
      />

      {/* SEGUNDA ONDA */}

      <path
        d="M0 210C90 140 170 280 260 190V320H0Z"
        fill="#FFFFFF"
        fillOpacity=".04"
      />

      {/* CÍRCULO EXTERIOR */}

      <circle
        cx="245"
        cy="200"
        r="110"
        fill="none"
        stroke="white"
        strokeOpacity=".08"
      />

      {/* CÍRCULO INTERIOR */}

      <circle
        cx="245"
        cy="200"
        r="80"
        fill="none"
        stroke="white"
        strokeOpacity=".06"
      />
    </svg>
  );
}