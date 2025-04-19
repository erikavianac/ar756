import { Metadata } from "next";
import OrcamentoCardComponent from "./orcamentoCard";
import { ProposalRequestResponse, ProposalType } from "@/types";
import { notFound } from "next/navigation";
import { getProposalById } from "@/util/get-proposal";

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
    <div
      className={`flex items-center justify-center w-full min-h-screen px-2 bg-faixada flex-1 h-screen pt-20`}
    >
      <div className="md:w-[600px]  bg-white text-lg pt-8 rounded-md shadow-lg px-4 flex flex-col overflow-hidden ">
        <OrcamentoCardComponent orcamentoByid={orcamentoByID} />
      </div>
    </div>
  );
}
