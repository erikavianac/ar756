"use client";
import { useEffect, useState } from "react";
import { CldVideoPlayer } from "next-cloudinary";
import { ButtonComponent } from "../utils/button";
import { SectionComponent } from "../utils/section";
import { ModalComponent } from "../utils/modal";
import { ConsultarFormComponent } from "../consultar";
import { ShowOnlyOnMobileComponent } from "../utils/showOnlyOnMobile";
import { ShowOnlyOnWebComponent } from "../utils/showOnlyOnWeb";
import { useRouter } from "next/navigation";
import { ImageType, ServiceType } from "@/types";
import { MainCarroucel } from "../utils/mainCarroucel";

interface VideobgProps{
  services: ServiceType[];
  mobileCarroucelmageList: ImageType[]
}

export function VideobgComponent({mobileCarroucelmageList,services}:VideobgProps) {
  const [isModalOpen, setisModalOpen] = useState<boolean>(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [screenSizeChecked, setScreenSizeChecked] = useState(false);
  const { replace, push } = useRouter();
  // Função para verificar se a tela é pequena ou grande
  const checkScreenSize = () => {
    setIsSmallScreen(window.innerWidth <= 768); // Por exemplo, consideramos 768px como o ponto de corte para ser uma tela pequena
  };

  // Executa a função ao montar o componente
  useEffect(() => {
    checkScreenSize();

    // Adiciona um listener para verificar quando a tela for redimensionada
    window.addEventListener("resize", checkScreenSize);
    setScreenSizeChecked(true); //

    // Remove o listener ao desmontar o componente para evitar vazamentos de memória
    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []);
  
  return (
    <SectionComponent classname="object-cover">
      <ShowOnlyOnMobileComponent>
      <MainCarroucel mobileCarroucelmageList={mobileCarroucelmageList} />
      </ShowOnlyOnMobileComponent>
      <ShowOnlyOnWebComponent>
        {
          !isSmallScreen && screenSizeChecked &&
       <video
          className=" min-h-screen min-w-screen object-fill z-0"
          src={"https://d2tb61r1ltgmn5.cloudfront.net/casa01_v01 (1).mp4"}
          autoPlay
          loop
          muted
        /> 
        }
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
        onClick={() => {
          if (isSmallScreen) {
            push("/consultar");
          } else {
            setisModalOpen(true);
          }
        }}
      />
      {isModalOpen && (
        <ModalComponent onClose={() => setisModalOpen(false)}>
          <ConsultarFormComponent
            services={services}
            handleCloseReservaModal={() => setisModalOpen(false)}
          />
        </ModalComponent>
      )}
    </SectionComponent>
  );
}
