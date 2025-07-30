"use client";
import { useState } from "react";
import { QuestionType } from "@/types";
import FaqItemList from "./faqItemList";
import { BiSearch } from "react-icons/bi";
import Scrollbars from "react-custom-scrollbars";
import { ImageComponent } from "@/components/utils/image";
import CloseButtonComponent from "@/components/utils/closeButton";
import { stencilFont } from "@/fonts/constants";
import { useVenueContext } from "@/app/context/VenueContext";

interface FaqProps {
  handleCloseFaqModal?: () => void;
}

export default function FaqComponent({
  handleCloseFaqModal,
}: FaqProps) {
  const [questionFIlter, setQuestionFIlter] = useState<string>("");
  const { venue } = useVenueContext();

  return (
    <div 
      className="bg-white  max-w-[97%] min-w-[97%] min-h-[97%]   overflow-y-auto   relative  rounded-md   md:rounded-md py-2 px-5 flex flex-col gap-y-3  z-30  md:mt-2"
      role="region"
      aria-label="Perguntas frequentes"
    >
      {handleCloseFaqModal && (
        <>
          <p 
            className={`${stencilFont.className} text-[80px]  z-50 mx-auto`}
            role="img"
            aria-label="AR756 - Logo"
          >
            AR756
          </p>
          <CloseButtonComponent handleCloseModal={handleCloseFaqModal} />
        </>
      )}
      <div 
        className="w-full py-2 px-2 flex justify-start items-center bg-gray-100 rounded-md gap-x-1"
        role="search"
      >
        <BiSearch aria-hidden="true" />
        <input
          type="text"
          placeholder={`Ola, pesquise a sua duvida?`}
          className="flex-1 text-sm bg-transparent outline-none"
          onChange={(e) => setQuestionFIlter(e.target.value)}
          aria-label="Pesquisar perguntas frequentes"
        />
      </div>
      <Scrollbars
        style={{
          width: "100%",
          height: 450,
          gap: 20,
        }}
      >
        <div 
          className="flex flex-col gap-y-2 w-full"
          role="list"
          aria-label="Lista de perguntas frequentes"
        >
          {venue?.questions?.map((item: QuestionType) => {
            if (
              !item?.question
                .toLocaleLowerCase()
                .includes(questionFIlter.toLocaleLowerCase())
            ) {
              return;
            }
            return (
              <FaqItemList 
                item={item} 
                key={item?.id}
              />
            );
          })}
        </div>
      </Scrollbars>
    </div>
  );
}
