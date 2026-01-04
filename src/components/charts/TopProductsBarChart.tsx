"use client";

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { useTheme } from "next-themes";
import { Product } from "@/lib/dummy-data";

export function TopProductsBarChart({ data }: { data: Product[] }) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div className="w-full h-[350px] bg-card rounded-xl p-6 border border-border shadow-sm">
      <h3 className="text-lg font-semibold mb-1">Top Products</h3>
      <p className="text-sm text-muted-foreground mb-6">Best selling items by quantity</p>
      
      <ResponsiveContainer width="100%" height="80%">
        <BarChart
          layout="vertical"
          data={data}
          margin={{ top: 0, right: 0, left: 40, bottom: 0 }}
        >
          <XAxis type="number" hide />
          <YAxis 
            dataKey="name" 
            type="category" 
            width={100}
            tick={{ fill: isDark ? "#9CA3AF" : "#6B7280", fontSize: 12 }}
            axisLine={false}
            tickLine={false}
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
          <Bar dataKey="sold" radius={[0, 4, 4, 0]} barSize={20}>
             {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={isDark ? "#60A5FA" : "#3B82F6"} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
