import "./globals.css";
import type { Metadata } from "next";
import localFont from "next/font/local";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { SessionProvider } from "next-auth/react"

const Audiowide = localFont({
  src: "./fonts/Audiowide-Regular.woff",
  variable: "--font-audiowide-sans",
  weight: "100 900",
});

const Poppins = localFont({
  src: "./fonts/Poppins-Regular.woff",
  variable: "--font-poppins-sans",
  weight: "100 900",
});

const PoppinsMedium = localFont({
  src: "./fonts/Poppins-Medium.woff",
  variable: "--font-poppins-medium-sans",
  weight: "100 900",
});


const PoppinsBold = localFont({
  src: "./fonts/Poppins-Bold.woff",
  variable: "--font-poppins-bold-sans",
  weight: "100 900",
});


export const metadata: Metadata = {
  title: "Ghast Consultoria",
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
        className={`${Poppins.variable} ${PoppinsMedium.variable} ${Audiowide.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SessionProvider>
          {children}
          </SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
