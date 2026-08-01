export function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="space-y-2">
      {eyebrow ? (
        <span className="inline-block rounded-full bg-purple-500/10 border border-purple-500/30 px-3.5 py-1 text-xs font-black uppercase tracking-wider text-purple-600 dark:text-purple-400">
          {eyebrow}
        </span>
      ) : null}
      <h2 className="text-3xl font-black tracking-tight sm:text-4xl text-foreground">
        {title}
      </h2>
      {description ? (
        <p className="max-w-2xl text-base text-muted-foreground leading-relaxed">
          {description}
        </p>
      ) : null}
    </div>
  );
}
