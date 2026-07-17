import Image from "next/image";
import Backdrop from "@/components/Backdrop";
import BookCover3D from "@/components/BookCover3D";
import JsonLd from "@/components/JsonLd";
import CtaButton from "@/components/CtaButton";
import Ornament from "@/components/Ornament";
import PhotoBleed from "@/components/PhotoBleed";
import Reveal from "@/components/Reveal";
import ScrollCue from "@/components/ScrollCue";
import StickyBuyBar from "@/components/StickyBuyBar";
import {
  author,
  excerpts,
  faq,
  finalCta,
  forYou,
  hero,
  journey,
  offer,
  preview,
  stats,
  story,
} from "@/lib/content";

function SectionHeader({
  script,
  title,
  dark = false,
}: {
  script: string;
  title: string;
  dark?: boolean;
}) {
  return (
    <Reveal className="flex flex-col items-center gap-3 text-center">
      <span
        className={`font-script text-3xl ${dark ? "text-gold-pale" : "text-gold-deep"}`}
      >
        {script}
      </span>
      <h2
        className={`font-display text-3xl font-semibold uppercase tracking-[0.08em] sm:text-4xl ${
          dark ? "text-gold-gradient" : "text-espresso"
        }`}
      >
        {title}
      </h2>
      <Ornament className={dark ? "text-gold" : "text-gold-deep"} />
    </Reveal>
  );
}

