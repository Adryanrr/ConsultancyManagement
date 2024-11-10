"use client";

import { BarChart2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { ChartConfig, ChartContainer } from "../ui/chart";
import { BarChart, Bar, CartesianGrid, XAxis } from "recharts";

export default function Chart() {
  const chartData = [
    { month: "January", desktop: 186, mobile: 80 },
    { month: "February", desktop: 305, mobile: 200 },
    { month: "March", desktop: 237, mobile: 120 },
    { month: "April", desktop: 73, mobile: 190 },
    { month: "May", desktop: 209, mobile: 130 },
    { month: "June", desktop: 214, mobile: 140 },
    { month: "July", desktop: 314, mobile: 240 },
  ];

  const chartConfig = {
    desktop: {
      label: "Desktop",
      color: "#8b5cf6",
    },
    mobile: {
      label: "Mobile",
      color: "#a78bfa",
    },
  } satisfies ChartConfig;

  return (
    <Card className="flex flex-1 flex-col max-h-[400px]">
      <CardHeader>
        <div className="flex items-center justify-center">
          <CardTitle className="text-lg sm:text-xl text-gray-800 dark:text-gray-300">
            Gráfico
          </CardTitle>
          <BarChart2 className="ml-auto w-4 h-4 text-violet-500" />
        </div>
      </CardHeader>

      <CardContent>
        <ChartContainer config={chartConfig} className="max-h-[300px] w-full">
          <BarChart data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
            <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
