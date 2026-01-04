"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { useTheme } from "next-themes";
import { trafficData } from "@/lib/dummy-data";

export function TrafficSourcesChart() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div className="w-full h-[400px] bg-card rounded-xl p-6 border border-border shadow-sm">
      <div className="mb-6">
        <h3 className="text-lg font-semibold">Traffic Sources</h3>
        <p className="text-sm text-muted-foreground">Where your users are coming from</p>
      </div>
      
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Legend 
            verticalAlign="top" 
            height={36} 
            iconType="circle"
            formatter={(value) => <span className="text-xs font-medium text-muted-foreground">{value}</span>}
          />
          <Pie
            data={trafficData}
            cx="50%"
            cy="60%"
            innerRadius={40}
            outerRadius={60}
            paddingAngle={5}
            dataKey="value"
          >
            {trafficData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} strokeWidth={0} />
            ))}
          </Pie>
          <Tooltip 
             contentStyle={{ 
              backgroundColor: isDark ? "#1F2937" : "#FFFFFF", 
              borderColor: isDark ? "#374151" : "#E5E7EB",
              borderRadius: "0.5rem"
            }}
            itemStyle={{ color: isDark ? "#F3F4F6" : "#111827" }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
