"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FaHome,
  FaHistory,
  FaBriefcase,
  FaUserPlus,
  FaSignOutAlt,
  FaUsers,
} from "react-icons/fa";

import ItemSideBar from "./ItemSideBar";
import { signOut } from "next-auth/react";
export default function SideBar() {
  const [isExpanded, setIsExpanded] = useState(false);
  const pathname = usePathname();

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <aside className="w-[311px] bg-white dark:bg-dark-main min-h-screen justify-between flex-col flex p-4">
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
        <ItemSideBar href="" icone={FaHistory} texto="Histórico" />
        <ItemSideBar href="" icone={FaBriefcase} texto="Fidelidade" />
        <ItemSideBar href="" icone={FaUsers} texto="Clientes" />
      </nav>
      <Link href={""}>
        <button className="bg-gradient-to-t rounded-sm from-[#CB3CFF] to-[#7F25FB] items-center flex h-[43px] w-[253px] gap-4 p-4" onClick={() => signOut()}>
          <FaSignOutAlt size={24} />
          <p>Logout</p>
        </button>
      </Link>
    </aside>
  );
}
