import { AnimatedVerticalComponent } from "@/components/utils/animatedVertical";
import { TextRequestResponse, TextType } from "@/types";

export async function WelcomeTextsComponent() {
  const welcomeTexts: TextRequestResponse = await fetch(
    `${process.env.SERVER_URL}/text/list?venueId=8159e209-0057-4df3-ae72-855363c3b84e&area=Intro`,
    {
      method: "GET",
    }
  ).then((resp) => {
    const response: any = resp.json();

    return response;
  });

  return (
    <div className="flex flex-col gap-y-2 mt-10 xl:mt-5">
      {welcomeTexts?.data.textList.map((text: TextType) => {
        return (
          <AnimatedVerticalComponent
            key={text.id}
            className="w-[80%] mx-auto text-justify text-sm md:text-[14px] xl:w-[30%] md:text-center"
          >
            <p>{text.text}</p>
          </AnimatedVerticalComponent>
        );
      })}
    </div>
  );
}
