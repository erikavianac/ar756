"use server";

import { AddPersonFormSchema } from "@/formhook/schemas/list-guests-form-zod-schema";
import { CreatePersonRequestResponse, ListWebPersonRequestResponse } from "@/types";

export  async function listPersonActionServer( {proposalId,type}: {proposalId: string, type: string}): Promise<ListWebPersonRequestResponse> {
  const query = new URLSearchParams({
    proposalId,
    type,
  }).toString()

  const personList = await fetch(
    `${process.env.SERVER_URL}/person/list?${query}`,
    {
      method: "GET",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
      },
    }
  ).then(async (resp) => {
    return await resp.json();
  });



  return personList;
}
