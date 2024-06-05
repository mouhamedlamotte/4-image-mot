import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import LevelContextProvider from "@/context/LevelContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "4 images 1 mot",
  description: "Clone 4 image 1 mot version web avec mockup miibile",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <LevelContextProvider>
        {children}
        </LevelContextProvider>
        </body>
    </html>
  );
}
