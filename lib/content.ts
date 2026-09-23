// ============================================================
// TODO — trocar antes de publicar:
//  - links da Amazon (ebook Kindle e livro físico)
//  - número do WhatsApp da Sheyla
//  - preços reais dos dois formatos (em lib/checkout.ts — fonte única)
// ============================================================

import { PRODUTOS } from "./checkout";

export const LINKS = {
  checkoutEbook: "/checkout?produto=ebook",
  checkoutFisico: "/checkout?produto=fisico",
  amazonEbook: "#oferta", // TODO: link do ebook na Amazon (Kindle)
  whatsapp:
    "https://wa.me/5500000000000?text=Ol%C3%A1%2C%20quero%20o%20livro%20Sempre%20Quis%20Te%20Chamar%20de%20Pai!", // TODO: número real
};

// Preços vêm de lib/checkout.ts para não divergir do valor cobrado no servidor.
export const PRECOS = {
  ebook: PRODUTOS.ebook.precoLabel,
  fisico: PRODUTOS.fisico.precoLabel,
};

export const hero = {
  eyebrow: "Um testemunho de fé, perdão e restauração",
  headline: "Você também cresceu sentindo que precisava merecer amor?",
  sub: "A história real de uma mulher que conheceu a rejeição, a traição e o vazio — até descobrir um Pai que a esperava do outro lado da dor.",
  cta: "Quero ler este testemunho",
  ctaTrigger: "Ebook ou livro físico · leitura imediata no digital",
};

export const story = {
  script: "Talvez essa também seja a sua história",
  title: "Por fora, tudo parecia perfeito",
  fragments: [
    "“Cresci acreditando que não era suficiente — e essa ferida me moldou.”",
    "“Vivi nove anos o doce e o amargo de um casamento sem propósito. Parecia perfeito por fora. Mas por dentro havia rachaduras invisíveis.”",
    "“O que eu mais temia, aconteceu comigo: a traição e o divórcio. O chão abriu. O ar sumiu. A alma despencou.”",
  ],
  turn: "Foi ali, naquele vale escuro, naquele momento em que a história parecia ter acabado, que Deus começou a escrevê-la de verdade.",
};

export const forYou = {
  script: "É sobre você?",
  title: "Este livro é pra você se...",
  items: [
    "Você cresceu sentindo que precisava competir por um lugar que parecia já estar perdido.",
    "Uma traição ou um divórcio partiu a sua história em antes e depois.",
    "Por fora está tudo certo — mas por dentro existe um vazio que nada preenche.",
    "Você sente que Deus é real, mas nunca soube como chamá-Lo de Pai.",
    "Você precisa acreditar que é possível recomeçar das cinzas.",
  ],
};

export const stats = [
  { n: "22", label: "capítulos de testemunho real" },
  { n: "116", label: "páginas escritas com verdade vivida" },
  { n: "2", label: "formatos — ebook e livro impresso" },
];

export const preview = {
  script: "Leia agora",
  title: "As primeiras páginas",
  intro:
    "“Do Convite” — a carta que abre o livro, exatamente como você vai recebê-la:",
  salutation: "Caro leitor,",
  paragraphs: [
    "Antes de qualquer palavra, preciso te dizer algo com sinceridade: eu não cheguei até aqui sozinha. E talvez você também não tenha chegado até aqui por acaso.",
    "Há histórias que nos empurram, dores que nos despertam, chamados que nos puxam pela alma e caminhos que só fazem sentido quando olhamos para trás e percebemos que Alguém estava nos conduzindo o tempo inteiro.",
    "Se você abriu este livro, existe um motivo maior do que a curiosidade. Desde o início da minha caminhada, compreendi que no mundo espiritual não existe coincidência. Eu creio que assim como existiu um convite para contar uma história que, no fundo, nunca foi só minha, este livro também é um chamado de Deus, para um propósito maior, afinal sou mais uma testemunha, de que existe um Pai e Ele sempre nos convida a conhecê-lo das mais variadas formas.",
    "E foi exatamente esse Pai que me trouxe até aqui — não para falar de religião, mas de encontros. Não para falar de perfeição, mas de feridas restauradas. Não para falar sobre um Deus distante, mas sobre um Deus que se aproxima.",
  ],
  signatureLine: "Com carinho,",
  signature: "Sheyla Gracielle",
  cta: "Continuar lendo no livro completo",
  ctaTrigger: "A história começa no capítulo 1 — “O Ano Em Que Tudo Começou A Secar”",
};

