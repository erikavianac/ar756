import { ComodidadeComponent } from "@/components/comodidades";
import { ExploreComponent } from "@/components/explore";
import { MobileCarroucelComopnent } from "@/components/mobileCarroucel";
import { ServicosComponents } from "@/components/servicos/servicos";
import AnchorComponent from "@/components/utils/anchor";
import { ShowOnlyOnMobileComponent } from "@/components/utils/showOnlyOnMobile";
import { ShowOnlyOnWebComponent } from "@/components/utils/showOnlyOnWeb";
import { VideobgComponent } from "@/components/video/videobg";
import { WelcomeComponent } from "@/components/welcome";
import { data } from "@/hooks/data";
import { TbBrandWhatsapp } from "react-icons/tb";

export default async function Home() {
  const {
    mobileCarroucelmageList,
  } = await data();

  return (
    <main className="bg-faixada flex flex-col flex-1 bg-gray-300 overflow-hidden">
      <div className="fixed z-50 bottom-4 right-4">
        <AnchorComponent
          href="https://api.whatsapp.com/send/?phone=351938324447&text&type=phone_number&app_absent=0"
          icon={
            <TbBrandWhatsapp className="cursor-pointer text-white" size={30} />
          }
          bgColor="bg-[#25D366] border-[2px] border-white"
        />
      </div>
      <VideobgComponent mobileCarroucelmageList={mobileCarroucelmageList} /> 
      <WelcomeComponent />
      <ShowOnlyOnMobileComponent>
        <MobileCarroucelComopnent />
      </ShowOnlyOnMobileComponent>
      <ShowOnlyOnWebComponent>
        <ComodidadeComponent />
        <ServicosComponents />
      </ShowOnlyOnWebComponent>
      {/*   <ExploreComponent
        cardImageList={cardImageList}
        imageList={imageList}
        questionList={questionList}
        textRegrasList={textRegrasList}
        textSobreList={textSobreList}
        imageSobreList={imageSobreList}
      /> */}
    </main>
  );
}
