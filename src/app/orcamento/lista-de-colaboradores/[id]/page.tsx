import { Metadata } from "next";
import { ProposalRequestResponse, ProposalType } from "@/types";
import { notFound } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  addPersonFormSchema,
  AddPersonFormSchema,
} from "@/formhook/schemas/list-guests-form-zod-schema";
import InputComponent from "@/components/utils/input";
import AddGUestFormComponent from "./form";
import { FooterComponent } from "@/components/footer";
import { HomeHeaderComponent } from "@/components/header";
import { getProposalById } from "@/util/get-proposal";
import { listPersonActionServer } from "@/action/list-persons";
import AddWorkerFormComponent from "./form";

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
    title: `Lista de colaboradores ${
      orcamentoByID?.completeClientName
        ? orcamentoByID.completeClientName
        : "não encontrado"
    }`,
  };
}

export default async function ListaDeColaboradoresByIDPage({
  params,
}: ListaDeConvidadosByIDPageProps) {
  const [proposal, personList] = await Promise.all([
    getProposalById(params.id),
    listPersonActionServer({ proposalId: params.id, type: "WORKER" }),
  ]);

  if (!proposal?.id) {
    notFound();
  }

  return (
    <div className="flex flex-col min-h-screen w-full bg-faixada">
      <HomeHeaderComponent />
      <main className="flex-1 w-full">
        <AddWorkerFormComponent
          proposal={proposal}
          personList={personList.data.personList}
        />
      </main>
      <FooterComponent />
    </div>
  );
}
