"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { useTheme } from "next-themes";
import { deviceData } from "@/lib/dummy-data";

export function DeviceStatsChart() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div className="w-full h-[350px] bg-card rounded-xl p-6 border border-border shadow-sm">
      <div className="mb-4">
        <h3 className="text-lg font-semibold">Device Usage</h3>
        <p className="text-sm text-muted-foreground">Traffic by device type</p>
      </div>
      
      <ResponsiveContainer width="100%" height="85%">
        <PieChart>
          <Pie
            data={deviceData}
            cx="50%"
            cy="50%"
            innerRadius={50}
            outerRadius={90}
            paddingAngle={5}
            dataKey="value"
          >
            {deviceData.map((entry, index) => (
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
          <Legend 
            verticalAlign="bottom" 
            height={36} 
            iconType="circle"
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
