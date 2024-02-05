import { ImageType } from "@/types";
import { WelcomeCarroucelComponent } from "./carroucel";
import { WelcomeGridComponent } from "./grid";
import { WelcomeHeaderComponent } from "./welcomeHeader";
import { WelcomeTextsComponent } from "./welcomeTexts";

import { SectionComponent } from "@/components/utils/section";
import { ShowOnlyOnMobileComponent } from "@/components/utils/showOnlyOnMobile";
import { ShowOnlyOnWebComponent } from "@/components/utils/showOnlyOnWeb";

export async function WelcomeComponent() {

  const welcomeMobileImageList: ImageType[] = await fetch(
    `${process.env.BASE_URL}/image/getByTag/Carroucel/Mobile`,
    {
      method: "GET",
      cache: "no-cache",
    }
  ).then((resp) => resp.json());

  const welcomeWebImageList = await fetch(
    `${process.env.BASE_URL}/image/getByTag/Grid/Web`,
    {
      method: "GET",
      cache: "no-cache",
    }
  ).then(async (resp) => {
    return await resp.json();
  });

  return (
    <SectionComponent classname="pt-10 flex flex-col justify-between pb-3">
      <div className="flex-1">
        <WelcomeHeaderComponent />
        <WelcomeTextsComponent />
      </div>
      <ShowOnlyOnMobileComponent>

        <WelcomeCarroucelComponent imageList={welcomeMobileImageList} />
      </ShowOnlyOnMobileComponent>
      <ShowOnlyOnWebComponent>
        <WelcomeGridComponent imageList={welcomeWebImageList} />
      </ShowOnlyOnWebComponent>
    </SectionComponent>
  );
}
