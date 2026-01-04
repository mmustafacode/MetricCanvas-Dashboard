"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { generateOrders } from "@/lib/dummy-data";
import { format } from "date-fns";
import { Search, Filter, Download } from "lucide-react";
import { downloadCSV } from "@/lib/utils";

export default function OrdersPage() {
  const [orders] = useState(generateOrders(50));
  const [searchTerm, setSearchTerm] = useState("");

  const [statusFilter, setStatusFilter] = useState("All");

  const [filteredOrders] = useState(orders);
  // Filter Logic
  const getFilteredOrders = () => {
    return orders.filter((order) => {
      const matchesSearch = 
        order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.id.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === "All" || order.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  };
  const displayOrders = getFilteredOrders();

  const [selectedOrder, setSelectedOrder] = useState<any>(null);

  // Status Filter Toggle
  const [showFilter, setShowFilter] = useState(false);

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
             <h1 className="text-3xl font-bold tracking-tight">Orders</h1>
            <p className="text-muted-foreground">Manage and view all transaction history.</p>
          </div>
          <div className="flex gap-2 relative">
            <button 
              onClick={() => setShowFilter(!showFilter)}
              className={`flex items-center gap-2 px-4 py-2 border rounded-lg text-sm font-medium transition-colors ${statusFilter !== 'All' ? 'bg-primary/10 border-primary text-primary' : 'bg-card border-border hover:bg-muted'}`}
            >
              <Filter size={16} />
              {statusFilter === "All" ? "Filter" : statusFilter}
            </button>
            
            {showFilter && (
               <div className="absolute top-12 left-0 w-40 bg-card border border-border rounded-xl shadow-lg py-1 z-20 animate-in fade-in zoom-in-95 duration-200">
                 {["All", "Pending", "Shipped", "Delivered", "Returned"].map((status) => (
                   <button
                     key={status}
                     onClick={() => { setStatusFilter(status); setShowFilter(false); }}
                     className={`w-full text-left px-4 py-2 text-sm hover:bg-muted/50 transition-colors ${statusFilter === status ? 'text-primary font-medium' : 'text-foreground'}`}
                   >
                     {status}
                   </button>
                 ))}
               </div>
            )}

            <button  
              onClick={() => downloadCSV(orders, "orders-export")}
              className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium"
            >
              <Download size={16} />
              Export
            </button>
          </div>
        </div>

        {/* Search & Table */}
        <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden flex flex-col">
          <div className="p-4 border-b border-border">
            <div className="relative max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <input 
                type="text" 
                placeholder="Search orders..." 
                className="w-full pl-10 pr-4 py-2 bg-muted/50 border border-transparent focus:border-primary/50 focus:bg-background rounded-md text-sm outline-none transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-muted-foreground uppercase bg-muted/50 border-b border-border">
                <tr>
                  <th className="px-6 py-4 font-semibold">Order ID</th>
                  <th className="px-6 py-4 font-semibold">Customer</th>
                  <th className="px-6 py-4 font-semibold">Date</th>
                  <th className="px-6 py-4 font-semibold">Status</th>
                  <th className="px-6 py-4 font-semibold text-right">Total</th>
                  <th className="px-6 py-4 font-semibold text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {displayOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-muted/30 transition-colors">
                    <td className="px-6 py-4 font-medium text-foreground">{order.id}</td>
                    <td className="px-6 py-4">{order.customer}</td>
                    <td className="px-6 py-4 text-muted-foreground">
                      {format(new Date(order.date), "MMM dd, yyyy")}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium 
                        ${order.status === 'Delivered' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' : 
                          order.status === 'Pending' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400' :
                          order.status === 'Shipped' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400' :
                          'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                        }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right font-medium">${order.total.toFixed(2)}</td>
                    <td className="px-6 py-4 text-center">
                      <button 
                         onClick={() => setSelectedOrder(order)}
                         className="text-primary hover:underline text-xs"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-4 border-t border-border bg-muted/20 text-xs text-muted-foreground text-center">
            Showing {displayOrders.length} orders
          </div>
        </div>
      </div>

      {/* Order Logic Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
           <div className="bg-card w-full max-w-md rounded-xl border border-border shadow-xl p-6 relative animate-in zoom-in-95 duration-200">
             <button 
               onClick={() => setSelectedOrder(null)}
               className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
             >
               ✕
             </button>
             
             <h2 className="text-xl font-bold mb-1">Order Details</h2>
             <p className="text-sm text-muted-foreground mb-6">Transaction ID: {selectedOrder.id}</p>
             
             <div className="space-y-4">
               <div className="flex justify-between py-2 border-b border-border">
                 <span className="text-sm text-muted-foreground">Customer</span>
                 <span className="font-medium">{selectedOrder.customer}</span>
               </div>
               <div className="flex justify-between py-2 border-b border-border">
                 <span className="text-sm text-muted-foreground">Date</span>
                 <span className="font-medium">{format(new Date(selectedOrder.date), "PP p")}</span>
               </div>
               <div className="flex justify-between py-2 border-b border-border">
                  <span className="text-sm text-muted-foreground">Status</span>
                  <span className="font-medium">{selectedOrder.status}</span>
               </div>
               <div className="flex justify-between py-2 border-b border-border">
                  <span className="text-sm text-muted-foreground">Total Amount</span>
                  <span className="font-bold text-lg">${selectedOrder.total.toFixed(2)}</span>
               </div>
             </div>

             <div className="mt-8 pt-4 border-t border-border/50 text-center">
               <p className="text-xs text-amber-500 font-medium">⚠️ Note: These are demo orders generated for portfolio demonstration.</p>
             </div>
           </div>
        </div>
      )}
    </DashboardLayout>
  );
}
