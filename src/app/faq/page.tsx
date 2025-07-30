import FaqComponent from "@/components/explore/faq";
import { FooterComponent } from "@/components/footer";
import { HomeHeaderComponent } from "@/components/header";
import { QuestionRequestResponse } from "@/types";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Perguntas Frequentes - AR756",
  description: "Encontre respostas para as principais dúvidas sobre eventos, filmagens e produções no AR756. Tudo que você precisa saber sobre nosso espaço.",
  openGraph: {
    title: 'Perguntas Frequentes - AR756',
    description: 'Encontre respostas para as principais dúvidas sobre eventos, filmagens e produções no AR756. Tudo que você precisa saber sobre nosso espaço.',
    images: [
      {
        url: 'https://res.cloudinary.com/dio4rp1nb/image/upload/v1739958372/file_2_gjm6nx_sfgf81_ptlh6x.jpg',
        width: 1200,
        height: 630,
        alt: 'AR756 - Perguntas Frequentes',
      }
    ],
  }
};

export default async function Faq() {

  return (
    <div className="flex flex-col min-h-screen w-full bg-faixada">
      <HomeHeaderComponent />
      <main className="flex-1 flex justify-center items-center w-full px-3 py-5">
        <FaqComponent  />
      </main>
      <FooterComponent />
    </div>
  );
}
