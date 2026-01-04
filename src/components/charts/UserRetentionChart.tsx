"use client";

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useTheme } from "next-themes";
import { cohortData } from "@/lib/dummy-data";

export function UserRetentionChart() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div className="w-full h-[400px] bg-card rounded-xl p-6 border border-border shadow-sm">
      <div className="mb-6">
        <h3 className="text-lg font-semibold">User Retention</h3>
        <p className="text-sm text-muted-foreground">Weekly cohort retention rates</p>
      </div>
      
      <ResponsiveContainer width="100%" height="80%">
        <AreaChart data={cohortData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorRetention" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={isDark ? "#8B5CF6" : "#7C3AED"} stopOpacity={0.3}/>
              <stop offset="95%" stopColor={isDark ? "#8B5CF6" : "#7C3AED"} stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDark ? "#374151" : "#E5E7EB"} />
          <XAxis 
            dataKey="week" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: isDark ? "#9CA3AF" : "#6B7280", fontSize: 12 }} 
            dy={10}
          />
          <YAxis 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: isDark ? "#9CA3AF" : "#6B7280", fontSize: 12 }} 
            tickFormatter={(value) => `${value}%`}
          />
          <Tooltip
            contentStyle={{ 
              backgroundColor: isDark ? "#1F2937" : "#FFFFFF", 
              borderColor: isDark ? "#374151" : "#E5E7EB",
              borderRadius: "0.5rem",
              color: isDark ? "#F3F4F6" : "#111827" 
            }}
            formatter={(value) => [`${value}%`, "Retention"]}
          />
          <Area 
            type="monotone" 
            dataKey="retention" 
            stroke={isDark ? "#8B5CF6" : "#7C3AED"} 
            strokeWidth={3}
            fillOpacity={1} 
            fill="url(#colorRetention)" 
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
