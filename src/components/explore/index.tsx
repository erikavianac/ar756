"use client";
import { useEffect, useState } from "react";
import { ImageType, QuestionType, TextType } from "@/types";
import { ExploreCardComponent } from "./card";

import { AnimatedVerticalComponent } from "@/components/utils/animatedVertical";
import { ModalComponent } from "../utils/modal";
import { GaleriaCardComponent } from "./galeria/galeriaCard";
import FaqComponent from "./faq";
import { RegrasCardComponent } from "./regras/regrasCard";
import { useRouter } from "next/navigation";
import { stencilFont } from "@/fonts/constants";

interface ExploreProps {
  imageList: ImageType[];
  textSobreList: TextType[];
  cardImageList: ImageType[];
  imageSobreList: ImageType[];
  textRegrasList: TextType[];
  questionList: QuestionType[];
}

export function ExploreComponent({
  cardImageList,
  imageList,
  questionList,
  textRegrasList,
  textSobreList,
  imageSobreList,
}: ExploreProps) {
  const [galeriaModal, setGaleriaModal] = useState(false);
  const [regrasModal, setRegrasModal] = useState(false);
  const [FAQModal, setFAQModal] = useState(false);

  function handleCloseGaleriaModa() {
    setGaleriaModal(false);
  }

  function handleOpenGaleriaModa() {
    setGaleriaModal(true);
  }

  function handleCloseFaqModal() {
    setFAQModal(false);
  }

  function handleOpenFaqModal() {
    setFAQModal(true);
  }

  function handleCloseRegrasModal() {
    setRegrasModal(false);
  }

  function handleOpenRegrasModal() {
    setRegrasModal(true);
  }

  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const { push } = useRouter();
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

  return (
    <>
      <div className=" text-[#555D2D] w-full h-full flex flex-col  justify-center pb-5 items-center gap-y-8 pt-8 px-2 mx-auto  lg:gap-y-16  lg:-mt-16">
        <div className="flex items-center justify-center w-full h-full">
          <p
            className={`${stencilFont.className}  text-center text-black text- lg:text-[18px] xl:text-[40px] tracking-[0.25rem] font-semibold`}
          >
            MAIS INFORMAÇÕES
          </p>
        </div>
        <div className="w-full  lg:w-[80%]   flex lg:gap-x-10 text-white justify-center items-center flex-col lg:flex-row gap-y-4 lg:gap-y-0">
          {cardImageList && (
            <>
              <div
                className="w-full "
                onClick={() => {
                  if (isSmallScreen) {
                    push("/regras");
                  } else {
                    handleOpenRegrasModal();
                  }
                }}
              >
                <ExploreCardComponent
                  alt="foto"
                  containerClassname="z-20"
                  src={cardImageList[0]?.imageUrl}
                  title="SOBRE E REGRAS"
                />
              </div>
              <div
                className="w-full"
                onClick={() => {
                  if (isSmallScreen) {
                    push("/faq");
                  } else {
                    handleOpenFaqModal();
                  }
                }}
              >
                <ExploreCardComponent
                  alt="foto"
                  containerClassname="z-20"
                  src={cardImageList[1]?.imageUrl}
                  title="FAQ"
                />
              </div>
              <div
                className="w-full"
                onClick={() => {
                  if (isSmallScreen) {
                    push("/galeria");
                  } else {
                    handleOpenGaleriaModa();
                  }
                }}
              >
                <ExploreCardComponent
                  alt="foto"
                  containerClassname="z-20"
                  src={cardImageList[2]?.imageUrl}
                  title="GALERIA"
                />
              </div>
            </>
          )}
        </div>
        {galeriaModal && (
          <ModalComponent
            onClose={handleCloseGaleriaModa}
            styleInternal="max-w-[90%] min-w-[90%]  max-h-[90%] min-h-[90%]  md:max-w-[600px]  md:min-w-[600px]   relative bg-white"
          >
            <GaleriaCardComponent
              handleCloseGaleriaModa={handleCloseGaleriaModa}
              imageList={imageList}
            />
          </ModalComponent>
        )}
        {FAQModal && (
          <ModalComponent
            onClose={handleCloseFaqModal}
            styleInternal="max-w-[90%] min-w-[90%]  max-h-[90%] min-h-[90%]  md:max-w-[600px]  md:min-w-[600px]   relative"
          >
            <FaqComponent
              handleCloseFaqModal={handleCloseFaqModal}
              questionList={questionList}
            />
          </ModalComponent>
        )}
        {regrasModal && (
          <ModalComponent
            onClose={handleCloseRegrasModal}
            styleInternal="max-w-[90%] min-w-[90%]  max-h-[90%] min-h-[90%]  md:max-w-[600px]  md:min-w-[600px]   relative"
          >
            <RegrasCardComponent
              handleCloseRegrasModal={handleCloseRegrasModal}
              textRegrasList={textRegrasList}
              textSobreList={textSobreList}
              imageSobreList={imageSobreList}
            />
          </ModalComponent>
        )}
      </div>
    </>
  );
}
