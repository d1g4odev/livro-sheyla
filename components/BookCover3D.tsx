"use client";

import Image from "next/image";
import { motion } from "motion/react";

// dimensões do livro em px (capa 1600x2560 → proporção 1:1.6)
const W = 300;
const H = 480;
const D = 44;

export default function BookCover3D() {
  return (
    <div
      className="relative flex h-[300px] items-center justify-center py-2 md:h-auto md:py-10"
      style={{ perspective: "1800px" }}
    >
      <div className="absolute inset-0 glow-gold scale-150" aria-hidden />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: [0, -12, 0] }}
        transition={{
          opacity: { duration: 0.9, ease: "easeOut" },
          y: { duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 },
        }}
        className="relative scale-[0.58] sm:scale-75 md:scale-100"
        style={{ width: W, height: H, transformStyle: "preserve-3d" }}
      >
        <motion.div
          initial={{ rotateY: -42 }}
          animate={{ rotateY: -26 }}
          whileHover={{ rotateY: -10 }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          className="relative h-full w-full"
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* capa frontal */}
          <div
            className="absolute inset-0 overflow-hidden rounded-r-md rounded-l-[3px] ring-1 ring-gold/40"
            style={{ transform: `translateZ(${D / 2}px)` }}
          >
            <Image
              src="/livro/capa-800.png"
              alt="Capa do livro Sempre Quis Te Chamar de Pai, de Sheyla Gracielle"
              width={W}
              height={H}
              priority
              className="h-full w-full object-cover"
            />
            {/* brilho sutil na capa */}
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.14) 48%, transparent 60%)",
              }}
              aria-hidden
            />
          </div>

          {/* contracapa */}
          <div
            className="absolute inset-0 rounded-l-md rounded-r-[3px] bg-gradient-to-br from-[#3a2b14] via-[#221708] to-[#170f04] ring-1 ring-gold/20"
            style={{ transform: `translateZ(${-D / 2}px) rotateY(180deg)` }}
            aria-hidden
          />

          {/* lombada (face esquerda) */}
          <div
            className="absolute top-0 bottom-0 flex items-center justify-center bg-gradient-to-b from-[#54401e] via-[#3a2b14] to-[#2a1d0c]"
            style={{
              width: D,
              left: "50%",
              marginLeft: -D / 2,
              transform: `rotateY(-90deg) translateZ(${W / 2}px)`,
            }}
            aria-hidden
          >
            <span
              className="whitespace-nowrap font-display text-[0.6rem] font-semibold uppercase tracking-[0.3em] text-gold-pale/90"
              style={{ writingMode: "vertical-rl" }}
            >
              Sempre Quis Te Chamar de Pai · Sheyla Gracielle
            </span>
          </div>

          {/* páginas (face direita) */}
          <div
            className="absolute top-[3px] bottom-[3px]"
            style={{
              width: D - 4,
              left: "50%",
              marginLeft: -(D - 4) / 2,
              transform: `rotateY(90deg) translateZ(${W / 2 - 2}px)`,
              background:
                "repeating-linear-gradient(90deg, #f6f1e0 0px, #f6f1e0 2px, #d9d0b6 3px, #e9e2cf 4px)",
            }}
            aria-hidden
          />
        </motion.div>

        {/* sombra projetada */}
        <div
          className="absolute -bottom-14 left-1/2 h-10 w-[85%] -translate-x-1/2 rounded-[50%] bg-black/60 blur-2xl"
          aria-hidden
        />
      </motion.div>
    </div>
  );
}
