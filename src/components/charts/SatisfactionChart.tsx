"use client";

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { useTheme } from "next-themes";
import { satisfactionData } from "@/lib/dummy-data";

export function SatisfactionChart() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div className="w-full h-[400px] bg-card rounded-xl p-6 border border-border shadow-sm">
      <div className="mb-6">
        <h3 className="text-lg font-semibold">Customer Satisfaction</h3>
        <p className="text-sm text-muted-foreground">Review ratings distribution</p>
      </div>
      
      <ResponsiveContainer width="100%" height="80%">
        <BarChart
          data={satisfactionData}
          margin={{ top: 0, right: 0, left: -20, bottom: 0 }}
          barSize={40}
        >
          <XAxis 
            dataKey="rating" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: isDark ? "#9CA3AF" : "#6B7280", fontSize: 12 }} 
            dy={10}
          />
          <YAxis 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: isDark ? "#9CA3AF" : "#6B7280", fontSize: 12 }} 
          />
          <Tooltip
            cursor={{ fill: isDark ? "#374151" : "#F3F4F6", opacity: 0.4 }}
            contentStyle={{ 
              backgroundColor: isDark ? "#1F2937" : "#FFFFFF", 
              borderColor: isDark ? "#374151" : "#E5E7EB",
              borderRadius: "0.5rem",
              color: isDark ? "#F3F4F6" : "#111827" 
            }}
          />
          <Bar dataKey="count" radius={[4, 4, 0, 0]}>
             {satisfactionData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={
                index === 0 ? "#10B981" : // 5 star
                index === 1 ? "#34D399" : // 4 star
                index === 2 ? "#FBBF24" : // 3 star
                index === 3 ? "#F87171" : // 2 star
                "#EF4444" // 1 star
              } />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
