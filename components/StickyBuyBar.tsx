"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { PRECOS } from "@/lib/content";

export default function StickyBuyBar() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.85);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 90 }}
          animate={{ y: 0 }}
          exit={{ y: 90 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-x-0 bottom-0 z-50 border-t border-gold/30 bg-espresso/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-sm md:hidden"
        >
          <div className="flex items-center gap-3 px-4 py-3">
            <Image
              src="/livro/capa-800.png"
              alt=""
              width={34}
              height={54}
              className="shrink-0 rounded-[2px] ring-1 ring-gold/40"
            />
            <div className="min-w-0 flex-1 text-cream">
              <p className="truncate font-display text-[0.65rem] font-semibold uppercase tracking-[0.12em]">
                Sempre Quis Te Chamar de Pai
              </p>
              <p className="text-sm italic opacity-80">
                a partir de {PRECOS.ebook}
              </p>
            </div>
            <a
              href="#oferta"
              className="shrink-0 rounded-full bg-gradient-to-b from-gold-light via-gold to-gold-deep px-6 py-3 font-display text-xs font-bold uppercase tracking-[0.12em] text-espresso shadow-[0_8px_20px_-6px_rgba(201,162,39,0.7)]"
            >
              Comprar
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
