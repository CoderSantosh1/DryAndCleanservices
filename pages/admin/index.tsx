// pages/admin/index.tsx
import React from "react";
import AdminGuard from "@/components/AdminGuard";
import Link from "next/link";
import { useRouter } from "next/router";

export default function AdminHome() {
  const router = useRouter();

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("admin_user");
      router.replace("/admin/login");
    }
  };

  return (
    <AdminGuard>
      <div className="min-h-screen bg-gray-100 p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-indigo-700">
            Tidee Services • Admin Panel
          </h2>
          <button
            onClick={handleLogout}
            className="text-sm text-red-600 border border-red-600 px-3 py-1 rounded hover:bg-red-50"
          >
            Logout
          </button>
        </div>

        <div className="mt-6 space-y-4">
          <Link
            href="/admin/cleaners"
            className="block bg-white hover:bg-gray-50 p-4 rounded shadow transition"
          >
            🧺 Manage Cleaners
          </Link>

          <Link
            href="/admin/orders"
            className="block bg-white hover:bg-gray-50 p-4 rounded shadow transition"
          >
            📦 Manage Orders
          </Link>

          <Link
            href="/admin/delivery"
            className="block bg-white hover:bg-gray-50 p-4 rounded shadow transition"
          >
            🚚 Manage Delivery Partners
          </Link>
        </div>
      </div>
    </AdminGuard>
  );
}
