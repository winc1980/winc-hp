import type { Metadata, Viewport } from "next";
import { Noto_Sans_JP, Geist_Mono, Montserrat } from "next/font/google";
import "./globals.css";
import Footer from "@/components/footer";
import Header from "@/components/header";
import Script from "next/script";
import LoadingOrBg from "@/components/layout/loading-or-bg";

const notoSansJp = Noto_Sans_JP({
  variable: "--font-noto-sans-jp",
  subsets: ["latin"],
});

const sans = Montserrat({
  subsets: ["latin"],
  variable: "--default-sansserif",
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: 'white',
}
export const metadata: Metadata = {
  title: "WINC - 早稲田コンピューター研究会",
  description: "早稲田コンピューター研究会（WINC）の公式ホームページです。",
  appleWebApp: {
    title: "WINC",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="overscroll-x-none overflow-x-hidden bg-background -z-10 relative"
    >
      <body
        className={`${notoSansJp.variable} ${geistMono.variable} ${sans.variable} antialiased min-h-screen bg-gradient-to-br from-blue-500 to-rose-500 z-0 relative`}
      >
        <Script
          src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js"
          strategy="beforeInteractive"
        />
        <Script
          src="https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.net.min.js"
          strategy="beforeInteractive"
        />
        <LoadingOrBg />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
