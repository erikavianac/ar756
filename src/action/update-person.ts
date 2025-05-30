"use server";

import { AddPersonFormSchema } from "@/formhook/schemas/list-guests-form-zod-schema";
import { ProposalType, CreateOrcamentoReqBody } from "@/types";

export  async function updatePersonActionServer( params: {personId:string, data: AddPersonFormSchema}) {
  const updatedPerson = await fetch(
    `${process.env.SERVER_URL}/person/update`,
    {
      method: "PUT",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    }
  ).then(async (resp) => {
    return await resp.json();
  });

  return updatedPerson;
}
