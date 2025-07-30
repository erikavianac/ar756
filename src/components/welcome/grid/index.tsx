"use client"

import { useState } from "react";
import { Image } from "@/types/venue";
import { GridItemComponent } from "./itemGrid";
import { GridModalComponent } from "./gridModal";
interface WelcomeGridProps {
  imageList: Image[];
}

export function WelcomeGridComponent({ imageList }: WelcomeGridProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImageId, setSelectedImageId] = useState<string | undefined>("")
  return (
    <div
      className={`relative w-full grid grid-cols-14 grid-rows-8 gap-2 overflow-hidden  h-[20.125rem]  min-[2300px]:h-[25rem]`}
    >
      {imageList?.map((gridItem: Image, index: number) => {
        return (
          <>
            <GridItemComponent
              gridItem={gridItem}
              index={index}
              key={gridItem.id}
              setIsModalOpen={setIsModalOpen}
              setSelectedImageId={setSelectedImageId}
            />
            {isModalOpen && (
              <GridModalComponent
                key={index}
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                imageId={selectedImageId}
                imageList={imageList}
              />
            )}
          </>
        );
      })}
    </div>
  );
}
