import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react"
import { HomeHeaderComponent } from "@/components/header";
import { FooterComponent } from "@/components/footer";
import { GoogleTagManager } from "@next/third-parties/google";
import LoadingPage from "@/components/utils/loadingPage";

const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title:{
    default:  "AR756",
    template: "%s - AR756"
  },
  description: "Um oásis em São Paulo.",
  twitter:{
    card: "summary_large_image",
    title: "AR756",
    description: "Um oásis em São Paulo.",
  },
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
        <div id="modal-root" />
        <HomeHeaderComponent />
        {children}
        <FooterComponent />
      </body>
      <Analytics/>
      <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM_ID as string} />
    </html>
  );
}
