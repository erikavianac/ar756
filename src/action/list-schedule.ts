"use server";

import { AddPersonFormSchema } from "@/formhook/schemas/list-guests-form-zod-schema";
import { CreatePersonRequestResponse, ListScheduleRequestResponse, ListWebPersonRequestResponse } from "@/types";

export  async function listScheduleActionServer( {proposalId}: {proposalId: string}): Promise<ListScheduleRequestResponse> {
  const query = new URLSearchParams({
    proposalId,
  }).toString()

  const personList = await fetch(
    `${process.env.SERVER_URL}/schedule/list?${query}`,
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
