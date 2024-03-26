"use client";
import { IoMdHome } from "react-icons/io";
import { useRouter } from "next/navigation";
import { ImageComponent } from "../utils/image";
import { GiHamburgerMenu } from "react-icons/gi";
import { useState } from "react";
import { ModalMenuComponent } from "../utils/modalMenu";
import AnchorComponent from "../utils/anchor";
import {
  TbBrandFacebook,
  TbBrandInstagram,
  TbBrandWhatsapp,
} from "react-icons/tb";
import { FaTiktok } from "react-icons/fa";
import { motion } from "framer-motion";
import { ShowOnlyOnMobileComponent } from "../utils/showOnlyOnMobile";
import { stencilFont } from "@/fonts/constants";
import { AnimatedTitleComponent } from "../utils/animatedTitle";
import { AnimatedSubTitleComponent } from "../utils/animatedText";

export function HomeHeaderComponent() {
  const { replace } = useRouter();
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  function handleCloseModal() {
    setMenuIsOpen(false);
  }
  return (
    <header className="z-10 absolute  flex items-center justify-center w-full px-3 py-1 lg:justify-start lg:py-3 lg:px-14">
      <ShowOnlyOnMobileComponent>
        <GiHamburgerMenu
          size={30}
          className="absolute top-4 left-4"
          onClick={() => setMenuIsOpen(true)}
        />
      </ShowOnlyOnMobileComponent>
      {/*  <ImageComponent
        alt={"logo"}
        h={"h-[6.25rem] lg:h-[9.375tem]"}
        w={"w-[15.625rem] lg:w-[18.75rem]"}
        src={
          "https://res.cloudinary.com/dcjkvwbvh/image/upload/v1688637347/onbridge/uswu0yqtfeo2aq3vomkf.png"
        }
        containerClassname={"z-20"}
        onclik={() => replace("/")}
        priority={true}
      /> */}
      <p className={`${stencilFont.className} text-[80px] text-black mt-10`}>
        AR756
      </p>
      {menuIsOpen && (
        <ModalMenuComponent
          onClose={handleCloseModal}
          styleInternal="h-screen  bg-black z-50"
        >
          <div className="w-full pt-5">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="w-full "
            >
              <p
                className={`${stencilFont.className} text-[70px] text-white pl-3`}
              >
                AR756
              </p>
            </motion.div>
            <motion.div
              transition={{
                delay: 0.5,
                delayChildren: 0.5,
                staggerChildren: 0.2,
              }}
              className="px-3 py-5 text-gray-400 font-semibold flex flex-col gap-y-3"
            >
              <AnimatedSubTitleComponent
                className=""
                text="Principal"
                delay={0.4}
                onclick={() => {
                  handleCloseModal();
                  replace("/");
                }}
              />
              <AnimatedSubTitleComponent
                className=""
                text="FAQ"
                delay={0.5}
                onclick={() => {
                  handleCloseModal();
                  replace("/faq");
                }}
              />
              <AnimatedSubTitleComponent
                className=""
                text="Galeria"
                delay={0.6}
                onclick={() => {
                  handleCloseModal();
                  replace("/galeria");
                }}
              />
              <AnimatedSubTitleComponent
                className=""
                text="Sobre nós"
                delay={0.7}
                onclick={() => {
                  handleCloseModal();
                  replace("/regras");
                }}
              />
              <AnimatedSubTitleComponent
                className=""
                text=" Faça seu orçamento"
                delay={0.8}
                onclick={() => {
                  handleCloseModal();
                  replace("/consultar");
                }}
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                delay: 1.3,
                delayChildren: 0.5,
                staggerChildren: 0.2,
              }}
              className="flex flex-col mt-4 pt-3 w-full p-3 gap-y-2"
            >
              <motion.hr
                className="border-t-[1px] border-gray-500 w-[80%] mx-auto"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1, transformOrigin: "center" }}
                transition={{ duration: 0.4, delay: 1.2 }}
              />
              <motion.h2
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  delay: 1.4,
                }}
                className="text-gray-400 font-semibold"
              >
                Contate-nos:
              </motion.h2>
              <div className="mx-auto flex  gap-x-3 ">
                <motion.div
                  initial={{ opacity: 0, y: 200 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: 1.4 }}
                >
                  <AnchorComponent
                    href="https://api.whatsapp.com/send/?phone=351933679073&text&type=phone_number&app_absent=0"
                    icon={
                      <TbBrandWhatsapp
                        className="cursor-pointer text-white"
                        size={30}
                      />
                    }
                    bgColor="bg-[#25D366] border-[2px] border-white"
                  />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 200 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: 1.5 }}
                >
                  <AnchorComponent
                    href="https://www.facebook.com/profile.php?id=100085832906065"
                    icon={
                      <TbBrandFacebook
                        className="cursor-pointer  text-white"
                        size={30}
                      />
                    }
                    bgColor=" bg-[#3b5998] border-[2px] border-white"
                  />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 200 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: 1.6 }}
                >
                  <AnchorComponent
                    href="https://www.tiktok.com/@ar756_"
                    icon={
                      <FaTiktok
                        className=" cursor-pointer text-white"
                        size={25}
                      />
                    }
                    bgColor=" bg-black border-[2px] border-white w-[45px]"
                  />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 200 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: 1.7 }}
                >
                  <AnchorComponent
                    href="https://www.instagram.com/ar756_/"
                    icon={
                      <TbBrandInstagram
                        className="cursor-pointer text-white "
                        size={30}
                      />
                    }
                    bgColor="bg-gradient-to-r from-fuchsia-500 to-pink-500 border-[2px] border-white"
                  />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </ModalMenuComponent>
      )}
    </header>
  );
}
