"use client"

import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card"
import { ChartContainer } from "@/components/ui/chart"
import { LineChart, Line, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts"
import { ArrowUp } from "lucide-react"

export default function Chart() {
  const chartData = [
    { date: "Jan 1", contracts: 0 },
    { date: "Jan 8", contracts: 80 },
    { date: "Jan 16", contracts: 60 },
    { date: "Jan 24", contracts: 140 },
    { date: "Jan 31", contracts: 150 },
    { date: "Feb 1", contracts: 180 },
    { date: "Feb 8", contracts: 120 },
    { date: "Feb 16", contracts: 160 },
    { date: "Feb 24", contracts: 140 },
  ]

  const chartConfig = {
    contracts: {
      label: "Contratos",
      color: "hsl(199, 89%, 48%)"
    }
  }

  const totalContracts = 257
  const growthPercentage = 16.85

  return (
    <Card className="flex flex-1 flex-col bg-white dark:bg-dark-secondary border-none max-h-[490px]">
      <CardHeader className="space-y-1 px-6 py-4">
        <h2 className="text-xl font-semibold text-black dark:text-white flex gap-2">Gráfico
        <span className="flex items-center text-sm font-medium text-emerald-500">
            <ArrowUp className="h-4 w-4" />
            {growthPercentage}%
          </span>
        </h2>
        <CardDescription>
      <div className="flex items-center gap-2 text-sm text-slate-400">
          Número de contratos realizados durante o ano: 
          <span className="font-bold text-black dark:text-white">
            {totalContracts}
            </span> 
        </div>
        </CardDescription>
      </CardHeader>

      <CardContent className="pl-2">
        <ChartContainer config={chartConfig} className="w-full max-h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
              <CartesianGrid 
                strokeDasharray="3 3" 
                vertical={false} 
                stroke="rgba(255,255,255,0.1)" 
              />
              <XAxis 
                dataKey="date" 
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#94a3b8', fontSize: 12 }}
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#94a3b8', fontSize: 12 }}
                domain={[0, 500]}
                ticks={[0, 100, 200, 300, 400, 500]}
              />
              <Tooltip
                contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '4px' }}
                labelStyle={{ color: '#94a3b8' }}
                itemStyle={{ color: 'hsl(199, 89%, 48%)' }}
              />
              <Line
                type="linear"
                dataKey="contracts"
                stroke="hsl(199, 89%, 48%)"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}