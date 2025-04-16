import { ImageRequestResponse } from "@/types";

export async function data() {
  const [
    mobileCarroucelmageList,
    /*     cardImageList,
        imageList,
        imageSobreList,
        questionList,
        textRegrasList,
        textSobreList, */
  ] = await Promise.all([
    fetch(`${process.env.SERVER_URL}/image/getByTag?venueId=8159e209-0057-4df3-ae72-855363c3b84e&tag=MainCarroucel&responsiveMode=Mobile`)
      .then(async (resp) => {
        const response: ImageRequestResponse = await resp.json()
        return response.data.imagesByTag
      }),
    /*  fetch(`${process.env.SERVER_URL}/image/getByTag/Card/Web`).then((resp) =>
       resp.json()
     ),
     fetch(`${process.env.SERVER_URL}/image/list`).then((resp) => resp.json()),
     fetch(`${process.env.SERVER_URL}/image/getByTag/Sobre/Web`).then((resp) =>
       resp.json()
     ),
     fetch(`${process.env.SERVER_URL}/question/list`).then((resp) =>
       resp.json()
     ),
     fetch(`${process.env.SERVER_URL}/text/getByArea/regras`).then((resp) =>
       resp.json()
     ),
     fetch(`${process.env.SERVER_URL}/text/getByArea/sobre`).then((resp) =>
       resp.json()
     ), */
  ]);

  return {
    mobileCarroucelmageList,
    /* 
    cardImageList,
    imageList,
    imageSobreList,
    questionList,
    textRegrasList,
    textSobreList, */
  };
}
