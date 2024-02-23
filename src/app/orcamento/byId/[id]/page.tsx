import { Metadata } from "next";
import OrcamentoCardComponent from "./orcamentoCard";
import { BugdetType } from "@/types";

interface OrcamentoByiDPageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({params} : OrcamentoByiDPageProps):Promise<Metadata>{
  const orcamentoByID : BugdetType = await fetch(
    `${process.env.BASE_URL}/orcamento/getById/${params.id}`,
    {
      method: "GET",
    }
  ).then(async (resp) => {
    return await resp.json();
  })

  return {
    title: `Orçamento ${orcamentoByID.nome}`,
  }
}


export default async function OrcamentoPage({ params }: OrcamentoByiDPageProps) {
  
  const orcamentoByID = await fetch(
    `${process.env.BASE_URL}/orcamento/getById/${params.id}`,
    {
      method: "GET",
    }
  ).then(async (resp) => {
    return await resp.json();
  });

  return (
    <div className={`flex items-center justify-center w-full min-h-screen px-2 bg-faixada flex-1 h-screen`}>
      <div className="md:w-[600px]  bg-white text-lg pt-8 rounded-md shadow-lg px-4 flex flex-col overflow-hidden ">
        <OrcamentoCardComponent orcamentoByid={orcamentoByID} />
      </div>
    </div>
  );
}
