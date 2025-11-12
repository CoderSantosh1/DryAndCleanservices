import React from 'react'

type Order = {
  id: string
  customerName: string
  phone: string
  address: string
  items: string[]
  status: string
  createdAt: string
}

export default function OrderCard({ order, actions }: { order: Order; actions?: { label: string; onClick: () => void }[] }) {
  return (
    <div className="bg-white p-3 rounded shadow mb-3">
      <div className="flex justify-between items-start">
        <div>
          <div className="font-medium">{order.customerName} <span className="text-xs text-gray-500">({order.phone})</span></div>
          <div className="text-xs text-gray-500">{order.address}</div>
          <div className="text-xs mt-2">Items: {order.items.join(', ')}</div>
        </div>
        <div className="text-right">
          <div className="text-sm font-semibold">{order.status}</div>
          <div className="text-xs text-gray-400">{new Date(order.createdAt).toLocaleString()}</div>
        </div>
      </div>

      {actions && actions.length > 0 && (
        <div className="mt-3 flex gap-2">
          {actions.map((a, i) => (
            <button key={i} onClick={a.onClick} className="px-3 py-1 rounded border text-sm">
              {a.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
