<<<<<<< HEAD
import type { Metadata } from "next";
import "./globals.css";
import localFont from "next/font/local";
import { Roboto, Audiowide } from "next/font/google";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { ThemeProvider } from "@/components/theme-provider";

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
=======
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
>>>>>>> develop
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
<<<<<<< HEAD
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
=======
        className={`${Poppins.variable} ${PoppinsMedium.variable} ${Audiowide.variable} antialiased`}
>>>>>>> develop
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
<<<<<<< HEAD
          >
          {children}
=======
        >
          <SessionProvider>
          {children}
          </SessionProvider>
>>>>>>> develop
        </ThemeProvider>
      </body>
    </html>
  );
}
