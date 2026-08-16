export function Step({
  number,
  title,
  text,
}: {
  number: string;
  title: string;
  text: string;
}) {
  return (
    <div
      className="
        group
        relative
        flex
        items-start
        gap-3.5
        overflow-hidden
        rounded-2xl
        border
        border-[#E5E7EB]
        bg-white
        p-4
        transition-all
        duration-300
        hover:border-[#00A8A8]
        hover:shadow-md
        sm:gap-6
        sm:p-6
      "
    >
      <span
        className="
          absolute
          left-0
          top-0
          h-full
          w-1
          origin-top
          scale-y-0
          bg-[#00A8A8]
          transition-transform
          duration-300
          group-hover:scale-y-100
        "
      />

      <div className="min-w-8 text-xl font-extrabold text-[#00A8A8] sm:text-3xl">
        {number}
      </div>

      <div>
        <h3 className="mb-0.5 text-sm font-bold text-[#171717] sm:mb-1 sm:text-lg">
          {title}
        </h3>

        <p className="text-xs leading-relaxed text-gray-600 sm:text-sm">{text}</p>
      </div>
    </div>
  );
}
