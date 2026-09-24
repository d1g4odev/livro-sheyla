import type { Metadata } from "next";
import StatusScreen from "@/components/StatusScreen";

export const metadata: Metadata = {
  title: "Pagamento em processamento",
  robots: { index: false, follow: false },
};

export default function PendentePage() {
  return (
    <StatusScreen
      emoji="⏳"
      script="Estamos quase lá"
      title="Pagamento em processamento"
      cta={{ href: "/", label: "Voltar ao início" }}
    >
      <p>
        Recebemos seu pedido! O pagamento ainda está sendo confirmado, isso é
        normal com Pix e boletos, que podem levar alguns minutos.
      </p>
      <p>
        Assim que o Mercado Pago confirmar, a <strong>Sheyla</strong> recebe o
        aviso e dá andamento na entrega. Você não precisa fazer mais nada. 💛
      </p>
    </StatusScreen>
  );
}
