import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider, themeInitScript } from "@/components/ThemeProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import LoadingScreen from "@/components/LoadingScreen";
import PageTransition from "@/components/PageTransition";
import { site } from "@/data/site";

const display = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600"],
  display: "swap",
});

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.seo.url),
  title: {
    default: site.seo.title,
    template: `%s — ${site.name}`,
  },
  description: site.seo.description,
  openGraph: {
    title: site.seo.title,
    description: site.seo.description,
    url: site.seo.url,
    siteName: site.name,
    images: [{ url: site.seo.ogImage }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: site.seo.title,
    description: site.seo.description,
    images: [site.seo.ogImage],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className={`${display.variable} ${sans.variable} font-sans`}>
        <ThemeProvider>
          <LoadingScreen />
          <CustomCursor />
          <Navbar />
          <main id="main-content">
            <PageTransition>{children}</PageTransition>
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
