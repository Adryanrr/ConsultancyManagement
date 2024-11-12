"use client";

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
    <main className="min-h-screen bg-gray-100 dark:bg-dark-main w-full p-4 sm:p-6 ">
      <div className="flex flex-col lg:flex-row flex-1 gap-6">
        {/* Left Column */}
        <div className=" flex flex-col flex-[2] space-y-6">
          <div className="space-y-6">
            <Chart />
          </div>
          <div className="space-y-6">
            <ListClients />
          </div>
        </div>

        {/* Right Column */}
        <div className=" flex flex-row gap-6 justify-between items-center lg:justify-evenly lg:items-stretch flex-wrap lg:flex-col flex-1 ">
          <HistoryClients />
          <ListVips />
        </div>
      </div>
    </main>
  );
}
