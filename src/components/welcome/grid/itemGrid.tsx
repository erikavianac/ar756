"use client"

import { useState } from "react";
import { ImageType } from "@/types";
import { GridModalComponent } from "./gridModal";
import { ImageComponent } from "@/components/utils/image";
interface GridItemProps {
  index: number;
  gridItem: ImageType;
  setIsModalOpen: (value: boolean) => void;
  setSelectedImageId: (value : string | undefined) => void;
}

export function GridItemComponent({ gridItem, index,setIsModalOpen,setSelectedImageId }: GridItemProps) {
  const gridPositionToClasses = [
    "col-start-1 col-end-3 row-start-1 row-end-12",
    "col-start-3 col-end-5 row-start-1 row-end-6",
    "col-start-3 col-end-5 row-start-6 row-end-12",
    "col-start-5 col-end-6 row-start-1 row-end-12",
    "col-start-6 col-end-8 row-start-1 row-end-6",
    "col-start-6 col-end-8 row-start-6 row-end-12",
  ];

  return (
    <div
      className={` rounded-md  hover:scale-[1.01] cursor-pointer hover:z-30 duration-300  shadow-lg  
      overflow-hidden  hover:brightness-110 ${gridPositionToClasses[index]}`}
      onClick={() => {
        setIsModalOpen(true)
        setSelectedImageId(gridItem.id)
      }}
    >
      <ImageComponent
        alt={gridItem.area}
        h={"h-full "}
        w={"w-full"}
        src={gridItem?.imageUrl}
      />
    </div>
  );
}
