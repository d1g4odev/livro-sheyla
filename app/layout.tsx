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

export const metadata: Metadata = {
  title: "Sempre Quis Te Chamar de Pai — Sheyla Gracielle",
  description:
    "Um testemunho de fé, perdão e restauração. A história real de uma mulher que conheceu a rejeição, a traição e o vazio — até descobrir um Pai que a esperava do outro lado da dor.",
  openGraph: {
    title: "Sempre Quis Te Chamar de Pai — Sheyla Gracielle",
    description:
      "Um testemunho de fé, perdão e restauração. Ebook e livro físico.",
    images: ["/livro/capa-og.jpg"],
    locale: "pt_BR",
    type: "book",
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
