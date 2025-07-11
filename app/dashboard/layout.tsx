"use client";

import ProtectedRoute from "@/components/auth/ProtectedRouteWithRole";
import { Navbar } from "@/components/features/Layout/Navbar";
import { Sidebar } from "@/components/features/Layout/Sidebar";
import { useAuth } from "@/hooks/useAuth";
import { Role } from "@/types";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, checkAuth } = useAuth();

  return (
     <ProtectedRoute allowedRoles={[Role.USER]}>

      <div className="flex h-screen">
        <Sidebar />
        <div className="flex-1 h-screen overflow-y-auto">
          <Navbar />
          <main className="p-6">{children}</main>
        </div>
      </div>
    </ProtectedRoute>
  );
}
