import React from "react";
import { GaleriaCardLazy } from "@/components/explore/galeria/galeriaCard.lazy";
import { Metadata } from "next";
import { ImageRequestResponse } from "@/types";
import { HomeHeaderComponent } from "@/components/header";
import { FooterComponent } from "@/components/footer";

export const metadata: Metadata = {
  title: "Galeria - AR756",
  description: "Explore nossa galeria de fotos e conheça nosso espaço único para eventos e produções em São Paulo.",
  openGraph: {
    title: 'Galeria de Fotos - AR756',
    description: 'Explore nossa galeria de fotos e conheça nosso espaço único para eventos e produções em São Paulo.',
    images: [
      {
        url: 'https://res.cloudinary.com/dio4rp1nb/image/upload/v1739958372/file_2_gjm6nx_sfgf81_ptlh6x.jpg',
        width: 1200,
        height: 630,
        alt: 'Galeria AR756 - Espaço para eventos',
      }
    ],
  }
};

export default async function GaleriaPage() {
  const imageList = await fetch(
    `${process.env.SERVER_URL}/image/getByTag?venueId=8159e209-0057-4df3-ae72-855363c3b84e`
  ).then(async (resp) => {
    const response: ImageRequestResponse = await resp.json();
    return response.data.imagesByTag;
  });

  return (
    <div className="flex flex-col min-h-screen w-full bg-faixada">
      <HomeHeaderComponent />
      <main className="flex-1 flex justify-center items-center w-full px-3 py-5">
        <GaleriaCardLazy />
      </main>
      <FooterComponent />
    </div>
  );
}
