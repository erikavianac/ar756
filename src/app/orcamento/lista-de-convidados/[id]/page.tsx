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
    title: `Lista de convidados ${
      orcamentoByID?.completeClientName
        ? orcamentoByID.completeClientName
        : "não encontrado"
    }`,
  };
}

export default async function ListaDeConvidadosByIDPage({
  params,
}: ListaDeConvidadosByIDPageProps) {
  const proposal = await getProposalById(params.id);

  if (!proposal?.id) {
    notFound();
  }


  return (
    <div className="flex flex-col min-h-screen w-full bg-faixada">
      <HomeHeaderComponent />
      <main className="flex-1 w-full">
        <AddGUestFormComponent proposal={proposal} />
      </main>
      <FooterComponent />
    </div>
  );
}
