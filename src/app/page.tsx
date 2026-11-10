import { ComodidadeComponent } from "@/components/comodidades";
import { ExploreComponent } from "@/components/explore";
import { FooterComponent } from "@/components/footer";
import { HomeHeaderComponent } from "@/components/header";
import HomeMenuComponent from "@/components/menu/home-menu";
import { MobileCarroucelComopnent } from "@/components/mobileCarroucel";
import { ServicosComponents } from "@/components/servicos/servicos";
import { ShowOnlyOnMobileComponent } from "@/components/utils/showOnlyOnMobile";
import { ShowOnlyOnWebComponent } from "@/components/utils/showOnlyOnWeb";
import { VideobgComponent } from "@/components/video/videobg";
import { WelcomeComponent } from "@/components/welcome";
import { WhatsappFloatComponent } from "@/components/whatsapp-float";
import { stencilFont } from "@/fonts/constants";
import { data } from "@/hooks/data";


export default async function Home() {

  return (
    <>
      <main className="bg-faixada flex flex-col flex-1 bg-gray-300 overflow-hidden">
        <div className="z-30  absolute w-full flex justify-center md:justify-start items-center">
          <HomeMenuComponent />
          <p className={`${stencilFont.className} text-[80px] text-black  md:ml-10`}>
            AR756
          </p>
        </div>
        <div className="fixed z-50 bottom-4 right-4">
          <WhatsappFloatComponent />
        </div>
        <VideobgComponent />
        <WelcomeComponent />
        <ShowOnlyOnMobileComponent>
          <MobileCarroucelComopnent />
        </ShowOnlyOnMobileComponent>
        <ShowOnlyOnWebComponent>
          <ComodidadeComponent />
          <ServicosComponents  />
        </ShowOnlyOnWebComponent>
        <ExploreComponent
        />
      </main>
      <FooterComponent />
    </>
  );
}
