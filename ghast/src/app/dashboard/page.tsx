"use client"

import ListVips from "@/components/Clients/ListVips";
import Chart from "@/components/graphic/GraphicClients";
import ListClients from "@/components/Clients/ListClients";
import HistoryClients from "@/components/Clients/HistoryClients";

import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";

export default function Dashboard() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (!session) {
    redirect("/login");
  }
  return (
    <main className="min-h-screen bg-gray-100 dark:bg-dark-main w-full p-4 sm:p-6">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-6">
        {/* Left Column */}
        <div className="space-y-6">
          <Chart />
          {/* Caso queira colocar dois componentes nessa div: grid grid-cols-1 md:grid-cols-2 gap-6" */}
          <div className="space-y-6">
            <ListClients />
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <HistoryClients />
          <ListVips />
        </div>
      </div>
    </main>
  );
}
