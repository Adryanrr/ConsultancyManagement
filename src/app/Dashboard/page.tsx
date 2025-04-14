import Pagina from "@/components/template/Pagina"
import ListVips from "@/components/Clients/ListVips"
import Chart from "@/components/graphic/GraphicClients"
import ListClients from "@/components/Clients/ListClients"
import HistoryClients from "@/components/Clients/HistoryClients"
import { BarChart2, Building2, Crown, History } from "lucide-react"

export default function Dashboard() {
  return (
    <Pagina>
      <main className="min-h-screen bg-gray-100 dark:bg-gray-900">
        <div className="p-6 grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-6">
          {/* Left Column */}
          <div className="space-y-6">
              <Chart />
              <ListClients />
          </div>

          {/* Right Column */}
          <div className="space-y-6">
              <HistoryClients />
              <ListVips />
          </div>
        </div>
      </main>
    </Pagina>
  )
}