import { BsSpeaker } from "react-icons/bs";
import { GiCctvCamera } from "react-icons/gi";
import { IoMdMusicalNotes } from "react-icons/io";
import {
  MdOutlineCleaningServices,
  MdOutlineLunchDining,
} from "react-icons/md";
import { RiLightbulbLine } from "react-icons/ri";
import { ImageComponent } from "@/components/utils/image";
import { CardComponent } from "../card";
import { ItemCardComponent } from "../card/itemCard";
import { useEffect, useState } from "react";
import { ButtonComponent } from "../utils/button";
import { ModalComponent } from "../utils/modal";
import { ConsultarFormComponent } from "../consultar";
import { useRouter } from "next/navigation";
import { stencilFont } from "@/fonts/constants";
import { ServiceType } from "@/types";
import { ConsultarFormLazy } from "../consultar/consultar.lazy";

interface ServicoCardProps {
  services: ServiceType[];
}

export function ServicoCardComponent({ services }: ServicoCardProps) {
  const [isModalOpen, setisModalOpen] = useState<boolean>(false);
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
    <CardComponent
      h=" h-full md:h-[500px]"
      w={"w-full m-auto md:w-[450px]"}
      className={`md:absolute  text-black   
        rounded-md shadow-lg md:bottom-[6.5rem] md:right-[18%] mb-5 md:mb-10 
        min-w-full
        `}
      aria-label="Serviços extras disponíveis"
    >
      <div className="relative flex items-center justify-end w-full space-x-3">
        <div className="border-[1px] border-black flex-1 h-0 " />
        <div className="flex items-center justify-start w-[140px]  ">
          <p 
            className={`${stencilFont.className} text-[40px] text-black`}
            role="img"
            aria-label="AR756 - Logo"
          >
            AR756
          </p>
        </div>
        <h1 className="absolute w-full text-end text-2xl text-black top-[2.7rem] pr-[45px]">
          SERVICOS EXTRAS
        </h1>
      </div>
      <div 
        className="flex justify-center flex-1 mt-8 gap-x-10"
        role="list"
        aria-label="Lista de serviços"
      >
        <div className="flex flex-col w-full gap-y-3">
          <ItemCardComponent 
            title="DJ" 
            icon={<IoMdMusicalNotes size={20} />} 
          />
          <ItemCardComponent 
            title="Som" 
            icon={<BsSpeaker size={20} />} 
          />
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
          text-[15px]  md:text-[20px]
          hover:bg-zinc-900
           tracking-[0.30rem] text-white rounded-md bg-black
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
        <ConsultarFormLazy
            services={services}
            handleCloseReservaModal={() => setisModalOpen(false)}
          />
        </ModalComponent>
      )}
    </CardComponent>
  );
}
