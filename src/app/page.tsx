import { ComodidadeComponent } from "@/components/comodidades";
import { ExploreComponent } from "@/components/explore";
import { MobileCarroucelComopnent } from "@/components/mobileCarroucel";
import { ServicosComponents } from "@/components/servicos/servicos";
import { ShowOnlyOnMobileComponent } from "@/components/utils/showOnlyOnMobile";
import { ShowOnlyOnWebComponent } from "@/components/utils/showOnlyOnWeb";
import { VideobgComponent } from "@/components/video/videobg";
import { WelcomeComponent } from "@/components/welcome";

export default async function Home() {
  const cardImageList = await fetch(
    `${process.env.BASE_URL}/image/getByTag/Card/Web`,
    {
      method: "GET",
    }
  ).then(async (resp) => {
    return await resp.json();
  });

  const mobileCarroucelmageList = await fetch(
    `${process.env.BASE_URL}/image/getByTag/MainCarroucel/Mobile`,
    {
      method: "GET",
    }
  ).then(async (resp) => {
    return await resp.json();
  });

  const imageList = await fetch(`${process.env.BASE_URL}/image/list`, {
    method: "GET",
  }).then(async (resp) => {
    return await resp.json();
  });

  const imageSobreList = await fetch(`${process.env.BASE_URL}/image/getByTag/Sobre/Web`, {
    method: "GET",
  }).then(async (resp) => {
    return await resp.json();
  });

  const questionList = await fetch(`${process.env.BASE_URL}/question/list`, {
    method: "GET",
  }).then(async (resp) => {
    return await resp.json();
  });

  const textRegrasList = await fetch(
    `${process.env.BASE_URL}/text/getByArea/regras`,
    {
      method: "GET",
    }
  ).then(async (resp) => {
    return await resp.json();
  });

  const textSobreList = await fetch(
    `${process.env.BASE_URL}/text/getByArea/sobre`,
    {
      method: "GET",
    }
  ).then(async (resp) => {
    return await resp.json();
  });

  return (
    <main className="bg-faixada flex flex-col flex-1 bg-gray-300 overflow-hidden">
      <VideobgComponent mobileCarroucelmageList={mobileCarroucelmageList}/>
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
