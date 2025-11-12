// pages/admin/delivery.tsx
import React, { useEffect, useState } from "react";
import AdminGuard from "@/components/AdminGuard";
import Layout from "@/components/Layout";

type Partner = {
  _id: string;
  name: string;
  phone?: string;
  vehicle?: string;
  active?: boolean;
  createdAt?: string;
  updatedAt?: string;
};

export default function AdminDelivery() {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // form state for add or edit
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    vehicle: "",
    active: true,
  });
  const [saving, setSaving] = useState(false);

  async function load() {
    setLoading(true);
    try {
      const res = await fetch("/api/delivery");
      if (!res.ok) throw new Error(await res.text());
      const data = await res.json();
      setPartners(data);
    } catch (err: any) {
      console.error(err);
      setError(err?.message || "Failed to load");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  function startAdd() {
    setEditingId(null);
    setForm({ name: "", phone: "", vehicle: "", active: true });
  }

  function startEdit(p: Partner) {
    setEditingId(p._id);
    setForm({
      name: p.name || "",
      phone: p.phone || "",
      vehicle: p.vehicle || "",
      active: !!p.active,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function handleSave(e?: React.FormEvent) {
    if (e) e.preventDefault();
    if (!form.name.trim()) return alert("Name is required");
    setSaving(true);
    try {
      if (editingId) {
        const res = await fetch(`/api/delivery/${editingId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
        if (!res.ok) throw new Error(await res.text());
        const updated = await res.json();
        setPartners((prev) =>
          prev.map((p) => (p._id === updated._id ? updated : p))
        );
        setEditingId(null);
      } else {
        const res = await fetch("/api/delivery", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
        if (!res.ok) throw new Error(await res.text());
        const created = await res.json();
        setPartners((prev) => [created, ...prev]);
        setForm({ name: "", phone: "", vehicle: "", active: true });
      }
    } catch (err: any) {
      console.error(err);
      alert("Save failed: " + (err?.message || ""));
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this delivery partner?")) return;
    try {
      const res = await fetch(`/api/delivery/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error(await res.text());
      setPartners((p) => p.filter((x) => x._id !== id));
    } catch (err: any) {
      console.error(err);
      alert("Delete failed: " + (err?.message || ""));
    }
  }

  return (
    <AdminGuard>
      <Layout title="Admin • Delivery Partners">
        <div className="max-w-4xl mx-auto py-6">
          <div className="flex items-start justify-between gap-6">
            <h1 className="text-2xl font-bold">Delivery Partners</h1>
            <div>
              <button
                onClick={startAdd}
                className="px-3 py-1 bg-indigo-600 text-white rounded shadow"
              >
                + New Partner
              </button>
            </div>
          </div>

          <div className="mt-6 bg-white p-4 rounded shadow">
            <form
              onSubmit={(e) => handleSave(e)}
              className="grid grid-cols-1 md:grid-cols-4 gap-3 items-end"
            >
              <div className="md:col-span-1">
                <label className="text-xs text-gray-600">Name</label>
                <input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full border px-2 py-2 rounded"
                />
              </div>

              <div className="md:col-span-1">
                <label className="text-xs text-gray-600">Phone</label>
                <input
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full border px-2 py-2 rounded"
                />
              </div>

              <div className="md:col-span-1">
                <label className="text-xs text-gray-600">Vehicle</label>
                <input
                  value={form.vehicle}
                  onChange={(e) =>
                    setForm({ ...form, vehicle: e.target.value })
                  }
                  className="w-full border px-2 py-2 rounded"
                />
              </div>

              <div className="md:col-span-1 flex gap-2">
                <div>
                  <label className="text-xs text-gray-600 block">Active</label>
                  <div className="mt-1">
                    <label className="inline-flex items-center">
                      <input
                        type="checkbox"
                        checked={form.active}
                        onChange={(e) =>
                          setForm({ ...form, active: e.target.checked })
                        }
                        className="mr-2"
                      />
                      <span className="text-sm">Active</span>
                    </label>
                  </div>
                </div>

                <div className="ml-auto">
                  <button
                    type="submit"
                    disabled={saving}
                    className="px-3 py-2 bg-green-600 text-white rounded"
                  >
                    {saving ? "Saving…" : editingId ? "Update" : "Create"}
                  </button>
                </div>
              </div>
            </form>
          </div>

          <div className="mt-6">
            {loading && (
              <div className="text-center text-gray-500">Loading…</div>
            )}
            {!loading && partners.length === 0 && (
              <div className="text-center text-gray-500">No partners yet</div>
            )}

            <div className="mt-3 space-y-3">
              {partners.map((p) => (
                <div
                  key={p._id}
                  className="bg-white p-3 rounded shadow flex items-center justify-between"
                >
                  <div>
                    <div className="font-medium">
                      {p.name}{" "}
                      {p.active ? (
                        <span className="text-xs text-green-600 ml-2">
                          (Active)
                        </span>
                      ) : (
                        <span className="text-xs text-red-500 ml-2">
                          (Inactive)
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-gray-500">
                      {p.phone} {p.vehicle ? `• ${p.vehicle}` : ""}
                    </div>
                    <div className="text-xs text-gray-400 mt-1">
                      ID: {p._id}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => startEdit(p)}
                      className="px-3 py-1 border rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(p._id)}
                      className="px-3 py-1 border text-red-600 rounded"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Layout>
    </AdminGuard>
  );
}
