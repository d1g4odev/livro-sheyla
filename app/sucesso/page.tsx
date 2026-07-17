import type { Metadata } from "next";
import StatusScreen from "@/components/StatusScreen";

export const metadata: Metadata = {
  title: "Compra confirmada",
  robots: { index: false, follow: false },
};

export default async function SucessoPage({
  searchParams,
}: {
  searchParams: Promise<{ produto?: string }>;
}) {
  const { produto } = await searchParams;
  const isEbook = produto === "ebook";

  return (
    <StatusScreen
      emoji="✨"
      script="Deus escreveu esse encontro"
      title="Pagamento confirmado!"
      cta={{ href: "/", label: "Voltar ao início" }}
    >
      {isEbook ? (
        <>
          <p>
            Obrigada por receber esse testemunho. Seu pagamento foi aprovado. 💛
          </p>
          <p>
            Em instantes a <strong>Sheyla</strong> envia o arquivo do ebook para o
            <strong> e-mail</strong> e o <strong>WhatsApp</strong> que você informou.
            Fique de olho na sua caixa de entrada (e no spam).
          </p>
        </>
      ) : (
        <>
          <p>
            Obrigada por receber esse testemunho. Seu pagamento foi aprovado. 💛
          </p>
          <p>
            Seu livro será preparado e <strong>enviado para o endereço informado</strong>.
            Você vai acompanhar o rastreio pelo WhatsApp.
          </p>
        </>
      )}
      <p className="text-base italic text-cream/70">
        Um comprovante do Mercado Pago também chegou no seu e-mail.
      </p>
    </StatusScreen>
  );
}
