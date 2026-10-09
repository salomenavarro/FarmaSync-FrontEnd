type FeaturePlaceholderProps = {
  title: string;
  description: string;
};

export function FeaturePlaceholder({ title, description }: FeaturePlaceholderProps) {
  return (
    <main className="mx-auto flex min-h-[60vh] max-w-3xl flex-col justify-center gap-3 px-6 py-12">
      <p className="text-sm font-semibold uppercase tracking-widest text-blue-700">FarmaSync</p>
      <h1 className="text-3xl font-bold tracking-tight text-slate-950">{title}</h1>
      <p className="text-slate-600">{description}</p>
    </main>
  );
}
