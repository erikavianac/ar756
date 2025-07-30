'use client';
import { useVenueContext } from "@/app/context/VenueContext";
import { AnimatedVerticalComponent } from "@/components/utils/animatedVertical";
import { TextRequestResponse, TextType } from "@/types";
import { Text } from "@/types/venue";

export function WelcomeTextsComponent() {
  const { venue, getTextsByArea } = useVenueContext();
  const welcomeTexts = getTextsByArea("Intro");

  return (
    <div className="flex flex-col gap-y-2 mt-10 xl:mt-5">
      {welcomeTexts?.map((text: Text) => {
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
