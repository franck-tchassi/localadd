import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "./providers";

const inter = Inter({
  variable: "--font-inter",
});



const RootLayout = async ({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{locale: string}>
}>) => {
  return (
    <html lang="en">
      <body
       suppressHydrationWarning
        className={`${inter.className} antialiased`}
      >
        <Providers locale={(await params).locale}>
          {children}
        </Providers>

      </body>
    </html>
  );
}

export default RootLayout;
