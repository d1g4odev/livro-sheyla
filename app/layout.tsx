import type { Metadata } from "next";
import { Cinzel, EB_Garamond, Great_Vibes } from "next/font/google";
import "./globals.css";

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const garamond = EB_Garamond({
  variable: "--font-garamond",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

const greatVibes = Great_Vibes({
  variable: "--font-script",
  subsets: ["latin"],
  weight: "400",
});

const SITE_URL = "https://livro-sheyla.vercel.app"; // TODO: trocar quando houver domínio próprio

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default:
      "Sempre Quis Te Chamar de Pai — Livro de Sheyla Gracielle | Testemunho de Fé, Perdão e Restauração",
    template: "%s | Sempre Quis Te Chamar de Pai",
  },
  description:
    "Livro cristão de Sheyla Gracielle: o testemunho real de uma mulher que atravessou rejeição, traição e divórcio até conhecer Deus como Pai. 22 capítulos de fé, perdão e restauração. Disponível em ebook e livro físico.",
  keywords: [
    "Sempre Quis Te Chamar de Pai",
    "Sheyla Gracielle",
    "livro cristão",
    "testemunho cristão",
    "livro sobre perdão",
    "livro sobre restauração",
    "livro cristão para mulheres",
    "superação de traição e divórcio",
    "Deus como Pai",
    "livro evangélico",
  ],
  authors: [{ name: "Sheyla Gracielle" }],
  creator: "Sheyla Gracielle",
  publisher: "Sheyla Gracielle",
  category: "book",
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Sempre Quis Te Chamar de Pai — Livro de Sheyla Gracielle",
    description:
      "Um testemunho de fé, perdão e restauração. A história real de uma mulher que conheceu a rejeição, a traição e o vazio — até descobrir um Pai que a esperava do outro lado da dor. Ebook e livro físico.",
    url: SITE_URL,
    siteName: "Sempre Quis Te Chamar de Pai",
    images: [
      {
        url: "/livro/capa-og.jpg",
        width: 1600,
        height: 900,
        alt: "Capa do livro Sempre Quis Te Chamar de Pai, de Sheyla Gracielle",
      },
    ],
    locale: "pt_BR",
    type: "book",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sempre Quis Te Chamar de Pai — Livro de Sheyla Gracielle",
    description:
      "Testemunho real de fé, perdão e restauração. Ebook e livro físico.",
    images: ["/livro/capa-og.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${cinzel.variable} ${garamond.variable} ${greatVibes.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
