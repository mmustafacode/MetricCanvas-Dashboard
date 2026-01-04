"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  BarChart3, 
  Settings, 
  ChevronLeft, 
  ChevronRight,
  LogOut,
  ShoppingBag
} from "lucide-react";
import { cn } from "@/lib/utils";

const sidebarItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/" },
  { icon: BarChart3, label: "Analytics", href: "/analytics" },
  { icon: ShoppingBag, label: "Orders", href: "/orders" },
  { icon: Settings, label: "Settings", href: "/settings" },
];


interface SidebarProps {
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
}

export function Sidebar({ mobileOpen, setMobileOpen }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  const handleLogout = () => {
    // Simple custom toast
    const toast = document.createElement("div");
    toast.className = "fixed bottom-5 right-5 bg-destructive text-destructive-foreground px-4 py-3 rounded-lg shadow-lg z-50 animate-in slide-in-from-bottom-5 fade-in duration-300 font-medium";
    toast.innerText = "🔒 You do not have access to perform this action in demo mode.";
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.classList.add("fade-out", "slide-out-to-right-5", "animate-out");
        setTimeout(() => toast.remove(), 300);
    }, 3000);
  };

  const SidebarContent = () => (
    <>
      {/* Logo Area */}
      <div className="flex items-center justify-between p-4 border-b border-border h-16">
        {!collapsed && (
          <span className="text-xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
            MetricCanvas
          </span>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className={cn(
            "hidden md:block p-2 rounded-lg hover:bg-muted transition-colors",
            collapsed && "mx-auto"
          )}
        >
          {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
        {/* Mobile Close Button (only visible on mobile inside drawer) */}
        <button
          onClick={() => setMobileOpen(false)}
          className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors"
        >
          <ChevronLeft size={20} />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-6 px-3 space-y-1">
        {sidebarItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)} // Close on navigate (mobile)
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group",
                isActive 
                  ? "bg-primary/10 text-primary" 
                  : "text-muted-foreground hover:bg-muted hover:text-foreground",
                collapsed && "justify-center px-0"
              )}
            >
              <item.icon size={22} className={cn(isActive && "text-primary")} />
              {!collapsed && (
                <span className="font-medium text-sm">{item.label}</span>
              )}
              
              {/* Tooltip for collapsed state (Desktop only) */}
              {collapsed && (
                <div className="absolute left-16 bg-popover text-popover-foreground px-2 py-1 rounded-md text-xs opacity-0 group-hover:opacity-100 transition-opacity shadow-md whitespace-nowrap z-50 pointer-events-none hidden md:block">
                  {item.label}
                </div>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom Actions */}
      <div className="p-4 border-t border-border">
         <div className={`flex items-center gap-3 ${collapsed ? 'justify-center' : ''}`}>
           <img 
             src="/avatar.png" 
             alt="User" 
             className="w-9 h-9 rounded-full object-cover border border-border"
           />
           
           {!collapsed && (
             <div className="overflow-hidden">
               <p className="text-sm font-medium truncate">Admin User</p>
               <p className="text-xs text-muted-foreground truncate">admin@demo</p>
             </div>
           )}
         </div>
         
         {!collapsed && (
           <button 
             onClick={handleLogout}
             className="mt-4 w-full flex items-center justify-center gap-2 text-xs font-medium text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/20 p-2 rounded-md transition-colors"
           >
              <LogOut size={16} />
              Logout
           </button>
         )}
      </div>
    </>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside 
        className={cn(
          "hidden md:flex relative flex-col h-screen bg-card border-r border-border transition-all duration-300 ease-in-out",
          collapsed ? "w-20" : "w-64"
        )}
      >
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar (Drawer) */}
      <div className={cn(
        "fixed inset-0 z-50 bg-background/80 backdrop-blur-sm md:hidden transition-all duration-300",
        mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      )} onClick={() => setMobileOpen(false)} />
      
      <aside 
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-card border-r border-border flex flex-col transition-transform duration-300 md:hidden",
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
         {/* Force not collapsed on mobile */}
        <SidebarContent /> 
      </aside>
    </>
  );
}
