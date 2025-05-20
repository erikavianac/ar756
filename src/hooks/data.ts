import { ImageRequestResponse, QuestionRequestResponse, ServiceRequestResponse, TextRequestResponse } from "@/types";

export async function data() {
  try {
    const [
      mobileCarroucelmageList,
      cardImageList,
      imageList,
      imageSobreList,
      services,
      questions,
      textSobreList
    ] = await Promise.all([
      fetch(`${process.env.SERVER_URL}/image/getByTag?venueId=8159e209-0057-4df3-ae72-855363c3b84e&tag=MainCarroucel&responsiveMode=Mobile`)
        .then(async (resp) => {
          const response: ImageRequestResponse = await resp.json()
          return response?.data?.imagesByTag || []
        })
        .catch(() => []),
      fetch(`${process.env.SERVER_URL}/image/getByTag?venueId=8159e209-0057-4df3-ae72-855363c3b84e&tag=Card&responsiveMode=`)
        .then(async (resp) => {
          const response: ImageRequestResponse = await resp.json()
          return response?.data?.imagesByTag || []
        })
        .catch(() => []),
      fetch(`${process.env.SERVER_URL}/image/getByTag?venueId=8159e209-0057-4df3-ae72-855363c3b84e`)
        .then(async (resp) => {
          const response: ImageRequestResponse = await resp.json()
          return response?.data?.imagesByTag || []
        })
        .catch(() => []),
      fetch(`${process.env.SERVER_URL}/image/getByTag?venueId=8159e209-0057-4df3-ae72-855363c3b84e&tag=Sobre&responsiveMode=`)
        .then(async (resp) => {
          const response: ImageRequestResponse = await resp.json()
          return response?.data?.imagesByTag || []
        })
        .catch(() => []),
      fetch(
        `${process.env.SERVER_URL}/service/list?venueId=8159e209-0057-4df3-ae72-855363c3b84e`,
        {
          method: "GET",
        }
      ).then(async (resp) => {
        const response: ServiceRequestResponse = await resp.json();
        return response?.data?.serviceList || []
      })
      .catch(() => []),
      fetch(`${process.env.SERVER_URL}/question/list?venueId=8159e209-0057-4df3-ae72-855363c3b84e`).then(async (resp) => {
        const response: QuestionRequestResponse = await resp.json();
        return response?.data?.questionList || []
      })
      .catch(() => []),
      fetch(`${process.env.SERVER_URL}/text/list?venueId=8159e209-0057-4df3-ae72-855363c3b84e&area=Sobre`).then(async (resp) => {
        const response: TextRequestResponse = await resp.json();
        return response?.data?.textList || []
      })
      .catch(() => []),
    ]);

    return {
      services: services || [],
      imageList: imageList || [],
      questions: questions || [],
      textSobreList: textSobreList || [],
      cardImageList: cardImageList || [],
      imageSobreList: imageSobreList || [],
      mobileCarroucelmageList: mobileCarroucelmageList || [],
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return {
      services: [],
      imageList: [],
      questions: [],
      textSobreList: [],
      cardImageList: [],
      imageSobreList: [],
      mobileCarroucelmageList: [],
    };
  }
}
