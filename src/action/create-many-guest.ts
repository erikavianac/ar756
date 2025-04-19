"use server";

import { AddPersonFormSchema } from "@/formhook/schemas/list-guests-form-zod-schema";
import { CreatePersonRequestResponse } from "@/types";

export  async function createManyPersonActionServer( params: AddPersonFormSchema[]): Promise<CreatePersonRequestResponse> {
  const personList = await fetch(
    `${process.env.SERVER_URL}/person/createMany`,
    {
      method: "POST",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    }
  ).then(async (resp) => {
    return await resp.json();
  });



  return personList;
}
