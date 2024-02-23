import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const orcamentoList = await fetch(`${process.env.BASE_URL}/orcamento/list`, {
    method: "GET",
  }).then(async (resp) => {
    return await resp.json();
  });

  return [
    {
      url: `${process.env.BASE_URL}/faq`,
    },
    {
        url: `${process.env.BASE_URL}/regras`,
    },
    {
      url: `${process.env.BASE_URL}/galeria`,
    },
    {
      url: `${process.env.BASE_URL}/consultar`,
    },
  ];
}
