import React, { useState } from 'react'
import { useRouter } from 'next/router'

export default function BookingForm({ cleanerId }: { cleanerId?: string }) {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [items, setItems] = useState('')
  const router = useRouter()

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    const body = {
      customerName: name,
      phone,
      address,
      cleanerId: cleanerId ?? null,
      items: items.split(',').map((s) => s.trim()).filter(Boolean),
    }
    const res = await fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
    if (!res.ok) {
      alert('Failed to create order')
      return
    }
    const order = await res.json()
    router.push(`/booking/confirm?id=${order.id}`)
  }

  return (
    <form onSubmit={submit} className="bg-white p-4 rounded shadow space-y-2">
      <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" className="w-full p-2 border rounded" required />
      <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone" className="w-full p-2 border rounded" required />
      <input value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Pickup address" className="w-full p-2 border rounded" required />
      <input value={items} onChange={(e) => setItems(e.target.value)} placeholder="Items (comma separated)" className="w-full p-2 border rounded" required />
      <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded">Request pickup</button>
    </form>
)
}
