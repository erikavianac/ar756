import { ImageComponent } from "@/components/utils/image";
import { GridModalComponent } from "@/components/welcome/grid/gridModal";
import { Image } from "@/types/venue";
import { motion } from "framer-motion";
import React, { useState } from "react";

interface GaleriaItemProps{
    index: number;
    item: Image;
    imageList: Image[];
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
          alt={item.description || "Imagem da galeria"}
          h={"h-[200px] md:h-[180px]"}
          w={"w-[395px] md:w-[250px]"}
          src={item.imageUrl}
          containerClassname={"rounded-lg"}
          priority={index < 6}
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
