import FaqComponent from "@/components/explore/faq";
import { QuestionRequestResponse } from "@/types";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ",
};

export default async function Faq() {
  const questionList = await fetch(`${process.env.SERVER_URL}/question/list?venueId=8159e209-0057-4df3-ae72-855363c3b84e`)
    .then(async (resp) => {
      const response: QuestionRequestResponse = await resp.json();
      console.log(response)
      return response?.data?.questionList;
    });
    
  return (
    <div className="flex justify-center items-center pt-20">
      <div className="flex-1 mt-20">
        <FaqComponent questionList={questionList} />
      </div>
    </div>
  );
}
