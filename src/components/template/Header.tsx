<<<<<<< HEAD
import { Settings, MessageCircle } from "lucide-react";

export default function Header() {
  return (
    <header className="flex justify-between items-center px-4 py-2 border-b bg-white dark:dc-main">
      <div>
        {/* Aqui você pode adicionar um ícone de perfil ou logo se necessário */}
      </div>
      <div className="text-xl font-bold font-audiowide">GHAST CONSULTORIA</div>
      <div>
        <div>
          {/* <div className="flex justify-center items-center gap-8">
            <MessageCircle />
            <Settings />
          </div> */}
=======
"use client";

import { useState, useEffect } from "react";
import { Moon, MessageCircle, Menu, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import LogoGhast from "../ui/Logo";
import Link from "next/link";

export default function Header() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Define o botão como montado apenas no cliente
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Impede a renderização até que o tema esteja carregado
    return null;
  }

  function toggleDarkMode() {
    setTheme(theme === "dark" ? "light" : "dark");
  }

  return (
    <header className="w-full bg-white dark:bg-dark-main px-4 py-3">
      <div className="flex flex-1 mx-4 items-center justify-between">
        <div></div>
        <div className="justify-center items-center sm:block">
          <div className="flex-row flex gap-1">
            <Link href={"/dashboard"}>
              <LogoGhast className=":w-6 h-6 sm:w-[35px] sm:h-[35px] dark:fill-none"/>
            </Link>
            <span className="sm:text-3xl text-base font-bold text-black dark:text-white font-audiowide">
              GHAST CONSULTORIA
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            className="text-slate-400"
            onClick={toggleDarkMode}
            aria-label={
              theme === "dark" ? "Ativar modo claro" : "Ativar modo escuro"
            }
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5 text-violet-500" />
            ) : (
              <Moon className="h-5 w-5 text-violet-500" />
            )}
          </button>
>>>>>>> develop
        </div>
      </div>
    </header>
  );
}