export const journey = {
  script: "O que você vai encontrar",
  title: "Do vale ao voo, em 22 capítulos",
  steps: [
    {
      numeral: "I",
      name: "O Vale",
      desc: "A ferida da rejeição na infância, o casamento que ruiu e o Salmo 55 ganhando carne, sangue e lágrimas — a dor contada sem máscaras.",
    },
    {
      numeral: "II",
      name: "O Fogo",
      desc: "O novo nascimento, Pentecostes, a libertação de uma geração e o dia marcado no Céu: o batismo que dividiu a história em antes e depois.",
    },
    {
      numeral: "III",
      name: "O Voo",
      desc: "Quando Deus reescreve o seu nome, cura a identidade no jejum de quarenta dias e ensina a ouvir a Voz que sempre esteve ali.",
    },
  ],
};

export const excerpts = {
  script: "Palavras do livro",
  title: "Escrito com verdade vivida",
  quotes: [
    {
      text: "Não para falar de religião, mas de encontros. Não para falar de perfeição, mas de feridas restauradas. Não para falar sobre um Deus distante, mas sobre um Deus que se aproxima.",
      ref: "Do Convite",
    },
    {
      text: "O clamor sincero de um coração ferido faz mais barulho no Céu do que qualquer eloquência.",
      ref: "Prefácio",
    },
    {
      text: "Como se o Pai repetisse: “Filha, agora é tempo de voar.”",
      ref: "Prefácio",
    },
  ],
};

export const author = {
  script: "Quem escreve",
  name: "Sheyla Gracielle",
  bio: [
    "Primeira filha, primeira neta — e, por muitos anos, uma mulher que não sabia como chamar Deus de Pai.",
    "Formada em Direito para realizar o sonho do pai, construiu a casa, o casamento e a vida idealizada, até o dia em que tudo ruiu e o vazio falou mais alto que as conquistas.",
    "Deste vale nasceu um chamado confirmado por profecia: escrever. Este livro é a pedra do seu encontro — o altar onde ela registra o que o Pai fez, para que muitos encontrem, neste testemunho, o caminho de volta para a aliança.",
  ],
  verse: "“Não desprezes o dom que há em ti, o qual te foi dado por profecia.” — 1 Timóteo 4:14",
  videoTitle: "Uma palavra da Sheyla pra você",
};

export const offer = {
  script: "Garanta o seu",
  title: "Escolha como quer ler",
  guarantee: "Compra segura · 7 dias de garantia incondicional no digital",
  formats: [
    {
      tag: "Leitura imediata",
      name: "Ebook",
      price: PRECOS.ebook,
      bullets: [
        "Receba agora no seu e-mail",
        "Leia no celular, tablet ou Kindle",
        "Acesso vitalício ao arquivo",
      ],
      cta: "Comprar o ebook",
      ctaHref: LINKS.checkoutEbook,
      secondary: { label: "Prefiro comprar na Amazon", href: LINKS.amazonEbook },
    },
    {
      tag: "Edição impressa",
      name: "Livro físico",
      price: PRECOS.fisico,
      bullets: [
        "Capa premium — a mesma do jardim dourado",
        "Receba em casa, em todo o Brasil",
        "Perfeito para presentear alguém que precisa dessa palavra",
      ],
      cta: "Comprar o livro físico",
      ctaHref: LINKS.checkoutFisico,
      secondary: { label: "Pedir pelo WhatsApp da Sheyla", href: LINKS.whatsapp },
      featured: true,
    },
  ],
};

export const faq = {
  script: "Dúvidas comuns",
  title: "Perguntas frequentes",
  items: [
    {
      q: "Como recebo o ebook?",
      a: "Assim que o pagamento é confirmado, o livro digital chega no seu e-mail. Você pode ler no celular, no computador, no tablet ou enviar para o seu Kindle.",
    },
    {
      q: "Em quanto tempo o livro físico chega?",
      a: "O envio é feito para todo o Brasil. O prazo aparece no checkout de acordo com o seu CEP — e você pode acompanhar o rastreamento.",
    },
    {
      q: "Esse livro é para mim?",
      a: "Se você já carregou rejeição, viveu uma traição, sente um vazio que nada preenche ou simplesmente deseja conhecer Deus como Pai — sim, ele foi escrito para você.",
    },
    {
      q: "Posso dar de presente?",
      a: "Pode — e é um dos presentes mais bonitos que alguém em um vale pode receber. No pedido pelo WhatsApp, é possível combinar uma dedicatória da autora.",
    },
    {
      q: "E se eu não gostar?",
      a: "No formato digital você tem 7 dias de garantia incondicional: basta pedir o reembolso e devolvemos 100% do valor.",
    },
  ],
};

export const finalCta = {
  script: "Voe",
  title: "Há um Pai esperando do outro lado da dor",
  sub: "“Que este livro desperte filhos que, assim como eu, sempre quiseram Te chamar de Pai.” — da Oração de Abertura",
  cta: "Quero ler este testemunho",
  ctaTrigger: "Ebook com leitura imediata · livro físico em todo o Brasil",
};
