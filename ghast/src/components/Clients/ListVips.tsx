import { Crown } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Clientes } from "@/lib/clientsProps";
import { useEffect, useState } from "react";

export default function ListVips() {
  const [Vips, setVips] = useState<Clientes[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const customers = [
    {
      id: 1,
      nome: "Adryan Ryan",
      email: "adryanryan.s.g@icloud.com",
      avatar: "http://github.com/adryanrr.png",
      cpf: "123.456.789-00",
      telefone: "(12) 3456-7890",  // Alterado para 'telefone'
      tipoCliente: "Vip",
      fidelidade: "10",
    },
    {
      id: 2,
      nome: "Felipe Duan",
      email: "felipe.duan@example.com",
      avatar: "http://github.com/FelipeDuan.png",
      cpf: "234.567.890-01",
      telefone: "(11) 2345-6789",  // Alterado para 'telefone'
      tipoCliente: "Vip",
      fidelidade: "20",
    },
    {
      id: 3,
      nome: "Matheus JuK",
      email: "matheus.juk@example.com",
      avatar: "http://github.com/MatheusJuK.png",
      cpf: "345.678.901-02",
      telefone: "(21) 3456-7890",  // Alterado para 'telefone'
      tipoCliente: "Vip",
      fidelidade: "30",
    },
    {
      id: 4,
      nome: "Whuanderson",
      email: "Whuanderson@example.com",
      avatar: "http://github.com/whuanderson.png",
      cpf: "444.678.901-02",
      telefone: "(21) 5556-7890",  // Alterado para 'telefone'
      tipoCliente: "Vip",
      fidelidade: "30",
    }
  ];

  useEffect(() => {
    const fetchCustomers = async () => {
      setLoading(true);
      setError(null);
  
      const API_BASE_URL = "http://localhost:8080/clientes/vip";
  
      try {
        const response = await fetch(API_BASE_URL);
  
        if (!response.ok) {
          throw new Error(`Erro ${response.status}: ${response.statusText}`);
        }
  
        const contentType = response.headers.get("Content-Type");
        if (!contentType || !contentType.includes("application/json")) {
          console.error("A resposta não é JSON.");
          throw new Error("A resposta não é um JSON válido.");
        }
  
        const data = await response.json();
        setVips(data);
      } catch (error) {
        setError(error instanceof Error ? error.message : "Erro desconhecido");
        setVips(customers); // Usa a lista predefinida de clientes
      } finally {
        setLoading(false);
      }
    };
  
    fetchCustomers();
  }, []);

  const getInitials = (name: string) => {
    const words = name.split(' ');
    if (words.length >= 2) {
      return (words[0][0] + words[1][0]).toUpperCase();
    } else if (words.length === 1 && words[0].length >= 2) {
      return words[0].substring(0, 2).toUpperCase();
    } else {
      return name.substring(0, 2).toUpperCase();
    }
  };
  
  return (
    <Card className="flex-1 flex flex-col overflow-hidden dark:bg-dark-secondary border-none min-w-[270px] sm:h-[490px]">
      <CardHeader className="flex-none">
        <div className="flex items-center justify-center">
          <CardTitle className="text-lg sm:text-xl text-gray-800 dark:text-gray-300">
            Vips
          </CardTitle>
          <Crown className="ml-auto w-4 h-4 text-violet-500" />
        </div>
        <CardDescription>Lista de clientes vips</CardDescription>
      </CardHeader>

      <CardContent className="flex-1 p-0">
        <ScrollArea className="h-[390px] px-6">
          {Vips.map((vips) => (
            <article
              key={vips.id}
              className="flex items-center gap-2 border-b dark:border-slate-100/15 py-2 last:border-b-0"
            >
                <Avatar className="h-10 w-10 bg-black text-white">
                  <AvatarFallback>{getInitials(vips.nome)}</AvatarFallback>
                </Avatar>
              <div>
                <p className="text-sm sm:text-base font-semibold">
                  {vips.nome}
                </p>
                <span className="text-[12px] sm:text-sm text-gray-400">
                  {vips.email}
                </span>
              </div>
            </article>
          ))}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
