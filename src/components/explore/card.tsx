"use client";

import { AnimatedVerticalComponent } from "@/components/utils/animatedVertical";
import { ImageComponent } from "@/components/utils/image";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface ExploreCardProps {
  alt: string;
  src: string;
  title: string;
  containerClassname: string;
}

export function ExploreCardComponent({
  alt,
  containerClassname,
  src,
  title,
}: ExploreCardProps) {
  const imgDivRef = useRef<any>(null);

  return (
    <div
      ref={imgDivRef}
      className="opacity-[1.5] relative w-full min-w-[390px] max-w-[95%] w-max-[600px] h-[400px] md:w-[400px] md:h-[400px] 
    flex justify-center items-center text-[24px]  tracking-[0.25rem] md:hover:scale-105 duration-300 md:brightness-75 
    active:scale-95 hover:brightness-110  cursor-pointer rounded-md overflow-hidden"
    >
      <div className="bg-black/30 w-full h-full absolute z-30 " />
      <ImageComponent
        alt={alt}
        h={"h-full"}
        w={"w-full"}
        src={`${src}`}
        containerClassname={containerClassname}
      />
      <p className="absolute inset-0 z-30 flex items-center justify-center text-[18px] md:text-[20px] w-[80%] mx-auto text-center brightness-110">
        {title}
      </p>
    </div>
  );
}
