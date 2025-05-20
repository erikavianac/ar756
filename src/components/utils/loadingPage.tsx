"use client"
import { stencilFont } from "@/fonts/constants";
import { ScaleLoader } from "react-spinners";
import { motion } from "framer-motion";

export default function LoadingPage() {
  return (
    <motion.div 
      role="status"
      aria-label="Carregando página"
      aria-live="polite"
      aria-busy="true"
      initial={{x:0}} 
      animate={{x:"-100%"}} 
      transition={{duration:0.5, delay:3}} 
      className="bg-black fixed inset-0 z-50 flex flex-col justify-center items-center overflow-hidden"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        overflow: 'hidden'
      }}
    >
      <div className="animate-pulse flex flex-col gap-y-2 justify-center items-center">
        <p className={`${stencilFont.className} text-[70px] text-white`}>AR756</p>
        
        <ScaleLoader color="white"  width={3} height={20 }/>
        <div className="text-white text-[12px] xl:text- flex flex-col justify-center items-center">
          <p className={`${stencilFont.className}  text-center w-[100%] pl-2`}>
            {" "}
            A casa perfeita para suas celebrações está a caminho!
          </p>
        </div>
      </div>
    </motion.div>
  );
}
