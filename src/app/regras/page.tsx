import React from "react";
import { RegrasCardComponent } from "@/components/explore/regras/regrasCard";

export default async function Regras() {
  const [
    textRegrasList,
    textSobreList,
    imageSobreList
  ] = await Promise.all([
    fetch(`${process.env.SERVER_URL}/text/getByArea/regras`, {
      method: "GET",
    }).then(resp => resp.json()),
    fetch(`${process.env.SERVER_URL}/text/getByArea/sobre`, {
      method: "GET",
    }).then(resp => resp.json()),
    fetch(`${process.env.SERVER_URL}/image/getByTag/Sobre/Web`, {
      method: "GET",
    }).then(resp => resp.json())
  ]);

  return (
    <div className="flex justify-center items-center pt-20">
      <div className="flex-1 mt-20">
        <RegrasCardComponent textRegrasList={textRegrasList} textSobreList={textSobreList}  imageSobreList={imageSobreList}/>
      </div>
    </div>
  );
}
