import { useState } from "react";
import { QuestionType } from "@/types";
import FaqItemList from "./faqItemList";
import { BiSearch } from "react-icons/bi";
import Scrollbars from "react-custom-scrollbars";
import { ImageComponent } from "@/components/utils/image";
import CloseButtonComponent from "@/components/utils/closeButton";

interface FaqProps {
  questionList: QuestionType[];
  handleCloseFaqModal: () => void;
}

export default function FaqComponent({ handleCloseFaqModal,questionList }: FaqProps) {
  const [questionFIlter, setQuestionFIlter] = useState<string>("");
  return (
    <div className="bg-white  max-w-[97%] min-w-[97%] min-h-[97%]  overflow-y-auto   relative  rounded-md   md:rounded-md py-2 px-5 flex flex-col gap-y-3  z-30  md:mt-2">
      <div className="flex items-center justify-center w-full">
        <ImageComponent
          alt={"logo"}
          h={"h-[130px] md:h-[180px]"}
          w={"w-[150px] md:w-[250px]"}
          src={
            "https://res.cloudinary.com/dcjkvwbvh/image/upload/v1688637347/onbridge/uswu0yqtfeo2aq3vomkf.png"
          }
          containerClassname={"z-20 rounded-md -ml-2"}
        />
      </div>
      <CloseButtonComponent handleCloseModal={handleCloseFaqModal} />
      <div className="w-full py-2 px-2 flex justify-start items-center bg-gray-100 rounded-md gap-x-1">
        <BiSearch />
        <input
          type="text"
          placeholder={`Ola, pesquise a sua duvida?`}
          className="flex-1 text-sm bg-transparent outline-none"
          onChange={(e) => setQuestionFIlter(e.target.value)}
        />
      </div>
      <Scrollbars
        style={{
          width: "100%",
          height: 450,
          gap: 20,
        }}
      >
        <div className="flex flex-col gap-y-2 w-full">
          {questionList?.map((item: QuestionType) => {
            if (
              !item?.question
                .toLocaleLowerCase()
                .includes(questionFIlter.toLocaleLowerCase())
            ) {
              return;
            }
            return <FaqItemList item={item} key={item?.id} />;
          })}
        </div>
      </Scrollbars>
    </div>
  );
}
