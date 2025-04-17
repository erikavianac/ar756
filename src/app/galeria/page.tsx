import React from "react";
import { GaleriaCardComponent } from "@/components/explore/galeria/galeriaCard";
import { Metadata } from "next";
import { ImageRequestResponse } from "@/types";

export const metadata: Metadata = {
  title: "Galeria",
};

export default async function Galeria() {
  const imageList = await fetch(
    `${process.env.SERVER_URL}/image/list?venueId=8159e209-0057-4df3-ae72-855363c3b84e`
  ).then(async (resp) => {
    const response: ImageRequestResponse = await resp.json();
    return response.data.imagesByTag;
  });

  return (
    <div className="flex justify-center items-center pt-20">
      <div className="flex-1 mt-20">
        <GaleriaCardComponent imageList={imageList} />
      </div>
    </div>
  );
}
