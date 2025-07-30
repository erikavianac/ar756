import { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react"
import { HomeHeaderComponent } from "@/components/header";
import { FooterComponent } from "@/components/footer";
import Script from 'next/script';
import LoadingPage from "@/components/utils/loadingPage";
import { ToastProvider } from "@/components/toat-provider/toast-provider";
import { GTM_ID } from "@/utils/gtm";
import { VenueProviderWrapper } from "@/app/context/VenueProviderWrapper";

const roboto = Roboto({
  weight: ["100", "300", "400", "500", "700", "900"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "AR756 - Casa para eventos em São Paulo",
  description:
    "Alugue a AR756 para seus eventos em São Paulo. Espaço versátil com piscina, churrasqueira e ambiente moderno para festas, casamentos e eventos corporativos.",
  keywords: [
    "casa para eventos",
    "aluguel de espaço",
    "eventos em São Paulo",
    "festas",
    "casamentos",
    "eventos corporativos",
    "AR756",
  ],
  metadataBase: new URL('https://ar756.com'),
  openGraph: {
    type: 'website',
    title: 'AR756 - Seu espaço para eventos em São Paulo',
    description: 'Um oásis em São Paulo. Espaço para eventos, filmagens e produções com piscina, jardim, churrasqueira e muito mais.',
    url: 'https://ar756.com',
    siteName: 'AR756',
    images: [
      {
        url: 'https://res.cloudinary.com/dio4rp1nb/image/upload/v1739958372/file_2_gjm6nx_sfgf81_ptlh6x.jpg',
        width: 1200,
        height: 630,
        alt: 'AR756 - Vista da fachada',
      }
    ],
    locale: 'pt_BR',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AR756 - Seu espaço para eventos em São Paulo',
    description: 'Um oásis em São Paulo. Espaço para eventos, filmagens e produções.',
    images: ['https://res.cloudinary.com/dio4rp1nb/image/upload/v1739958372/file_2_gjm6nx_sfgf81_ptlh6x.jpg'],
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={roboto.className}>
      <head>
        <Script id="gtm-script" strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GTM_ID}');
          `}
        </Script>
      </head>
      <body className="overflow-x-hidden">
        <VenueProviderWrapper>
          <ToastProvider>
            <LoadingPage />
            <div id="modal-root" />
            {children}
          </ToastProvider>
        </VenueProviderWrapper>
      </body>
      <Script
        src="https://va.tawk.to/analytics.js"
        strategy="lazyOnload"
      />
    
      <Script
        id="schema-org-script"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": ["LocalBusiness", "EventVenue"],
            "name": "AR756",
            "image": "https://res.cloudinary.com/dio4rp1nb/image/upload/v1739958372/file_2_gjm6nx_sfgf81_ptlh6x.jpg",
            "description": "Um oásis em São Paulo. Espaço para eventos, filmagens e produções com piscina, jardim, churrasqueira e muito mais.",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Av. Alberto Ramos, 756",
              "addressLocality": "São Paulo",
              "addressRegion": "SP",
              "postalCode": "03222-000",
              "addressCountry": "BR"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": -23.5880049,
              "longitude": -46.5613551
            },
            "url": "https://ar756.com",
            "telephone": "+351938324447",
            "openingHoursSpecification": {
              "@type": "OpeningHoursSpecification",
              "dayOfWeek": [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
                "Sunday"
              ],
              "opens": "10:00",
              "closes": "22:00"
            },
            "amenityFeature": [
              {
                "@type": "LocationFeatureSpecification",
                "name": "Piscina"
              },
              {
                "@type": "LocationFeatureSpecification",
                "name": "Jardim"
              },
              {
                "@type": "LocationFeatureSpecification",
                "name": "Churrasqueira"
              },
              {
                "@type": "LocationFeatureSpecification",
                "name": "WiFi"
              }
            ]
          })
        }}
      />
    </html>
  );
}
