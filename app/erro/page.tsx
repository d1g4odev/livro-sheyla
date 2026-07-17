import type { Metadata } from "next";
import StatusScreen from "@/components/StatusScreen";

export const metadata: Metadata = {
  title: "Pagamento não concluído",
  robots: { index: false, follow: false },
};

export default function ErroPage() {
  return (
    <StatusScreen
      emoji="🤍"
      script="Não desista agora"
      title="Não conseguimos concluir"
      cta={{ href: "/#oferta", label: "Tentar novamente" }}
    >
      <p>
        O pagamento não foi concluído — pode ter sido um problema com o cartão ou
        a transação foi cancelada. Nenhum valor foi cobrado.
      </p>
      <p>
        É só tentar de novo. Se preferir, fale com a Sheyla pelo WhatsApp que ela
        te ajuda a finalizar. 💛
      </p>
    </StatusScreen>
  );
}
