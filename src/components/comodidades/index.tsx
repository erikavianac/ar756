"use client";
import { BiBeer, BiDumbbell } from "react-icons/bi";
import { BsCarFrontFill, BsFlower1 } from "react-icons/bs";
import { FaSwimmingPool, FaWifi } from "react-icons/fa";
import { GiBarbecue, GiDress, GiPartyPopper } from "react-icons/gi";
import { MdSoupKitchen } from "react-icons/md";
import { SectionComponent } from "../utils/section";
import { ImageType, ServiceType } from "@/types";
import { ImageComponent } from "../utils/image";
import { CardComponent } from "../card";
import { ItemCardComponent } from "../card/itemCard";
import { ButtonComponent } from "../utils/button";
import { ModalComponent } from "../utils/modal";
import { ConsultarFormComponent } from "../consultar";
import { useState } from "react";
import { stencilFont } from "@/fonts/constants";

interface ComodidadeCardComponentProps {
  services: ServiceType[];
}

export function ComodidadeComponent({
  services,
}: ComodidadeCardComponentProps) {
  const [isModalOpen, setisModalOpen] = useState<boolean>(false);
  return (
    <SectionComponent>
      <div className="w-screen h-screen relative ">
        <ImageComponent
          alt={"logo-branco"}
          h={"lg:h-[65%] 2xl:h-[85%]"}
          w={"w-[80%] 2xl:w-[70%]"}
          src={
            "https://res.cloudinary.com/dio4rp1nb/image/upload/v1739958372/file_2_gjm6nx_sfgf81_ptlh6x.jpg"
          }
          containerClassname="z-20"
        />
        {/*  <video className="lg:h-[65%] 2xl:h-[85%] w-[80%] 2xl:w-[70%] object-cover" src={"https://d2tb61r1ltgmn5.cloudfront.net/casa02_v01.mp4"} autoPlay loop muted/> */}
        <CardComponent
          h="md:h-[500px]"
          w={"w-[98%] m-auto md:w-[450px]"}
          className="absolute  text-black  flex 
            rounded-md shadow-lg lg:bottom-[2rem] xl:bottom-[10rem] 2xl:bottom-[4.5rem]  lg:right-[1rem] xl:right-[4rem] 2xl:right-[18%] mb-5 2xl:mb-10"
        >
          <div className="flex items-center justify-end w-full space-x-3">
            <div className="flex items-center justify-end w-[140px] ">
              <p className={`${stencilFont.className} text-[40px] text-black`}>
                AR756
              </p>
            </div>
            <div className="border-[1px] border-black flex-1 h-0 " />
            <h1 className="absolute w-full text-2xl text-black top-[4.3rem] left-8">
              COMODIDADES
            </h1>
          </div>
          <div className="flex mt-8 gap-x-10">
            <div className="space-y-3">
              <ItemCardComponent title="Wifi" icon={<FaWifi size={20} />} />
              <ItemCardComponent
                title="Piscina"
                icon={<FaSwimmingPool size={20} />}
              />
              <ItemCardComponent
                title="Cozinha"
                icon={<MdSoupKitchen size={20} />}
              />

              <ItemCardComponent
                title="Churrasqueira"
                icon={<GiBarbecue size={20} />}
              />
            </div>
            <div className="space-y-3">
              <ItemCardComponent title="Bar" icon={<BiBeer size={20} />} />
              <ItemCardComponent
                title="Jardim"
                icon={<BsFlower1 size={20} />}
              />
              <ItemCardComponent title="Camarim" icon={<GiDress size={20} />} />
              <ItemCardComponent
                title="Salao de Festa"
                icon={<GiPartyPopper size={20} />}
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
