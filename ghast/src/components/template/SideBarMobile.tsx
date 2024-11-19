"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { CiMenuFries } from "react-icons/ci";
import { IoIosArrowDown, IoIosArrowUp, IoMdClose } from "react-icons/io";
import Image from "next/image";

const links = [
  {
    name: "Cadastrar",
    subLinks: [
      { name: "Cliente", path: "/dashboard/cadastrar/cliente" },
      { name: "Contrato", path: "/dashboard/cadastrar/contrato" },
      { name: "Consultor", path: "/dashboard/cadastrar/consultor" },
    ],
  },
  { name: "Contratos", path: "/dashboard/projetos" },
  { name: "Clientes", path: "/dashboard/clientes" },
];

export default function SideBarMobile() {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedMenu, setExpandedMenu] = useState(null);
  const pathname = usePathname();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleSubMenu = (menuName: any) => {
    setExpandedMenu((prev) => (prev === menuName ? null : menuName));
  };

  return (
    <div className="xl:hidden absolute left-3 top-3">
      <button onClick={toggleMenu}>
        <CiMenuFries className="text-[32px] text-violet-500 rotate-180" />
      </button>
      {isOpen && (
        <div className="fixed left-0 top-0 flex flex-col w-2/3 h-full overflow-y-auto z-50 bg-white/95 dark:bg-dark-main ">
          <button onClick={toggleMenu} className="fixed top-4 left-4">
            <IoMdClose className="text-[32px] text-violet-500 dark:text-white" />
          </button>

          <nav className="flex flex-col justify-center items-center text-left gap-5 h-full">
            <Image src="/assets/Logo.svg" width={52} height={54} alt="logo" />
            {links.map((link, index) => (
              <div key={index} className="w-full justify-center items-center flex">
                {link.subLinks ? (
                  <div>
                    <button
                      onClick={() => toggleSubMenu(link.name)}
                      className="w-full flex items-center gap-2 text-xl capitalize dark:text-white text-violet-500 dark:hover:text-violet-500 hover:text-violet-900 transition-all px-4 py-2"
                    >
                      {link.name}
                      {expandedMenu === link.name ? (
                        <IoIosArrowUp className="text-violet-500 dark:text-white " />
                      ) : (
                        <IoIosArrowDown className="text-violet-500 dark:text-white" />
                      )}
                    </button>
                    {expandedMenu === link.name && (
                      <div className=" flex-col flex items-center">
                        {link.subLinks.map((subLink, subIndex) => (
                          <Link
                            href={subLink.path}
                            key={subIndex}
                            onClick={toggleMenu}
                            className={`${
                              subLink.path === pathname
                                ? "dark:text-violet-500 text-black border-b-2 dark:border-violet-500"
                                : ""
                            } text-lg capitalize dark:text-white  text-violet-500 dark:hover:text-violet-500 hover:text-violet-900 transition-all py-1`}
                          >
                            {subLink.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    href={link.path || "#"}
                    key={index}
                    onClick={toggleMenu}
                    className={`${
                      link.path === pathname
                        ? "dark:text-violet-500 text-black border-b-2 dark:border-violet-500"
                        : ""
                    } text-xl capitalize dark:text-white text-violet-500 dark:hover:text-violet-500 hover:text-violet-900 transition-all`}
                  >
                    {link.name}
                  </Link>
                )}
              </div>
            ))}
          </nav>
        </div>
      )}
    </div>
  );
}
