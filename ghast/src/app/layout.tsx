import "./globals.css";
import type { Metadata } from "next";
import localFont from "next/font/local";
import Header from "@/components/template/Header";
import { Roboto, Audiowide } from "next/font/google";
import { ThemeProvider } from "@/components/providers/theme-provider";

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-logo",
});

const audiowide = Audiowide({
  weight: "400",
  subsets: ["latin"],
});

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Projeto Ghast",
  description: "Sistema de Gestão de Consultorias",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
