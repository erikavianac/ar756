import FaqComponent from "@/components/explore/faq";

export default async function Faq() {
  const questionList = await fetch(`${process.env.BASE_URL}/question/list`, {
    method: "GET",
    cache: "no-cache",
  }).then(async (resp) => {
    return await resp.json();
  });

  return (
    <div className="flex justify-center items-center pt-20">
      <div className="flex-1 mt-10">
        <FaqComponent questionList={questionList} />
      </div>
    </div>
  );
}
