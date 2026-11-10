import { Image, VenueWithRelations, Text } from "@/types/venue";
import { SOCIAL_FALLBACK } from "@/constants/social-fallback";
import React, { createContext, useContext, useState, useEffect } from "react";



// Novo tipo para o texto, caso não exista já tipado
// type VenueText = { area: string; [key: string]: any };

export type SocialLinks = {
  whatsapp: string;
  facebook: string;
  instagram: string;
  tiktok: string;
};

type VenueContextType = {
  venue: VenueWithRelations | null;
  loading: boolean;
  error: string | null;
  getTextsByArea: (area: string) => Text[];
  getImagesByTag: (tag: string) => Image[];
  socialLinks: SocialLinks;
  getWhatsappLink: (text?: string) => string;
};

const pick = (value: string | null | undefined, fallback: string): string =>
  value && value.trim() ? value.trim() : fallback;

const buildWhatsappLink = (number: string | null | undefined, text?: string): string => {
  const phone = pick(number, SOCIAL_FALLBACK.whatsappNumber).replace(/\D/g, "");
  const msg = text ? `&text=${encodeURIComponent(text)}` : "&text";
  return `https://api.whatsapp.com/send/?phone=${phone}${msg}&type=phone_number&app_absent=0`;
};

const buildSocialLinks = (venue: VenueWithRelations | null): SocialLinks => ({
  whatsapp: buildWhatsappLink(venue?.whatsappNumber),
  facebook: pick(venue?.facebookUrl, SOCIAL_FALLBACK.facebookUrl),
  instagram: pick(venue?.instagramUrl, SOCIAL_FALLBACK.instagramUrl),
  tiktok: pick(venue?.tiktokUrl, SOCIAL_FALLBACK.tiktokUrl),
});

const VenueContext = createContext<VenueContextType>({
  venue: null,
  loading: true,
  error: null,
  getTextsByArea: () => [],
  getImagesByTag: () => [],
  socialLinks: buildSocialLinks(null),
  getWhatsappLink: (text?: string) => buildWhatsappLink(null, text),
});

export const VenueProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [venue, setVenue] = useState<VenueWithRelations | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("https://art56-server-v3.vercel.app/venue/getWebData?venueId=8159e209-0057-4df3-ae72-855363c3b84e")
      .then((res: Response) => res.json())
      .then((data: { data: VenueWithRelations }) => setVenue(data.data))
      .catch(() => setError("Erro ao carregar dados do espaço"))
      .finally(() => setLoading(false));
  }, []);

  // Método utilitário para filtrar textos por área
  const getTextsByArea = (area: string): Text[] => {
    if (!venue || !venue.texts) return [];
    return venue.texts.filter((t) => t.area === area);
  };

  // Método utilitário para filtrar imagens por tag
  const getImagesByTag = (tag: string): Image[] => {
    if (!venue || !venue.images) return [];
    return venue.images.filter((img) => img.tag === tag);
  };

  const socialLinks = buildSocialLinks(venue);
  const getWhatsappLink = (text?: string): string => buildWhatsappLink(venue?.whatsappNumber, text);

  return (
    <VenueContext.Provider
      value={{ venue, loading, error, getTextsByArea, getImagesByTag, socialLinks, getWhatsappLink }}
    >
      {children}
    </VenueContext.Provider>
  );
};

export const useVenueContext = () => useContext(VenueContext);
