export async function data() {
  const [
    cardImageList,
    mobileCarroucelmageList,
    imageList,
    imageSobreList,
    questionList,
    textRegrasList,
    textSobreList,
  ] = await Promise.all([
    fetch(`${process.env.SERVER_URL}/image/getByTag/Card/Web`).then((resp) =>
      resp.json()
    ),
    fetch(`${process.env.SERVER_URL}/image/getByTag/MainCarroucel/Mobile`).then(
      (resp) => resp.json()
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
    ),
  ]);

  return {
    cardImageList,
    mobileCarroucelmageList,
    imageList,
    imageSobreList,
    questionList,
    textRegrasList,
    textSobreList,
  };
}
