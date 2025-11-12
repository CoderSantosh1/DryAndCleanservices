// components/DeliveryPhoneLogin.tsx
import React, { useState } from "react";
import { useRouter } from "next/router";

export default function DeliveryPhoneLogin({
  createIfNotFound = false,
}: {
  createIfNotFound?: boolean;
}) {
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!phone || phone.trim().length < 6) {
      setError("Please enter a valid mobile number");
      return;
    }
    setLoading(true);

    try {
      const res = await fetch("/api/delivery/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: phone.trim(), createIfNotFound }),
      });

      // debug: print status and body in console
      const body = await res.text();
      console.log("[delivery login] status:", res.status, "body:", body);

      // try parse JSON if possible
      let data: any = null;
      try {
        data = JSON.parse(body);
      } catch (e) {
        data = body;
      }

      if (!res.ok) {
        const msg = data && data.error ? data.error : "Login failed";
        setError(msg);
        setLoading(false);
        return;
      }

      // success: store identity in localStorage (dev-only)
      const id = data.id;
      const name = data.name || data.phone || "Delivery";
      const phoneResp = data.phone || phone.trim();

      localStorage.setItem(
        "delivery_user",
        JSON.stringify({ id, name, phone: phoneResp })
      );
      // dispatch an event so other tabs/components can pick it up (optional)
      window.dispatchEvent(new Event("delivery-login"));

      // navigate and reload to ensure DeliveryOrders re-reads localStorage
      // use replace to avoid additional history entry
      await router.replace("/delivery/orders");
      // ensure refresh: if router.replace didn't remount, force reload
      window.location.reload();
    } catch (err: any) {
      console.error("Login error", err);
      setError(err?.message || "Network error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-sm mx-auto bg-white p-4 rounded shadow"
    >
      <h3 className="font-semibold mb-3">Delivery partner login (mobile)</h3>
      <label className="text-xs text-gray-600 block mb-1">Mobile number</label>
      <input
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        placeholder="e.g. 9876543210"
        className="w-full border px-3 py-2 rounded mb-2"
        inputMode="numeric"
      />
      {error && <div className="text-sm text-red-600 mb-2">{error}</div>}
      <div className="flex gap-2">
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-indigo-600 text-white rounded"
        >
          {loading ? "Signing in…" : "Sign in"}
        </button>
        <button
          type="button"
          onClick={() => {
            setPhone("");
            setError(null);
          }}
          className="px-3 py-2 border rounded"
        >
          Clear
        </button>
      </div>
      <p className="mt-3 text-xs text-gray-500">
        This is a quick login for testing. Use proper auth in production.
      </p>
    </form>
  );
}
