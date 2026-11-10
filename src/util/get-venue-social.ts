import { cache } from "react";
import { VenueResponse } from "@/types/venue";
import { SOCIAL_FALLBACK } from "@/constants/social-fallback";

const API_URL = process.env.SERVER_URL ?? "https://art56-server-v3.vercel.app";

export const getVenueSocial = cache(async () => {
  try {
    const res = await fetch(
      `${API_URL}/venue/getWebData?venueId=8159e209-0057-4df3-ae72-855363c3b84e`,
      { next: { revalidate: 3600 } }
    );
    if (!res.ok) return SOCIAL_FALLBACK;
    const { data }: VenueResponse = await res.json();
    return {
      whatsappNumber: data?.whatsappNumber?.trim() || SOCIAL_FALLBACK.whatsappNumber,
      facebookUrl: data?.facebookUrl?.trim() || SOCIAL_FALLBACK.facebookUrl,
      instagramUrl: data?.instagramUrl?.trim() || SOCIAL_FALLBACK.instagramUrl,
      tiktokUrl: data?.tiktokUrl?.trim() || SOCIAL_FALLBACK.tiktokUrl,
    };
  } catch {
    return SOCIAL_FALLBACK;
  }
});
