"use client";

import { motion } from "motion/react";

export default function ScrollCue() {
  return (
    <motion.a
      href="#historia"
      aria-label="Rolar para conhecer a história"
      className="absolute bottom-5 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-1 text-gold-pale/70 transition-colors hover:text-gold-pale md:flex"
      animate={{ y: [0, 8, 0] }}
      transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
    >
      <span className="font-display text-xs uppercase tracking-[0.25em]">
        Conheça a história
      </span>
      <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
        <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </motion.a>
  );
}
