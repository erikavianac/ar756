import React from "react";
import { GaleriaCardComponent } from "@/components/explore/galeria/galeriaCard";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Galeria"
};

export default async function Galeria() {
  const imageList = await fetch(`${process.env.BASE_URL}/image/list`, {
    method: "GET",
    cache: "no-cache",
  }).then(async (resp) => {
    return await resp.json();
  });

  return (
    <div className="flex justify-center items-center pt-20">
      <div className="flex-1 mt-10">
        <GaleriaCardComponent imageList={imageList} />
      </div>
    </div>
  );
}
