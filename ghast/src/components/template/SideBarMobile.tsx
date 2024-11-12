"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { CiMenuFries } from "react-icons/ci";
import { IoMdClose } from "react-icons/io";
import Image from "next/image";

const links = [
  { name: "cliente", path: "/dashboard/cadastrar/cliente" },
  { name: "Contrato", path: "/dashboard/cadastrar/contrato" },
  { name: "Consultor", path: "/dashboard/cadastrar/consultor" },
  { name: "Histórico", path: "" },
  { name: "Fidelidade", path: "" },
  { name: "Clientes", path: "" },
];

export default function SideBarMobile() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <button onClick={toggleMenu}>
        <CiMenuFries className="text-[32px] text-violet-500 rotate-180" />
      </button>
      {isOpen && (
        <div className="fixed left-0 top-0 flex flex-col w-2/3 h-full overflow-y-auto z-50 bg-black/80 dark:bg-dark-main ">
          <button onClick={toggleMenu} className="fixed top-4 left-4">
            <IoMdClose className="text-[32px] text-violet-500" />
          </button>

          <nav className="flex flex-col justify-center items-center text-left gap-5 h-full">
            <Image src="/assets/logo.svg" width={52} height={54} alt="logo" />
            {links.map((link, index) => (
              <Link
                href={link.path}
                key={index}
                onClick={toggleMenu}
                className={`${
                  link.path === pathname
                    ? "dark:text-violet-500 text-white border-b-2 dark:border-violet-500"
                    : ""
                } text-xl capitalize dark:text-white text-violet-500 dark:hover:text-violet-500 hover:text-white transition-all`}
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </div>
  );
}
