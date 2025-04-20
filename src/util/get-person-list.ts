import { cache } from "react";
import { ListWebPersonRequestResponse } from "@/types";
import { Stringifier } from "postcss";

export const getPersonList = async ({proposalId,type,name}:{proposalId:string,type:"GUEST" | "WORKER",name?: string}) => {
  const res = await fetch(`${process.env.SERVER_URL}/person/list?proposalId=${proposalId}&type=${type}&name=${name}`, {
    method: "GET",
    cache: "no-store",
  });


  if (!res.ok) {
    throw new Error("Erro ao buscar lista");
  }
  const response: ListWebPersonRequestResponse = await res.json();
  console.log(response)
  return response.data;
};