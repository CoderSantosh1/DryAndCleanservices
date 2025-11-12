import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

export default function AdminHome() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("admin_user");
    router.replace("/admin/login");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Admin Panel</h2>
        <button
          onClick={handleLogout}
          className="text-sm text-red-600 border border-red-600 px-3 py-1 rounded hover:bg-red-50"
        >
          Logout
        </button>
      </div>

      <div className="mt-4 space-y-3">
        <Link
          href="/admin/cleaners"
          className="block bg-white p-3 rounded shadow"
        >
          Manage Cleaners
        </Link>
        <Link
          href="/admin/orders"
          className="block bg-white p-3 rounded shadow"
        >
          Manage Orders
        </Link>
      </div>
    </div>
  );
}
