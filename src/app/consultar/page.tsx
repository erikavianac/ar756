import { ConsultarFormComponent } from "@/components/consultar";
import { FooterComponent } from "@/components/footer";
import { HomeHeaderComponent } from "@/components/header";
import { ServiceRequestResponse } from "@/types";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Consultar Orçamento - AR756",
  description: "Solicite um orçamento para seu evento ou produção no AR756. Espaço completo com piscina, jardim e muito mais em São Paulo.",
  openGraph: {
    title: 'Consultar Orçamento - AR756',
    description: 'Solicite um orçamento para seu evento ou produção no AR756. Espaço completo com piscina, jardim e muito mais em São Paulo.',
    images: [
      {
        url: 'https://res.cloudinary.com/dio4rp1nb/image/upload/v1739958372/file_2_gjm6nx_sfgf81_ptlh6x.jpg',
        width: 1200,
        height: 630,
        alt: 'AR756 - Consultar Orçamento',
      }
    ],
  }
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
    <div className="flex flex-col min-h-screen w-full bg-faixada">
      <HomeHeaderComponent />
      <main className="flex-1 flex justify-center items-center w-full px-3 py-5">
        <ConsultarFormComponent services={services} />
      </main>
      <FooterComponent />
    </div>
  );
}
