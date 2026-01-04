"use client";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { RevenueChart } from "@/components/charts/RevenueChart";
import { TopProductsBarChart } from "@/components/charts/TopProductsBarChart";
import { UserRetentionChart } from "@/components/charts/UserRetentionChart";
import { TrafficSourcesChart } from "@/components/charts/TrafficSourcesChart";
import { SatisfactionChart } from "@/components/charts/SatisfactionChart";
import { DeviceStatsChart } from "@/components/charts/DeviceStatsChart";
import { RegionChart } from "@/components/charts/RegionChart";
import { generateRevenueData, topProducts } from "@/lib/dummy-data";

export default function AnalyticsPage() {
  const revenueData = generateRevenueData(30);

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
          <p className="text-muted-foreground">Deep dive into store performance and metrics.</p>
        </div>

        {/* Primary Metrics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
           <div className="bg-card rounded-xl p-6 border border-border shadow-sm">
             <h3 className="text-lg font-semibold mb-4">Quarterly Revenue Trend</h3>
             <RevenueChart data={revenueData} />
           </div>
           
           <div className="bg-card rounded-xl p-6 border border-border shadow-sm">
             <h3 className="text-lg font-semibold mb-4">Product Performance</h3>
             <TopProductsBarChart data={topProducts} />
           </div>
        </div>
        
        {/* Secondary Metrics */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <UserRetentionChart />
          </div>
          <div className="lg:col-span-1">
             <TrafficSourcesChart />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <SatisfactionChart />
           {/* Placeholder for future insights or another chart */}
           <DeviceStatsChart />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
          <RegionChart />
        </div>
      </div>
    </DashboardLayout>
  );
}
