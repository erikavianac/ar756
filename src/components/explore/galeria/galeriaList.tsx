import React, { useEffect, useState } from "react";
import Scrollbars from "react-custom-scrollbars";
import { ImageType } from "@/types";
import GaleriaItemComponent from "./galeriaItem";

interface GaleriaListProps {
  galeriaModalMode: string;
  imageList: ImageType[] | undefined;
}

export default function GaleriaListComponent({
  galeriaModalMode,
  imageList,
}: GaleriaListProps) {
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  // Função para verificar se a tela é pequena ou grande
  const checkScreenSize = () => {
    setIsSmallScreen(window.innerWidth <= 768); // Por exemplo, consideramos 768px como o ponto de corte para ser uma tela pequena
  };

  // Executa a função ao montar o componente
  useEffect(() => {
    checkScreenSize();

    // Adiciona um listener para verificar quando a tela for redimensionada
    window.addEventListener("resize", checkScreenSize);

    // Remove o listener ao desmontar o componente para evitar vazamentos de memória
    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []);
  /* 
    if(imageListIsLoading){
        return (
          <ImageLoadingComponent/>
        )
    } */

  return (
    <Scrollbars
      style={{
        width: "100%",
        height: 450,
        gap: 20,
      }}
    >
      <div className="flex flex-wrap items-center justify-center w-full gap-2 md:gap-1 pb-5 md:pb-0 ">
        {imageList &&
          imageList.map((item: ImageType, index: number) => {
            if (
              !galeriaModalMode
                .toLocaleLowerCase()
                .includes(item.area.toLocaleLowerCase()) &&
              !galeriaModalMode.includes("TODAS")
            ) {
              return;
            }

            if(item?.tag === "Sobre"){
              return
            }

            if(item?.responsiveMode === "Mobile"){
              return
            }

            if(item?.tag === "Home"){
              return
            }

            if(item?.tag === "Area"){
              return
            }

            return (
              <GaleriaItemComponent imageList={imageList} index={index} item={item} key={item?.id}/>
            );
          })}
      </div>
    </Scrollbars>
  );
}
