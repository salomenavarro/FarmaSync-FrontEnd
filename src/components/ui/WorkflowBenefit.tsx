export function WorkflowBenefit({
  icon,
  text,
}: {
  icon: React.ReactNode;
  text: string;
}) {
  return (
    <div className="flex items-center gap-2 rounded-full border border-[#E5E7EB] bg-white px-3.5 py-2 text-xs sm:text-sm">
      <span className="text-[#00A8A8]">{icon}</span>

      <span className="font-medium text-[#171717]">{text}</span>
    </div>
  );
}
