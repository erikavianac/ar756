import { useRef, useState } from "react";
import { QuestionType } from "@/types";
import { IoIosArrowDown } from "react-icons/io";

interface FaqItemListProps {
  item: QuestionType;
}
export default function FaqItemList({ item }: FaqItemListProps) {
  const [isQuestionOpen, setIsQuestionOpen] = useState(false);
  const answerRef = useRef<any>(null);
  const answerHeight = `h-[${answerRef && answerRef?.current?.offsetHeight}px]`;
  console.log(answerHeight)
  return (
    <div
      className={`shadow-lg border-[0.5px]  border-black/25 rounded-md py-2 px-2 flex flex-col gap-y-2 space-x-2 w-full ${isQuestionOpen ? " h-auto" :  " h-[60px] md:h-[40px]"} duration-300`}
      key={item.id}
    >
      <div className="w-full flex justify-between items-center ">
        <p
          className={`text-gray-500 font-semibold text-[12px] md:text-[14px]`}
        >{`${item.question} ?`}</p>
        <IoIosArrowDown
          onClick={() => setIsQuestionOpen(!isQuestionOpen)}
          className={`${
            isQuestionOpen && "rotate-180"
          } transition duration-500 cursor-pointer`}
        />
      </div>
      {isQuestionOpen && (
        <div>
          <p
            ref={answerRef}
            className={`text-gray-500 text-justify  text-[12px] md:text-[14px] ${isQuestionOpen ? "h-auto" :  "h-[35px]"} duration-700 w-[95%]`}
          >{`${item.response}.`}</p>
        </div>
      )}
    </div>
  );
}
