import { ImageRequestResponse, QuestionRequestResponse, ServiceRequestResponse, TextRequestResponse } from "@/types";

export async function data() {
  const [
    mobileCarroucelmageList,
    cardImageList,
    imageList,
    imageSobreList,
    services,
    questions,
    textSobreList
    /*     ,
        
        ,
        questionList,
        textRegrasList,
        , */
  ] = await Promise.all([
    fetch(`${process.env.SERVER_URL}/image/getByTag?venueId=8159e209-0057-4df3-ae72-855363c3b84e&tag=MainCarroucel&responsiveMode=Mobile`)
      .then(async (resp) => {
        const response: ImageRequestResponse = await resp.json()
        return response.data.imagesByTag
      }),
    fetch(`${process.env.SERVER_URL}/image/getByTag?venueId=8159e209-0057-4df3-ae72-855363c3b84e&tag=Card`)
      .then(async (resp) => {
        const response: ImageRequestResponse = await resp.json()
        return response.data.imagesByTag
      }),
    fetch(`${process.env.SERVER_URL}/image/getByTag?venueId=8159e209-0057-4df3-ae72-855363c3b84e`)
      .then(async (resp) => {
        const response: ImageRequestResponse = await resp.json()
        return response.data.imagesByTag
      }),
    fetch(`${process.env.SERVER_URL}/image/getByTag?venueId=8159e209-0057-4df3-ae72-855363c3b84e&tag=Sobre`)
      .then(async (resp) => {
        const response: ImageRequestResponse = await resp.json()
        return response.data.imagesByTag
      }),
    fetch(
      `${process.env.SERVER_URL}/service/list?venueId=8159e209-0057-4df3-ae72-855363c3b84e`,
      {
        method: "GET",
      }
    ).then(async (resp) => {
      const response: ServiceRequestResponse = await resp.json();
      return response?.data?.serviceList;
    }),
    fetch(`${process.env.SERVER_URL}/question/list`).then((resp) =>
      resp.json()
    ).then(async (resp) => {
      const response: QuestionRequestResponse = await resp.json();
      return response?.data?.questionList;
    }),
    fetch(`${process.env.SERVER_URL}/text/list?venueId=8159e209-0057-4df3-ae72-855363c3b84e&area=Sobre`).then((resp) =>
      resp.json()
    ).then(async (resp) => {
      const response: TextRequestResponse = await resp.json();
      return response?.data?.textList;
    }),

  ]);

  return {
    services,
    imageList,
    questions,
    textSobreList,
    cardImageList,
    imageSobreList,
    mobileCarroucelmageList,

  };
}
