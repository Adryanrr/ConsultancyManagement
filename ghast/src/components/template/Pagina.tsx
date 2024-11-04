import Footer from "./Footer";
import Header from "./Header";
import { AppSidebar } from "../app-sidebar";
import { SidebarProvider } from "../ui/sidebar";
import { SidebarTrigger } from "@/components/ui/sidebar";

export default function Pagina(props: any) {
  return (
    <>
      <SidebarProvider>
        <AppSidebar />
        <main className="w-full h-screen">
          <Header/>
          <SidebarTrigger className="md:hidden" />
          {props.children}
        </main>
      </SidebarProvider>
    </>
  );
}
