"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { PRODUTOS, QTD_MAX, formatBRL, type ProdutoId } from "@/lib/checkout";

const UFS = [
  "AC","AL","AP","AM","BA","CE","DF","ES","GO","MA","MT","MS","MG","PA","PB",
  "PR","PE","PI","RJ","RN","RS","RO","RR","SC","SP","SE","TO",
];

type Form = {
  nome: string;
  email: string;
  whats: string;
  cep: string;
  rua: string;
  numero: string;
  complemento: string;
  bairro: string;
  referencia: string;
  cidade: string;
  uf: string;
};

const VAZIO: Form = {
  nome: "", email: "", whats: "", cep: "", rua: "", numero: "",
  complemento: "", bairro: "", referencia: "", cidade: "", uf: "",
};

export default function CheckoutForm({ produtoId }: { produtoId: ProdutoId }) {
  const produto = PRODUTOS[produtoId];
  const [f, setF] = useState<Form>(VAZIO);
  const [qtd, setQtd] = useState(1);
  const total = formatBRL(produto.preco * qtd);
  const [loading, setLoading] = useState(false);
  const [cepLoading, setCepLoading] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  const set = (k: keyof Form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setF((p) => ({ ...p, [k]: e.target.value }));

  async function buscarCep() {
    const cep = f.cep.replace(/\D/g, "");
    if (cep.length !== 8) return;
    setCepLoading(true);
    try {
      const r = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const d = await r.json();
      if (!d.erro) {
        setF((p) => ({
          ...p,
          rua: d.logradouro || p.rua,
          bairro: d.bairro || p.bairro,
          cidade: d.localidade || p.cidade,
          uf: d.uf || p.uf,
        }));
      }
    } catch {
      /* silencioso — usuário preenche à mão */
    } finally {
      setCepLoading(false);
    }
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErro(null);
    setLoading(true);
    try {
      const r = await fetch("/api/create-preference", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ produto: produto.id, qtd, ...f }),
      });
      const d = await r.json();
      if (!r.ok || !d.init_point) {
        throw new Error(d.error || "Não foi possível iniciar o pagamento.");
      }
      window.location.href = d.init_point;
    } catch (err) {
      setErro(
        err instanceof Error
          ? err.message
          : "Algo deu errado. Tente novamente.",
      );
      setLoading(false);
    }
  }

  const label = "mb-1.5 block font-display text-xs font-semibold uppercase tracking-[0.12em] text-espresso/70";
  const input =
    "w-full rounded-lg border border-gold/30 bg-white px-4 py-3 text-lg text-espresso outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/30";
  const step = "flex items-center gap-2 font-display text-xs font-semibold uppercase tracking-[0.1em]";

  return (
    <div className="mx-auto grid max-w-5xl gap-10 px-6 py-12 md:grid-cols-[1fr_20rem] md:py-16">
      {/* -------- Formulário -------- */}
      <form onSubmit={onSubmit} className="order-2 md:order-1">
        <div className="mb-8 flex flex-wrap gap-x-5 gap-y-2 text-gold-deep">
          <span className={step}><i className="grid size-5 place-items-center rounded-full bg-gold text-espresso not-italic">1</i> Seus dados</span>
          {produto.precisaEndereco && (
            <span className={`${step} text-espresso/40`}><i className="grid size-5 place-items-center rounded-full bg-espresso/10 not-italic">2</i> Entrega</span>
          )}
          <span className={`${step} text-espresso/40`}><i className="grid size-5 place-items-center rounded-full bg-espresso/10 not-italic">{produto.precisaEndereco ? 3 : 2}</i> Pagamento</span>
        </div>

        <fieldset className="mb-8">
          <legend className="mb-4 font-display text-xl font-semibold uppercase tracking-[0.08em] text-espresso">
            Seus dados
          </legend>
          <div className="grid gap-4">
            <div>
              <label className={label} htmlFor="nome">Nome completo *</label>
              <input id="nome" className={input} value={f.nome} onChange={set("nome")} required autoComplete="name" />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className={label} htmlFor="email">E-mail *</label>
                <input id="email" type="email" className={input} value={f.email} onChange={set("email")} required autoComplete="email" />
              </div>
              <div>
                <label className={label} htmlFor="whats">WhatsApp / Telefone *</label>
                <input id="whats" className={input} value={f.whats} onChange={set("whats")} required autoComplete="tel" placeholder="(00) 00000-0000" />
              </div>
            </div>
          </div>
        </fieldset>

        {produto.precisaEndereco && (
          <fieldset className="mb-8">
            <legend className="mb-4 font-display text-xl font-semibold uppercase tracking-[0.08em] text-espresso">
              Endereço de entrega
            </legend>
            <div className="grid gap-4">
              <div className="grid gap-4 sm:grid-cols-[10rem_1fr]">
                <div>
                  <label className={label} htmlFor="cep">
                    CEP * {cepLoading && <span className="text-gold-deep normal-case tracking-normal">buscando…</span>}
                  </label>
                  <input id="cep" className={input} value={f.cep} onChange={set("cep")} onBlur={buscarCep} required inputMode="numeric" autoComplete="postal-code" placeholder="00000-000" />
                </div>
                <div>
                  <label className={label} htmlFor="rua">Endereço (rua / avenida) *</label>
                  <input id="rua" className={input} value={f.rua} onChange={set("rua")} required autoComplete="address-line1" />
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-[8rem_1fr]">
                <div>
                  <label className={label} htmlFor="numero">Número *</label>
                  <input id="numero" className={input} value={f.numero} onChange={set("numero")} required />
                </div>
                <div>
                  <label className={label} htmlFor="complemento">Complemento</label>
                  <input id="complemento" className={input} value={f.complemento} onChange={set("complemento")} placeholder="apto, bloco…" />
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className={label} htmlFor="bairro">Bairro *</label>
                  <input id="bairro" className={input} value={f.bairro} onChange={set("bairro")} required />
                </div>
                <div>
                  <label className={label} htmlFor="referencia">Ponto de referência</label>
                  <input id="referencia" className={input} value={f.referencia} onChange={set("referencia")} />
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-[1fr_7rem]">
                <div>
                  <label className={label} htmlFor="cidade">Cidade *</label>
                  <input id="cidade" className={input} value={f.cidade} onChange={set("cidade")} required autoComplete="address-level2" />
                </div>
                <div>
                  <label className={label} htmlFor="uf">UF *</label>
                  <select id="uf" className={input} value={f.uf} onChange={set("uf")} required>
                    <option value="" disabled>—</option>
                    {UFS.map((u) => <option key={u} value={u}>{u}</option>)}
                  </select>
                </div>
              </div>
            </div>
          </fieldset>
        )}

        {erro && (
          <p className="mb-4 rounded-lg border border-flor/40 bg-flor/5 px-4 py-3 text-flor">
            {erro}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-full bg-gradient-to-b from-gold-light via-gold to-gold-deep px-8 py-4 font-display text-base font-bold uppercase tracking-[0.1em] text-espresso shadow-[0_12px_30px_-8px_rgba(201,162,39,0.65)] ring-1 ring-gold-pale/60 transition-all duration-300 hover:-translate-y-0.5 hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0"
        >
          {loading ? "Redirecionando para o pagamento seguro…" : "Finalizar compra →"}
        </button>
        <p className="mt-4 text-center text-sm italic text-espresso/60">
          🔒 Pagamento seguro via Mercado Pago — Pix ou Cartão em até 12x
        </p>
      </form>

      {/* -------- Resumo do pedido -------- */}
      <aside className="order-1 md:order-2">
        <div className="sticky top-6 rounded-xl border border-gold/25 bg-cream-dark/60 p-6">
          <p className="mb-4 font-script text-2xl text-gold-deep">Seu pedido</p>
          <div className="flex gap-4">
            <Image
              src="/livro/capa-800.png"
              alt=""
              width={64}
              height={102}
              className="h-auto shrink-0 rounded-[3px] ring-1 ring-gold/40"
            />
            <div>
              <p className="font-display text-sm font-semibold uppercase tracking-[0.08em] text-espresso">
                {produto.nome}
              </p>
              <p className="mt-1 text-sm leading-snug text-espresso/70">
                {produto.descricao}
              </p>
              {produto.precisaEndereco && (
                <div className="mt-3 inline-flex items-center rounded-lg border border-gold/30 bg-white">
                  <button
                    type="button"
                    aria-label="Diminuir quantidade"
                    onClick={() => setQtd((q) => Math.max(1, q - 1))}
                    disabled={qtd <= 1}
                    className="px-3 py-1.5 text-lg text-espresso disabled:opacity-30"
                  >
                    −
                  </button>
                  <span className="min-w-8 text-center font-display text-base font-semibold text-espresso" aria-live="polite">
                    {qtd}
                  </span>
                  <button
                    type="button"
                    aria-label="Aumentar quantidade"
                    onClick={() => setQtd((q) => Math.min(QTD_MAX, q + 1))}
                    disabled={qtd >= QTD_MAX}
                    className="px-3 py-1.5 text-lg text-espresso disabled:opacity-30"
                  >
                    +
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className="mt-5 space-y-2 border-t border-gold/20 pt-4 text-espresso/80">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>{total}</span>
            </div>
            {produto.precisaEndereco && (
              <div className="flex justify-between">
                <span>Frete</span>
                <span className="text-gold-deep">grátis</span>
              </div>
            )}
            <div className="flex justify-between border-t border-gold/20 pt-2 font-display text-xl font-bold text-espresso">
              <span>Total</span>
              <span className="text-gold-gradient">{total}</span>
            </div>
          </div>
          <p className="mt-4 text-sm leading-snug text-espresso/60">
            {produto.entrega}
          </p>
          <Link
            href="/#oferta"
            className="mt-5 inline-block text-sm text-espresso/60 underline decoration-gold/50 underline-offset-4 transition hover:text-gold-deep"
          >
            ← Trocar de formato
          </Link>
        </div>
      </aside>
    </div>
  );
}
