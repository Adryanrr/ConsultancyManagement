import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Sun, Moon } from "lucide-react"; // ou qualquer ícone que esteja usando
import { useTheme } from "next-themes"; // supondo que esteja usando o pacote next-themes

export default function ThemeToggleButton() {
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
  );
}
