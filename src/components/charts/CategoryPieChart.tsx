"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { useTheme } from "next-themes";

const COLORS = ["#3B82F6", "#10B981", "#F59E0B", "#8B5CF6", "#EC4899"];

export function CategoryPieChart({ data }: { data: any[] }) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div className="w-full h-[350px] bg-card rounded-xl p-6 border border-border shadow-sm">
      <h3 className="text-lg font-semibold mb-1">Sales by Category</h3>
      <p className="text-sm text-muted-foreground mb-6">Distribution across departments</p>
      
      <ResponsiveContainer width="100%" height="80%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={5}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color || COLORS[index % COLORS.length]} stroke={isDark ? "#1F2937" : "#FFFFFF"} strokeWidth={2} />
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
            verticalAlign="top" 
            height={36} 
            iconType="circle"
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
