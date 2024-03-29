import FaqComponent from "@/components/explore/faq";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ"
};

export default async function Faq() {
  const questionList = await fetch(`${process.env.SERVER_URL}/question/list`, {
    method: "GET",
    cache: "no-cache",
  }).then(async (resp) => {
    return await resp.json();
  });

  return (
    <div className="flex justify-center items-center pt-20">
      <div className="flex-1 mt-20">
        <FaqComponent questionList={questionList} />
      </div>
    </div>
  );
}
