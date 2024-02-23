"use client"
import { BsSpeaker } from 'react-icons/bs';
import { GiCctvCamera } from 'react-icons/gi';
import { IoMdMusicalNotes } from 'react-icons/io';
import { MdOutlineCleaningServices, MdOutlineLunchDining } from 'react-icons/md';
import { RiLightbulbLine } from 'react-icons/ri';
import { ImageComponent } from '@/components/utils/image';
import { SectionComponent } from '@/components/utils/section';
import { CardComponent } from '../card';
import { ItemCardComponent } from '../card/itemCard';
import { ButtonComponent } from '../utils/button';
import { ModalComponent } from '../utils/modal';
import { ConsultarFormComponent } from '../consultar';
import { useState } from 'react';


export  function ServicosComponents() {
  const [isModalOpen, setisModalOpen] = useState<boolean>(false);
  return (
    <SectionComponent>
      <div className="hidden md:flex absolute left-10   -mt-[85px]">
        <ImageComponent
          alt={'logo-branco'}
          h={'h-[188px]'}
          w={'w-[529px]'}
          src={'https://res.cloudinary.com/dcjkvwbvh/image/upload/v1688637347/onbridge/uswu0yqtfeo2aq3vomkf.png'}
          containerClassname="z-30"
        />
      </div>
      <div className="w-screen h-screen relative">
      <ImageComponent
          alt={'logo-branco'}
          h={'h-[613px]'}
          w={'w-[100%]'}
          src={'https://res.cloudinary.com/dcjkvwbvh/image/upload/v1704736008/yzp7gvs0ekodg00bz7zr.jpg'}
          containerClassname="z-20"
        />
        {/* <video className="h-[613px] w-[100%] object-cover" src={"https://d2tb61r1ltgmn5.cloudfront.net/casa03_v01.mp4"} autoPlay loop muted/> */}
      <CardComponent
        h="md:h-[413px]"
        w={'w-[98%] m-auto md:w-[450px]'}
        className="absolute  text-black  flex  
rounded-md shadow-lg lg:bottom-[14rem]  2xl:bottom-[10.5rem] inset-x-0 "
      >
        <div className="flex items-center justify-end w-full space-x-3">
          <div className="border-[1px] border-black flex-1 h-0 " />
          <div className="flex items-center justify-start w-[140px] ">
            <ImageComponent
              alt={'piscina'}
              h={'h-[60px] '}
              w={'w-[100px]'}
              src={'https://res.cloudinary.com/dcjkvwbvh/image/upload/v1688637347/onbridge/uswu0yqtfeo2aq3vomkf.png'}
            />
          </div>
          <h1 className="absolute w-full text-end text-2xl text-black top-[4.3rem] pr-[45px]">
            SERVICOS EXTRAS
          </h1>
        </div>
        <div className="flex justify-center mt-8 gap-x-10 ">
          <div className="flex flex-col w-full gap-y-3">
            <ItemCardComponent
              title="DJ"
              icon={<IoMdMusicalNotes size={20} />}
            />
            <ItemCardComponent
              title="Som"
              icon={<BsSpeaker size={20} />}
            />
            <ItemCardComponent
              title="Comida"
              icon={<MdOutlineLunchDining size={20} />}
            />
          </div>
          <div className="flex flex-col gap-y-3">
            <ItemCardComponent
              title="Limpeza"
              icon={<MdOutlineCleaningServices size={20} />}
            />
            <ItemCardComponent
              title="Seguranca"
              icon={<GiCctvCamera size={20} />}
            />
            <ItemCardComponent
              title="Iluminacao"
              icon={<RiLightbulbLine size={20} />}
            />
          </div>
        </div>
        <ButtonComponent
        title="CONSULTAR"
        className={`
          z-30
          px-10 py-4
          text-[15px]  md:text-[20px]
          hover:bg-zinc-900
           tracking-[0.30rem] text-white rounded-md bg-black
          transition duration-300 ease-in-out hover:scale-[1.05] active:scale-[0.95] active:transition-none active:duration-700
          `}
        onClick={() => setisModalOpen(true)}
      />
      {isModalOpen && (
        <ModalComponent onClose={() => setisModalOpen(false)}>
          <ConsultarFormComponent
            handleCloseReservaModal={() => setisModalOpen(false)}
          />
        </ModalComponent>
      )}
      </CardComponent>
      </div>
    </SectionComponent>
  );
}
