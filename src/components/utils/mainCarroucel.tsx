'use client';
import { ImageType } from "@/types";
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import Image from "next/image";

interface MainCarroucelProps {
  mobileCarroucelmageList: ImageType[];
}

export function MainCarroucel({ mobileCarroucelmageList }: MainCarroucelProps) {
  const [curr, setCurr] = useState(0);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (mobileCarroucelmageList?.length) {
      const intervalId = setInterval(() => {
        setCurr((curr) => (curr + 1) % mobileCarroucelmageList.length);
      }, 3000);
      return () => clearInterval(intervalId);
    }
  }, [mobileCarroucelmageList]);

  if (!isClient || !mobileCarroucelmageList?.length) {
    return null;
  }

  const currentImage = mobileCarroucelmageList[curr];
  if (!currentImage?.imageUrl) {
    return null;
  }

  return (
    <div className="flex">
      <AnimatePresence mode="popLayout">
        <motion.div
          className="max-h-screen min-h-screen h-full w-full relative"
          key={currentImage.imageUrl}
          initial={{
            x: "100vh",
          }}
          exit={{
            x: "-100vh",
            transition: {
              duration: 0.5,
              type: "linear",
            },
          }}
          animate={{
            x: 0,
            transition: {
              duration: 0.2,
              type: "linear",
            },
          }}
        >
          <Image
            src={currentImage.imageUrl}
            alt={currentImage.description || "Imagem do carrossel"}
            fill
            priority
            quality={50}
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
