# 📊 MetricCanvas Dashboard

![Next.js](https://img.shields.io/badge/Next.js-16.0-black?style=for-the-badge&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-3.8-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Recharts](https://img.shields.io/badge/Recharts-Visualization-orange?style=for-the-badge)

> A **full-stack, responsive analytics dashboard** engineered for performance and scalability. This project demonstrates modern web development practices, focusing on **UI/UX excellence**, **data visualization**, and **responsive architecture**.

---

## 🚀 Overview

**MetricCanvas** is not just a dashboard; it's a comprehensive admin interface built to handle complex data flows. It leverages **Next.js 15 App Router** for server-side optimization and **React Server Components** to minimize client-side bundle sizes.

The goal of this project was to build a system that feels:

1.  **Alive** – Through micro-interactions and fluid animations.
2.  **Professional** – With a cohesive design system and dark mode support.
3.  **Performant** – Using efficient data rendering techniques for heavy charts.

---

## ✨ Key Features

### 🖥️ **Immersive UI/UX**

- **Glassmorphism Design**: Modern, translucent card layers with backdrop blur effects.
- **Dark/Light Mode**: Seamless theme switching with persistent state (via `next-themes`).
- **Responsive Sidebar**: A collapsible navigation drawer that transforms into a mobile-friendly slide-out menu.

### 📈 **Advanced Data Visualization**

- **Revenue Analytics**: Interactive Area Charts with gradient fills.
- **Sales Distribution**: Donut and Bar charts powered by `Recharts` for high-performance rendering.
- **Smart Legends**: Custom-built legends that adapt to screen size.

### 🛠️ **Functional Components**

- **Dynamic Data Grid**: Recent Orders table with status filtering ("Pending", "Delivered", etc.).
- **Export Capability**: Client-side CSV generation for reporting.
- **Notification System**: Interactive dropdowns with read/unread states.

---

## 🏗️ Architecture & "The Knowledge"

This project showcases several advanced architectural patterns:

### **1. Component Composition Pattern**

Instead of monolithic components, the UI is broken down into small, reusable atoms (e.g., `StatCard`, `DeviceStatsChart`). This ensures:

- **Maintainability**: Easier to debug isolated components.
- **Reusability**: Components can be dropped into any page layout.

### **2. Mobile-First Layout Engine**

The `DashboardLayout` uses a hybrid approach:

- **Desktop**: Permanent sidebar with flexbox layout.
- **Mobile**: Fixed-position header + overlay drawer state management.
- _Why?_ This provides a native-app feel on mobile devices while maintaining desktop productivity.

### **3. Optimistic UI & Feedback**

All interactions provide immediate feedback. For example, restricted actions (like "Delete") trigger a toast notification system built from scratch using the DOM API for lightweight performance, avoiding heavy external toast libraries.

---

## 🛠️ Technology Stack

| Domain      | Tech             | Why use it?                                             |
| :---------- | :--------------- | :------------------------------------------------------ |
| **Core**    | **Next.js**   | App Router, SSR/RSC capabilities for SEO and speed.     |
| **Typing**  | **TypeScript**   | Strict type safety to prevent runtime errors.           |
| **Styling** | **Tailwind CSS** | Utility-first CSS for rapid, consistent design systems. |
| **Vis**     | **Recharts**     | Composable chart library built on SVG elements.         |
| **Icons**   | **Lucide React** | Consistent, lightweight SVG icons.                      |
| **Utils**   | **date-fns**     | Robust date formatting and manipulation.                |

---

## 📦 Getting Started

Ready to explore the code?

1.  **Clone the Repo**

    ```bash
    git clone https://github.com/mmustafacode/MetricCanvas-Dashboard.git
    ```

2.  **Install Dependencies**

    ```bash
    cd metriccanvas
    npm install
    ```

3.  **Run Development Server**

    ```bash
    npm run dev
    ```

4.  **Open Browser**
    Visit `http://localhost:3000` to see the dashboard in action.

---

## � Future Roadmap

- [ ] **Authentication**: Integrate NextAuth.js for secure admin login.
- [ ] **Backend**: Connect to PostgreSQL via Prisma ORM for live data.
- [ ] **Real-time**: Implement WebSockets for live order notifications.

---

## 📜 License

Distributed under the MIT License. See `LICENSE` for more information.

---

_Built with ❤️ and ☕ by Mustafa._
