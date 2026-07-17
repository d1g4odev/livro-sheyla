import Link from "next/link";
import Image from "next/image";
import type { ReactNode } from "react";

/** Tela de retorno do pagamento (sucesso / pendente / erro), na identidade do site. */
export default function StatusScreen({
  emoji,
  script,
  title,
  children,
  cta,
}: {
  emoji: string;
  script: string;
  title: string;
  children: ReactNode;
  cta?: { href: string; label: string };
}) {
  return (
    <main className="relative flex min-h-screen flex-1 flex-col items-center justify-center overflow-hidden bg-espresso px-6 py-16 text-center text-cream">
      <div className="absolute inset-0 glow-gold" aria-hidden />
      <div className="relative flex max-w-lg flex-col items-center gap-5">
        <Image
          src="/livro/capa-800.png"
          alt=""
          width={72}
          height={115}
          className="rounded-[3px] ring-1 ring-gold/40"
        />
        <span className="text-5xl" aria-hidden>{emoji}</span>
        <span className="font-script text-3xl text-gold-pale">{script}</span>
        <h1 className="font-display text-3xl font-semibold uppercase tracking-[0.06em] text-gold-gradient sm:text-4xl">
          {title}
        </h1>
        <div className="space-y-3 text-lg leading-relaxed text-cream/90">
          {children}
        </div>
        {cta && (
          <Link
            href={cta.href}
            className="mt-4 rounded-full bg-gradient-to-b from-gold-light via-gold to-gold-deep px-8 py-3.5 font-display text-sm font-bold uppercase tracking-[0.1em] text-espresso shadow-[0_12px_30px_-8px_rgba(201,162,39,0.65)] ring-1 ring-gold-pale/60 transition-all duration-300 hover:-translate-y-0.5 hover:brightness-110"
          >
            {cta.label}
          </Link>
        )}
      </div>
    </main>
  );
}
