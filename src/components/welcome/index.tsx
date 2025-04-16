import { ImageRequestResponse, ImageType } from "@/types";
import { WelcomeCarroucelComponent } from "./carroucel";
import { WelcomeGridComponent } from "./grid";
import { WelcomeHeaderComponent } from "./welcomeHeader";
import { WelcomeTextsComponent } from "./welcomeTexts";

import { SectionComponent } from "@/components/utils/section";
import { ShowOnlyOnMobileComponent } from "@/components/utils/showOnlyOnMobile";
import { ShowOnlyOnWebComponent } from "@/components/utils/showOnlyOnWeb";

export async function WelcomeComponent() {
  const [
    welcomeMobileImageList,
    /* welcomeWebImageList */
  ] = await Promise.all([
    /*     fetch(`${process.env.SERVER_URL}/text/list?venueId=8159e209-0057-4df3-ae72-855363c3b84e&tag=`, {
      method: "GET",
    }).then(resp => resp.json()), */
    fetch(
      `${process.env.SERVER_URL}/image/getByTag?venueId=8159e209-0057-4df3-ae72-855363c3b84e&tag=Grid&responsiveMode=Mobile`,
      {
        method: "GET",
      }
    ).then(async (resp) => {
      const response: ImageRequestResponse = await resp.json();
      return response.data.imagesByTag;
    }),
  ]);

  return (
    <SectionComponent classname="pt-10 flex flex-col justify-between pb-3">
      <div className="flex-1">
        <WelcomeHeaderComponent />
        <WelcomeTextsComponent />
      </div>
      <ShowOnlyOnMobileComponent>
        <WelcomeCarroucelComponent imageList={welcomeMobileImageList} />
      </ShowOnlyOnMobileComponent>
      {/*<ShowOnlyOnWebComponent>
        <WelcomeGridComponent imageList={welcomeWebImageList} />
      </ShowOnlyOnWebComponent> */}
    </SectionComponent>
  );
}
