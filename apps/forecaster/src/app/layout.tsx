import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { MODE } from "@/fonts/fonts";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ouroboros – Forecaster",
  description: "Building forecasts, through lores.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={MODE.className}>{children}</body>
    </html>
  );
}
