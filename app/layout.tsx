import type { Metadata } from "next";
import { Montserrat, Inter } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "./components/site-header";
import { SiteFooter } from "./components/site-footer";
import { NewsletterSection } from "./components/newsletter-section";
import { DonateModalProvider } from "./components/donate-modal-provider";

// Montserrat for Branding, Titles, and Navigation
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-montserrat",
});

// Inter for body text (standard in Figma designs)
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "Women for Women Rwanda",
    template: "%s | Women for Women Rwanda",
  },
  description: "Figma-matched Women for Women website",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${montserrat.variable} ${inter.variable}`}>
      <body className="flex min-h-screen flex-col bg-white font-sans antialiased">
        <DonateModalProvider>
          <SiteHeader />
          <main className="flex-1 w-full">
            {children}
          </main>
          <NewsletterSection />
          <SiteFooter />
        </DonateModalProvider>
      </body>
    </html>
  );
}
