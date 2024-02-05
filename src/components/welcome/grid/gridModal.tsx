import { useState } from "react";
import { ImageType } from "@/types";
import { AnimatePresence, motion } from "framer-motion";
import { ImageComponent } from "@/components/utils/image";
import { ModalComponent } from "@/components/utils/modal";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

interface GridModalProps {
  isModalOpen: boolean;
  imageList: ImageType[] | undefined;
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
      ? imageList?.findIndex((item: ImageType) => item.id === imageId)
      : 0
  );
  return (
    <ModalComponent
      onClose={() => setIsModalOpen(false)}
      styleInternal="bg-transparent flex flex-row  md:h-[31.25rem] md:w-[60rem] relative"
    >
      {searchIndex && searchIndex > 0 && (
        <MdKeyboardArrowLeft
          className="text-white text-[3rem] z-30 absolute mt-[14rem] cursor-pointer"
          onClick={() => {
            setSearchIndex(() => searchIndex - 1);
          }}
        />
      )}
      <motion.div
        className="flex flex-row z-10"
        initial={{ x: searchIndex * -960 }}
        animate={{ x: searchIndex * -960 }}
        transition={{ duration: 0.5 }}
      >
        {imageList &&
          imageList.map((image: ImageType) => {
            return (
              <ImageComponent
                key={image.id}
                h="md:h-[31.25rem]"
                w={"md:w-[60rem]"}
                src={image.imageUrl}
                alt="photo"
              />
            );
          })}
      </motion.div>
      {imageList && searchIndex < imageList?.length - 1 && (
        <MdKeyboardArrowRight
          className="text-white absolute mt-[14rem]  z-30 right-0  text-[3rem]  cursor-pointer"
          onClick={() => {
            setSearchIndex(() => searchIndex + 1);
          }}
        />
      )}
    </ModalComponent>
  );
}
