import FaqComponent from "@/components/explore/faq";
import { FooterComponent } from "@/components/footer";
import { HomeHeaderComponent } from "@/components/header";
import { QuestionRequestResponse } from "@/types";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ",
};

export default async function Faq() {
  const questionList = await fetch(
    `${process.env.SERVER_URL}/question/list?venueId=8159e209-0057-4df3-ae72-855363c3b84e`
  ).then(async (resp) => {
    const response: QuestionRequestResponse = await resp.json();
    console.log(response);
    return response?.data?.questionList;
  });

  return (
    <div className="flex flex-col min-h-screen w-full bg-faixada">
      <HomeHeaderComponent />
      <main className="flex-1 flex justify-center items-center w-full px-3 py-5">
        <FaqComponent questionList={questionList} />
      </main>
      <FooterComponent />
    </div>
  );
}
