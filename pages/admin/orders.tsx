// pages/admin/orders.tsx
import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";

type Order = {
  _id: string;
  customerName: string;
  phone: string;
  address: string;
  cleanerId?: string | null;
  status: string;
  assignedTo?: string | null;
  items: string[];
  createdAt: string;
};

type Delivery = {
  _id: string;
  name: string;
  phone?: string;
  vehicle?: string;
  active?: boolean;
};

export default function AdminOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [deliveryPartners, setDeliveryPartners] = useState<Delivery[]>([]);
  const [loading, setLoading] = useState(true);
  const [assigning, setAssigning] = useState<Record<string, boolean>>({});

  async function fetchOrders() {
    setLoading(true);
    const res = await fetch("/api/orders", { cache: "no-store" });
    if (res.ok) {
      setOrders(await res.json());
    } else {
      console.error("Failed to load orders", await res.text());
    }
    setLoading(false);
  }

  async function fetchDeliveryPartners() {
    const res = await fetch("/api/delivery", { cache: "no-store" });
    if (res.ok) {
      setDeliveryPartners(await res.json());
    } else {
      console.error("Failed to load delivery partners", await res.text());
    }
  }

  useEffect(() => {
    fetchOrders();
    fetchDeliveryPartners();
    const iv = setInterval(fetchOrders, 10_000); // optional polling
    return () => clearInterval(iv);
  }, []);

  async function assignToPartner(orderId: string, deliveryId: string | null) {
    // optimistic update
    setAssigning((s) => ({ ...s, [orderId]: true }));
    const prev = orders;
    setOrders((o) =>
      o.map((x) =>
        x._id === orderId
          ? {
              ...x,
              assignedTo: deliveryId,
              status: deliveryId ? "assigned" : x.status,
            }
          : x
      )
    );

    try {
      const res = await fetch("/api/orders", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: orderId,
          action: "assign",
          assignedTo: deliveryId,
        }),
      });
      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Failed to assign");
      }
      // update from server response
      const updated = await res.json();
      setOrders((o) => o.map((x) => (x._id === orderId ? updated : x)));
    } catch (err: any) {
      // rollback on error
      setOrders(prev);
      alert("Assign failed: " + (err?.message || "unknown"));
    } finally {
      setAssigning((s) => ({ ...s, [orderId]: false }));
    }
  }

  return (
    <Layout title="Admin • Orders">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Orders</h2>
        <div>
          <button
            onClick={fetchOrders}
            className="px-3 py-1 bg-indigo-600 text-white rounded"
          >
            Refresh
          </button>
        </div>
      </div>

      <div className="mt-4">
        {loading && <div className="text-center py-6">Loading…</div>}
        {!loading && orders.length === 0 && (
          <div className="text-center text-gray-500">No orders</div>
        )}

        {!loading &&
          orders.map((o) => (
            <div key={o._id} className="bg-white p-3 rounded shadow mb-3">
              <div className="flex flex-col md:flex-row md:justify-between">
                <div>
                  <div className="font-medium">
                    {o.customerName}{" "}
                    <span className="text-xs text-gray-500">({o.phone})</span>
                  </div>
                  <div className="text-xs text-gray-500">{o.address}</div>
                  <div className="text-xs mt-2">
                    Items: {o.items?.join(", ")}
                  </div>
                  <div className="text-xs text-gray-400 mt-1">
                    Order ID: {o._id}
                  </div>
                </div>

                <div className="mt-3 md:mt-0 flex items-center gap-3">
                  <div className="text-sm">
                    <div className="text-xs text-gray-500">Status</div>
                    <div className="font-semibold">{o.status}</div>
                  </div>

                  <div>
                    <label className="text-xs text-gray-500 block mb-1">
                      Assign to
                    </label>
                    <select
                      value={o.assignedTo ?? ""}
                      onChange={(e) => {
                        const val = e.target.value || null;
                        assignToPartner(o._id, val);
                      }}
                      disabled={assigning[o._id]}
                      className="border px-2 py-1 rounded"
                    >
                      <option value="">— Unassigned —</option>
                      {deliveryPartners.map((d) => (
                        <option key={d._id} value={d._id}>
                          {d.name} {d.vehicle ? `(${d.vehicle})` : ""}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </Layout>
  );
}
