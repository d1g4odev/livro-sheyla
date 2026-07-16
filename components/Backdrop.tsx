import Image from "next/image";

/**
 * Fundo decorativo de seção.
 * dark  — jardim da capa desfocado + véu espresso + bokeh dourado + grain
 * cream — lavagens douradas sutis + grain de papel
 * A seção pai precisa de `relative overflow-hidden`.
 */
export default function Backdrop({
  variant,
  imageOpacity = 0,
}: {
  variant: "dark" | "cream";
  imageOpacity?: number;
}) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {variant === "dark" ? (
        <>
          {imageOpacity > 0 && (
            <>
              <Image
                src="/livro/bg-garden.jpg"
                alt=""
                fill
                sizes="100vw"
                quality={60}
                className="scale-110 object-cover blur-[14px] saturate-125"
                style={{ opacity: imageOpacity }}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-espresso/80 via-espresso/55 to-espresso/90" />
            </>
          )}
          <div className="absolute inset-0 bokeh" />
          <div className="grain absolute inset-0 opacity-[0.08] mix-blend-overlay" />
        </>
      ) : (
        <>
          <div className="wash-cream absolute inset-0" />
          <div className="pattern-sparkle absolute inset-0 opacity-[0.13]" />
          <div className="grain absolute inset-0 opacity-[0.04]" />
        </>
      )}
    </div>
  );
}
