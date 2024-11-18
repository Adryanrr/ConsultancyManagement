"use client";
import { useState } from "react";
import {usePathname, useRouter} from "next/navigation";
import {
  FaHome,
  FaUserPlus,
  FaSignOutAlt,
  FaUsers,
  FaPuzzlePiece,
} from "react-icons/fa";

import ItemSideBar from "./ItemSideBar";
import { signOut } from "next-auth/react";
export default function SideBar() {
  const [isExpanded, setIsExpanded] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleLogout = async () => {
    // Remover dados locais, se necessário
    localStorage.removeItem("authToken");
    sessionStorage.removeItem("authToken");

    // Realizar o logout com NextAuth.js
    await signOut({ callbackUrl: "/login" });

    // Redirecionar para login como fallback, caso signOut não redirecione
    router.push("/login");
  };

  return (
    <aside className="hidden flex-col xl:flex w-[311px] bg-white dark:bg-dark-main min-h-screen justify-between p-4">
      <nav className="flex flex-col p-2 gap-1">
        <ItemSideBar href="/dashboard" icone={FaHome} texto="Dashboard" />
        <div onClick={toggleExpand} className="cursor-pointer">
          <ItemSideBar
            href=""
            icone={FaUserPlus}
            texto="Cadastrar"
            hasChevronDown={true}
          />
        </div>
        {isExpanded && (
          <div className="ml-4">
            <ItemSideBar
              href="/dashboard/cadastrar/cliente"
              texto="Cliente"
              border={false}
              isActive={pathname === "/dashboard/cadastrar/cliente"}
            />
            <ItemSideBar
              href="/dashboard/cadastrar/contrato"
              texto="Contrato"
              border={false}
              isActive={pathname === "/dashboard/cadastrar/contrato"}
            />
            <ItemSideBar
              href="/dashboard/cadastrar/consultor"
              texto="Consultor"
              border={false}
              isActive={pathname === "/dashboard/cadastrar/consultor"}
            />
          </div>
        )}
        <ItemSideBar href="/dashboard/projetos" icone={FaPuzzlePiece} texto="Projetos" />
        <ItemSideBar href="/dashboard/clientes" icone={FaUsers} texto="Clientes" />
      </nav>
        <button
          className="dark:bg-gradient-to-t rounded-sm dark:from-[#CB3CFF] dark:to-[#7F25FB] items-center flex h-[43px] w-[230px] gap-4 p-4 bg-black text-white"
          onClick={handleLogout}
        >
          <FaSignOutAlt size={24} />
          <p>Logout</p>
        </button>
    </aside>
  );
}
