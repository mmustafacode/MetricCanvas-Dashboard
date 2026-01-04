"use client";

import { Search, Bell, Moon, Sun, X, Menu } from "lucide-react";
import { useTheme } from "next-themes";
import { useState, useRef, useEffect } from "react";

interface HeaderProps {
  onOpenMobileMenu: () => void;
}

export function Header({ onOpenMobileMenu }: HeaderProps) {
  const { theme, setTheme } = useTheme();
  const [showNotifications, setShowNotifications] = useState(false);
  const [mounted, setMounted] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);

  const notifications = [
    { id: 1, text: "New order #ORD-7782 received", time: "2 min ago", unread: true },
    { id: 2, text: "Monthly report is ready", time: "1 hour ago", unread: false },
  ];

  useEffect(() => {
    setMounted(true);
  }, []);

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="h-16 px-4 md:px-6 border-b border-border bg-card/50 backdrop-blur-md flex items-center justify-between sticky top-0 z-10">
      {/* Mobile Menu Button */}
      <button 
        onClick={onOpenMobileMenu}
        className="md:hidden p-2 -ml-2 text-muted-foreground hover:bg-muted/50 rounded-lg mr-2"
      >
        <Menu size={20} />
      </button>

      {/* Search */}
      <div className="relative w-96 hidden md:block">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <input 
          type="text" 
          placeholder="Search orders, products, or customers..." 
          className="w-full pl-10 pr-4 py-2 bg-muted/50 border border-transparent focus:border-primary/50 focus:bg-background rounded-full text-sm outline-none transition-all"
        />
      </div>

      {/* Actions */}
      <div className="flex items-center gap-4 ml-auto">
        <div className="relative" ref={notifRef}>
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 text-muted-foreground hover:bg-muted/50 rounded-full transition-colors relative"
          >
            <Bell size={20} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-card"></span>
          </button>

          {/* Notification Dropdown */}
          {showNotifications && (
            <div className="fixed inset-x-4 top-20 md:absolute md:inset-auto md:right-0 md:top-full md:mt-2 w-auto md:w-80 z-50 bg-card border border-border rounded-xl shadow-lg py-2 animate-in slide-in-from-top-2 fade-in duration-200">
               <div className="px-4 py-2 border-b border-border flex justify-between items-center">
                 <h3 className="font-semibold text-sm">Notifications</h3>
                 <button onClick={() => setShowNotifications(false)} className="text-muted-foreground hover:text-foreground">
                   <X size={14} />
                 </button>
               </div>
               <div className="max-h-[300px] overflow-y-auto">
                 {notifications.map(n => (
                   <div key={n.id} className={`px-4 py-3 hover:bg-muted/50 transition-colors cursor-pointer ${n.unread ? 'bg-primary/5' : ''}`}>
                     <p className="text-sm font-medium leading-none mb-1">{n.text}</p>
                     <p className="text-xs text-muted-foreground">{n.time}</p>
                   </div>
                 ))}
               </div>
               <div className="px-4 py-2 border-t border-border text-center">
                 <button className="text-xs text-primary hover:underline">Mark all as read</button>
               </div>
            </div>
          )}
        </div>

        <button 
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="p-2 text-muted-foreground hover:bg-muted/50 rounded-full transition-colors"
        >
          {mounted ? (
            theme === "dark" ? <Sun size={20} /> : <Moon size={20} />
          ) : (
            <div className="w-5 h-5" /> // Placeholder to prevent layout shift
          )}
        </button>
        
        <img 
          src="/avatar.png" 
          alt="Profile" 
          className="w-8 h-8 rounded-full object-cover border border-border cursor-pointer hover:ring-2 ring-primary/20 transition-all"
        />
      </div>
    </header>
  );
}
