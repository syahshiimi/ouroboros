import type { Metadata } from "next";
import "./globals.css";
import { MODE } from "@/fonts/fonts";

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
