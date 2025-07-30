import { Image, VenueWithRelations, Text } from "@/types/venue";
import React, { createContext, useContext, useState, useEffect } from "react";



// Novo tipo para o texto, caso não exista já tipado
// type VenueText = { area: string; [key: string]: any };

type VenueContextType = {
  venue: VenueWithRelations | null;
  loading: boolean;
  error: string | null;
  getTextsByArea: (area: string) => Text[];
  getImagesByTag: (tag: string) => Image[];
};

const VenueContext = createContext<VenueContextType>({
  venue: null,
  loading: true,
  error: null,
  getTextsByArea: () => [],
  getImagesByTag: () => [],
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

  return (
    <VenueContext.Provider value={{ venue, loading, error, getTextsByArea, getImagesByTag }}>
      {children}
    </VenueContext.Provider>
  );
};

export const useVenueContext = () => useContext(VenueContext); 