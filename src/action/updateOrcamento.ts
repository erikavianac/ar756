"use server";

import { ProposalType, CreateOrcamentoReqBody } from "@/types";

export  async function updateOrcamentoActionServer( data: ProposalType) {
  const updatedOrcamento = await fetch(
    `${process.env.SERVER_URL}/orcamento/update/${data.id}`,
    {
      method: "PUT",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  ).then(async (resp) => {
    return await resp.json();
  });

  return updatedOrcamento;
}
