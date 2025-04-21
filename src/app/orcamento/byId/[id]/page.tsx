import { Metadata } from "next";
import OrcamentoCardComponent from "./orcamentoCard";
import { HomeHeaderComponent } from "@/components/header";
import { notFound } from "next/navigation";
import { getProposalById } from "@/util/get-proposal";
import { FooterComponent } from "@/components/footer";

interface OrcamentoByiDPageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({
  params,
}: OrcamentoByiDPageProps): Promise<Metadata> {
  const orcamentoByID = await getProposalById(params.id);

  return {
    title: `Orçamento ${
      orcamentoByID?.completeClientName ? orcamentoByID.completeClientName : "não encontrado"
    }`,
  };
}

export default async function OrcamentoPage({
  params,
}: OrcamentoByiDPageProps) {
  const orcamentoByID = await getProposalById(params.id);;

  if (!orcamentoByID?.id) {
    notFound();
  }

  return (
    <div className="flex flex-col min-h-screen w-full bg-faixada">
      <HomeHeaderComponent />
      <main className="flex-1 flex justify-center items-center w-full px-3 py-5">
        <OrcamentoCardComponent orcamentoByid={orcamentoByID} />
      </main>
      <FooterComponent />
    </div>
  );
}
