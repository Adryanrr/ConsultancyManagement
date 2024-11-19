"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChartContainer } from "@/components/ui/chart";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { ArrowUp, ChartLine } from "lucide-react";

export default function Chart() {
  const chartData = [
    { date: "Jan ", contracts: 2 },
    { date: "Fev", contracts: 8 },
    { date: "Mar", contracts: 6 },
    { date: "Abr", contracts: 14 },
    { date: "Mai", contracts: 5 },
    { date: "Jun", contracts: 7 },
    { date: "Jul", contracts: 3 },
    { date: "Ago", contracts: 6 },
    { date: "Set", contracts: 9 },
    { date: "Out", contracts: 16 },
    { date: "Nov", contracts: 4 },
    { date: "Dez", contracts: 10 },
  ];

  const chartConfig = {
    contracts: {
      label: "Contratos",
      color: "hsl(199, 89%, 48%)",
    },
  };

  const totalContracts = chartData.reduce(
    (acc, item) => acc + item.contracts,
    0
  );
  const growthPercentage =
    ((chartData[chartData.length - 1].contracts - chartData[0].contracts) /
      chartData[0].contracts) *
    100;

  return (
    <Card className="flex flex-1 flex-col bg-white dark:bg-dark-secondary border-none sm:h-[490px] ">
      <CardHeader className="space-y-1 px-6 py-4">
        <CardTitle className="text-xl font-semibold text-black dark:text-white flex gap-2">
          Gráfico
          <span className="flex items-center text-sm font-medium text-emerald-500">
            <ArrowUp className="h-4 w-4" />
            {growthPercentage.toFixed(2)}%
          </span>
        </CardTitle>
        <ChartLine className="ml-auto w-4 h-4 text-violet-500" />

        <CardDescription>
          <div className="sm:flex items-center gap-2 text-sm dark:text-slate-400">
            Número de contratos realizados durante o ano:
            <span className="font-bold text-black dark:text-white">
              {totalContracts}
            </span>
          </div>
        </CardDescription>
      </CardHeader>

      <CardContent className="pl-2">
        <ChartContainer config={chartConfig} className="w-full max-h-[390px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={chartData}
              margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="hsl(1, 100%, 1%)"
                className="stroke-gray-600/30 dark:stroke-slate-100/15"
              />
              <XAxis
                dataKey="date"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#94a3b8", fontSize: 12 }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#94a3b8", fontSize: 12 }}
                domain={[0, "dataMax + 5"]}
                allowDecimals={false}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1e293b",
                  border: "none",
                  borderRadius: "4px",
                }}
                labelStyle={{ color: "#ffff" }}
                itemStyle={{ color: "hsl(199, 89%, 48%)" }}
              />
              <Line
                type="linear"
                dataKey="contracts"
                stroke="hsl(199, 89%, 48%)"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
