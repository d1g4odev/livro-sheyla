import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import CheckoutForm from "@/components/CheckoutForm";
import { isProdutoId } from "@/lib/checkout";

export const metadata: Metadata = {
  title: "Checkout",
  robots: { index: false, follow: false },
};

export default async function CheckoutPage({
  searchParams,
}: {
  searchParams: Promise<{ produto?: string }>;
}) {
  const { produto } = await searchParams;
  if (!isProdutoId(produto)) redirect("/#oferta");

  return (
    <main className="flex-1 bg-cream">
      <header className="border-b border-gold/20 bg-cream/90 backdrop-blur-sm">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/livro/capa-800.png"
              alt=""
              width={28}
              height={45}
              className="rounded-[2px] ring-1 ring-gold/40"
            />
            <span className="font-display text-sm font-semibold uppercase tracking-[0.15em] text-espresso">
              Sempre Quis Te Chamar de Pai
            </span>
          </Link>
          <span className="hidden text-sm italic text-espresso/60 sm:block">
            🔒 Compra segura
          </span>
        </div>
      </header>
      <CheckoutForm produtoId={produto} />
    </main>
  );
}
