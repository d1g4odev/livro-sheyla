// POST /api/create-preference
// Cria uma preferência do Mercado Pago (Checkout Pro) com os dados do pedido
// e devolve o init_point (URL segura de pagamento: Pix ou Cartão).
//
// Requer a variável de ambiente MP_ACCESS_TOKEN (Access Token de PRODUÇÃO).
// O preço é FIXADO no servidor a partir de PRODUTOS — nunca confiar no cliente.

import { NextResponse } from "next/server";
import { PRODUTOS, QTD_MAX } from "@/lib/checkout";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const token = process.env.MP_ACCESS_TOKEN;
  if (!token) {
    return NextResponse.json(
      { error: "MP_ACCESS_TOKEN não configurado no servidor." },
      { status: 500 },
    );
  }

  let b: Record<string, unknown>;
  try {
    b = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "Corpo inválido." }, { status: 400 });
  }

  const s = (v: unknown) => (typeof v === "string" ? v.trim() : "");
  // Só o livro físico passa por aqui — o ebook é vendido na Amazon.
  if (s(b.produto) !== "fisico") {
    return NextResponse.json({ error: "Produto inválido." }, { status: 400 });
  }
  const produto = PRODUTOS.fisico;
  const qtd = Math.floor(Number(b.qtd));
  if (!Number.isFinite(qtd) || qtd < 1 || qtd > QTD_MAX) {
    return NextResponse.json({ error: "Quantidade inválida." }, { status: 400 });
  }

  // validação mínima
  const obrigatorios = ["nome", "email", "whats"];
  if (produto.precisaEndereco) {
    obrigatorios.push("cep", "rua", "numero", "bairro", "cidade", "uf");
  }
  for (const campo of obrigatorios) {
    if (!s(b[campo])) {
      return NextResponse.json(
        { error: `Campo obrigatório ausente: ${campo}` },
        { status: 400 },
      );
    }
  }

  const proto = (
    request.headers.get("x-forwarded-proto") || "https"
  ).split(",")[0];
  const host = request.headers.get("host");
  const baseUrl = `${proto}://${host}`;

  const metadata: Record<string, string> = {
    produto: produto.id,
    qtd: String(qtd),
    nome: s(b.nome),
    email: s(b.email),
    whatsapp: s(b.whats),
  };
  if (produto.precisaEndereco) {
    Object.assign(metadata, {
      cep: s(b.cep),
      endereco: s(b.rua),
      numero: s(b.numero),
      complemento: s(b.complemento),
      bairro: s(b.bairro),
      referencia: s(b.referencia),
      cidade: s(b.cidade),
      uf: s(b.uf).toUpperCase(),
    });
  }

  const preference = {
    items: [
      {
        title: produto.titulo,
        description: produto.descricao,
        quantity: qtd,
        unit_price: produto.preco,
        currency_id: "BRL",
      },
    ],
    payer: { name: s(b.nome), email: s(b.email) },
    metadata,
    external_reference: `SG-${produto.id}-${Date.now()}`,
    back_urls: {
      success: `${baseUrl}/sucesso?produto=${produto.id}`,
      pending: `${baseUrl}/pendente`,
      failure: `${baseUrl}/erro`,
    },
    auto_return: "approved",
    // source_news=webhooks: só o Webhook (não o IPN antigo) avisa — evita e-mail duplicado.
    notification_url: `${baseUrl}/api/webhook?source_news=webhooks`,
    statement_descriptor: "LIVRO SHEYLA",
    payment_methods: {
      excluded_payment_types: [{ id: "ticket" }], // sem boleto: só Pix e Cartão
      installments: 12,
    },
  };

  try {
    const r = await fetch("https://api.mercadopago.com/checkout/preferences", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(preference),
    });
    const data = await r.json();
    if (!r.ok) {
      return NextResponse.json(
        { error: "Falha ao criar preferência no Mercado Pago", detail: data },
        { status: 502 },
      );
    }
    return NextResponse.json({ init_point: data.init_point, id: data.id });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : String(e) },
      { status: 500 },
    );
  }
}
