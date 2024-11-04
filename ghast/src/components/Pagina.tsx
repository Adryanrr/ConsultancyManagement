import Footer from "./footer/Footer";
import Header from "./header/Header";
import { AppSidebar } from "./app-sidebar";
import { SidebarProvider } from "./ui/sidebar";
import { SidebarTrigger } from "@/components/ui/sidebar";

export default function Pagina(props: any) {
  return (
    <>
      <SidebarProvider>
        <AppSidebar />
        <main className="w-full h-screen bg-main">
          <Header/>
          {/* O SidebarTrigger só será exibido em telas móveis */}
          <SidebarTrigger className="md:hidden" />
          {props.children}
        </main>
      </SidebarProvider>
    </>
  );
}
