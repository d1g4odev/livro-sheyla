import { faq, PRECOS } from "@/lib/content";

const SITE_URL = "https://livro-sheyla.vercel.app"; // TODO: trocar quando houver domínio próprio

const toPrice = (v: string) => v.replace(/[^\d,]/g, "").replace(",", ".");

const graph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#autora`,
      name: "Sheyla Gracielle",
      jobTitle: "Escritora",
      description:
        "Autora cristã. Escreveu 'Sempre Quis Te Chamar de Pai', testemunho de fé, perdão e restauração.",
    },
    {
      "@type": "Book",
      "@id": `${SITE_URL}/#livro`,
      name: "Sempre Quis Te Chamar de Pai",
      alternateName: "Um testemunho de fé, perdão e restauração",
      author: { "@id": `${SITE_URL}/#autora` },
      description:
        "Testemunho real de uma mulher que atravessou rejeição, traição e divórcio até conhecer Deus como Pai. 22 capítulos que percorrem o vale, o fogo e o voo: libertação, cura, batismo e o chamado para escrever.",
      image: `${SITE_URL}/livro/capa-og.jpg`,
      inLanguage: "pt-BR",
      numberOfPages: 116,
      genre: ["Cristão", "Testemunho", "Biografia espiritual"],
      audience: {
        "@type": "Audience",
        audienceType:
          "Leitores cristãos, mulheres em processo de restauração emocional e espiritual",
      },
      workExample: [
        {
          "@type": "Book",
          bookFormat: "https://schema.org/EBook",
          inLanguage: "pt-BR",
          potentialAction: {
            "@type": "BuyAction",
            target: SITE_URL,
            price: toPrice(PRECOS.ebook),
            priceCurrency: "BRL",
          },
        },
        {
          "@type": "Book",
          bookFormat: "https://schema.org/Paperback",
          inLanguage: "pt-BR",
          potentialAction: {
            "@type": "BuyAction",
            target: SITE_URL,
            price: toPrice(PRECOS.fisico),
            priceCurrency: "BRL",
          },
        },
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#site`,
      url: SITE_URL,
      name: "Sempre Quis Te Chamar de Pai",
      inLanguage: "pt-BR",
      about: { "@id": `${SITE_URL}/#livro` },
      publisher: { "@id": `${SITE_URL}/#autora` },
    },
    {
      "@type": "FAQPage",
      "@id": `${SITE_URL}/#faq`,
      mainEntity: faq.items.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a },
      })),
    },
  ],
};

export default function JsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}
