import React from "react";
import { RegrasCardComponent } from "@/components/explore/regras/regrasCard";
import { ImageRequestResponse, TextRequestResponse } from "@/types";
import { HomeHeaderComponent } from "@/components/header";
import { FooterComponent } from "@/components/footer";

export default async function Regras() {
 
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
