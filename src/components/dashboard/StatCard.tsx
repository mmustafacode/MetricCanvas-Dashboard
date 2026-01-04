import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string;
  trend: string;
  trendUp: boolean;
  icon: LucideIcon;
  color: string; // e.g., "bg-blue-500"
}

export function StatCard({ title, value, trend, trendUp, icon: Icon, color }: StatCardProps) {
  return (
    <div className="bg-card rounded-xl p-6 border border-border shadow-sm hover:shadow-md transition-shadow relative">
      <div>
        <p className="text-sm font-medium text-muted-foreground">{title}</p>
        <h4 className="text-2xl font-bold mt-2">{value}</h4>
      </div>
      <div className={cn("absolute top-4 right-4 p-2 rounded-lg text-white shadow-md", color)}>
        <Icon size={20} />
      </div>
      <div className="flex items-center mt-4">
        <span className={cn("text-xs font-medium px-2 py-0.5 rounded-full", trendUp ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400")}>
          {trend}
        </span>
        <span className="text-xs text-muted-foreground ml-2">vs last month</span>
      </div>
    </div>
  );
}
