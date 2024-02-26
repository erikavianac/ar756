import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  return [
    {
      url: `${process.env.BASE_URL}`,
    },
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
