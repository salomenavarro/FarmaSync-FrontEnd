export function BenefitCard({
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
        rounded-2xl
        border
        border-[#E7E7E7]
        border-t-4
        border-t-[#00A8A8]
        bg-white
        px-5
        pb-6
        pt-10
        text-center
        shadow-sm
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-md
        sm:px-6
        sm:pb-8
        sm:pt-12
      "
    >
      <div
        className="
          absolute
          left-1/2
          top-0
          z-10
          flex
          h-12
          w-12
          -translate-x-1/2
          -translate-y-1/2
          items-center
          justify-center
          rounded-full
          bg-[#00A8A8]
          text-white
          shadow-md
          sm:h-16
          sm:w-16
        "
      >
        {icon}
      </div>

      <h3 className="text-lg font-bold text-[#171717] sm:text-xl">{title}</h3>

      <p className="mt-3 text-xs leading-relaxed text-[#70798B] sm:mt-4 sm:text-base">
        {text}
      </p>
    </article>
  );
}
