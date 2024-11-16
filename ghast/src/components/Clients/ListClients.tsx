import { useEffect, useState } from "react";
import { Building2 } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Clientes } from "@/lib/clientsProps";
import { RESPONSE_LIMIT_DEFAULT } from "next/dist/server/api-utils";

export default function ListClients() {
  const [Clientes, setClientes] = useState<Clientes[]>([]);
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
    },
    {
      id: 2,
      nome: "Felipe Duan",
      email: "felipe.duan@example.com",
      avatar: "http://github.com/FelipeDuan.png",
      cpf: "234.567.890-01",
      telefone: "(11) 2345-6789",  // Alterado para 'telefone'
    },
    {
      id: 3,
      nome: "Matheus JuK",
      email: "matheus.juk@example.com",
      avatar: "http://github.com/MatheusJuK.png",
      cpf: "345.678.901-02",
      telefone: "(21) 3456-7890",  // Alterado para 'telefone'
    },
    ...Array.from({ length: 5 }, (_, i) => ({
      id: i + 4,
      nome: `Customer ${i + 4}`,
      email: `customer${i + 4}@example.com`,
      avatar: "",
      cpf: `456.789.012-${i + 3}`,
      telefone: `(31) 4567-890${i + 3}`,  // Alterado para 'telefone'
    })),
  ];
  useEffect(() => {
    const fetchCustomers = async () => {
      setLoading(true);
      setError(null);

      const API_BASE_URL = "http://localhost:8080/clientes";

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
        setClientes(data);
      } catch (error) {
        setError(error instanceof Error ? error.message : "Erro desconhecido");
        setClientes(customers); // Define a lista de clientes pré-definidos em caso de erro
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
    <Card className="flex flex-col flex-1 overflow-hidden dark:bg-dark-secondary border-none sm:h-[490px]">
      <CardHeader className="flex-none">
        <div className="flex items-center justify-center">
          <CardTitle className="text-lg sm:text-xl text-gray-800 dark:text-gray-300">
            Empresas
          </CardTitle>
          <Building2 className="ml-auto w-4 h-4 text-violet-500" />
        </div>
        <CardDescription>Lista de empresas</CardDescription>
      </CardHeader>

      <CardContent className="flex-1 p-0">
      <ScrollArea className="h-[390px] px-6">
          {Clientes.map((cliente) => (
            <article
              key={cliente.id}
              className="flex items-center gap-2 border-b dark:border-slate-100/15 py-2 last:border-b-0"
            >
                <Avatar className="h-10 w-10 bg-black dark:text-white">
                  <AvatarFallback>{getInitials(cliente.nome)}</AvatarFallback>
                </Avatar>
              <div>
                <p className="text-sm sm:text-base font-semibold">
                  {cliente.nome}
                </p>
                <span className="text-[12px] sm:text-sm text-gray-400">
                  {cliente.email}
                </span>
              </div>
            </article>
          ))}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
