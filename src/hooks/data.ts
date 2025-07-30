import { ImageRequestResponse, QuestionRequestResponse, ServiceRequestResponse, TextRequestResponse } from "@/types";

export async function data() {
  console.log('🔍 Função data() iniciada');
  console.log('🔍 SERVER_URL:', process.env.SERVER_URL);
  
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
      fetch(`${process.env.SERVER_URL}/image/getByTag?venueId=8159e209-0057-4df3-ae72-855363c3b84e&tag=HeroSection&responsiveMode=Mobile`)
        .then(async (resp) => {
          console.log('📱 Mobile carroucel response:', resp.status);
          const response: ImageRequestResponse = await resp.json()
          return response?.data?.imagesByTag || []
        })
        .catch((error) => {
          console.error('❌ Erro no mobile carroucel:', error);
          return []
        }),
      fetch(`${process.env.SERVER_URL}/image/getByTag?venueId=8159e209-0057-4df3-ae72-855363c3b84e&tag=Card&responsiveMode=`)
        .then(async (resp) => {
          console.log('🃏 Card images response:', resp.status);
          const response: ImageRequestResponse = await resp.json()
          return response?.data?.imagesByTag || []
        })
        .catch((error) => {
          console.error('❌ Erro no card images:', error);
          return []
        }),
      fetch(`${process.env.SERVER_URL}/image/getByTag?venueId=8159e209-0057-4df3-ae72-855363c3b84e`)
        .then(async (resp) => {
          console.log('🖼️ Image list response:', resp.status);
          const response: ImageRequestResponse = await resp.json()
          return response?.data?.imagesByTag || []
        })
        .catch((error) => {
          console.error('❌ Erro no image list:', error);
          return []
        }),
      fetch(`${process.env.SERVER_URL}/image/getByTag?venueId=8159e209-0057-4df3-ae72-855363c3b84e&tag=Sobre&responsiveMode=`)
        .then(async (resp) => {
          console.log('ℹ️ Sobre images response:', resp.status);
          const response: ImageRequestResponse = await resp.json()
          return response?.data?.imagesByTag || []
        })
        .catch((error) => {
          console.error('❌ Erro no sobre images:', error);
          return []
        }),
      fetch(
        `${process.env.SERVER_URL}/service/list?venueId=8159e209-0057-4df3-ae72-855363c3b84e`,
        {
          method: "GET",
        }
      ).then(async (resp) => {
        console.log('🔧 Services response:', resp.status);
        const response: ServiceRequestResponse = await resp.json();
        return response?.data?.serviceList || []
      })
      .catch((error) => {
        console.error('❌ Erro no services:', error);
        return []
      }),
      fetch(`${process.env.SERVER_URL}/question/list?venueId=8159e209-0057-4df3-ae72-855363c3b84e`).then(async (resp) => {
        console.log('❓ Questions response:', resp.status);
        const response: QuestionRequestResponse = await resp.json();
        return response?.data?.questionList || []
      })
      .catch((error) => {
        console.error('❌ Erro no questions:', error);
        return []
      }),
      fetch(`${process.env.SERVER_URL}/text/list?venueId=8159e209-0057-4df3-ae72-855363c3b84e&area=Sobre`).then(async (resp) => {
        console.log('📝 Text sobre response:', resp.status);
        const response: TextRequestResponse = await resp.json();
        return response?.data?.textList || []
      })
      .catch((error) => {
        console.error('❌ Erro no text sobre:', error);
        return []
      }),
    ]);

    console.log('✅ Todas as chamadas completadas com sucesso');
    console.log('📊 Resultados:', {
      services: services?.length || 0,
      imageList: imageList?.length || 0,
      questions: questions?.length || 0,
      textSobreList: textSobreList?.length || 0,
      cardImageList: cardImageList?.length || 0,
      imageSobreList: imageSobreList?.length || 0,
      mobileCarroucelmageList: mobileCarroucelmageList?.length || 0,
    });

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
    console.error('❌ Error fetching data:', error);
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
