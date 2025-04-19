"use server";

import { AddPersonFormSchema } from "@/formhook/schemas/list-guests-form-zod-schema";
import { ProposalType, CreateOrcamentoReqBody } from "@/types";

export  async function deleteGuestActionServer( personId:string) {
  const deletedGuest = await fetch(
    `${process.env.SERVER_URL}/person/delete/${personId}`,
    {
      method: "DELETE",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
      },
    }
  ).then(async (resp) => {
    return await resp.json();
  });

  return deletedGuest;
}
