"use client";
import { BsSpeaker } from "react-icons/bs";
import { GiCctvCamera } from "react-icons/gi";
import { IoMdMusicalNotes } from "react-icons/io";
import {
  MdOutlineCleaningServices,
  MdOutlineLunchDining,
} from "react-icons/md";
import { RiLightbulbLine } from "react-icons/ri";
import { ImageComponent } from "@/components/utils/image";
import { SectionComponent } from "@/components/utils/section";
import { CardComponent } from "../card";
import { ItemCardComponent } from "../card/itemCard";
import { ButtonComponent } from "../utils/button";
import { ModalComponent } from "../utils/modal";
import { ConsultarFormComponent } from "../consultar";
import { useState } from "react";
import { stencilFont } from "@/fonts/constants";
import { ServiceType } from "@/types";

interface ServicosComponentsProps {
  services: ServiceType[];
}

export function ServicosComponents({ services }: ServicosComponentsProps) {
  const [isModalOpen, setisModalOpen] = useState<boolean>(false);
  return (
    <SectionComponent>
      <div className="hidden md:flex absolute left-10   -mt-[150px]">
        <p
          className={`${stencilFont.className} text-[150px] text-black mt-10 z-20`}
        >
          AR756
        </p>
      </div>
      <div className="w-screen h-screen relative">
        <ImageComponent
          alt={"logo-branco"}
          h={"h-[613px]"}
          w={"w-[100%]"}
          src={
            "https://res.cloudinary.com/dio4rp1nb/image/upload/v1739958364/IMG_7103_oc7ak7_h4ao4c_qevwdd.jpg"
          }
          containerClassname=""
        />
        {/* <video className="h-[613px] w-[100%] object-cover" src={"https://d2tb61r1ltgmn5.cloudfront.net/casa03_v01.mp4"} autoPlay loop muted/> */}
        <CardComponent
          h="md:h-[413px]"
          w={"w-[98%] m-auto md:w-[450px]"}
          className="absolute  text-black  flex  
rounded-md shadow-lg lg:bottom-[14rem]  2xl:bottom-[10.5rem] inset-x-0 "
        >
          <div className="flex items-center justify-end w-full space-x-3">
            <div className="border-[1px] border-black flex-1 h-0 " />
            <p
              className={`${stencilFont.className} text-[40px] text-black z-20 w-[30%]`}
            >
              AR756
            </p>
            <h1 className="absolute w-full text-end text-2xl text-black top-[4.3rem] pr-[45px]">
              SERVICOS EXTRAS
            </h1>
          </div>
          <div className="flex justify-center mt-8 gap-x-10 ">
            <div className="flex flex-col w-full gap-y-3">
              <ItemCardComponent
                title="DJ"
                icon={<IoMdMusicalNotes size={20} />}
              />
              <ItemCardComponent title="Som" icon={<BsSpeaker size={20} />} />
              <ItemCardComponent
                title="Comida"
                icon={<MdOutlineLunchDining size={20} />}
              />
            </div>
            <div className="flex flex-col gap-y-3">
              <ItemCardComponent
                title="Limpeza"
                icon={<MdOutlineCleaningServices size={20} />}
              />
              <ItemCardComponent
                title="Seguranca"
                icon={<GiCctvCamera size={20} />}
              />
              <ItemCardComponent
                title="Iluminacao"
                icon={<RiLightbulbLine size={20} />}
              />
            </div>
          </div>
          <ButtonComponent
            title="CONSULTAR"
            className={`
          z-30
          px-10 py-4
          text-[15px]  xl:text-[20px]
          hover:bg-zinc-900
           tracking-[0.30rem] text-white rounded-md bg-black
          transition duration-300 ease-in-out hover:scale-[1.05] active:scale-[0.95] active:transition-none active:duration-700
          `}
            onClick={() => setisModalOpen(true)}
          />
          {isModalOpen && (
            <ModalComponent onClose={() => setisModalOpen(false)}>
              <ConsultarFormComponent
                services={services}
                handleCloseReservaModal={() => setisModalOpen(false)}
              />
            </ModalComponent>
          )}
        </CardComponent>
      </div>
    </SectionComponent>
  );
}
