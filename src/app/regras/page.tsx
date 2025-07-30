import React from "react";
import { RegrasCardComponent } from "@/components/explore/regras/regrasCard";
import { ImageRequestResponse, TextRequestResponse } from "@/types";
import { HomeHeaderComponent } from "@/components/header";
import { FooterComponent } from "@/components/footer";

export default async function Regras() {
  const [textSobreList, imageSobreList] = await Promise.all([
    fetch(
      `${process.env.SERVER_URL}/text/list?venueId=8159e209-0057-4df3-ae72-855363c3b84e&area=Sobre`
    ).then(async (resp) => {
      const response: TextRequestResponse = await resp.json();
      return response?.data?.textList;
    }),
    fetch(
      `${process.env.SERVER_URL}/image/getByTag?venueId=8159e209-0057-4df3-ae72-855363c3b84e&tag=Sobre&responsiveMode=`
    ).then(async (resp) => {
      const response: ImageRequestResponse = await resp.json();
      return response.data.imagesByTag;
    }),
  ]);

  return (
    <div className="flex flex-col min-h-screen w-full bg-faixada">
      <HomeHeaderComponent />
      <main className="flex-1 flex justify-center items-center w-full px-3 py-5">
        <RegrasCardComponent/>
      </main>
      <FooterComponent />
    </div>
  );
}
