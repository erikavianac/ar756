"use server";

import { BugdetType, CreateOrcamentoReqBody } from "@/types";

export  async function updateOrcamentoActionServer( data: BugdetType) {
  const updatedOrcamento = await fetch(
    `${process.env.BASE_URL}/orcamento/update/${data.id}`,
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
