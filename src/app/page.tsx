import { ComodidadeComponent } from "@/components/comodidades";
import { ExploreComponent } from "@/components/explore";
import { MobileCarroucelComopnent } from "@/components/mobileCarroucel";
import { ServicosComponents } from "@/components/servicos/servicos";
import { ShowOnlyOnMobileComponent } from "@/components/utils/showOnlyOnMobile";
import { ShowOnlyOnWebComponent } from "@/components/utils/showOnlyOnWeb";
import { VideobgComponent } from "@/components/video/videobg";
import { WelcomeComponent } from "@/components/welcome";
import { data } from "@/hooks/data";

export default async function Home() {
  const {
    cardImageList,
    mobileCarroucelmageList,
    imageList,
    imageSobreList,
    questionList,
    textRegrasList,
    textSobreList,
  } = await data();

  return (
    <main className="bg-faixada flex flex-col flex-1 bg-gray-300 overflow-hidden">
      <VideobgComponent mobileCarroucelmageList={mobileCarroucelmageList} />
      <WelcomeComponent />
      <ShowOnlyOnMobileComponent>
        <MobileCarroucelComopnent />
      </ShowOnlyOnMobileComponent>
      <ShowOnlyOnWebComponent>
        <ComodidadeComponent />
        <ServicosComponents />
      </ShowOnlyOnWebComponent>
      <ExploreComponent
        cardImageList={cardImageList}
        imageList={imageList}
        questionList={questionList}
        textRegrasList={textRegrasList}
        textSobreList={textSobreList}
        imageSobreList={imageSobreList}
      />
    </main>
  );
}
