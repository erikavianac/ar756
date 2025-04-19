import { cache } from "react";
import { ProposalRequestResponse } from "@/types";

export const getProposalById = cache(async (id: string) => {
  const res = await fetch(`${process.env.SERVER_URL}/proposal/byId/${id}`, {
    method: "GET",
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Erro ao buscar orçamento");
  }

  const response: ProposalRequestResponse = await res.json();
  return response.data;
});