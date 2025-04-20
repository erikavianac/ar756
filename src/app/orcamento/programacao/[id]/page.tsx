import { Metadata } from "next";
import { notFound } from "next/navigation";
import ScheduleFormComponent from "./form";
import { FooterComponent } from "@/components/footer";
import { HomeHeaderComponent } from "@/components/header";
import { getProposalById } from "@/util/get-proposal";
import { listScheduleActionServer } from "@/action/list-schedule";

interface ListaDeConvidadosByIDPageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({
  params,
}: ListaDeConvidadosByIDPageProps): Promise<Metadata> {
  const orcamentoByID = await getProposalById(params.id);

  return {
    title: `Programacao ${
      orcamentoByID?.completeClientName
        ? orcamentoByID.completeClientName
        : "não encontrado"
    }`,
  };
}

export default async function ProgramacaoPage({
  params,
}: ListaDeConvidadosByIDPageProps) {
  const [proposal, schedule] = await Promise.all([
    getProposalById(params.id),
    listScheduleActionServer({ proposalId: params.id}),
  ]);

  if (!proposal?.id) {
    notFound();
  }

  return (
    <div className="flex flex-col min-h-screen w-full bg-faixada">
      <HomeHeaderComponent />
      <main className="flex-1 w-full">
        <ScheduleFormComponent
          proposal={proposal}
          scheduleList={schedule.data.scheduleList}
        />
      </main>
      <FooterComponent />
    </div>
  );
}
