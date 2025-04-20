"use server";

import { CreateScheduleRequestResponse } from "@/types";
import { CreateScheduleRequestSchema } from "@/formhook/schemas/create-schedule-request-zod-schema";

export  async function createScheduleActionServer( params: CreateScheduleRequestSchema): Promise<CreateScheduleRequestResponse> {
  const newSchedule = await fetch(
    `${process.env.SERVER_URL}/schedule/create`,
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

  return newSchedule;
}
