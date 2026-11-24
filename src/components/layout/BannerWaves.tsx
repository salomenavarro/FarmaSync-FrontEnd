export default function BannerWaves() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1200 240"
      preserveAspectRatio="none"
      className="pointer-events-none absolute inset-0 -z-10 h-full w-full"
    >
      <path
        d="M470 240C570 150 590 45 760 65c135 16 158 115 280 86 68-16 102-58 160-82v171H470Z"
        fill="#FFFFFF"
        fillOpacity=".08"
      />

      <path
        d="M650 240c70-65 95-112 210-112 105 0 146 70 240 44 52-14 75-42 130-72v140H650Z"
        fill="#FFFFFF"
        fillOpacity=".06"
      />

      <path
        d="M0 0h620c-80 34-120 95-245 91C230 87 155 36 0 75V0Z"
        fill="#0B1F5C"
        fillOpacity=".22"
      />

      <circle
        cx="1090"
        cy="140"
        r="112"
        fill="none"
        stroke="white"
        strokeOpacity=".2"
      />
    </svg>
  );
}