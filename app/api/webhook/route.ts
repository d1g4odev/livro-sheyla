// POST /api/webhook — notificações do Mercado Pago.
// Quando um pagamento é APROVADO, busca os detalhes e envia um e-mail (Resend)
// à Sheyla com o pedido completo. Diferencia ebook (enviar arquivo) de físico
// (despachar + endereço de entrega).
//
// Variáveis de ambiente:
//   MP_ACCESS_TOKEN  -> Access Token de produção do Mercado Pago
//   RESEND_API_KEY   -> chave de API do Resend
//   ORDER_EMAIL      -> e-mail da Sheyla que recebe os pedidos
//   ORDER_EMAIL_FROM -> (opcional) remetente; padrão usa o domínio de teste do Resend

import { NextResponse } from "next/server";
import { formatBRL } from "@/lib/checkout";

export const dynamic = "force-dynamic";

type MpPayment = {
  id?: number | string;
  status?: string;
  transaction_amount?: number;
  payment_type_id?: string;
  payment_method_id?: string;
  metadata?: Record<string, string>;
};

export async function POST(request: Request) {
  try {
    const token = process.env.MP_ACCESS_TOKEN;
    const url = new URL(request.url);

    let body: Record<string, unknown> = {};
    try {
      body = (await request.json()) as Record<string, unknown>;
    } catch {
      /* MP às vezes notifica só via query string */
    }

    const type =
      url.searchParams.get("type") ||
      url.searchParams.get("topic") ||
      (body.type as string) ||
      (body.topic as string);
    const dataId =
      url.searchParams.get("data.id") ||
      url.searchParams.get("id") ||
      ((body.data as { id?: string } | undefined)?.id ?? (body.id as string));

    if (type !== "payment" || !dataId) {
      return new NextResponse("ignored", { status: 200 });
    }

    const r = await fetch(
      `https://api.mercadopago.com/v1/payments/${dataId}`,
      { headers: { Authorization: `Bearer ${token}` } },
    );
    const p: MpPayment = await r.json();

    if (p && p.status === "approved") {
      await enviarEmailPedido(p);
    }
    return new NextResponse("ok", { status: 200 });
  } catch (e) {
    // Sempre 200 para o MP não reenviar infinitamente; erro fica no log.
    console.error("webhook error:", e);
    return new NextResponse("ok", { status: 200 });
  }
}

async function enviarEmailPedido(p: MpPayment) {
  const key = process.env.RESEND_API_KEY;
  const to = process.env.ORDER_EMAIL;
  const from =
    process.env.ORDER_EMAIL_FROM ||
    "Pedidos Sempre Quis Te Chamar de Pai <onboarding@resend.dev>";
  if (!key || !to) {
    console.warn("RESEND_API_KEY/ORDER_EMAIL ausentes — e-mail não enviado");
    return;
  }

  // Os dados vêm do formulário do comprador: escapa antes de montar o HTML.
  const esc = (v: unknown) =>
    String(v ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  const raw = p.metadata || {};
  const m: Record<string, string> = Object.fromEntries(
    Object.entries(raw).map(([k, v]) => [k, esc(v)]),
  );
  const qtd = Number(m.qtd) > 0 ? Number(m.qtd) : 1;
  const isEbook = m.produto === "ebook";
  const valor = formatBRL(Number(p.transaction_amount || 0));
  const metodo =
    p.payment_type_id === "credit_card"
      ? "Cartão de crédito"
      : p.payment_method_id === "pix"
        ? "Pix"
        : p.payment_type_id || "—";

  const itemNome = isEbook
    ? "Ebook (arquivo digital)"
    : `Livro físico (edição impressa) × ${qtd}`;

  const acao = isEbook
    ? "📎 Envie o arquivo do ebook para o e-mail e o WhatsApp abaixo."
    : `📦 Pode despachar ${qtd > 1 ? qtd + " livros" : "o livro"} para o endereço abaixo.`;

  const blocoEndereco = isEbook
    ? ""
    : `
    <h3 style="color:#9a7b1c;margin-bottom:4px">Endereço de entrega</h3>
    <p style="margin-top:0">
      ${m.endereco || ""}, ${m.numero || ""}${m.complemento ? " - " + m.complemento : ""}<br>
      ${m.bairro || ""}${m.referencia ? " (ref: " + m.referencia + ")" : ""}<br>
      ${m.cidade || ""} / ${m.uf || ""} — CEP ${m.cep || ""}
    </p>`;

  const html = `
  <div style="font-family:Arial,Helvetica,sans-serif;max-width:560px;margin:auto;color:#221708">
    <h2 style="color:#9a7b1c">✨ Novo pedido — Sempre Quis Te Chamar de Pai</h2>
    <p style="font-size:16px"><strong>Pagamento APROVADO.</strong> ${acao} 🎉</p>
    <h3 style="color:#9a7b1c;margin-bottom:4px">Comprador</h3>
    <p style="margin-top:0">
      <strong>Nome:</strong> ${m.nome || "—"}<br>
      <strong>E-mail:</strong> ${m.email || "—"}<br>
      <strong>WhatsApp:</strong> ${m.whatsapp || "—"}
    </p>
    ${blocoEndereco}
    <h3 style="color:#9a7b1c;margin-bottom:4px">Pedido</h3>
    <p style="margin-top:0">
      <strong>Item:</strong> ${itemNome}<br>
      <strong>Valor pago:</strong> ${valor}<br>
      <strong>Forma de pagamento:</strong> ${metodo}<br>
      <strong>ID do pagamento:</strong> ${p.id}
    </p>
    <hr style="border:none;border-top:1px solid #e6dcc2;margin:20px 0">
    <p style="font-size:12px;color:#998">E-mail automático do site — pagamento confirmado pelo Mercado Pago.</p>
  </div>`;

  const subject = `${isEbook ? "📎" : "📦"} Pedido aprovado (${isEbook ? "ebook" : "físico"}) — ${String(raw.nome || "cliente")} · ${valor}`;

  const r = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ from, to: [to], subject, html }),
  });
  if (!r.ok) console.error("Resend error:", await r.text());
}