export default function Home() {
  return (
    <main className="flex-1">
      <JsonLd />
      {/* ============ HERO ============ */}
      <section className="relative overflow-hidden bg-espresso text-cream">
        <Backdrop variant="dark" imageOpacity={0.45} />
        <PhotoBleed
          src="/livro/sheyla-3.jpg"
          side="right"
          opacity={0.42}
          position="50% 25%"
          mobile="full"
          mobilePosition="50% 18%"
          mobileOpacity={0.34}
        />
        <div className="absolute inset-0 glow-gold" aria-hidden />
        <div className="relative mx-auto grid max-w-6xl content-center items-center gap-6 px-6 pb-16 pt-10 md:min-h-screen md:grid-cols-2 md:gap-14 md:py-16">
          <div className="order-2 flex flex-col items-center gap-6 text-center md:order-1 md:items-start md:text-left">
            <Reveal>
              <span className="font-script text-2xl text-gold-pale sm:text-3xl md:text-4xl">
                {hero.eyebrow}
              </span>
            </Reveal>
            <Reveal delay={0.1}>
              <h1 className="font-display text-[1.7rem] font-semibold leading-tight tracking-wide sm:text-4xl md:text-5xl">
                {hero.headline}
              </h1>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="max-w-lg text-lg leading-relaxed opacity-90 md:text-xl">
                {hero.sub}
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <CtaButton
                href="#oferta"
                label={hero.cta}
                trigger={hero.ctaTrigger}
                center={false}
              />
            </Reveal>
          </div>
          <div className="order-1 md:order-2">
            <BookCover3D />
          </div>
        </div>
        <ScrollCue />
      </section>

      {/* ============ A HISTÓRIA + É PRA VOCÊ ============ */}
      <div className="relative overflow-hidden">
        <Backdrop variant="cream" />
        <section id="historia" className="relative mx-auto max-w-3xl px-6 py-20 md:py-28">
        <SectionHeader script={story.script} title={story.title} />
        <div className="mt-12 flex flex-col gap-8">
          {story.fragments.map((f, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <blockquote className="border-l-2 border-gold pl-6 text-xl italic leading-relaxed text-espresso/85 sm:text-2xl">
                {f}
              </blockquote>
            </Reveal>
          ))}
          <Reveal delay={0.2}>
            <p className="pt-4 text-center text-2xl leading-relaxed">
              Foi ali, naquele vale escuro, naquele momento em que a história
              parecia ter acabado, que{" "}
              <strong className="font-semibold text-gold-deep">
                Deus começou a escrevê-la de verdade.
              </strong>
            </p>
          </Reveal>
        </div>
        </section>

      {/* ============ É PRA VOCÊ SE ============ */}
      <section className="relative mx-auto max-w-3xl px-6 pb-20 md:pb-28">
        <SectionHeader script={forYou.script} title={forYou.title} />
        <Reveal delay={0.1}>
          <ul className="mt-10 flex flex-col gap-4 rounded-xl border border-gold/25 bg-cream-dark/50 px-7 py-8 sm:px-10">
            {forYou.items.map((item) => (
              <li key={item} className="flex items-start gap-3 text-lg leading-relaxed sm:text-xl">
                <svg
                  viewBox="0 0 20 20"
                  className="mt-1.5 size-5 shrink-0 text-gold-deep"
                  fill="currentColor"
                  aria-hidden
                >
                  <path d="M10 0l2.4 7.6L20 10l-7.6 2.4L10 20l-2.4-7.6L0 10l7.6-2.4L10 0z" />
                </svg>
                {item}
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mt-8 text-center text-xl italic text-gold-deep">
            Se você se reconheceu em pelo menos uma dessas frases, esta história
            foi escrita pensando em você.
          </p>
        </Reveal>
      </section>
      </div>

      {/* ============ A JORNADA ============ */}
      <section className="relative overflow-hidden bg-cream-dark py-20 md:py-28">
        <Backdrop variant="cream" />
        <div className="relative mx-auto max-w-6xl px-6">
          <SectionHeader script={journey.script} title={journey.title} />
          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {journey.steps.map((s, i) => (
              <Reveal key={s.name} delay={i * 0.12}>
                <article className="flex h-full flex-col items-center gap-4 rounded-lg border border-gold/25 bg-cream px-8 py-10 text-center shadow-[0_10px_30px_-18px_rgba(34,23,8,0.4)]">
                  <span className="font-display text-5xl text-gold-gradient">
                    {s.numeral}
                  </span>
                  <h3 className="font-display text-2xl font-semibold uppercase tracking-[0.12em]">
                    {s.name}
                  </h3>
                  <p className="text-lg leading-relaxed opacity-85">{s.desc}</p>
                </article>
              </Reveal>
            ))}
          </div>

          {/* ficha do livro */}
          <Reveal delay={0.2}>
            <div className="mt-14 grid gap-8 border-t border-gold/25 pt-10 sm:grid-cols-3">
              {stats.map((s) => (
                <div key={s.label} className="flex flex-col items-center gap-1 text-center">
                  <span className="font-display text-5xl font-bold text-gold-gradient">
                    {s.n}
                  </span>
                  <span className="max-w-[16rem] text-lg italic opacity-80">
                    {s.label}
                  </span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============ TRECHOS ============ */}
      <section className="relative overflow-hidden bg-espresso py-20 text-cream md:py-28">
        <Backdrop variant="dark" imageOpacity={0.22} />
        <PhotoBleed
          src="/livro/sheyla-3.jpg"
          side="left"
          opacity={0.4}
          position="50% 25%"
          mobile="bottom"
          mobilePosition="50% 25%"
          mobileOpacity={0.52}
        />
        <div className="absolute inset-0 glow-gold opacity-70" aria-hidden />
        <div className="relative mx-auto max-w-4xl px-6">
          <SectionHeader script={excerpts.script} title={excerpts.title} dark />
          <div className="mt-14 flex flex-col gap-12">
            {excerpts.quotes.map((q, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <figure className="flex flex-col items-center gap-4 text-center">
                  <blockquote className="max-w-2xl text-2xl italic leading-relaxed text-gold-pale sm:text-[1.7rem]">
                    {q.text}
                  </blockquote>
                  <figcaption className="font-display text-sm uppercase tracking-[0.25em] text-cream/75">
                    — {q.ref}
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ PRÉVIA + AUTORA ============ */}
      <div className="relative overflow-hidden">
        <Backdrop variant="cream" />
        <section className="relative mx-auto max-w-3xl px-6 py-20 md:py-28">
        <SectionHeader script={preview.script} title={preview.title} />
        <Reveal delay={0.1}>
          <p className="mt-8 text-center text-lg italic opacity-75">
            {preview.intro}
          </p>
        </Reveal>
        <Reveal delay={0.15}>
          <article className="mt-8 rounded-lg border border-gold/25 bg-[#fffdf6] px-7 py-10 shadow-[0_25px_60px_-30px_rgba(34,23,8,0.45)] sm:px-12 sm:py-14">
            <p className="mb-6 font-script text-3xl text-gold-deep">
              {preview.salutation}
            </p>
            {preview.paragraphs.map((p, i) => (
              <p
                key={i}
                className={`mb-5 text-justify text-lg leading-relaxed opacity-90 sm:text-xl ${
                  i === 0
                    ? "first-letter:float-left first-letter:mr-2 first-letter:font-display first-letter:text-6xl first-letter:leading-[0.85] first-letter:text-gold-deep"
                    : ""
                }`}
              >
                {p}
              </p>
            ))}
            <p className="mt-8 text-right text-lg italic opacity-80">
              {preview.signatureLine}
            </p>
            <p className="text-right font-script text-4xl text-gold-deep">
              {preview.signature}
            </p>
          </article>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="mt-10">
            <CtaButton
              href="#oferta"
              label={preview.cta}
              trigger={preview.ctaTrigger}
            />
          </div>
        </Reveal>
      </section>

      {/* ============ AUTORA ============ */}
      <section className="relative mx-auto max-w-4xl px-6 pb-20 md:pb-28">
        <SectionHeader script={author.script} title={author.name} />
        <div className="mt-12 flex flex-col items-center gap-10 md:flex-row md:items-start">
          <Reveal className="shrink-0">
            <div className="relative size-44 overflow-hidden rounded-full border-2 border-gold/50 shadow-[0_20px_40px_-20px_rgba(34,23,8,0.6)]">
              <Image
                src="/livro/sheyla-rosto.jpg"
                alt="Sheyla Gracielle"
                fill
                sizes="176px"
                quality={80}
                className="object-cover"
              />
            </div>
          </Reveal>
          <div className="flex flex-col gap-5 text-center md:text-left">
            {author.bio.map((p, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <p className="text-xl leading-relaxed opacity-90">{p}</p>
              </Reveal>
            ))}
            <Reveal delay={0.3}>
              <p className="pt-2 text-lg italic text-gold-deep">
                {author.verse}
              </p>
            </Reveal>
          </div>
        </div>
      </section>
      </div>

      {/* ============ OFERTA ============ */}
      <section id="oferta" className="relative overflow-hidden bg-cream-dark py-20 md:py-28">
        <Backdrop variant="cream" />
        <div className="relative mx-auto max-w-5xl px-6">
          <SectionHeader script={offer.script} title={offer.title} />
          <div className="mt-14 grid items-stretch gap-8 md:grid-cols-2">
            {offer.formats.map((f, i) => (
              <Reveal key={f.name} delay={i * 0.12} className="h-full">
                <article
                  className={`flex h-full flex-col gap-6 rounded-xl px-8 py-10 text-center shadow-[0_20px_50px_-25px_rgba(34,23,8,0.5)] ${
                    f.featured
                      ? "border-2 border-gold bg-espresso text-cream"
                      : "border border-gold/30 bg-cream"
                  }`}
                >
                  <span
                    className={`mx-auto rounded-full px-4 py-1.5 font-display text-xs font-semibold uppercase tracking-[0.15em] ${
                      f.featured
                        ? "bg-gold text-espresso"
                        : "bg-espresso/8 text-espresso/70"
                    }`}
                  >
                    {f.tag}
                  </span>
                  <h3 className="font-display text-3xl font-semibold uppercase tracking-[0.1em]">
                    {f.name}
                  </h3>
                  <p
                    className={`font-display text-4xl font-bold ${
                      f.featured ? "text-gold-gradient" : "text-espresso"
                    }`}
                  >
                    {f.price}
                  </p>
                  <ul className="flex flex-col gap-2.5 text-lg">
                    {f.bullets.map((b) => (
                      <li
                        key={b}
                        className="flex items-start justify-center gap-2 opacity-90"
                      >
                        <span className="mt-1 text-gold" aria-hidden>
                          ✦
                        </span>
                        {b}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto flex flex-col items-center gap-3 pt-2">
                    <a
                      href={f.ctaHref}
                      className="w-full rounded-full bg-gradient-to-b from-gold-light via-gold to-gold-deep px-8 py-4 font-display text-base font-bold uppercase tracking-[0.1em] text-espresso shadow-[0_12px_30px_-8px_rgba(201,162,39,0.65)] ring-1 ring-gold-pale/60 transition-all duration-300 hover:-translate-y-0.5 hover:brightness-110"
                    >
                      {f.cta}
                    </a>
                    <a
                      href={f.secondary.href}
                      className={`text-base underline decoration-gold/60 underline-offset-4 transition-colors ${
                        f.featured
                          ? "text-cream/80 hover:text-gold-pale"
                          : "text-espresso/70 hover:text-gold-deep"
                      }`}
                    >
                      {f.secondary.label}
                    </a>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.2}>
            <p className="mt-10 text-center text-lg italic opacity-75">
              🔒 {offer.guarantee}
            </p>
          </Reveal>
        </div>
      </section>

      {/* ============ FAQ ============ */}
      <section className="relative overflow-hidden">
        <Backdrop variant="cream" />
        <div className="relative mx-auto max-w-3xl px-6 py-20 md:py-28">
        <SectionHeader script={faq.script} title={faq.title} />
        <div className="mt-12 flex flex-col gap-4">
          {faq.items.map((item, i) => (
            <Reveal key={i} delay={i * 0.05}>
              <details className="group rounded-lg border border-gold/25 bg-cream-dark/60 px-6 py-4 transition-colors open:bg-cream-dark">
                <summary className="cursor-pointer list-none font-display text-lg font-semibold tracking-wide [&::-webkit-details-marker]:hidden">
                  <span className="mr-2 text-gold" aria-hidden>
                    ✦
                  </span>
                  {item.q}
                </summary>
                <p className="pb-1 pl-6 pt-3 text-lg leading-relaxed opacity-85">
                  {item.a}
                </p>
              </details>
            </Reveal>
          ))}
        </div>
        </div>
      </section>

      {/* ============ CTA FINAL ============ */}
      <section className="relative overflow-hidden bg-espresso py-24 text-center text-cream md:py-32">
        <Backdrop variant="dark" imageOpacity={0.35} />
        <PhotoBleed
          src="/livro/sheyla-3.jpg"
          side="right"
          opacity={0.42}
          position="50% 20%"
          mobile="bottom"
          mobilePosition="50% 15%"
          mobileOpacity={0.55}
        />
        <div className="absolute inset-0 glow-gold" aria-hidden />
        <div className="relative mx-auto flex max-w-3xl flex-col items-center gap-7 px-6">
          <Reveal>
            <span className="font-script text-5xl text-gold-pale">
              {finalCta.script}
            </span>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-display text-3xl font-semibold uppercase tracking-[0.08em] text-gold-gradient sm:text-4xl">
              {finalCta.title}
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="max-w-xl text-xl italic leading-relaxed opacity-90">
              {finalCta.sub}
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <CtaButton
              href="#oferta"
              label={finalCta.cta}
              trigger={finalCta.ctaTrigger}
            />
          </Reveal>
        </div>
      </section>

      {/* ============ FOOTER ============ */}
      <footer className="bg-[#170f04] py-8 text-center text-base text-cream/70">
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-2 px-6">
          <Image
            src="/livro/capa-800.png"
            alt=""
            width={36}
            height={58}
            className="rounded-[2px] opacity-80"
          />
          <p className="font-display tracking-[0.2em]">
            SEMPRE QUIS TE CHAMAR DE PAI
          </p>
          <p>© 2026 Sheyla Gracielle · Todos os direitos reservados</p>
        </div>
      </footer>

      <StickyBuyBar />
    </main>
  );
}
