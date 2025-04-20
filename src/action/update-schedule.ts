"use server";

import { CreateScheduleRequestSchema } from "@/formhook/schemas/create-schedule-request-zod-schema";
import { AddPersonFormSchema } from "@/formhook/schemas/list-guests-form-zod-schema";
import { ProposalType, CreateOrcamentoReqBody, CreateScheduleRequestResponse } from "@/types";

export  async function updateScheduleActionServer( params: {scheduleId:string, data: CreateScheduleRequestSchema}) {
  const updatedPerson = await fetch(
    `${process.env.SERVER_URL}/schedule/update`,
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
