import { useEffect, useState } from "react";
import { Image } from "@/types/venue";
import { AnimatePresence, motion } from "framer-motion";
import { ImageComponent } from "@/components/utils/image";
import { ModalComponent } from "@/components/utils/modal";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

interface GridModalProps {
  isModalOpen: boolean;
  imageList: Image[];
  imageId: string | undefined;
  setIsModalOpen: (value: boolean) => void;
}

export function GridModalComponent({
  imageId,
  imageList,
  isModalOpen,
  setIsModalOpen,
}: GridModalProps) {
  const [searchIndex, setSearchIndex] = useState<number>(
    imageList
      ? imageList?.findIndex((item: Image) => item.id === imageId)
      : 0
  );

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

  return (
    <ModalComponent
    styleExternal="bg-black"
      onClose={() => setIsModalOpen(false)}
      styleInternal="bg-transparent flex flex-row w-[90%] rounded-md  md:h-[31.25rem] md:w-[60rem] relative"
    >
      {searchIndex && searchIndex > 0 && (
        <MdKeyboardArrowLeft
          className="text-white text-[3rem] z-30 absolute mt-[7rem] lg:mt-[14rem] cursor-pointer"
          onClick={() => {
            setSearchIndex(() => searchIndex - 1);
          }}
        />
      )}
      <motion.div
        className="flex flex-row z-10"
        initial={{ x: isSmallScreen ? searchIndex * -400 :  searchIndex * -960 }}
        animate={{ x: isSmallScreen ? searchIndex * -400 :  searchIndex * -960 }}
        transition={{ duration: 0.5 }}
      >
        {imageList &&
          imageList?.map((image: Image) => {
            return (
              <ImageComponent
                key={image.id}
                h="h-[16rem] md:h-[31.25rem]"
                w={"w-[25rem] md:w-[60rem]"}
                src={image.imageUrl}
                alt="photo"
              />
            );
          })}
      </motion.div>
      {imageList && searchIndex < imageList?.length - 1 && (
        <MdKeyboardArrowRight
          className="text-white absolute mt-[7rem] lg:mt-[14rem]  z-30 right-0  text-[3rem]  cursor-pointer"
          onClick={() => {
            setSearchIndex(() => searchIndex + 1);
          }}
        />
      )}
    </ModalComponent>
  );
}
