"use client";
import { useState } from "react";
import { ValueType } from "@/types";
import { ButtonComponent } from "../utils/button";
import { SectionComponent } from "../utils/section";
import { ModalComponent } from "../utils/modal";
import { ConsultarFormComponent } from "../consultar";
import { ShowOnlyOnMobileComponent } from "../utils/showOnlyOnMobile";
import { ShowOnlyOnWebComponent } from "../utils/showOnlyOnWeb";

export function VideobgComponent() {
  const [isModalOpen, setisModalOpen] = useState<boolean>(false);
  return (
    <SectionComponent classname="object-cover">
      <ShowOnlyOnMobileComponent>
        <video
          className="max-h-full min-h-screen min-w-screen object-cover z-0"
          src={"/assets/video/videoBg.mp4"}
          autoPlay
          loop
          muted
        />
      </ShowOnlyOnMobileComponent>
      <ShowOnlyOnWebComponent>
      <video
          className="max-h-full min-h-screen min-w-screen object-cover z-0"
          src={"/assets/video/videoBg.mp4"}
          autoPlay
          loop
          muted
        />
      </ShowOnlyOnWebComponent>
      <ButtonComponent
        title="CONSULTAR"
        className={`
          before:text-opacity-40
          z-30
          absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  
          px-10 py-4
          text-[15px]  md:text-[20px]
          hover:bg-zinc-900
          hover:text-opacity-100
           tracking-[0.30rem] text-white rounded-md bg-black/50
          transition duration-300 ease-in-out hover:scale-[1.05] active:scale-[0.95] active:transition-none active:duration-700
          `}
        onClick={() => setisModalOpen(true)}
      />
      {isModalOpen && (
        <ModalComponent onClose={() => setisModalOpen(false)}>
          <ConsultarFormComponent
            handleCloseReservaModal={() => setisModalOpen(false)}
          />
        </ModalComponent>
      )}
    </SectionComponent>
  );
}
