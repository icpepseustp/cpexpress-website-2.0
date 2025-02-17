import type { Metadata } from "next";
import NextTopLoader from "nextjs-toploader";
import { Inter } from 'next/font/google'
import "./globals.css";

const inter = Inter({
  weight: ["400", "500", "700"], // Choose the font weights you want to use
  subsets: ["latin"],             // Use the latin subset (you can adjust as needed)
  display: "swap",                // Use "swap" to improve loading behavior
});

const seoKeywords = [
  "ICpEP.SE - CpExpress",
  "CpExpress",
  "ICpEP",
  "Institute of Computer Engineering of the Philippines student edition"
]

export const metadata: Metadata = {
  keywords: seoKeywords,
  title: {
    default: 'ICpEP.SE - CpExpress | USTP Computer Engineering',
    template: '%s | CpExpress - ICpEP.SE USTP'
  },
  description: 'ICpEP.SE - CpExpress is the official Computer Engineering student organization at USTP Cagayan de Oro, part of the Institute of Computer Engineering of the Philippines.',
  openGraph: {
    description: 'ICpEP.SE - CpExpress, the official Computer Engineering student organization at USTP, fostering innovation and collaboration.',
    images: ['public/assets/images/logo.png']
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextTopLoader
          color="#D3C99C"
          showSpinner={false}/>
        {children}
      </body>
    </html>
  );
}
