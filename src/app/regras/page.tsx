import React from "react";
import { RegrasCardComponent } from "@/components/explore/regras/regrasCard";

export default async function Regras() {
  const textRegrasList = await fetch(
    `${process.env.BASE_URL}/text/getByArea/regras`,
    {
      method: "GET",
      cache: "no-cache",
    }
  ).then(async (resp) => {
    return await resp.json();
  });

  const textSobreList = await fetch(
    `${process.env.BASE_URL}/text/getByArea/sobre`,
    {
      method: "GET",
      cache: "no-cache",
    }
  ).then(async (resp) => {
    return await resp.json();
  });

  const imageSobreList = await fetch(`${process.env.BASE_URL}/image/getByTag/Sobre/Web`, {
    method: "GET",
    cache: "no-cache",
  }).then(async (resp) => {
    return await resp.json();
  });

  return (
    <div className="flex justify-center items-center pt-20">
      <div className="flex-1 mt-10">
        <RegrasCardComponent textRegrasList={textRegrasList} textSobreList={textSobreList}  imageSobreList={imageSobreList}/>
      </div>
    </div>
  );
}
