"use client";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { User, Lock, Bell } from "lucide-react";

export default function SettingsPage() {
  const handleAccessDenied = () => {
    // Simple custom toast using DOM api for speed, or just an alert
    const toast = document.createElement("div");
    toast.className = "fixed bottom-5 right-5 bg-destructive text-destructive-foreground px-4 py-3 rounded-lg shadow-lg z-50 animate-in slide-in-from-bottom-5 fade-in duration-300 font-medium";
    toast.innerText = "🔒 You do not have access to edit this demo configuration.";
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.classList.add("fade-out", "slide-out-to-right-5", "animate-out");
        setTimeout(() => toast.remove(), 300);
    }, 3000);
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold tracking-tight mb-6">Settings</h1>
        
        <div className="grid gap-6">
          {/* Profile Section */}
          <section className="bg-card rounded-xl p-6 border border-border">
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-primary/10 p-3 rounded-full">
                <User className="text-primary w-6 h-6" />
              </div>
              <div>
                <h2 className="text-lg font-semibold">Profile Settings</h2>
                <p className="text-muted-foreground text-sm">Manage your public profile and details</p>
              </div>
            </div>
            
            <div className="grid gap-4 max-w-lg">
              <div className="grid gap-2">
                <label className="text-sm font-medium">Full Name</label>
                <input type="text" defaultValue="Admin User" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" />
              </div>
               <div className="grid gap-2">
                <label className="text-sm font-medium">Email</label>
                <input type="email" defaultValue="admin@demo" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" />
              </div>
              <button 
                onClick={handleAccessDenied}
                className="bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 rounded-md font-medium transition-colors w-fit"
              >
                Save Changes
              </button>
            </div>
          </section>

          {/* Account Security */}
          <section className="bg-card rounded-xl p-6 border border-border">
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-orange-500/10 p-3 rounded-full">
                <Lock className="text-orange-500 w-6 h-6" />
              </div>
              <div>
                <h2 className="text-lg font-semibold">Security</h2>
                <p className="text-muted-foreground text-sm">Password and authentication</p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={handleAccessDenied}
                className="border border-input hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 rounded-md font-medium transition-colors"
                >
                Change Password
              </button>
               <button 
                onClick={handleAccessDenied}
                className="border border-input hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 rounded-md font-medium transition-colors"
                >
                Enable 2FA
              </button>
            </div>
          </section>

           {/* Notifications */}
          <section className="bg-card rounded-xl p-6 border border-border">
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-purple-500/10 p-3 rounded-full">
                <Bell className="text-purple-500 w-6 h-6" />
              </div>
              <div>
                <h2 className="text-lg font-semibold">Notifications</h2>
                <p className="text-muted-foreground text-sm">Manage how we contact you</p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-medium">Email Alerts</span>
                <input type="checkbox" defaultChecked className="toggleAccent" />
              </div>
               <div className="flex items-center justify-between">
                <span className="font-medium">Inventory Warnings</span>
                <input type="checkbox" defaultChecked className="toggleAccent" />
              </div>
            </div>
          </section>
        </div>
      </div>
    </DashboardLayout>
  );
}
