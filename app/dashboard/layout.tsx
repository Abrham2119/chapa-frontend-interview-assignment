'use client';

import { Navbar } from "@/components/features/Layout/Navbar";
import { Sidebar } from "@/components/features/Layout/Sidebar.tsx";
import { useAuth } from "@/hooks/useAuth";


export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, checkAuth } = useAuth();

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 h-screen overflow-y-auto">
        <Navbar />
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}