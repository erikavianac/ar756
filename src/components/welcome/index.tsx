import { ImageRequestResponse, ImageType } from "@/types";
import { WelcomeCarroucelComponent } from "./carroucel";
import { WelcomeGridComponent } from "./grid";
import { WelcomeHeaderComponent } from "./welcomeHeader";
import { WelcomeTextsComponent } from "./welcomeTexts";

import { SectionComponent } from "@/components/utils/section";
import { ShowOnlyOnMobileComponent } from "@/components/utils/showOnlyOnMobile";
import { ShowOnlyOnWebComponent } from "@/components/utils/showOnlyOnWeb";
import { useVenueContext } from "@/app/context/VenueContext";

export async function WelcomeComponent() {

  return (
    <SectionComponent classname="pt-10 flex flex-col justify-between pb-3">
      <div className="flex-1">
        <WelcomeHeaderComponent />
        <WelcomeTextsComponent />
      </div>
      <ShowOnlyOnMobileComponent>
        <WelcomeCarroucelComponent  />
      </ShowOnlyOnMobileComponent>
      <ShowOnlyOnWebComponent>
        <WelcomeGridComponent  />
      </ShowOnlyOnWebComponent>
    </SectionComponent>
  );
}
