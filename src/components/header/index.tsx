"use client";
import { IoMdHome } from "react-icons/io";
import { useRouter, usePathname } from "next/navigation";
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
import { BsWhatsapp, BsFacebook, BsTiktok, BsInstagram } from "react-icons/bs";

export function HomeHeaderComponent() {
  const { replace } = useRouter();
  const pathname = usePathname();
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  
  function handleCloseModal() {
    setMenuIsOpen(false);
  }

  return (
    <header 
      className="z-10 flex items-center justify-center w-full px-3 py-1 lg:justify-start lg:py-3 lg:px-14 relative"
      role="banner"
      aria-label="Cabeçalho principal"
    >
      <ShowOnlyOnMobileComponent>
        <GiHamburgerMenu
          size={30}
          className="absolute top-4 left-4"
          onClick={() => setMenuIsOpen(true)}
          aria-label="Abrir menu de navegação"
          aria-expanded={menuIsOpen}
          aria-controls="navigation-menu"
        />
      </ShowOnlyOnMobileComponent>
      {/*  <ImageComponent
        alt={"logo"}
        h={"h-[6.25rem] lg:h-[9.375tem]"}
        w={"w-[15.625rem] lg:w-[18.75rem]"}
        src={
          "https://res.cloudinary.com/dzwboczzd/image/upload/v1726318982/file_2_gjm6nx.jpg"
        }
        containerClassname={"z-20"}
        onclik={() => replace("/")}
        priority={true}
      /> */}
      <p 
        className={`${stencilFont.className} text-[80px] text-black`}
        role="img"
        aria-label="AR756 - Logo"
      >
        AR756
      </p>
      {menuIsOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <ModalMenuComponent
            onClose={handleCloseModal}
            styleInternal="h-screen bg-black z-50"
          >
            <div className="w-full pt-5">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="w-full"
              >
                <p 
                  className={`${stencilFont.className} text-[70px] text-white pl-3`}
                  id="modal-title"
                  role="img"
                  aria-label="AR756 - Logo"
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
                role="navigation"
                aria-label="Menu principal"
                id="navigation-menu"
              >
                <AnimatedSubTitleComponent
                  className=""
                  text="Principal"
                  delay={0.4}
                  onclick={() => {
                    handleCloseModal();
                    replace("/");
                  }}
                  aria-current={pathname === "/" ? "page" : undefined}
                />
                <AnimatedSubTitleComponent
                  className=""
                  text="FAQ"
                  delay={0.5}
                  onclick={() => {
                    handleCloseModal();
                    replace("/faq");
                  }}
                  aria-current={pathname === "/faq" ? "page" : undefined}
                />
                <AnimatedSubTitleComponent
                  className=""
                  text="Galeria"
                  delay={0.6}
                  onclick={() => {
                    handleCloseModal();
                    replace("/galeria");
                  }}
                  aria-current={pathname === "/galeria" ? "page" : undefined}
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
                    <a
                      href="https://api.whatsapp.com/send/?phone=351938324447&text&type=phone_number&app_absent=0"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Entre em contato via WhatsApp"
                      className="text-white hover:text-green-500 transition-colors"
                    >
                      <BsWhatsapp size={20} />
                    </a>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 200 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, delay: 1.5 }}
                  >
                    <a
                      href="https://www.facebook.com/profile.php?id=100085832906065"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Siga-nos no Facebook"
                      className="text-white hover:text-blue-500 transition-colors"
                    >
                      <BsFacebook size={20} />
                    </a>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 200 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, delay: 1.6 }}
                  >
                    <a
                      href="https://www.tiktok.com/@ar756_"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Siga-nos no TikTok"
                      className="text-white hover:text-pink-500 transition-colors"
                    >
                      <BsTiktok size={20} />
                    </a>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 200 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, delay: 1.7 }}
                  >
                    <a
                      href="https://www.instagram.com/ar756_/"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Siga-nos no Instagram"
                      className="text-white hover:text-purple-500 transition-colors"
                    >
                      <BsInstagram size={20} />
                    </a>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </ModalMenuComponent>
        </div>
      )}
    </header>
  );
}
