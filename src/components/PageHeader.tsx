interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}

export function PageHeader({ eyebrow, title, subtitle }: PageHeaderProps) {
  return (
    <section className="text-center max-w-3xl mx-auto pt-2">
      {eyebrow && (
        <p className="text-[11px] uppercase tracking-[0.35em] text-primary">
          {eyebrow}
        </p>
      )}
      <h1 className="mt-3 font-display text-4xl sm:text-5xl 2xl:text-6xl text-gold-light leading-tight">
        {title}
      </h1>
      {subtitle && (
        <p className="mt-3 text-sm sm:text-base text-muted-foreground">
          {subtitle}
        </p>
      )}
      <div className="mt-5 mx-auto h-px w-24 bg-gradient-to-r from-transparent via-primary to-transparent" />
    </section>
  );
}
