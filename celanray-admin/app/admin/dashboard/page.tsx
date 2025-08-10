"use client";
import React from "react";
import { useAuth } from "../../contexts/AuthContext";

export default function AdminDashboard() {
  const { admin } = useAuth();

  return (
    <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl px-10 py-12 text-center">
      <h1 className="text-3xl font-bold text-[#463f5e] mb-2">Welcome, {admin?.name || "Admin"}!</h1>
      <p className="text-gray-600 text-lg">This is your admin dashboard.</p>
    </div>
  );
} 