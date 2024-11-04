import { Settings, MessageCircle } from "lucide-react";
import { Card, CardContent } from "../ui/card";

export default function Header() {
  return (
    <header className="flex justify-between items-center px-4 py-2 border-b bg-white">
      <div>
        {/* Aqui você pode adicionar um ícone de perfil ou logo se necessário */}
      </div>
      <div className="text-xl font-bold font-audiowide">GHAST CONSULTORIA</div>
      <div>
        <div className="flex justify-center items-center bg-gray-100 p-3 rounded-2xl">
          <div className="flex justify-center items-center gap-8">
            <MessageCircle />
            <Settings />
          </div>
        </div>
      </div>
    </header>
  );
}
