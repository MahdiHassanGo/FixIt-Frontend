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
        <span className="inline-block rounded-full bg-primary/10 border border-primary/20 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-primary">
          {eyebrow}
        </span>
      ) : null}
      <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-foreground">
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
