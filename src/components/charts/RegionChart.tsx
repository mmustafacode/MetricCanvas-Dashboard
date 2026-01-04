"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useTheme } from "next-themes";
import { regionData } from "@/lib/dummy-data";

export function RegionChart() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div className="w-full h-[350px] bg-card rounded-xl p-6 border border-border shadow-sm">
      <div className="mb-4">
        <h3 className="text-lg font-semibold">Sales by Region</h3>
        <p className="text-sm text-muted-foreground">Top performing territories</p>
      </div>
      
      <ResponsiveContainer width="100%" height="85%">
        <BarChart data={regionData} layout="vertical" margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke={isDark ? "#374151" : "#E5E7EB"} />
          <XAxis type="number" hide />
          <YAxis 
            dataKey="name" 
            type="category" 
            axisLine={false} 
            tickLine={false}
            tick={{ fill: isDark ? "#9CA3AF" : "#6B7280", fontSize: 12 }}
            width={100}
          />
          <Tooltip 
             contentStyle={{ 
              backgroundColor: isDark ? "#1F2937" : "#FFFFFF", 
              borderColor: isDark ? "#374151" : "#E5E7EB",
              borderRadius: "0.5rem"
            }}
            cursor={{ fill: isDark ? "#374151" : "#F3F4F6", opacity: 0.4 }}
            itemStyle={{ color: isDark ? "#F3F4F6" : "#111827" }}
          />
          <Bar dataKey="value" fill="#8B5CF6" radius={[0, 4, 4, 0]} barSize={30} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
