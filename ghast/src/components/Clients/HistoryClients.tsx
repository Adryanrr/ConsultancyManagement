import { History } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";

// Sample data - in a real app this would likely come from props or an API
const customers = [
  {
    name: "Adryan Ryan",
    email: "adryanryan.s.g@icloud.com",
    avatar: "http://github.com/adryanrr.png",
    initials: "AR",
  },
  {
    name: "Felipe Duan",
    email: "felipe.duan@example.com",
    avatar: "http://github.com/FelipeDuan.png",
    initials: "FD",
  },
  {
    name: "Matheus JuK",
    email: "matheus.juk@example.com",
    avatar: "http://github.com/MatheusJuK.png",
    initials: "MJK",
  },
  // Added more customers to demonstrate scroll
  ...Array.from({ length: 5 }, (_, i) => ({
    name: `Customer ${i + 4}`,
    email: `customer${i + 4}@example.com`,
    avatar: "",
    initials: `C${i + 4}`,
  })),
];

export default function HistoryClients() {
  return (
    <Card className="flex-1 flex flex-col overflow-hidden dark:bg-dark-secondary border-none max-h-[490px]">
      <CardHeader className="flex-none">
        <div className="flex items-center justify-center">
          <CardTitle className="text-lg sm:text-xl text-gray-800 dark:text-gray-300">
            Histórico
          </CardTitle>
          <History className="ml-auto w-4 h-4 text-violet-500" />
        </div>
        <CardDescription>Últimos clientes atendidos</CardDescription>
      </CardHeader>

      <CardContent className="flex-1 p-0">
        <ScrollArea className="h-[390px] px-6">
          {customers.map((customer, index) => (
            <article
              key={index}
              className="flex items-center gap-2 border-b py-2 last:border-b-0"
            >
              <Avatar className="w-8 h-8">
                <AvatarImage src={customer.avatar} />
                <AvatarFallback>{customer.initials}</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm sm:text-base font-semibold">
                  {customer.name}
                </p>
                <span className="text-[12px] sm:text-sm text-gray-400">
                  {customer.email}
                </span>
              </div>
            </article>
          ))}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
