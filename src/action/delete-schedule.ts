"use server";

import { DeleteScheduleRequestResponse } from "@/types";

export async function deleteScheduleActionServer(scheduleId: string): Promise<DeleteScheduleRequestResponse> {
  const deletedPerson = await fetch(
    `${process.env.SERVER_URL}/schedule/delete/${scheduleId}`,
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

  return deletedPerson;
}
