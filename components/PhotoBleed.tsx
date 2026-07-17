import Image from "next/image";

/**
 * Foto da autora ancorada num lado da seção escura, fundida ao fundo.
 * Máscara em degradê (horizontal + vertical) + leve blur + véu espresso
 * fazem a foto "nascer" do fundo sem borda perceptível.
 * A seção pai precisa de `relative overflow-hidden`.
 */
export default function PhotoBleed({
  src,
  side,
  opacity = 0.45,
  position = "50% 30%",
}: {
  src: string;
  side: "left" | "right";
  opacity?: number;
  position?: string;
}) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-y-0 hidden w-[46%] max-w-2xl md:block ${
        side === "left" ? "left-0" : "right-0"
      }`}
    >
      <div
        className={`absolute inset-0 ${
          side === "left" ? "photo-fade-left" : "photo-fade-right"
        }`}
      >
        <Image
          src={src}
          alt=""
          fill
          sizes="(min-width: 768px) 46vw, 1px"
          quality={70}
          className="object-cover blur-[1.5px] saturate-[1.12]"
          style={{ opacity, objectPosition: position }}
        />
        {/* véu espresso: escurece a foto na direção do conteúdo para casar com o fundo */}
        <div
          className={`absolute inset-0 ${
            side === "left"
              ? "bg-gradient-to-r from-espresso/30 via-espresso/50 to-espresso/85"
              : "bg-gradient-to-l from-espresso/30 via-espresso/50 to-espresso/85"
          }`}
        />
      </div>
    </div>
  );
}
