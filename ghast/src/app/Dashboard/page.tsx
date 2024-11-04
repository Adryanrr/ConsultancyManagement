import Chart from "@/components/chart";
import Sales from "@/components/sales";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BadgeDollarSign, DollarSign, Percent, Users } from "lucide-react";
import Pagina from "@/components/Pagina";

export default function Dashboard() {
  return (
    <Pagina>
      <main className="sm:ml-14 sm:mr-14 p-4">
        <section className="mt-4 flex flex-coll  md: flex-row gap-4">
          <Chart />
        </section>
        <section className="mt-4 flex flex-coll  md: flex-row gap-4">
          <Sales />
        </section>
      </main>
    </Pagina>
  );
}
