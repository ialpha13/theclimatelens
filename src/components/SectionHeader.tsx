interface SectionHeaderProps {
  title: string;
  tagline?: string;
  monoLabel?: string;
  className?: string;
}

export default function SectionHeader({ title, tagline, monoLabel, className = '' }: SectionHeaderProps) {
  return (
    <div className={`mb-10 border-b border-forest/15 pb-4 ${className}`} id={`section-header-${title.toLowerCase().replace(/\s+/g, '-')}`}>
      <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-2">
        <div>
          {monoLabel && (
            <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-sage font-bold block mb-1">
              {monoLabel}
            </span>
          )}
          <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-forest leading-tight">
            {title}
          </h2>
        </div>
        {tagline && (
          <p className="font-sans text-xs sm:text-sm text-forest/75 max-w-md md:text-right italic">
            {tagline}
          </p>
        )}
      </div>
    </div>
  );
}
