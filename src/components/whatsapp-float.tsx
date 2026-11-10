"use client";

import { TbBrandWhatsapp } from "react-icons/tb";
import AnchorComponent from "@/components/utils/anchor";
import { useVenueContext } from "@/app/context/VenueContext";

export function WhatsappFloatComponent() {
  const { getWhatsappLink } = useVenueContext();

  return (
    <AnchorComponent
      href={getWhatsappLink("Olá! Vi o site da AR756 e gostaria de saber mais informações.")}
      icon={
        <TbBrandWhatsapp
          className="cursor-pointer text-white"
          size={30}
        />
      }
      bgColor="bg-[#25D366] border-[2px] border-white"
    />
  );
}
