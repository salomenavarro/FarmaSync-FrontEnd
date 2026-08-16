import Image from "next/image";

export function Testimonial({
  text,
  name,
  role,
  image,
}: {
  text: string;
  name: string;
  role: string;
  image?: string;
}) {
  const initial = name.charAt(0).toUpperCase();

  return (
    <article
      className="
        flex
        h-full
        flex-col
        justify-between
        rounded-2xl
        border
        border-[#E5E7EB]
        bg-white
        p-5
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-md
        sm:p-6
      "
    >
      <div>
        <div className="mb-2.5 text-base tracking-widest text-[#00A8A8] sm:mb-3 sm:text-lg">
          ★★★★★
        </div>

        <p className="text-xs leading-relaxed text-[#555555] sm:text-sm">
          &quot;{text}&quot;
        </p>
      </div>

      <div className="mt-5 flex items-center gap-3 border-t border-[#F0F0F0] pt-3.5 sm:mt-6 sm:pt-4">
        {image ? (
          <Image
            src={image}
            alt={name}
            width={40}
            height={40}
            className="h-9 w-9 rounded-full object-cover sm:h-10 sm:w-10"
          />
        ) : (
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#00A8A8]/10 text-xs font-bold text-[#00A8A8] sm:h-10 sm:w-10 sm:text-sm">
            {initial}
          </div>
        )}

        <div>
          <h3 className="text-xs font-bold text-[#171717] sm:text-sm">{name}</h3>

          <p className="text-[11px] font-medium text-[#6B7280] sm:text-xs">{role}</p>
        </div>
      </div>
    </article>
  );
}
