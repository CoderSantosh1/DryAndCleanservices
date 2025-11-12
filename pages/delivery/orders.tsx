// pages/delivery/orders.tsx
import React, { useEffect, useMemo, useState } from "react";
import Layout from "../../components/Layout";
import DeliveryPhoneLogin from "@/components/DeliveryPhoneLogin";
import { useSession, signIn } from "next-auth/react";

type Order = {
  _id: string;
  customerName: string;
  phone?: string;
  address?: string;
  items?: string[];
  status: string;
  assignedTo?: string | null;
  createdAt: string;
};

export default function DeliveryOrders() {
  const { data: session, status: sessionStatus } = useSession();
  const [localDeliveryId, setLocalDeliveryId] = useState<string | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState<Record<string, boolean>>({});

  // read localStorage once on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem("delivery_user");
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed?.id) setLocalDeliveryId(parsed.id);
      }
    } catch (e) {
      // ignore
    }
  }, []);

  // derive the delivery id (session preferred, then localStorage)
  const DELIVERY_ID = useMemo(() => {
    const sid = (session && (session.user as any)?.id) || null;
    return sid ?? localDeliveryId;
  }, [session, localDeliveryId]);

  // fetch orders for this delivery id (only when available)
  async function fetchOrdersForDelivery(deliveryId: string) {
    setLoading(true);
    try {
      const res = await fetch("/api/orders", { cache: "no-store" });
      if (!res.ok) {
        console.error("Failed to fetch orders", await res.text());
        setOrders([]);
        return;
      }
      const all = await res.json();
      const mine = (all as Order[]).filter((o) => o.assignedTo === deliveryId);
      setOrders(mine);
    } catch (err) {
      console.error("Error fetching orders", err);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  }

  // effect: when DELIVERY_ID becomes available, start polling
  useEffect(() => {
    if (!DELIVERY_ID) return;
    // initial load + polling
    fetchOrdersForDelivery(DELIVERY_ID);
    const iv = setInterval(() => fetchOrdersForDelivery(DELIVERY_ID), 8000);
    return () => clearInterval(iv);
  }, [DELIVERY_ID]);

  // update status
  async function updateStatus(id: string, statusValue: string) {
    setUpdating((s) => ({ ...s, [id]: true }));
    try {
      const res = await fetch("/api/orders", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, action: "status", status: statusValue }),
      });
      if (!res.ok) {
        const txt = await res.text();
        throw new Error(txt || "Failed to update status");
      }
      const updated = await res.json();
      setOrders((prev) => prev.map((o) => (o._id === id ? updated : o)));
    } catch (err: any) {
      console.error("Update failed:", err);
      alert("Failed to update status: " + (err?.message || ""));
    } finally {
      setUpdating((s) => ({ ...s, [id]: false }));
    }
  }

  // UI: if session is loading show loading; if no session & no local login show phone-login
  if (sessionStatus === "loading") {
    return (
      <Layout title="Delivery • Loading">
        <div className="py-12 text-center">Loading session…</div>
      </Layout>
    );
  }

  if (!DELIVERY_ID) {
    // show quick phone-login (dev-only) and next-auth signin button
    return (
      <Layout title="Delivery • Sign in">
        <div className="py-8 max-w-lg mx-auto space-y-6">
          <p className="text-center">
            Sign in with mobile number to view your assigned orders.
          </p>

          <DeliveryPhoneLogin createIfNotFound={true} />

          <div className="text-center text-sm text-gray-500">
            or{" "}
            <button
              onClick={() => signIn()}
              className="text-indigo-600 underline"
            >
              sign in with account
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  // Main UI when DELIVERY_ID available
  return (
    <Layout title="Delivery • Orders">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">My Assigned Orders</h2>
        <div>
          <button
            onClick={() => fetchOrdersForDelivery(DELIVERY_ID)}
            className="px-3 py-1 bg-indigo-600 text-white rounded"
          >
            Refresh
          </button>
          <div className="text-xs text-gray-500 mt-1">
            Signed in as{" "}
            <strong>
              {(session && (session.user as any)?.name) ||
                (typeof window !== "undefined" &&
                localStorage.getItem("delivery_user")
                  ? JSON.parse(localStorage.getItem("delivery_user")!).name
                  : "Delivery")}
            </strong>
          </div>
        </div>
      </div>

      {loading && <div className="text-center py-6">Loading…</div>}

      {!loading && orders.length === 0 && (
        <div className="text-center text-gray-500">No assigned orders</div>
      )}

      <div className="space-y-3">
        {orders.map((o) => (
          <div key={o._id} className="bg-white p-3 rounded shadow mb-3">
            <div className="flex justify-between">
              <div>
                <div className="font-medium">{o.customerName}</div>
                <div className="text-xs text-gray-500">{o.address}</div>
              </div>

              <div className="text-right">
                <div className="text-sm">{o.status}</div>
                <div className="text-xs">
                  {new Date(o.createdAt).toLocaleString()}
                </div>
              </div>
            </div>

            <div className="mt-3 flex gap-2">
              <button
                onClick={() => updateStatus(o._id, "picked")}
                disabled={
                  updating[o._id] ||
                  o.status === "picked" ||
                  o.status === "completed"
                }
                className="px-2 py-1 rounded border disabled:opacity-50"
              >
                Picked
              </button>
              <button
                onClick={() => updateStatus(o._id, "in_transit")}
                disabled={
                  updating[o._id] ||
                  o.status === "in_transit" ||
                  o.status === "completed"
                }
                className="px-2 py-1 rounded border disabled:opacity-50"
              >
                In Transit
              </button>
              <button
                onClick={() => updateStatus(o._id, "completed")}
                disabled={updating[o._id] || o.status === "completed"}
                className="px-2 py-1 rounded border bg-green-50 disabled:opacity-50"
              >
                Complete
              </button>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
}
