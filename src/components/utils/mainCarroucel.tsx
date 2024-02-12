import { ImageType } from "@/types";
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";

interface MainCarroucelProps {
  mobileCarroucelmageList: ImageType[];
}

export function MainCarroucel({ mobileCarroucelmageList }: MainCarroucelProps) {
  const [curr, setCurr] = useState(0);

  useEffect(() => {
    if (mobileCarroucelmageList) {
      const intervalId = setInterval(() => {
        setCurr((curr) => (curr + 1) % mobileCarroucelmageList.length);
      }, 2000); // intervalo de 4 segundos
      return () => clearInterval(intervalId);
    }
  }, [mobileCarroucelmageList]);

  return (
    <div className="flex">
      <AnimatePresence>
        <motion.img
          className="max-h-screen min-h-screen h-full w-full flex"
          key={
            mobileCarroucelmageList && mobileCarroucelmageList[curr]?.imageUrl
          }
          src={
            mobileCarroucelmageList && mobileCarroucelmageList[curr]?.imageUrl
          }
          initial={{
            x: 200,
          }}
          exit={{
            x: -400,
            transition: {
              duration: 0.8, // Aumente a duração da transição para garantir que a imagem tenha tempo suficiente para sair da tela
              type: "tween", // Alterado para 'tween' para uma transição suave
            },
          }}
          animate={{
            x: 0,
            transition: {
              duration: 1.5,
              type: "tween", // Alterado para 'tween' para uma transição suave
            },
          }}
        />
      </AnimatePresence>
    </div>
  );
}
