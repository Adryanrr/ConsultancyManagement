import { AppSidebar } from "@/components/providers/app-sidebar";
import Header from "@/components/template/Header";
import { SidebarProvider } from "@/components/ui/sidebar";
import { SidebarTrigger } from "@/components/ui/sidebar";
import Head from "next/head";

interface PaginaProps {
  children: React.ReactNode;
  title?: string;
}

export default function Pagina({
  children,
  title = "Página Específica",
}: PaginaProps) {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>

      <Header />
      <SidebarProvider>
        <AppSidebar />
        <main className="w-full flex relative">
          <SidebarTrigger className="md:hidden absolute top-4 left-4 z-50" />
          {children}
        </main>
      </SidebarProvider>
    </>
  );
}
