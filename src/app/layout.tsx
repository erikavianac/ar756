import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { HomeHeaderComponent } from "@/components/header";
import { FooterComponent } from "@/components/footer";
import { GoogleTagManager } from "@next/third-parties/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title:{
    default:  "AR756",
    template: "AR756 - %s"
  },
  description: "Um oásis em São Paulo",
  twitter:{
    card: "summary_large_image"
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
    <html lang="en">
      <body className={`${inter.className} w-full min-h-screen relative`}>
        <div id="modal-root" />
        <HomeHeaderComponent />
        {children}
        <FooterComponent />
      </body>
      <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM_ID as string} />
    </html>
  );
}
