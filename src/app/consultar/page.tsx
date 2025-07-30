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

  return (
    <div className="flex flex-col min-h-screen w-full bg-faixada">
      <HomeHeaderComponent />
      <main className="flex-1 flex justify-center items-center w-full px-3 py-5">
        <ConsultarFormComponent />
      </main>
      <FooterComponent />
    </div>
  );
}
