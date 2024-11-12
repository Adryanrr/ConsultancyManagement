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
        <div className="xl:hidden absolute left-3 top-3">
          <SideBarMobile />
        </div>
        <main className="w-full flex relative">{children}</main>
      </div>
    </>
  );
}
