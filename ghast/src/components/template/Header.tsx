"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Moon, MessageCircle, Menu, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export default function Header() {
  const [user, setUser] = useState<{ name: string; email: string } | null>(
    null
  );
  const { theme, setTheme } = useTheme();
  const toggleDarkMode = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  useEffect(() => {
    // Simula a verificação de login
    // Na prática, você buscaria essas informações de um contexto de autenticação ou API
    const isLoggedIn = false; // Mude para true para simular um usuário logado
    if (isLoggedIn) {
      setUser({ name: "Usuário Logado", email: "usuario@exemplo.com" });
    } else {
      setUser({ name: "Ghast Consultoria", email: "ghast@gmail.com" });
    }
  }, []);

  const initials = user?.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <header className="w-full  bg-white dark:bg-dark-main px-4 py-3">
      <div className="flex flex-1 mx-4 items-center justify-between">
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage src="/placeholder.svg" alt={user?.name} />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
          <div className="hidden flex-col sm:flex">
            <span className="text-sm font-medium text-black dark:text-white">
              {user?.name}
            </span>
            <span className="text-xs text-slate-800 dark:text-slate-300">
              {user?.email}
            </span>
          </div>
        </div>

        <div className="absolute left-1/2 -translate-x-1/2 hidden sm:block">
          <span className="text-xl font-bold text-black dark:text-white">
            GHAST CONSULTORIA
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="text-slate-300 hover:text-white"
          >
            <MessageCircle className="h-5 w-5 text-violet-500" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-slate-400 hover:text-white"
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
          </Button>
        </div>
      </div>
    </header>
  );
}
