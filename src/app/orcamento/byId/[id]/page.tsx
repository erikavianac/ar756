import OrcamentoCardComponent from "./orcamentoCard";

interface OrcamentoByiDPageProps {
  params: {
    id: string;
  };
}

export default async function OrcamentoPage({ params }: OrcamentoByiDPageProps) {
  
  const orcamentoByID = await fetch(
    `${process.env.BASE_URL}/orcamento/getById/${params.id}`,
    {
      method: "GET",
      cache: "no-cache",
    }
  ).then(async (resp) => {
    return await resp.json();
  });

  return (
    <div className={`flex items-center justify-center w-full min-h-screen px-2 bg-faixada`}>
      <div className="w-[600px]  bg-white text-lg pt-8 rounded-md shadow-lg px-4 flex flex-col overflow-hidden ">
        <OrcamentoCardComponent orcamentoByid={orcamentoByID} />
      </div>
    </div>
  );
}
