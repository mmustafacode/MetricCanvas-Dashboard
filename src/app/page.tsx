"use client";

import Link from "next/link";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { StatCard } from "@/components/dashboard/StatCard";
import { RevenueChart } from "@/components/charts/RevenueChart";
import { CategoryPieChart } from "@/components/charts/CategoryPieChart";
import { TopProductsBarChart } from "@/components/charts/TopProductsBarChart";
import { 
  DollarSign, 
  ShoppingBag, 
  Users, 
  Activity,
  ArrowUpRight,
  TrendingDown
} from "lucide-react";
import { 
  generateRevenueData, 
  categoryData, 
  topProducts, 
  recentOrders 
} from "@/lib/dummy-data";
import { downloadCSV } from "@/lib/utils";

export default function Home() {
  const revenueData = generateRevenueData(30);

  return (
    <DashboardLayout>
      {/* Intro Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Overview of your store's performance.</p>
        </div>
        <div className="flex items-center gap-2">
           <button 
             onClick={() => downloadCSV(revenueData, "revenue-report")}
             className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium"
           >
            Download Report
           </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Revenue" 
          value="$45,231.89" 
          trend="+20.1%" 
          trendUp={true} 
          icon={DollarSign} 
          color="bg-blue-500" 
        />
        <StatCard 
          title="Orders" 
          value="+2350" 
          trend="+180.1%" 
          trendUp={true} 
          icon={ShoppingBag} 
          color="bg-purple-500" 
        />
         <StatCard 
          title="Active Users" 
          value="12,234" 
          trend="+19%" 
          trendUp={true} 
          icon={Users} 
          color="bg-orange-500" 
        />
        <StatCard 
          title="Avg. Order" 
          value="$129.00" 
          trend="-4.5%" 
          trendUp={false} 
          icon={Activity} 
          color="bg-emerald-500" 
        />
      </div>

      {/* Charts Section 1: Revenue & Categories */}
      <div className="grid grid-cols-1 lg:grid-cols-7 gap-6">
        <div className="lg:col-span-4">
          <RevenueChart data={revenueData} />
        </div>
        <div className="lg:col-span-3">
          <CategoryPieChart data={categoryData} />
        </div>
      </div>

      {/* Charts Section 2: Top Products & Recent Orders */}
      <div className="grid grid-cols-1 lg:grid-cols-7 gap-6">
        <div className="lg:col-span-3">
          <TopProductsBarChart data={topProducts} />
        </div>
        
        {/* Recent Orders Table Widget */}
        <div className="lg:col-span-4 bg-card rounded-xl p-6 border border-border shadow-sm h-[350px] overflow-hidden flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Recent Orders</h3>
            <Link href="/orders" className="text-sm text-primary hover:underline">View All</Link>
          </div>
          <div className="overflow-auto flex-1">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-muted-foreground uppercase bg-muted/50 sticky top-0">
                <tr>
                  <th className="px-4 py-3 rounded-l-lg">Order</th>
                  <th className="px-4 py-3">Customer</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3 text-right rounded-r-lg">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {recentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-muted/50 transition-colors">
                    <td className="px-4 py-3 font-medium bg-transparent">{order.id}</td>
                    <td className="px-4 py-3 bg-transparent">{order.customer}</td>
                    <td className="px-4 py-3 bg-transparent">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium 
                        ${order.status === 'Delivered' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 
                          order.status === 'Pending' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' :
                          'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300'
                        }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right font-medium bg-transparent">${order.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
