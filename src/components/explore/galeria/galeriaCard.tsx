"use client"
import React, { useEffect, useState } from "react";
import GaleriaListComponent from "./galeriaList";
import { ImageComponent } from "@/components/utils/image";
import CloseButtonComponent from "@/components/utils/closeButton";
import { ImageType } from "@/types";
import { stencilFont } from "@/fonts/constants";
import { useVenueContext } from "@/app/context/VenueContext";
interface GaleriaCardProps {
  handleCloseGaleriaModa?: () => void;
}

const GaleriaCardComponent = ({
  handleCloseGaleriaModa,
}: GaleriaCardProps) => {
  const { getImagesByTag, venue } = useVenueContext();
  const galleryImageList = getImagesByTag("Gallery");

  const [galeriaModalMode, setGaleriaModalMode] = useState<
    "TODAS" | "AREA EXTERNA" | "SALAO INTERNO" | "SALAO EXTERNO"
  >("TODAS");

  return (
    <div className="bg-white  max-w-[97%] min-w-[97%] min-h-[97%]  overflow-y-auto   relative  rounded-md   md:rounded-md py-2 px-5 flex flex-col gap-y-3  z-30  md:mt-2">
      {handleCloseGaleriaModa && (
        <>
          <p className={`${stencilFont.className} text-[80px]  z-50 mx-auto`}>AR756</p>
          <CloseButtonComponent handleCloseModal={handleCloseGaleriaModa} />
        </>
      )}
      <div className="flex flex-col md:flex-row gap-x-1 md:gap-x-5 font-semibold relative text-[9px] md:text-[11px] gap-y-1 w-full justify-center items-start ">
        <div className="w-fit">
          <p
            className={`relative cursor-pointer tracking-[0.10rem] ${
              galeriaModalMode.includes("TODAS") &&
              "after:absolute after:bottom-0 after:left-0 after:w-full after:h-[0.05rem] after:bg-black"
            }`}
            onClick={() => setGaleriaModalMode("TODAS")}
          >
            TODAS
          </p>
        </div>
        <div className="w-fit ">
          <p
            className={`relative cursor-pointer tracking-[0.10rem] ${
              galeriaModalMode.includes("AREA EXTERNA") &&
              "after:absolute after:bottom-0 after:left-0 after:w-full after:h-[0.05rem] after:bg-black"
            }`}
            onClick={() => setGaleriaModalMode("AREA EXTERNA")}
          >
            AREA EXTERNA
          </p>
        </div>
        <div className="w-fit">
          <p
            className={`relative cursor-pointer tracking-[0.10rem] ${
              galeriaModalMode.includes("SALAO INTERNO") &&
              "after:absolute after:bottom-0 after:left-0 after:w-full after:h-[0.05rem] after:bg-black"
            }`}
            onClick={() => setGaleriaModalMode("SALAO INTERNO")}
          >
            SALAO INTERNO
          </p>
        </div>
        <div className="w-fit">
          <p
            className={`relative cursor-pointer tracking-[0.10rem] ${
              galeriaModalMode.includes("SALAO EXTERNO") &&
              "after:absolute after:bottom-0 after:left-0 after:w-full after:h-[0.05rem] after:bg-black"
            }`}
            onClick={() => setGaleriaModalMode("SALAO EXTERNO")}
          >
            SALAO EXTERNO
          </p>
        </div>
      </div>
      <GaleriaListComponent
        galeriaModalMode={galeriaModalMode}
        imageList={galleryImageList}
      />
    </div>
  );
}

export default GaleriaCardComponent;
