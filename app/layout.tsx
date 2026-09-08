import type { Metadata } from "next";
import "./globals.css";
import { aeonik, obviously } from "@/fonts";
import Navbar from "@/components/Navigation/Navbar";
import Footer from "@/components/Navigation/Footer";
import PageTransition from "@/components/Reusable/PageTransition";
import FloatingFormulationButton from "@/components/Reusable/FloatingFormulationButton";
import { SITE_DESCRIPTION, SITE_NAME, SITE_TITLE, SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${aeonik.variable} ${obviously.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Navbar />
        <PageTransition>{children}</PageTransition>
        <Footer />
        <FloatingFormulationButton />
      </body>
    </html>
  );
}
