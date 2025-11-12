import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // if already logged in, redirect
  useEffect(() => {
    const loggedIn = localStorage.getItem("admin_user");
    if (loggedIn) router.replace("/admin");
  }, [router]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (email === "santosh@gmail.com" && password === "Santosh@123") {
      localStorage.setItem(
        "admin_user",
        JSON.stringify({ email, role: "admin" })
      );
      router.replace("/admin");
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-6 rounded shadow-md w-80"
      >
        <h2 className="text-xl font-semibold text-center mb-4">Admin Login</h2>
        <label className="block text-sm font-medium mb-1">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border w-full px-3 py-2 rounded mb-3"
          placeholder="santosh@gmail.com"
          required
        />
        <label className="block text-sm font-medium mb-1">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border w-full px-3 py-2 rounded mb-3"
          placeholder="••••••••"
          required
        />
        {error && <p className="text-red-600 text-sm mb-2">{error}</p>}
        <button
          type="submit"
          className="bg-indigo-600 w-full py-2 text-white rounded hover:bg-indigo-700"
        >
          Login
        </button>
      </form>
    </div>
  );
}
