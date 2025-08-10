"use client";

import Header from "@/app/components/Header/Header";
import { AdminSidebar } from "@/app/components/admin/AdminSidebar";
import React from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const HEADER_HEIGHT = 80; // px
const SIDEBAR_WIDTH = 224; // 56 * 4 (w-56)

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, isLoading, router]);

  const handleLogout = () => {
    logout();
  };

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#f6f4fa] via-[#eae6f7] to-[#f3f0fa] flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-[#463f5e] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#463f5e]">Loading...</p>
        </div>
      </div>
    );
  }

  // Don't render dashboard if not authenticated
  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="bg-gradient-to-br from-[#f6f4fa] via-[#eae6f7] to-[#f3f0fa] min-h-screen">
      {/* Fixed Header */}
      <div className="fixed top-0 left-0 w-full z-50 h-20 bg-gradient-to-br from-[#f6f4fa] via-[#eae6f7] to-[#f3f0fa] border-b border-[#eae6f7]">
        <Header />
      </div>
      {/* Fixed Sidebar */}
      <div className="fixed top-20 left-0 h-[calc(100vh-80px)] w-56 z-40">
        <AdminSidebar onLogout={handleLogout} />
      </div>
      {/* Main Content Area */}
      <main
        className="ml-56 pt-20 flex flex-col items-center justify-start p-8"
      >
        {children}
      </main>
    </div>
  );
} 