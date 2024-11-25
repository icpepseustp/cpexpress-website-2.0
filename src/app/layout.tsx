import type { Metadata } from "next";
import NextTopLoader from "nextjs-toploader";
import { Inter } from 'next/font/google'
import "./globals.css";

const inter = Inter({
  weight: ["400", "500", "700"], // Choose the font weights you want to use
  subsets: ["latin"],             // Use the latin subset (you can adjust as needed)
  display: "swap",                // Use "swap" to improve loading behavior
});

export const metadata: Metadata = {
  title: 'ICpEP.SE-USTP | CpExpress Website',
  description: 'ICpEP.SE USTP-CDO is the official student organization for Computer Engineering students at the University of Science and Technology of Southern Philippines - Cagayan de Oro.',
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
