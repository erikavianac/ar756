"use client";
import { useEffect, useRef, useState } from "react";

import { ComodidadeCardComponent } from "../comodidades/comdidadeCard";
import { ServicoCardComponent } from "../servicos/servicoCard";

import { motion } from "framer-motion";

export function MobileCarroucelComopnent() {
  const caroucel: any = useRef();
  const [width, setWidth] = useState(0);
  const [cardOption, setcardOption] = useState<'COMODIDADES' | 'SERVICOS'>('COMODIDADES');

  const comodidadeCard = cardOption?.includes('COMODIDADES');

  useEffect(() => {
    setWidth(() => caroucel.current.scrollWidth + 10 - caroucel.current.offsetWidth);
  }, []);

  return (
    <motion.div
      ref={caroucel}
      className="flex flex-col gap-y-4  my-10 overflow-hidden"
    >
      <motion.div
        drag="x"
        dragConstraints={{ right: 0, left: -width }}
        whileTap={{ cursor: "grabbing" }}
        initial={{
          x: 0,
        }}
        animate={{
          x: comodidadeCard ? 0 : '-100%',
          transition: {
            duration: 0.5,
          },
        }}
        transition={{ duration: 2 }}
        className="flex items-start justify-start px-2 md:hidden h-[600px] w-full gap-x-4  inset-0"
      >
        <ComodidadeCardComponent />
        <ServicoCardComponent />
      </motion.div>
      <div className="flex items-center justify-center w-full gap-x-4">
          <div
            className={`h-2 w-2 rounded-full  cursor-pointer
            ${cardOption.includes('COMODIDADES') ? 'bg-blue-700' : 'bg-gray-500'}
          `}
            onClick={() => {
              setcardOption('COMODIDADES');
            }}
          />
          <div
            className={`h-2 w-2 rounded-full cursor-pointer
            ${cardOption.includes('SERVICOS') ? 'bg-blue-700' : 'bg-gray-500'}
          `}
            onClick={() => {
              setcardOption('SERVICOS');
            }}
          />
        </div>
    </motion.div>
  );
}
