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
      className="opacity-[1.5] relative h-[400px] lg:w-[300px] lg:h-[300px] xl:w-[400px] xl:h-[400px] 2xl:w-[600px] 2xl:h-[600px]
    flex justify-center items-center text-[24px]  tracking-[0.25rem] lg:hover:scale-105 duration-300 lg:brightness-75 
    active:scale-95 hover:brightness-110  cursor-pointer rounded-lg overflow-hidden"
    >
      <div className="bg-black/30 w-full h-full absolute z-30 " />
      <ImageComponent
        alt={alt}
        h={"h-full"}
        w={"w-full"}
        src={`${src}`}
        containerClassname={containerClassname}
      />
      <p className="absolute inset-0 z-30 flex items-center justify-center text-[18px] lg:text-[20px] w-[80%] mx-auto text-center brightness-110">
        {title}
      </p>
    </div>
  );
}
