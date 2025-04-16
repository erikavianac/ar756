import { ConsultarFormComponent } from "@/components/consultar";
import { ServiceRequestResponse } from "@/types";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Consultar Orcamento",
};

export default async function ConsultarPage() {
  const services = await fetch(
    `${process.env.SERVER_URL}/service/list?venueId=8159e209-0057-4df3-ae72-855363c3b84e`,
    {
      method: "GET",
    }
  ).then(async (resp) => {
    const response: ServiceRequestResponse = await resp.json();
    return response?.data?.serviceList;
  });
  return (
    <div className="flex justify-center items-center pt-28">
      <ConsultarFormComponent services={services}/>
    </div>
  );
}
