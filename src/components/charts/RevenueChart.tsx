"use client";

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useTheme } from "next-themes";
import { SaleRecord } from "@/lib/dummy-data";

export function RevenueChart({ data }: { data: SaleRecord[] }) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div className="w-full h-[350px] bg-card rounded-xl p-6 border border-border shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold">Total Revenue</h3>
          <p className="text-sm text-muted-foreground">Revenue over time</p>
        </div>
        <select className="bg-muted border border-transparent text-sm rounded-lg px-3 py-1 outline-none">
          <option>Last 30 Days</option>
          <option>Last 7 Days</option>
          <option>This Year</option>
        </select>
      </div>
      
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 30 }}>
          <defs>
            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={isDark ? "#3B82F6" : "#2563EB"} stopOpacity={0.3}/>
              <stop offset="95%" stopColor={isDark ? "#3B82F6" : "#2563EB"} stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDark ? "#374151" : "#E5E7EB"} />
          <XAxis 
            dataKey="date" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: isDark ? "#9CA3AF" : "#6B7280", fontSize: 11 }} 
            dy={5}
            interval="preserveStartEnd"
          />
          <YAxis 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: isDark ? "#9CA3AF" : "#6B7280", fontSize: 12 }} 
            tickFormatter={(value) => `$${value}`}
          />
          <Tooltip
            contentStyle={{ 
              backgroundColor: isDark ? "#1F2937" : "#FFFFFF", 
              borderColor: isDark ? "#374151" : "#E5E7EB",
              borderRadius: "0.5rem",
              color: isDark ? "#F3F4F6" : "#111827" 
            }}
            itemStyle={{ color: isDark ? "#F3F4F6" : "#111827" }}
            formatter={(value) => [`$${value}`, "Revenue"]}
          />
          <Area 
            type="monotone" 
            dataKey="revenue" 
            stroke={isDark ? "#3B82F6" : "#2563EB"} 
            strokeWidth={3}
            fillOpacity={1} 
            fill="url(#colorRevenue)" 
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
