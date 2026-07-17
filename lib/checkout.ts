// Configuração dos produtos do checkout.
// FONTE ÚNICA de preço — usada na vitrine (client) e na criação da preferência
// do Mercado Pago (server). O valor cobrado é sempre lido daqui no servidor,
// nunca do que vem do navegador.
//
// TODO: confirmar os preços reais com a Sheyla antes de divulgar.

export type ProdutoId = "ebook" | "fisico";

export type Produto = {
  id: ProdutoId;
  nome: string;
  titulo: string;
  descricao: string;
  preco: number; // BRL, autoridade do servidor
  precoLabel: string;
  precisaEndereco: boolean;
  entrega: string;
};

export const PRODUTOS: Record<ProdutoId, Produto> = {
  ebook: {
    id: "ebook",
    nome: "Ebook",
    titulo: "Sempre Quis Te Chamar de Pai — Ebook",
    descricao: "Livro digital · leitura imediata (PDF + ePub)",
    preco: 29.9,
    precoLabel: "R$ 29,90",
    precisaEndereco: false,
    entrega:
      "Assim que o pagamento é confirmado, a Sheyla envia o arquivo para o seu e-mail e WhatsApp.",
  },
  fisico: {
    id: "fisico",
    nome: "Livro físico",
    titulo: "Sempre Quis Te Chamar de Pai — Edição física",
    descricao: "Edição impressa · capa premium do jardim dourado",
    preco: 59.9,
    precoLabel: "R$ 59,90",
    precisaEndereco: true,
    entrega:
      "Enviamos para todo o Brasil após a confirmação do pagamento. Você acompanha o rastreio pelo WhatsApp.",
  },
};

export function isProdutoId(v: unknown): v is ProdutoId {
  return v === "ebook" || v === "fisico";
}

export function formatBRL(v: number): string {
  return v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}
