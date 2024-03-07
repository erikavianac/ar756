import { ImageType } from "@/types";
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { ImageComponent } from "./image";
import Image from "next/image";

interface MainCarroucelProps {
  mobileCarroucelmageList: ImageType[];
}

export function MainCarroucel({ mobileCarroucelmageList }: MainCarroucelProps) {
  const [curr, setCurr] = useState(0);

  useEffect(() => {
    if (mobileCarroucelmageList) {
      const intervalId = setInterval(() => {
        setCurr((curr) => (curr + 1) % mobileCarroucelmageList.length);
      }, 3000); // intervalo de 4 segundos
      return () => clearInterval(intervalId);
    }
  }, [mobileCarroucelmageList]);

  return (
    <div className="flex">
      <AnimatePresence mode="popLayout">
        <motion.div
          className="max-h-screen min-h-screen h-full w-full relative"
          key={
            mobileCarroucelmageList && mobileCarroucelmageList[curr]?.imageUrl
          }
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
           src={
            mobileCarroucelmageList && mobileCarroucelmageList[curr]?.imageUrl
          }
          alt="foto"
          fill
          priority
          quality={50}
          />
          
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
