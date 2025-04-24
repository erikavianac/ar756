import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react"
import { HomeHeaderComponent } from "@/components/header";
import { FooterComponent } from "@/components/footer";
import Script from 'next/script';
import LoadingPage from "@/components/utils/loadingPage";
import { ToastProvider } from "@/components/toat-provider/toast-provider";

const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: {
    default: "AR756",
    template: "%s - AR756"
  },
  description: "Um oásis em São Paulo. Espaço para eventos, filmagens e produções com piscina, jardim, churrasqueira e muito mais.",
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
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scrollbar-track-rounded-full scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent  overflow-y-scroll">
      <body suppressHydrationWarning={true} className={`${roboto.className} w-full min-h-screen relative`}>
        <LoadingPage />
        <ToastProvider />
        <div id="modal-root" />
        {children}
      </body>
      <Script
        src="https://va.tawk.to/analytics.js"
        strategy="lazyOnload"
      />
    
      <Script
        id="gtm-script"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${process.env.NEXT_PUBLIC_GTM_ID}');
          `,
        }}
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
