import Header from "@/components/template/Header";
import SideBar from "@/components/template/SideBar";
import Head from "next/head";
import SideBarMobile from "@/components/template/SideBarMobile";

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
      <Header />
      <div className="flex-1 flex">
        <SideBar />
        <SideBarMobile />
        <main className="w-full">{children}</main>
      </div>
    </>
  );
}
