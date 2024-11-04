import Footer from "./Footer";
import Header from "./Header";
import { AppSidebar } from "../app-sidebar";
import { SidebarProvider } from "../ui/sidebar";
import { SidebarTrigger } from "@/components/ui/sidebar";
import Head from "next/head";

export default function Pagina(props: any) {
  return (
    <>
      <SidebarProvider>
        
        <AppSidebar />
        <Header />
        <main className="w-full h-screen flex items-center justify-center">
          <SidebarTrigger className="md:hidden" />
          {props.children}
        </main>
      </SidebarProvider>
    </>
  );
}
