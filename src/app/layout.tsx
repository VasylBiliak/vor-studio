"use client";

import { Montserrat, Almendra, Marcellus } from "next/font/google";
import "./globals.css";
import Providers from "./providers";

const marcellus = Marcellus({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-marcellus",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

const almendra = Almendra({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-decorative",
  display: "swap",
});

import Header from "@/components/layout/Header/Header";
import Footer from "@/components/layout/Footer/Footer";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${marcellus.variable} ${montserrat.variable} ${almendra.variable}`}
    >
      <body>
        <Providers>
          <Header />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
