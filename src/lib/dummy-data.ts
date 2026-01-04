import { subDays, format } from "date-fns";

// Types
export type OrderStatus = "Pending" | "Shipped" | "Delivered" | "Returned";
export type ProductCategory = "Electronics" | "Clothing" | "Home" | "Books" | "Beauty";

export interface SaleRecord {
  date: string;
  revenue: number;
  orders: number;
}

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  price: number;
  sold: number;
  stock: number;
}

export interface RecentOrder {
  id: string;
  customer: string;
  total: number;
  status: OrderStatus;
  date: string;
}

// Generators
export const generateRevenueData = (days: number = 30): SaleRecord[] => {
  const data: SaleRecord[] = [];
  for (let i = days; i >= 0; i--) {
    const date = subDays(new Date(), i);
    // Random revenue between 1000 and 5000 with some "trend"
    const base = 2000;
    const noise = Math.random() * 3000;
    const trend = (days - i) * 50; // Slight upward trend
    const revenue = Math.floor(base + noise + trend);
    
    data.push({
      date: format(date, "MMM dd"),
      revenue,
      orders: Math.floor(revenue / (50 + Math.random() * 50)),
    });
  }
  return data;
};

export const topProducts: Product[] = [
  { id: "1", name: "Wireless Headphones", category: "Electronics", price: 199.99, sold: 1240, stock: 45 },
  { id: "2", name: "Ergonomic Chair", category: "Home", price: 349.50, sold: 850, stock: 12 },
  { id: "3", name: "Mechanical Keyboard", category: "Electronics", price: 129.99, sold: 720, stock: 89 },
  { id: "4", name: "Running Shoes", category: "Clothing", price: 89.95, sold: 650, stock: 110 },
  { id: "5", name: "Smart Watch", category: "Electronics", price: 299.00, sold: 540, stock: 32 },
];

export const categoryData = [
  { name: "Electronics", value: 45000, color: "#3B82F6" },
  { name: "Clothing", value: 25000, color: "#10B981" },
  { name: "Home", value: 18000, color: "#F59E0B" },
  { name: "Books", value: 8000, color: "#8B5CF6" },
  { name: "Beauty", value: 12000, color: "#EC4899" },
];

export const userGrowthData = [
  { month: "Jan", newUsers: 120, returning: 80 },
  { month: "Feb", newUsers: 140, returning: 95 },
  { month: "Mar", newUsers: 180, returning: 110 },
  { month: "Apr", newUsers: 220, returning: 130 },
  { month: "May", newUsers: 290, returning: 160 },
  { month: "Jun", newUsers: 350, returning: 190 },
];

export const recentOrders: RecentOrder[] = [
  { id: "#ORD-7782", customer: "Alice Freeman", total: 129.00, status: "Delivered", date: "2 mins ago" },
  { id: "#ORD-7781", customer: "Bob Smith", total: 49.50, status: "Pending", date: "15 mins ago" },
  { id: "#ORD-7780", customer: "Charlie Davis", total: 899.99, status: "Shipped", date: "1 hour ago" },
  { id: "#ORD-7778", customer: "Evan Wright", total: 155.50, status: "Delivered", date: "5 hours ago" },
];

export const generateOrders = (count: number = 50): RecentOrder[] => {
  const statuses: OrderStatus[] = ["Pending", "Shipped", "Delivered", "Returned"];
  return Array.from({ length: count }).map((_, i) => ({
    id: `#ORD-${7783 + i}`,
    customer: `Customer ${i + 1}`,
    total: Math.floor(Math.random() * 500) + 20,
    status: statuses[Math.floor(Math.random() * statuses.length)],
    date: subDays(new Date(), Math.floor(i / 5)).toISOString(),
  }));
};

export const cohortData = [
  { week: "Week 1", retention: 100, churn: 0 },
  { week: "Week 2", retention: 85, churn: 15 },
  { week: "Week 3", retention: 70, churn: 30 },
  { week: "Week 4", retention: 60, churn: 40 },
  { week: "Week 5", retention: 55, churn: 45 },
  { week: "Week 6", retention: 50, churn: 50 },
  { week: "Week 7", retention: 48, churn: 52 },
  { week: "Week 8", retention: 45, churn: 55 },
];

export const trafficData = [
  { name: "Organic Search", value: 45, color: "#3B82F6" },
  { name: "Direct", value: 25, color: "#10B981" },
  { name: "Social Media", value: 20, color: "#F59E0B" },
  { name: "Referral", value: 10, color: "#8B5CF6" },
];

export const satisfactionData = [
  { rating: "5 Star", count: 450 },
  { rating: "4 Star", count: 320 },
  { rating: "3 Star", count: 150 },
  { rating: "2 Star", count: 50 },
  { rating: "1 Star", count: 20 },
];

export const deviceData = [
  { name: "Desktop", value: 65, color: "#3B82F6" },
  { name: "Mobile", value: 25, color: "#10B981" },
  { name: "Tablet", value: 10, color: "#F59E0B" },
];

export const regionData = [
  { name: "North America", value: 4500 },
  { name: "Europe", value: 3200 },
  { name: "Asia", value: 2100 },
  { name: "South America", value: 900 },
  { name: "Others", value: 500 },
];
