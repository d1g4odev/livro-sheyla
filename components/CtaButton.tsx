export default function CtaButton({
  href,
  label,
  trigger,
  center = true,
}: {
  href: string;
  label: string;
  trigger?: string;
  center?: boolean;
}) {
  return (
    <div className={`flex flex-col gap-2.5 ${center ? "items-center" : "items-start"}`}>
      <a
        href={href}
        className="inline-block rounded-full bg-gradient-to-b from-gold-light via-gold to-gold-deep px-9 py-4 font-display text-sm font-bold uppercase tracking-[0.14em] text-espresso shadow-[0_12px_30px_-8px_rgba(201,162,39,0.65)] ring-1 ring-gold-pale/60 transition-all duration-300 hover:-translate-y-0.5 hover:brightness-110 hover:shadow-[0_16px_38px_-8px_rgba(232,184,56,0.8)]"
      >
        {label}
      </a>
      {trigger && (
        <span className="text-sm italic opacity-75">{trigger}</span>
      )}
    </div>
  );
}
