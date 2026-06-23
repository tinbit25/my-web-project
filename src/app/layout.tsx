import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "900"],
  variable: "--font-roboto",
});

export const metadata: Metadata = {
  title: "Debre Berhan Unity Churches Sunday School Portal",
  description:
    "Learning management and information portal for Grades 1-12 of Tsbase Debre Selam Medhanealem, Debre Mehret Kidus Mikael, Debre Hail Kidus Gabriel, and Abune Tekle Haymanot Unity Churches Sunday School.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${roboto.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-gray-950 text-gray-100">
        {children}
      </body>
    </html>
  );
}
