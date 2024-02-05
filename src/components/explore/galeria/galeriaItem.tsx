import { ImageComponent } from "@/components/utils/image";
import { GridModalComponent } from "@/components/welcome/grid/gridModal";
import { ImageType } from "@/types";
import { motion } from "framer-motion";
import React, { useState } from "react";

interface GaleriaItemProps{
    index: number;
    item: ImageType;
    imageList: ImageType[] | undefined;
}

export default function GaleriaItemComponent({item,index,imageList}:GaleriaItemProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          transition: { duration: 1 },
        }}
        /*                onClick={handleOpenModal} */
        key={item.imageUrl}
        className="overflow-hidden rounded-lg shadow-pics cursor-pointer"
        onClick={() => setIsModalOpen(true)}
      >
        <ImageComponent
          alt={""}
          h={"h-[200px] md:h-[180px]"}
          w={"w-[395px] md:w-[250px]"}
          src={`${item.imageUrl}`}
          containerClassname={" rounded-lg "}
        />
      </motion.div>
      {isModalOpen && (
        <GridModalComponent
          key={index}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          imageId={item.id}
          imageList={imageList}
        />
      )}
    </>
  );
}
