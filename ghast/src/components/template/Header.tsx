"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Moon, MessageCircle, Menu, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";

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
        <div className="justify-center items-center hidden sm:block">
          <div className="flex-row flex gap-2">
            <Image src="/assets/Logo.svg" width={35} height={35} alt="logo" />

            <span className="text-3xl font-bold text-black dark:text-white font-audiowide">
              GHAST CONSULTORIA
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button className="text-slate-300">
            <MessageCircle className="h-5 w-5 text-violet-500" />
          </button>
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
        </div>
      </div>
    </header>
  );
}
