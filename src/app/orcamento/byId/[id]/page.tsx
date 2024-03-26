import { Metadata } from "next";
import OrcamentoCardComponent from "./orcamentoCard";
import { BugdetType } from "@/types";
import { notFound } from "next/navigation";

interface OrcamentoByiDPageProps {
  params: {
    id: string;
  };
}

export async function generateStaticParams(){
  const orcamentoList : BugdetType[] = await fetch(
    `${process.env.SERVER_URL}/orcamento/list`,
    {
      method: "GET",
    }
  ).then(async (resp) => {
    return await resp.json();
  })

  return orcamentoList.map(({id}) => id)
}

export async function generateMetadata({params} : OrcamentoByiDPageProps):Promise<Metadata>{
  const orcamentoByID  = await fetch(
    `${process.env.SERVER_URL}/orcamento/getById/${params.id}`,
    {
      method: "GET",
    }
  ).then(async (resp) => {
    return await resp.json();
  })

  return {
    title: `Orçamento ${orcamentoByID?.nome ? orcamentoByID.nome : "não encontrado"}`,
  }
}


export default async function OrcamentoPage({ params }: OrcamentoByiDPageProps) {
  
  const orcamentoByID = await fetch(
    `${process.env.SERVER_URL}/orcamento/getById/${params.id}`,
    {
      method: "GET",
    }
  ).then(async (resp) => {
    return await resp.json();
  });

  if(!orcamentoByID?.id){
    notFound()
  }

  const valuesList = await fetch(
    `https://art56-server-v2.vercel.app/value/list/`,
    {
      method: "GET",
    }
  ).then(async (resp) => {
    return await resp.json();
  });

  return (
    <div className={`flex items-center justify-center w-full min-h-screen px-2 bg-faixada flex-1 h-screen pt-20`}>
      <div className="md:w-[600px]  bg-white text-lg pt-8 rounded-md shadow-lg px-4 flex flex-col overflow-hidden ">
        <OrcamentoCardComponent valuesList={valuesList} orcamentoByid={orcamentoByID} />
      </div>
    </div>
  );
}
