"use client"
import { stencilFont } from "@/fonts/constants";
import { ImageComponent } from "./image";
import { motion } from "framer-motion";

export default function LoadingPage() {
  return (
    <motion.div initial={{x:0}} animate={{x:"-100%"}} transition={{duration:0.5, delay:3}} className="bg-black absolute z-50 flex flex-col justify-center items-center min-h-screen  max-h-screen w-full ">
      <div className="animate-pulse flex flex-col justify-center items-center">
        <p className={`${stencilFont.className} text-[70px] text-white`}>AR756</p>
        <div className="text-white text-[12px] flex flex-col justify-center items-center">
          <p className={`${stencilFont.className}  text-center w-[100%] pl-2`}>
            {" "}
            A casa perfeita para suas celebrações está a caminho!
          </p>
        </div>
      </div>
    </motion.div>
  );
}
