import React from "react";
import { GaleriaCardComponent } from "@/components/explore/galeria/galeriaCard";
import { Metadata } from "next";
import { ImageRequestResponse } from "@/types";
import { HomeHeaderComponent } from "@/components/header";
import { FooterComponent } from "@/components/footer";

export const metadata: Metadata = {
  title: "Galeria",
  metadataBase: new URL("https://ar756.com"),
};

export default async function Galeria() {
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
        <GaleriaCardComponent imageList={imageList} />
      </main>
      <FooterComponent />
    </div>
  );
}
